// Logging system
const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

const MAX_LOG_ENTRIES = 100; // Maximum number of log entries
const MAX_LOG_SIZE = 50000; // Maximum log size in characters (~50KB)

// Function to add a log entry
async function addLogEntry(level, message, data = null) {
  try {
    const settings = await chrome.storage.sync.get(['settings']);
    if (!settings.settings?.enableLogging) {
      return; // Logging disabled
    }

    const timestamp = new Date().toISOString();
    const entry = {
      timestamp,
      level,
      message,
      data: data ? JSON.stringify(data).substring(0, 500) : null,
      userAgent: navigator.userAgent
    };

    // Get existing logs
    const result = await chrome.storage.local.get(['logs']);
    let logs = result.logs || [];

    // Add new entry
    logs.push(entry);

    // Check log size
    const logSize = JSON.stringify(logs).length;

    // Remove old entries if limit exceeded
    if (logs.length > MAX_LOG_ENTRIES || logSize > MAX_LOG_SIZE) {
      // Remove oldest 30% of entries
      const removeCount = Math.ceil(logs.length * 0.3);
      logs = logs.slice(removeCount);
    }

    // Save updated logs
    await chrome.storage.local.set({ logs });

    // Also print to console if debug is enabled
    if (settings.settings?.enableDebugConsole) {
      console.log(`[Asana Copy ${level.toUpperCase()}]`, message, data);
    }
  } catch (error) {
    // If logging fails, at least print to console
    console.error('Logging failed:', error);
  }
}

function logError(message, data) {
  addLogEntry(LOG_LEVELS.ERROR, message, data);
}

function logWarn(message, data) {
  addLogEntry(LOG_LEVELS.WARN, message, data);
}

function logInfo(message, data) {
  addLogEntry(LOG_LEVELS.INFO, message, data);
}

function logDebug(message, data) {
  addLogEntry(LOG_LEVELS.DEBUG, message, data);
}

// Function to get task info
function getTaskInfo() {
  // Try different selectors for the task title
  const selectors = [
    'textarea[aria-label="Task Name"]',
    'textarea[aria-label^="Task name"]',
    'textarea[aria-label^="Task Name"]',
    '[aria-label^="Task name"]',
    '.TaskName',
    '[data-test-id="task-name"]',
    '.TaskPaneHeader-titleRow h1',
    '.TaskPaneHeader-titleRow input',
    '.TaskPaneHeader-titleRow textarea',
    '[contenteditable="true"][aria-label*="name"]'
  ];

  let taskTitle = null;
  let foundSelector = null;
  
  for (const selector of selectors) {
    try {
      const element = document.querySelector(selector);
      if (element) {
        // For textarea and input use value, for others use textContent
        taskTitle = element.value || element.innerText || element.textContent;
        if (taskTitle && taskTitle.trim()) {
          foundSelector = selector;
          logDebug('Task title found', { selector, title: taskTitle });
          break;
        }
      }
    } catch (error) {
      logError('Error trying selector: ' + selector, error);
    }
  }

  const taskUrl = window.location.href;

  if (!taskTitle) {
    logError('Task title not found', { 
      url: taskUrl, 
      triedSelectors: selectors,
      pageHTML: document.body.innerHTML.substring(0, 500)
    });
  }

  return { title: taskTitle, url: taskUrl, foundSelector };
}

// Function to format the task
function formatTask(title, url, format) {
  switch(format) {
    case 'markdown':
      return `[${title}](${url})`;
    case 'html':
      return `<a href="${url}">${title}</a>`;
    case 'plain':
      return `${title} - ${url}`;
    default:
      return `[${title}](${url})`;
  }
}

// Function to copy to clipboard
async function copyToClipboard(text, format, taskTitle, taskUrl) {
  logDebug('Attempting to copy', { format, textLength: text.length });

  try {
    await navigator.clipboard.writeText(text);
    logInfo('Copy successful', { format });

    const settings = await chrome.storage.sync.get(['settings']);
    if (settings.settings?.showNotification !== false) {
      showNotification(format);
    }
    return true;
  } catch (err) {
    logError('Copy failed', err);

    const lang = await getLanguage();
    const messages = MESSAGES[lang];
    alert(messages.copyError || 'Failed to copy. Please check browser permissions.');
    return false;
  }
}

// Function to show a notification
async function showNotification(format) {
  const lang = await getLanguage();
  const messages = MESSAGES[lang];
  
  const formatNames = {
    'markdown': messages.copiedMarkdown,
    'html': messages.copiedHTML,
    'plain': messages.copiedPlain
  };

  const notification = document.createElement('div');
  notification.className = 'asana-copy-notification';
  notification.innerHTML = `
    <div class="asana-copy-notification-content">
      <span class="asana-copy-notification-icon">✓</span>
      <span class="asana-copy-notification-text">${formatNames[format]}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Fade-in animation
  setTimeout(() => notification.classList.add('show'), 10);

  // Remove after 2 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Handle messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'copyTask') {
    const taskInfo = getTaskInfo();
    
    if (!taskInfo.title) {
      getLanguage().then(lang => {
        const messages = MESSAGES[lang];
        alert(messages.taskNotFound);
      });
      logError('Task not found when trying to copy');
      return;
    }

    const formatted = formatTask(taskInfo.title, taskInfo.url, request.format);
    copyToClipboard(formatted, request.format, taskInfo.title, taskInfo.url);
  }
});

// Add button to Asana interface
async function addInPageButton() {
  const settings = await chrome.storage.sync.get(['settings']);
  const lang = settings.settings?.language || 'en';
  const messages = MESSAGES[lang];
  
  if (settings.settings?.enableInPageButton === false) {
    return;
  }

  // Check if button is already added
  if (document.querySelector('.asana-copy-button')) {
    return;
  }

  // Find the button container in the task pane
  const buttonContainerSelectors = [
    '.TaskPaneHeader-actionsContainer',
    '[data-test-id="task-pane-header-actions"]',
    '.TaskPaneToolbar'
  ];

  let buttonContainer = null;
  for (const selector of buttonContainerSelectors) {
    buttonContainer = document.querySelector(selector);
    if (buttonContainer) break;
  }

  if (!buttonContainer) {
    logDebug('Button container not found', { triedSelectors: buttonContainerSelectors });
    return;
  }

  // Create the button
  const copyButton = document.createElement('button');
  copyButton.className = 'asana-copy-button';
  copyButton.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2z"/>
      <path d="M2 6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1v1a3 3 0 0 1-3 3H2a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h1v1H2z"/>
    </svg>
    <span>${messages.copy}</span>
  `;
  copyButton.title = `${messages.copy} (Alt+Shift+C)`;

  copyButton.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const taskInfo = getTaskInfo();
    if (!taskInfo.title) {
      alert(messages.taskNotFound);
      return;
    }

    // Use same path as popup button: send to background → background sends copyTask back
    const currentSettings = await chrome.storage.sync.get(['settings']);
    const format = currentSettings.settings?.defaultFormat || 'markdown';
    chrome.runtime.sendMessage({ action: 'copyFromPopup', format });
  });

  // Insert the button
  buttonContainer.insertBefore(copyButton, buttonContainer.firstChild);
  logInfo('In-page button added successfully');
}

// DOM mutation observer to add button when new tasks load
const observer = new MutationObserver((mutations) => {
  // Check if the task has changed
  for (const mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      addInPageButton();
      break;
    }
  }
});

// Start the observer
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Add button on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addInPageButton, 1000);
  });
} else {
  setTimeout(addInPageButton, 1000);
}

// Translate page on load
async function translatePage() {
  const lang = await getLanguage();
  const messages = MESSAGES[lang];

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (messages[key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = messages[key];
      } else {
        element.textContent = messages[key];
      }
    }
  });

  // Update keyboard shortcut display
  const shortcutDisplay = document.getElementById('shortcut-display');
  if (shortcutDisplay) {
    shortcutDisplay.textContent = getKeyboardShortcut();
  }
}

// Load settings
async function loadSettings() {
  const result = await chrome.storage.sync.get(['settings']);
  const settings = result.settings || {
    defaultFormat: 'markdown',
    enableHotkey: true,
    enableContextMenu: true,
    enableInPageButton: true,
    showNotification: true,
    enableLogging: false,
    enableDebugConsole: false,
    language: 'en'
  };

  document.getElementById('language').value = settings.language;
  document.getElementById('defaultFormat').value = settings.defaultFormat;
  document.getElementById('enableHotkey').checked = settings.enableHotkey;
  document.getElementById('enableContextMenu').checked = settings.enableContextMenu;
  document.getElementById('enableInPageButton').checked = settings.enableInPageButton;
  document.getElementById('showNotification').checked = settings.showNotification;
  document.getElementById('enableLogging').checked = settings.enableLogging;
  document.getElementById('enableDebugConsole').checked = settings.enableDebugConsole;
  
  await translatePage();
}

// Save settings
async function saveSettings() {
  const settings = {
    language: document.getElementById('language').value,
    defaultFormat: document.getElementById('defaultFormat').value,
    enableHotkey: document.getElementById('enableHotkey').checked,
    enableContextMenu: document.getElementById('enableContextMenu').checked,
    enableInPageButton: document.getElementById('enableInPageButton').checked,
    showNotification: document.getElementById('showNotification').checked,
    enableLogging: document.getElementById('enableLogging').checked,
    enableDebugConsole: document.getElementById('enableDebugConsole').checked
  };

  await chrome.storage.sync.set({ settings });

  // Reload translations if language changed
  await translatePage();
}

// View logs
async function viewLogs() {
  const result = await chrome.storage.local.get(['logs']);
  const logs = result.logs || [];
  const logsContent = document.getElementById('logsContent');
  const lang = await getLanguage();
  const messages = MESSAGES[lang];
  
  if (logs.length === 0) {
    logsContent.innerHTML = `<div class="empty-logs">${messages.logsEmpty || 'No logs yet'}</div>`;
  } else {
    logsContent.innerHTML = logs.reverse().map(log => `
      <div class="log-entry ${log.level}">
        <div class="log-timestamp">${new Date(log.timestamp).toLocaleString()}</div>
        <div>
          <span class="log-level ${log.level}">${log.level}</span>
          <span class="log-message">${log.message}</span>
        </div>
        ${log.data ? `<div class="log-data">${log.data}</div>` : ''}
      </div>
    `).join('');
  }
  
  document.getElementById('logsModal').classList.add('show');
}

// Download logs
async function downloadLogs() {
  const result = await chrome.storage.local.get(['logs']);
  const logs = result.logs || [];
  
  const logsText = JSON.stringify(logs, null, 2);
  const blob = new Blob([logsText], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `asana-copy-logs-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Clear logs
async function clearLogs() {
  const lang = await getLanguage();
  const messages = MESSAGES[lang];
  
  if (confirm(messages.clearLogs + '?')) {
    await chrome.storage.local.set({ logs: [] });
    viewLogs(); // Refresh the view
  }
}

// Close modal
function closeModal() {
  document.getElementById('logsModal').classList.remove('show');
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  await loadSettings();

  // Event listeners
  document.getElementById('viewLogsButton').addEventListener('click', viewLogs);
  document.getElementById('downloadLogsButton').addEventListener('click', downloadLogs);
  document.getElementById('clearLogsButton').addEventListener('click', clearLogs);
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('closeLogsButton').addEventListener('click', closeModal);

  // Auto-save on change
  document.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('change', saveSettings);
  });
  
  // Language change triggers translation
  document.getElementById('language').addEventListener('change', async () => {
    await saveSettings();
    await translatePage();
  });
});

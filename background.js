// Load settings on extension install
chrome.runtime.onInstalled.addListener(() => {
  // Set default settings
  chrome.storage.sync.get(['settings'], (result) => {
    if (!result.settings) {
      const defaultSettings = {
        defaultFormat: 'markdown',
        enableHotkey: true,
        enableContextMenu: true,
        enableInPageButton: true,
        showNotification: true,
        enableLogging: false,
        enableDebugConsole: false,
        language: 'en'
      };
      chrome.storage.sync.set({ settings: defaultSettings });
    }
  });

  updateContextMenu();
});

// Update context menu when settings change
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.settings) {
    updateContextMenu();
  }
});

// Create context menu
function updateContextMenu() {
  chrome.storage.sync.get(['settings'], (result) => {
    const settings = result.settings || {};
    
    chrome.contextMenus.removeAll(() => {
      if (settings.enableContextMenu !== false) {
        chrome.contextMenus.create({
          id: 'asana-copy-parent',
          title: '📋 Copy Asana task',
          contexts: ['page'],
          documentUrlPatterns: ['https://app.asana.com/*']
        });

        chrome.contextMenus.create({
          id: 'copy-markdown',
          parentId: 'asana-copy-parent',
          title: 'Markdown',
          contexts: ['page'],
          documentUrlPatterns: ['https://app.asana.com/*']
        });

        chrome.contextMenus.create({
          id: 'copy-html',
          parentId: 'asana-copy-parent',
          title: 'HTML',
          contexts: ['page'],
          documentUrlPatterns: ['https://app.asana.com/*']
        });

        chrome.contextMenus.create({
          id: 'copy-plain',
          parentId: 'asana-copy-parent',
          title: 'Plain text',
          contexts: ['page'],
          documentUrlPatterns: ['https://app.asana.com/*']
        });
      }
    });
  });
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  let format = 'markdown';
  
  switch(info.menuItemId) {
    case 'copy-markdown':
      format = 'markdown';
      break;
    case 'copy-html':
      format = 'html';
      break;
    case 'copy-plain':
      format = 'plain';
      break;
  }

  chrome.tabs.sendMessage(tab.id, {
    action: 'copyTask',
    format: format
  });
});

// Handle keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === 'copy-task') {
    chrome.storage.sync.get(['settings'], (result) => {
      const settings = result.settings || {};
      
      if (settings.enableHotkey !== false) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0] && tabs[0].url.includes('app.asana.com')) {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: 'copyTask',
              format: settings.defaultFormat || 'markdown'
            });
          }
        });
      }
    });
  }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'copyFromPopup') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        // Small delay so the popup fully closes and the page regains focus
        // before writeText is called (avoids "Document is not focused" error)
        setTimeout(() => {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'copyTask',
            format: request.format
          });
        }, 150);
      }
    });
  }
});

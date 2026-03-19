// Check if we are on an Asana page
chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  const currentTab = tabs[0];
  const content = document.getElementById('content');

  if (!currentTab.url || !currentTab.url.includes('app.asana')) {
    content.innerHTML = `
      <div class="not-asana">
        <div class="not-asana-icon">🔍</div>
        <p>Open a task in Asana<br>to use this extension</p>
      </div>
    `;
    return;
  }

  // Get default format, language, and show format buttons
  const settingsResult = await chrome.storage.sync.get(['settings']);
  const defaultFormat = settingsResult.settings?.defaultFormat || 'markdown';
  const shortcut = getKeyboardShortcut();
  const lang = await getLanguage();
  const messages = MESSAGES[lang];
  const defaultLabel = messages.defaultLabel || 'Default';

  const badge = `<span class="default-badge">${defaultLabel}</span>`;

  content.innerHTML = `
    <div id="success-container"></div>

    <button class="format-button${defaultFormat === 'markdown' ? ' is-default' : ''}" data-format="markdown">
      <span class="format-icon">📝</span>
      <div class="format-details">
        <div class="format-name">Markdown</div>
        <div class="format-example">[title](link)</div>
      </div>
      ${defaultFormat === 'markdown' ? badge : ''}
    </button>

    <button class="format-button${defaultFormat === 'html' ? ' is-default' : ''}" data-format="html">
      <span class="format-icon">🌐</span>
      <div class="format-details">
        <div class="format-name">HTML</div>
        <div class="format-example">&lt;a href="..."&gt;title&lt;/a&gt;</div>
      </div>
      ${defaultFormat === 'html' ? badge : ''}
    </button>

    <button class="format-button${defaultFormat === 'plain' ? ' is-default' : ''}" data-format="plain">
      <span class="format-icon">📄</span>
      <div class="format-details">
        <div class="format-name">Plain text</div>
        <div class="format-example">title - link</div>
      </div>
      ${defaultFormat === 'plain' ? badge : ''}
    </button>

    <div class="divider"></div>

    <div class="shortcut-hint">
      Shortcut: ${shortcut}
    </div>

    <div class="divider"></div>

    <a href="#" class="settings-link" id="settings-link">
      ⚙️ Settings
    </a>
  `;

  // Handle format button clicks
  document.querySelectorAll('.format-button').forEach(button => {
    button.addEventListener('click', () => {
      const format = button.dataset.format;
      // Close popup first so the Asana page regains focus before copying
      window.close();
      chrome.runtime.sendMessage({ action: 'copyFromPopup', format });
    });
  });

  // Handle settings link click
  document.getElementById('settings-link').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
});

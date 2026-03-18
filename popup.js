// Check if we are on an Asana page
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTab = tabs[0];
  const content = document.getElementById('content');

  if (!currentTab.url || !currentTab.url.includes('app.asana.com')) {
    content.innerHTML = `
      <div class="not-asana">
        <div class="not-asana-icon">🔍</div>
        <p>Open a task in Asana<br>to use this extension</p>
      </div>
    `;
    return;
  }

  // Show format buttons
  content.innerHTML = `
    <div id="success-container"></div>
    
    <button class="format-button" data-format="markdown">
      <span class="format-icon">📝</span>
      <div class="format-details">
        <div class="format-name">Markdown</div>
        <div class="format-example">[title](link)</div>
      </div>
    </button>

    <button class="format-button" data-format="html">
      <span class="format-icon">🌐</span>
      <div class="format-details">
        <div class="format-name">HTML</div>
        <div class="format-example">&lt;a href="..."&gt;title&lt;/a&gt;</div>
      </div>
    </button>

    <button class="format-button" data-format="plain">
      <span class="format-icon">📄</span>
      <div class="format-details">
        <div class="format-name">Plain text</div>
        <div class="format-example">title - link</div>
      </div>
    </button>

    <div class="divider"></div>
    
    <div class="shortcut-hint">
      Shortcut: Alt+Shift+C
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
      
      chrome.runtime.sendMessage({
        action: 'copyFromPopup',
        format: format
      });

      // Показываем сообщение об успехе
      const successContainer = document.getElementById('success-container');
      successContainer.innerHTML = '<div class="success-message">✓ Copied!</div>';
      
      // Close popup after 1 second
      setTimeout(() => {
        window.close();
      }, 1000);
    });
  });

  // Handle settings link click
  document.getElementById('settings-link').addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
});

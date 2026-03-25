// Donate section state
let openQrIndex = null;
const copyTimers = new Map();

const COPY_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
const CHECK_SVG = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4caf50" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

function qrSvg(color) {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="5" y="5" width="3" height="3" fill="${color}" stroke="none"/>
    <rect x="16" y="5" width="3" height="3" fill="${color}" stroke="none"/>
    <rect x="5" y="16" width="3" height="3" fill="${color}" stroke="none"/>
    <line x1="14" y1="14" x2="14" y2="14" stroke-width="3"/>
    <line x1="18" y1="14" x2="18" y2="14" stroke-width="3"/>
    <line x1="22" y1="14" x2="22" y2="14" stroke-width="3"/>
    <line x1="14" y1="18" x2="14" y2="18" stroke-width="3"/>
    <line x1="18" y1="18" x2="18" y2="18" stroke-width="3"/>
    <line x1="22" y1="18" x2="22" y2="18" stroke-width="3"/>
    <line x1="14" y1="22" x2="14" y2="22" stroke-width="3"/>
    <line x1="18" y1="22" x2="18" y2="22" stroke-width="3"/>
  </svg>`;
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(() => {
      _execCommandCopy(text);
    });
  }
  _execCommandCopy(text);
  return Promise.resolve();
}

function _execCommandCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); } catch (_) {}
  document.body.removeChild(ta);
}

const WALLETS = [
  { name: 'USDT', tag: 'TRC-20', address: 'TAYCB7kNRL6tfyQGJXDsccsvR6rBWt6VYC' },
  { name: 'USDT', tag: 'BEP-20', address: '0x1746177b657F0685dBb8cf10467aEfE77128e2fE' },
  { name: 'ETH',  tag: null,     address: '0x1746177b657F0685dBb8cf10467aEfE77128e2fE' },
  { name: 'BTC',  tag: null,     address: 'bc1qyj64cfhpuna7gsjk8ukp247k3xd4udac3h2mc8' },
  { name: 'SOL',  tag: null,     address: '6PUdptc2JNAMhob35fNuECnSZ78LfU4fjvbDVxrQHVzC' },
];

function initDonateSection() {
  openQrIndex = null;
  copyTimers.forEach(id => clearTimeout(id));
  copyTimers.clear();

  const section = document.getElementById('donate-section');
  section.innerHTML = '';

  const lang = document.getElementById('language').value || 'en';
  const m = MESSAGES[lang] || MESSAGES['en'];

  // Section note
  const note = document.createElement('p');
  note.className = 'section-note';
  note.style.cssText = 'font-size:13px;color:#888;margin-bottom:16px;line-height:1.5';
  note.textContent = m.supportNote;
  section.appendChild(note);

  // Button row
  const btnRow = document.createElement('div');
  btnRow.className = 'donate-buttons';

  const daBtn = document.createElement('a');
  daBtn.className = 'da-button';
  daBtn.href = 'https://dalink.to/vlad_tlmnnk';
  daBtn.target = '_blank';
  daBtn.rel = 'noopener';
  daBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>${m.donateViaDonationAlerts}`;
  btnRow.appendChild(daBtn);

  const cryptoBtn = document.createElement('button');
  cryptoBtn.id = 'crypto-toggle-btn';
  cryptoBtn.className = 'crypto-toggle-btn';
  cryptoBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>${m.donateCrypto}<span class="chevron">▾</span>`;
  btnRow.appendChild(cryptoBtn);
  section.appendChild(btnRow);

  // Crypto block
  const cryptoBlock = document.createElement('div');
  cryptoBlock.id = 'crypto-block';
  cryptoBlock.className = 'crypto-block';
  cryptoBlock.style.display = 'none';

  const blockHeader = document.createElement('div');
  blockHeader.className = 'crypto-block-header';
  blockHeader.textContent = m.cryptoWallets;
  cryptoBlock.appendChild(blockHeader);

  WALLETS.forEach((wallet, i) => {
    const item = document.createElement('div');
    item.className = 'crypto-item';
    item.dataset.index = i;

    const header = document.createElement('div');
    header.className = 'crypto-header';
    const nameEl = document.createElement('span');
    nameEl.className = 'crypto-name';
    nameEl.textContent = wallet.name;
    header.appendChild(nameEl);
    if (wallet.tag) {
      const tagEl = document.createElement('span');
      tagEl.className = 'crypto-tag';
      tagEl.textContent = wallet.tag;
      header.appendChild(tagEl);
    }
    item.appendChild(header);

    const row = document.createElement('div');
    row.className = 'crypto-row';

    const addrEl = document.createElement('div');
    addrEl.className = 'crypto-address';
    addrEl.textContent = wallet.address;
    addrEl.title = wallet.address;
    row.appendChild(addrEl);

    const btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'icon-btn';
    copyBtn.title = m.copyAddress;
    copyBtn.innerHTML = COPY_SVG;
    copyBtn.addEventListener('click', () => {
      copyToClipboard(wallet.address);
      clearTimeout(copyTimers.get(i));
      copyBtn.innerHTML = CHECK_SVG;
      copyBtn.classList.add('copy-success');
      addrEl.classList.add('copied-flash');
      copyTimers.set(i, setTimeout(() => {
        copyBtn.innerHTML = COPY_SVG;
        copyBtn.classList.remove('copy-success');
        addrEl.classList.remove('copied-flash');
      }, 2000));
    });
    btnGroup.appendChild(copyBtn);

    const qrBtn = document.createElement('button');
    qrBtn.className = 'icon-btn';
    qrBtn.title = m.qrCodeLabel;
    qrBtn.innerHTML = qrSvg('#777');

    const qrPanel = document.createElement('div');
    qrPanel.className = 'qr-panel';
    qrPanel.style.display = 'none';

    const qrSvgContainer = document.createElement('div');
    qrSvgContainer.className = 'qr-svg-container';

    const qrInfo = document.createElement('div');
    qrInfo.className = 'qr-info';

    const qrCurrency = document.createElement('div');
    qrCurrency.className = 'qr-currency';
    qrCurrency.textContent = wallet.name + (wallet.tag ? ' ' + wallet.tag : '');

    const qrAddress = document.createElement('div');
    qrAddress.className = 'qr-address';
    qrAddress.textContent = wallet.address;

    const qrNote = document.createElement('div');
    qrNote.className = 'qr-note';
    qrNote.textContent = m.generatedLocally;

    qrInfo.appendChild(qrCurrency);
    qrInfo.appendChild(qrAddress);
    qrInfo.appendChild(qrNote);
    qrPanel.appendChild(qrSvgContainer);
    qrPanel.appendChild(qrInfo);

    qrBtn.addEventListener('click', () => {
      if (openQrIndex === i) {
        qrPanel.style.display = 'none';
        qrBtn.classList.remove('qr-active');
        qrBtn.innerHTML = qrSvg('#777');
        openQrIndex = null;
      } else {
        if (openQrIndex !== null) {
          const prev = cryptoBlock.querySelector(`.crypto-item[data-index="${openQrIndex}"]`);
          if (prev) {
            prev.querySelector('.qr-panel').style.display = 'none';
            const prevQrBtn = prev.querySelector('.icon-btn.qr-active');
            if (prevQrBtn) {
              prevQrBtn.classList.remove('qr-active');
              prevQrBtn.innerHTML = qrSvg('#777');
            }
          }
        }
        if (!qrPanel.dataset.generated) {
          try {
            const qr = qrcode(0, 'Q');
            qr.addData(wallet.address);
            qr.make();
            qrSvgContainer.innerHTML = qr.createSvgTag(4, 4);
            qrPanel.dataset.generated = '1';
          } catch (e) {
            qrSvgContainer.textContent = wallet.address;
          }
        }
        qrPanel.style.display = 'flex';
        qrBtn.classList.add('qr-active');
        qrBtn.innerHTML = qrSvg('#f06a6a');
        openQrIndex = i;
      }
    });

    btnGroup.appendChild(qrBtn);
    row.appendChild(btnGroup);
    item.appendChild(row);
    item.appendChild(qrPanel);
    cryptoBlock.appendChild(item);
  });

  section.appendChild(cryptoBlock);

  // Section title (prepended)
  const titleEl = document.createElement('div');
  titleEl.className = 'section-title';
  titleEl.textContent = m.supportDevelopment;
  section.insertBefore(titleEl, section.firstChild);

  // Toggle listener
  cryptoBtn.addEventListener('click', () => {
    const isOpen = cryptoBtn.classList.contains('open');
    cryptoBtn.classList.toggle('open', !isOpen);
    cryptoBlock.style.display = isOpen ? 'none' : 'block';
  });
}

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
  initDonateSection();

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
    initDonateSection();
  });
});

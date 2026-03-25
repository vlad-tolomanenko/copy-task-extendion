# 📋 Task Link Copier - Chrome Extension

Copy task titles and links in Markdown, HTML, or plain text — with multilingual support and advanced logging!

## ✨ Features

### 4 Copy Methods (All Configurable):
1. **⌨️ Keyboard Shortcut** - `Alt+Shift+C`
2. **🔘 Toolbar Button** - Click the extension icon
3. **🖱️ Context Menu** - Right-click → "Copy Asana task"
4. **📌 In-Page Button** - Button appears directly in the Asana task interface

### 3 Copy Formats:
- **Markdown** (default) - `[Task Name](https://app.asana.com/...)`
- **HTML** - `<a href="https://app.asana.com/...">Task Name</a>`
- **Plain Text** - `Task Name - https://app.asana.com/...`

### 🌐 Multilingual Support:
- **English** (default)
- **Русский** (Russian)
- **Français** (French)
- **Deutsch** (German)
- **Español** (Spanish)
- **हिन्दी** (Hindi)

### 📊 Advanced Logging & Debugging:
- **Error Logging** - Automatically logs errors for troubleshooting
- **Size-Limited** - Max 100 entries or ~50KB (auto-cleanup of old entries)
- **Log Viewer** - Built-in UI to view, download, and clear logs
- **Debug Console** - Optional console output for developers
- **Export Logs** - Download logs as JSON for sharing with support

### Additional Features:
- ✅ Flexible settings - enable/disable any copy method
- 🔔 Beautiful notifications when copying
- ⚙️ Convenient settings page
- 🎨 Minimalist design matching Asana's interface
- 💾 All settings auto-save

## 📦 Installation

### Method 1: Install from Folder (Development Mode)

1. **Download the extension**
   - The `asana-copy-extension` folder contains all necessary files

2. **Open Chrome and go to extensions page**
   - Type in address bar: `chrome://extensions/`
   - Or: Menu (three dots) → Extensions → Manage Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" in the top right corner

4. **Load the unpacked extension**
   - Click "Load unpacked"
   - Select the `asana-copy-extension` folder

5. **Done!** 🎉
   - The extension will appear in the list
   - Icon will be available in the extensions toolbar

### Method 2: Package as .zip and Install

To share the extension with colleagues:

1. ZIP the `asana-copy-extension` folder
2. Send the ZIP file to colleagues
3. They should extract and install via "Load unpacked"

## 🚀 Usage

### First Launch:

1. Open any task in Asana
2. Try any copy method:
   - Press `Alt+Shift+C`
   - Or click the extension icon
   - Or right-click anywhere on the page
   - Or click the "Copy" button in the task

3. Paste the copied text anywhere!

### Settings:

1. Right-click on the extension icon
2. Select "Options"
3. Configure:
   - Language preference
   - Default copy format
   - Which copy methods to use
   - Enable/disable notifications
   - Enable logging and debugging

### Troubleshooting with Logs:

If something isn't working:

1. Go to Settings → Logging & Debugging
2. Enable "Enable logging"
3. Try the action that's failing
4. Click "View Logs" to see what went wrong
5. Download logs to share with support if needed

## 📁 Project Structure

```
asana-copy-extension/
├── manifest.json          # Extension manifest
├── background.js          # Background script (context menu, shortcuts)
├── content.js            # Content script (interacts with Asana)
├── content.css           # Styles for button and notifications
├── i18n.js               # Internationalization messages
├── popup.html            # Popup window HTML
├── popup.js              # Popup logic
├── options.html          # Settings page HTML
├── options.js            # Settings page logic
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md             # This file
```

## ⚙️ Technical Details

- **Manifest Version**: 3 (latest version)
- **Permissions**: 
  - `activeTab` - access to current tab
  - `contextMenus` - for context menu
  - `storage` - for settings and logs
- **Works on**: `https://app.asana.com/*`
- **Compatible with**: Windows, macOS, Linux (Chrome, Edge, Brave)

## 🐛 Troubleshooting

### Extension doesn't work
- Make sure you're on `app.asana.com`
- Make sure you have a specific task open (not just the task list)
- Reload the page
- Check logs in Settings → Logging & Debugging → View Logs

### Can't copy text
- Check browser clipboard permissions
- Try the fallback copy method (happens automatically)
- Check logs for specific errors

### Button doesn't appear in Asana interface
- Asana may have changed their page structure
- Try disabling and re-enabling the extension
- Reload the page
- Check logs - the extension will log what selectors it tried

### Keyboard shortcut doesn't work
- Check if it conflicts with other extensions at `chrome://extensions/shortcuts`
- You can customize the shortcut there
- Make sure the page has focus (click somewhere on Asana first)

### How to read logs
1. Go to Settings (click extension icon → gear icon)
2. Scroll to "Logging & Debugging"
3. Enable both "Enable logging" and "Debug console output"
4. Try the failing action
5. Click "View Logs"
6. Look for ERROR or WARN entries
7. The log will show:
   - What selector was tried to find the task name
   - What went wrong during copy
   - Browser/system information

## 📝 Usage Examples

### For team in Slack:
Copy in Markdown format, paste in Slack - link automatically becomes clickable!

### For documents in Notion:
Markdown format is perfect for Notion

### For emails:
Use HTML format for beautiful links in emails

### For quick notes:
Plain text format - for quick notes with full information

## 🌍 Adding New Languages

Want to add your language? It's easy!

1. Open `i18n.js`
2. Copy the `en` block
3. Translate all messages to your language
4. Add your language code (e.g., `ja` for Japanese)
5. Update the language selector in `options.html`

## 🔒 Security

- Extension works only locally in your browser
- Does not send any data to external servers
- All settings stored in Chrome Sync Storage
- Logs stored in Chrome Local Storage
- Source code is open and available for review

## 📄 License

Free to use for personal and commercial purposes.

## 🤝 Support

If you encounter issues or have suggestions:
1. Enable logging in settings
2. Reproduce the issue
3. Export logs (Download Logs button)
4. Share the logs with your issue description

---

Made with ❤️ for productive work with Asana

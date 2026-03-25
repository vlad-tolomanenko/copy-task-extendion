// Internationalization messages
const MESSAGES = {
  en: {
    // General
    extensionName: 'Task Link Copier',
    extensionDescription: 'Copy task titles and links in Markdown, HTML, or plain text',
    
    // Popup
    copyTask: 'Copy task',
    notAsanaPage: 'Open an Asana task to use this extension',
    copiedSuccess: 'Copied!',
    
    // Formats
    formatMarkdown: 'Markdown',
    formatHTML: 'HTML',
    formatPlain: 'Plain text',
    formatMarkdownExample: '[title](link)',
    formatHTMLExample: '<a href="...">title</a>',
    formatPlainExample: 'title - link',
    
    // Settings
    settings: 'Settings',
    settingsTitle: 'Settings',
    defaultFormat: 'Default format',
    copyMethods: 'Copy methods',
    notifications: 'Notifications',
    logging: 'Logging',
    language: 'Language',
    
    // Copy methods
    enableHotkey: 'Keyboard shortcut',
    enableHotkeyDesc: 'Alt+Shift+C',
    enableContextMenu: 'Context menu',
    enableContextMenuDesc: 'Right-click → Copy Asana task',
    enableInPageButton: 'In-page button',
    enableInPageButtonDesc: 'Adds a "Copy" button next to the task',
    
    // Notifications & Logging
    showNotification: 'Show notifications',
    showNotificationDesc: 'Pop-up notification when copying',
    enableLogging: 'Enable logging',
    enableLoggingDesc: 'Save error logs for troubleshooting',
    enableDebugConsole: 'Debug console output',
    enableDebugConsoleDesc: 'Show logs in browser console',
    viewLogs: 'View logs',
    clearLogs: 'Clear logs',
    downloadLogs: 'Download logs',
    
    // Buttons
    save: 'Save settings',
    saved: 'Saved!',
    copy: 'Copy',
    close: 'Close',
    defaultLabel: 'Default',
    shortcutLabel: 'Shortcut',

    // Notifications
    copiedMarkdown: 'Copied as Markdown!',
    copiedHTML: 'Copied as HTML!',
    copiedPlain: 'Copied as Plain text!',
    
    // Errors
    taskNotFound: 'Task title not found. Make sure you opened a task in Asana.',
    copyError: 'Failed to copy. Please check browser permissions.',
    
    // Info
    howToUse: 'How to use:',
    howToUseText: '1. Open any task in Asana\n2. Use any enabled copy method\n3. Paste the copied text anywhere (Slack, Notion, email, etc.)\n\nThe link will be automatically embedded in the task title!',
    shortcutHint: 'Keyboard shortcut: Alt+Shift+C',
    
    // Context menu
    contextMenuParent: 'Copy Asana task',
    
    // Logs viewer
    logsTitle: 'Extension Logs',
    logsEmpty: 'No logs yet',
    logTimestamp: 'Time',
    logLevel: 'Level',
    logMessage: 'Message',
    logData: 'Data',
    // Donate section
    supportDevelopment: '❤️ Support development',
    supportNote: 'Task Link Copier is free and always will be. If it saves you time — a coffee is very welcome 🙂',
    donateViaDonationAlerts: 'Donate via DonationAlerts',
    donateCrypto: 'Donate via crypto',
    cryptoWallets: '₿ Crypto wallets',
    copyAddress: 'Copy address',
    qrCodeLabel: 'QR code',
    generatedLocally: 'QR generated locally · no data sent'
  },

  ru: {
    extensionName: 'Task Link Copier',
    extensionDescription: 'Копирование ссылок на задачи в форматах Markdown, HTML и обычный текст',
    
    copyTask: 'Копировать задачу',
    notAsanaPage: 'Откройте задачу в Asana, чтобы использовать расширение',
    copiedSuccess: 'Скопировано!',
    
    formatMarkdown: 'Markdown',
    formatHTML: 'HTML',
    formatPlain: 'Простой текст',
    formatMarkdownExample: '[название](ссылка)',
    formatHTMLExample: '<a href="...">название</a>',
    formatPlainExample: 'название - ссылка',
    
    settings: 'Настройки',
    settingsTitle: 'Настройки',
    defaultFormat: 'Формат по умолчанию',
    copyMethods: 'Способы копирования',
    notifications: 'Уведомления',
    logging: 'Логирование',
    language: 'Язык',
    
    enableHotkey: 'Горячая клавиша',
    enableHotkeyDesc: 'Alt+Shift+C',
    enableContextMenu: 'Контекстное меню',
    enableContextMenuDesc: 'Правая кнопка мыши → Копировать задачу Asana',
    enableInPageButton: 'Кнопка в интерфейсе Asana',
    enableInPageButtonDesc: 'Добавляет кнопку "Копировать" рядом с задачей',
    
    showNotification: 'Показывать уведомления',
    showNotificationDesc: 'Всплывающее уведомление при копировании',
    enableLogging: 'Включить логирование',
    enableLoggingDesc: 'Сохранять логи ошибок для диагностики',
    enableDebugConsole: 'Вывод в консоль',
    enableDebugConsoleDesc: 'Показывать логи в консоли браузера',
    viewLogs: 'Просмотр логов',
    clearLogs: 'Очистить логи',
    downloadLogs: 'Скачать логи',
    
    save: 'Сохранить настройки',
    saved: 'Сохранено!',
    copy: 'Копировать',
    close: 'Закрыть',
    defaultLabel: 'По умолчанию',
    shortcutLabel: 'Горячая клавиша',

    copiedMarkdown: 'Скопировано в Markdown!',
    copiedHTML: 'Скопировано в HTML!',
    copiedPlain: 'Скопировано как простой текст!',
    
    taskNotFound: 'Не удалось найти название задачи. Убедитесь, что вы открыли задачу в Asana.',
    copyError: 'Не удалось скопировать. Проверьте разрешения браузера.',
    
    howToUse: 'Как использовать:',
    howToUseText: '1. Откройте любую задачу в Asana\n2. Используйте любой из включенных способов копирования\n3. Вставьте скопированный текст в нужное место (Slack, Notion, email и т.д.)\n\nСсылка будет автоматически встроена в название задачи!',
    shortcutHint: 'Горячая клавиша: Alt+Shift+C',
    
    contextMenuParent: 'Копировать задачу Asana',
    
    logsTitle: 'Логи расширения',
    logsEmpty: 'Логов пока нет',
    logTimestamp: 'Время',
    logLevel: 'Уровень',
    logMessage: 'Сообщение',
    logData: 'Данные',
    // Donate section
    supportDevelopment: '❤️ Поддержать разработку',
    supportNote: 'Task Link Copier бесплатен и всегда будет таким. Если расширение экономит ваше время — буду рад чашке кофе 🙂',
    donateViaDonationAlerts: 'Донат через DonationAlerts',
    donateCrypto: 'Донат криптой',
    cryptoWallets: '₿ Крипто-кошельки',
    copyAddress: 'Скопировать адрес',
    qrCodeLabel: 'QR-код',
    generatedLocally: 'QR создан локально · данные не отправляются'
  },

  fr: {
    extensionName: 'Task Link Copier',
    extensionDescription: 'Copier les titres et liens de tâches en Markdown, HTML ou texte simple',
    
    copyTask: 'Copier la tâche',
    notAsanaPage: 'Ouvrez une tâche Asana pour utiliser cette extension',
    copiedSuccess: 'Copié!',
    
    formatMarkdown: 'Markdown',
    formatHTML: 'HTML',
    formatPlain: 'Texte simple',
    formatMarkdownExample: '[titre](lien)',
    formatHTMLExample: '<a href="...">titre</a>',
    formatPlainExample: 'titre - lien',
    
    settings: 'Paramètres',
    settingsTitle: 'Paramètres',
    defaultFormat: 'Format par défaut',
    copyMethods: 'Méthodes de copie',
    notifications: 'Notifications',
    logging: 'Journalisation',
    language: 'Langue',
    
    enableHotkey: 'Raccourci clavier',
    enableHotkeyDesc: 'Alt+Shift+C',
    enableContextMenu: 'Menu contextuel',
    enableContextMenuDesc: 'Clic droit → Copier la tâche Asana',
    enableInPageButton: 'Bouton dans la page',
    enableInPageButtonDesc: 'Ajoute un bouton "Copier" à côté de la tâche',
    
    showNotification: 'Afficher les notifications',
    showNotificationDesc: 'Notification contextuelle lors de la copie',
    enableLogging: 'Activer la journalisation',
    enableLoggingDesc: 'Enregistrer les journaux d\'erreurs',
    enableDebugConsole: 'Sortie console de débogage',
    enableDebugConsoleDesc: 'Afficher les journaux dans la console',
    viewLogs: 'Voir les journaux',
    clearLogs: 'Effacer les journaux',
    downloadLogs: 'Télécharger les journaux',
    
    save: 'Enregistrer',
    saved: 'Enregistré!',
    copy: 'Copier',
    close: 'Fermer',
    defaultLabel: 'Par défaut',
    shortcutLabel: 'Raccourci',

    copiedMarkdown: 'Copié en Markdown!',
    copiedHTML: 'Copié en HTML!',
    copiedPlain: 'Copié en texte simple!',
    
    taskNotFound: 'Titre de tâche non trouvé. Assurez-vous d\'avoir ouvert une tâche dans Asana.',
    copyError: 'Échec de la copie. Vérifiez les autorisations du navigateur.',
    
    howToUse: 'Comment utiliser:',
    howToUseText: '1. Ouvrez une tâche dans Asana\n2. Utilisez l\'une des méthodes de copie activées\n3. Collez le texte copié n\'importe où (Slack, Notion, email, etc.)\n\nLe lien sera automatiquement intégré dans le titre!',
    shortcutHint: 'Raccourci clavier: Alt+Shift+C',
    
    contextMenuParent: 'Copier la tâche Asana',
    
    logsTitle: 'Journaux de l\'extension',
    logsEmpty: 'Pas encore de journaux',
    logTimestamp: 'Heure',
    logLevel: 'Niveau',
    logMessage: 'Message',
    logData: 'Données',
    // Donate section
    supportDevelopment: '❤️ Soutenir le développement',
    supportNote: 'Task Link Copier est gratuit et le restera toujours. Si ça vous fait gagner du temps — un café serait le bienvenu 🙂',
    donateViaDonationAlerts: 'Don via DonationAlerts',
    donateCrypto: 'Don en crypto',
    cryptoWallets: '₿ Portefeuilles crypto',
    copyAddress: "Copier l'adresse",
    qrCodeLabel: 'Code QR',
    generatedLocally: 'QR généré localement · aucune donnée envoyée'
  },

  de: {
    extensionName: 'Task Link Copier',
    extensionDescription: 'Aufgabentitel und Links in Markdown, HTML oder Klartext kopieren',
    
    copyTask: 'Aufgabe kopieren',
    notAsanaPage: 'Öffnen Sie eine Asana-Aufgabe, um diese Erweiterung zu verwenden',
    copiedSuccess: 'Kopiert!',
    
    formatMarkdown: 'Markdown',
    formatHTML: 'HTML',
    formatPlain: 'Einfacher Text',
    formatMarkdownExample: '[Titel](Link)',
    formatHTMLExample: '<a href="...">Titel</a>',
    formatPlainExample: 'Titel - Link',
    
    settings: 'Einstellungen',
    settingsTitle: 'Einstellungen',
    defaultFormat: 'Standardformat',
    copyMethods: 'Kopiermethoden',
    notifications: 'Benachrichtigungen',
    logging: 'Protokollierung',
    language: 'Sprache',
    
    enableHotkey: 'Tastenkombination',
    enableHotkeyDesc: 'Alt+Shift+C',
    enableContextMenu: 'Kontextmenü',
    enableContextMenuDesc: 'Rechtsklick → Asana-Aufgabe kopieren',
    enableInPageButton: 'Schaltfläche auf der Seite',
    enableInPageButtonDesc: 'Fügt eine "Kopieren"-Schaltfläche neben der Aufgabe hinzu',
    
    showNotification: 'Benachrichtigungen anzeigen',
    showNotificationDesc: 'Pop-up-Benachrichtigung beim Kopieren',
    enableLogging: 'Protokollierung aktivieren',
    enableLoggingDesc: 'Fehlerprotokolle zur Fehlerbehebung speichern',
    enableDebugConsole: 'Debug-Konsolenausgabe',
    enableDebugConsoleDesc: 'Protokolle in der Browser-Konsole anzeigen',
    viewLogs: 'Protokolle anzeigen',
    clearLogs: 'Protokolle löschen',
    downloadLogs: 'Protokolle herunterladen',
    
    save: 'Einstellungen speichern',
    saved: 'Gespeichert!',
    copy: 'Kopieren',
    close: 'Schließen',
    defaultLabel: 'Standard',
    shortcutLabel: 'Tastenkombination',

    copiedMarkdown: 'Als Markdown kopiert!',
    copiedHTML: 'Als HTML kopiert!',
    copiedPlain: 'Als einfacher Text kopiert!',
    
    taskNotFound: 'Aufgabentitel nicht gefunden. Stellen Sie sicher, dass Sie eine Aufgabe in Asana geöffnet haben.',
    copyError: 'Kopieren fehlgeschlagen. Bitte überprüfen Sie die Browser-Berechtigungen.',
    
    howToUse: 'So verwenden Sie:',
    howToUseText: '1. Öffnen Sie eine Aufgabe in Asana\n2. Verwenden Sie eine der aktivierten Kopiermethoden\n3. Fügen Sie den kopierten Text überall ein (Slack, Notion, E-Mail usw.)\n\nDer Link wird automatisch in den Titel eingebettet!',
    shortcutHint: 'Tastenkombination: Alt+Shift+C',
    
    contextMenuParent: 'Asana-Aufgabe kopieren',
    
    logsTitle: 'Erweiterungsprotokolle',
    logsEmpty: 'Noch keine Protokolle',
    logTimestamp: 'Zeit',
    logLevel: 'Ebene',
    logMessage: 'Nachricht',
    logData: 'Daten',
    // Donate section
    supportDevelopment: '❤️ Entwicklung unterstützen',
    supportNote: 'Task Link Copier ist kostenlos und wird es immer bleiben. Wenn es Ihnen Zeit spart — ein Kaffee ist herzlich willkommen 🙂',
    donateViaDonationAlerts: 'Spende via DonationAlerts',
    donateCrypto: 'Spende in Krypto',
    cryptoWallets: '₿ Krypto-Wallets',
    copyAddress: 'Adresse kopieren',
    qrCodeLabel: 'QR-Code',
    generatedLocally: 'QR lokal generiert · keine Daten gesendet'
  },

  es: {
    extensionName: 'Task Link Copier',
    extensionDescription: 'Copiar títulos y enlaces de tareas en Markdown, HTML o texto simple',
    
    copyTask: 'Copiar tarea',
    notAsanaPage: 'Abre una tarea de Asana para usar esta extensión',
    copiedSuccess: '¡Copiado!',
    
    formatMarkdown: 'Markdown',
    formatHTML: 'HTML',
    formatPlain: 'Texto simple',
    formatMarkdownExample: '[título](enlace)',
    formatHTMLExample: '<a href="...">título</a>',
    formatPlainExample: 'título - enlace',
    
    settings: 'Configuración',
    settingsTitle: 'Configuración',
    defaultFormat: 'Formato predeterminado',
    copyMethods: 'Métodos de copia',
    notifications: 'Notificaciones',
    logging: 'Registro',
    language: 'Idioma',
    
    enableHotkey: 'Atajo de teclado',
    enableHotkeyDesc: 'Alt+Shift+C',
    enableContextMenu: 'Menú contextual',
    enableContextMenuDesc: 'Clic derecho → Copiar tarea de Asana',
    enableInPageButton: 'Botón en la página',
    enableInPageButtonDesc: 'Agrega un botón "Copiar" junto a la tarea',
    
    showNotification: 'Mostrar notificaciones',
    showNotificationDesc: 'Notificación emergente al copiar',
    enableLogging: 'Habilitar registro',
    enableLoggingDesc: 'Guardar registros de errores para solución de problemas',
    enableDebugConsole: 'Salida de consola de depuración',
    enableDebugConsoleDesc: 'Mostrar registros en la consola del navegador',
    viewLogs: 'Ver registros',
    clearLogs: 'Borrar registros',
    downloadLogs: 'Descargar registros',
    
    save: 'Guardar configuración',
    saved: '¡Guardado!',
    copy: 'Copiar',
    close: 'Cerrar',
    defaultLabel: 'Predeterminado',
    shortcutLabel: 'Atajo',

    copiedMarkdown: '¡Copiado como Markdown!',
    copiedHTML: '¡Copiado como HTML!',
    copiedPlain: '¡Copiado como texto simple!',
    
    taskNotFound: 'Título de tarea no encontrado. Asegúrate de haber abierto una tarea en Asana.',
    copyError: 'Error al copiar. Por favor, verifica los permisos del navegador.',
    
    howToUse: 'Cómo usar:',
    howToUseText: '1. Abre una tarea en Asana\n2. Usa cualquiera de los métodos de copia habilitados\n3. Pega el texto copiado en cualquier lugar (Slack, Notion, correo, etc.)\n\n¡El enlace se incrustará automáticamente en el título!',
    shortcutHint: 'Atajo de teclado: Alt+Shift+C',
    
    contextMenuParent: 'Copiar tarea de Asana',
    
    logsTitle: 'Registros de extensión',
    logsEmpty: 'Aún no hay registros',
    logTimestamp: 'Hora',
    logLevel: 'Nivel',
    logMessage: 'Mensaje',
    logData: 'Datos',
    // Donate section
    supportDevelopment: '❤️ Apoyar el desarrollo',
    supportNote: 'Task Link Copier es gratuito y siempre lo será. Si te ahorra tiempo — un café es muy bienvenido 🙂',
    donateViaDonationAlerts: 'Donar via DonationAlerts',
    donateCrypto: 'Donar en cripto',
    cryptoWallets: '₿ Carteras cripto',
    copyAddress: 'Copiar dirección',
    qrCodeLabel: 'Código QR',
    generatedLocally: 'QR generado localmente · no se envían datos'
  },

  hi: {
    extensionName: 'Task Link Copier',
    extensionDescription: 'Markdown, HTML या सादे पाठ में कार्य शीर्षक और लिंक कॉपी करें',
    
    copyTask: 'कार्य कॉपी करें',
    notAsanaPage: 'इस एक्सटेंशन का उपयोग करने के लिए Asana कार्य खोलें',
    copiedSuccess: 'कॉपी हो गया!',
    
    formatMarkdown: 'Markdown',
    formatHTML: 'HTML',
    formatPlain: 'सादा पाठ',
    formatMarkdownExample: '[शीर्षक](लिंक)',
    formatHTMLExample: '<a href="...">शीर्षक</a>',
    formatPlainExample: 'शीर्षक - लिंक',
    
    settings: 'सेटिंग्स',
    settingsTitle: 'सेटिंग्स',
    defaultFormat: 'डिफ़ॉल्ट प्रारूप',
    copyMethods: 'कॉपी विधियां',
    notifications: 'सूचनाएं',
    logging: 'लॉगिंग',
    language: 'भाषा',
    
    enableHotkey: 'कीबोर्ड शॉर्टकट',
    enableHotkeyDesc: 'Alt+Shift+C',
    enableContextMenu: 'संदर्भ मेनू',
    enableContextMenuDesc: 'राइट क्लिक → Asana कार्य कॉपी करें',
    enableInPageButton: 'पेज में बटन',
    enableInPageButtonDesc: 'कार्य के बगल में "कॉपी" बटन जोड़ता है',
    
    showNotification: 'सूचनाएं दिखाएं',
    showNotificationDesc: 'कॉपी करते समय पॉप-अप सूचना',
    enableLogging: 'लॉगिंग सक्षम करें',
    enableLoggingDesc: 'समस्या निवारण के लिए त्रुटि लॉग सहेजें',
    enableDebugConsole: 'डीबग कंसोल आउटपुट',
    enableDebugConsoleDesc: 'ब्राउज़र कंसोल में लॉग दिखाएं',
    viewLogs: 'लॉग देखें',
    clearLogs: 'लॉग साफ़ करें',
    downloadLogs: 'लॉग डाउनलोड करें',
    
    save: 'सेटिंग्स सहेजें',
    saved: 'सहेजा गया!',
    copy: 'कॉपी करें',
    close: 'बंद करें',
    defaultLabel: 'डिफ़ॉल्ट',
    shortcutLabel: 'शॉर्टकट',

    copiedMarkdown: 'Markdown के रूप में कॉपी किया गया!',
    copiedHTML: 'HTML के रूप में कॉपी किया गया!',
    copiedPlain: 'सादे पाठ के रूप में कॉपी किया गया!',
    
    taskNotFound: 'कार्य शीर्षक नहीं मिला। सुनिश्चित करें कि आपने Asana में एक कार्य खोला है।',
    copyError: 'कॉपी करने में विफल। कृपया ब्राउज़र अनुमतियाँ जांचें।',
    
    howToUse: 'उपयोग कैसे करें:',
    howToUseText: '1. Asana में कोई कार्य खोलें\n2. किसी भी सक्षम कॉपी विधि का उपयोग करें\n3. कॉपी किए गए पाठ को कहीं भी पेस्ट करें (Slack, Notion, ईमेल, आदि)\n\nलिंक स्वचालित रूप से शीर्षक में एम्बेड हो जाएगा!',
    shortcutHint: 'कीबोर्ड शॉर्टकट: Alt+Shift+C',
    
    contextMenuParent: 'Asana कार्य कॉपी करें',
    
    logsTitle: 'एक्सटेंशन लॉग',
    logsEmpty: 'अभी तक कोई लॉग नहीं',
    logTimestamp: 'समय',
    logLevel: 'स्तर',
    logMessage: 'संदेश',
    logData: 'डेटा',
    // Donate section
    supportDevelopment: '❤️ विकास का समर्थन करें',
    supportNote: 'Task Link Copier मुफ़्त है और हमेशा रहेगा। अगर यह आपका समय बचाता है — एक कॉफ़ी बहुत स्वागत योग्य होगी 🙂',
    donateViaDonationAlerts: 'DonationAlerts के ज़रिए दान करें',
    donateCrypto: 'क्रिप्टो में दान करें',
    cryptoWallets: '₿ क्रिप्टो वॉलेट',
    copyAddress: 'पता कॉपी करें',
    qrCodeLabel: 'QR कोड',
    generatedLocally: 'QR स्थानीय रूप से बनाया गया · कोई डेटा नहीं भेजा गया'
  }
};

// Helper function to get current language
async function getLanguage() {
  try {
    const result = await chrome.storage.sync.get(['settings']);
    return result.settings?.language || 'en';
  } catch {
    return 'en';
  }
}

// Helper function to get translated message
async function getMessage(key) {
  const lang = await getLanguage();
  return MESSAGES[lang]?.[key] || MESSAGES['en'][key] || key;
}

// Helper function to get keyboard shortcut based on OS
function getKeyboardShortcut() {
  const isMac = navigator.userAgentData?.platform === 'macOS' ||
                /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
  return isMac ? 'Option+Shift+C' : 'Alt+Shift+C';
}

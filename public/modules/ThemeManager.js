class ThemeManager {
    static defaultTheme = {
        backgroundColor: '#f5f5f5',
        textColor: '#333333',
        colorAccent: '#5ac700',
        colorPrimary: '#cdd8d5',
        spacing1: 1,
        radius1: 1,
        transitionSpeed: 0.3
    };

    static loadSettings() {
        const saved = localStorage.getItem('themeSettings');
        return saved ? JSON.parse(saved) : { ...ThemeManager.defaultTheme };
    }

    static saveSettings(settings) {
        localStorage.setItem('themeSettings', JSON.stringify(settings));
        ThemeManager.applyTheme(settings);
    }

    static applyTheme(settings) {
        const root = document.documentElement;
        root.style.setProperty('--background-color', settings.backgroundColor);
        root.style.setProperty('--text-color', settings.textColor);
        root.style.setProperty('--color-accent', settings.colorAccent);
        root.style.setProperty('--color-primary', settings.colorPrimary);
        root.style.setProperty('--spacing-1', settings.spacing1 + 'vw');
        root.style.setProperty('--radius-1', settings.radius1 + 'vw');
        root.style.setProperty('--transition-normal', settings.transitionSpeed + 's');
    }

    static init() {
        const settings = ThemeManager.loadSettings();
        ThemeManager.applyTheme(settings);
    }

    static enableDarkmode() {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    }

    static enableLightmode() {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
}

export default ThemeManager;
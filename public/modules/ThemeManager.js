class ThemeManager {
    static defaultTheme = {
        backgroundColor: '#f5f5f5',
        textColor: '#333333',
        colorAccent: '#5ac700',
        colorPrimary: '#cdd8d5',
        colorSurface: '#ffffff',
        colorGray: '#999999',
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
        root.style.setProperty('--color-white', settings.colorSurface || '#ffffff');
        root.style.setProperty('--color-gray', settings.colorGray || '#999999');
        root.style.setProperty('--spacing-1', settings.spacing1 + 'vw');
        root.style.setProperty('--radius-1', settings.radius1 + 'vw');
        root.style.setProperty('--transition-normal', settings.transitionSpeed + 's');
        
        // Update gradient-primary based on theme
        const isDark = ThemeManager.isColorDark(settings.backgroundColor);
        if (isDark) {
            root.style.setProperty('--gradient-primary', `linear-gradient(${settings.colorPrimary}cc, ${settings.colorAccent}44)`);
            root.style.setProperty('--color-light', `${settings.colorPrimary}66`);
            root.style.setProperty('--color-light-hover', `${settings.colorPrimary}99`);
        } else {
            root.style.setProperty('--gradient-primary', 'linear-gradient(rgba(220, 240, 255, 0.5), rgba(90, 199, 0, 0.5))');
            root.style.setProperty('--color-light', 'rgba(220, 240, 255, 0.3)');
            root.style.setProperty('--color-light-hover', 'rgba(220, 240, 255, 0.5)');
        }
    }
    
    static isColorDark(hexColor) {
        const hex = hexColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness < 128;
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
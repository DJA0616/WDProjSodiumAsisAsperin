class ThemeManager{
    static enableDarkmode(){
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    }     

    static enableLightmode(){
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    }
}
import DataFilter from "../modules/DataFilter.js";

class DomManager {
    static getElement(selector) {
        return document.querySelector(selector);
    }

    static clearElementContent(element) {
        if (element) {
            element.innerHTML = '';
        }
    }


}

export default DomManager;
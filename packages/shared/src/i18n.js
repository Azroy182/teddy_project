"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translations = void 0;
exports.t = t;
const en_json_1 = __importDefault(require("../i18n/en.json"));
const pt_json_1 = __importDefault(require("../i18n/pt.json"));
const translations = {
    EN: en_json_1.default,
    PT: pt_json_1.default,
};
exports.translations = translations;
function t(key, lang = 'EN', variables) {
    const translation = getNestedValue(translations[lang], key) || getNestedValue(translations.EN, key) || key;
    if (!variables) {
        return translation;
    }
    return translation.replace(/\{\{(\w+)\}\}/g, (match, varName) => {
        return variables[varName] || match;
    });
}
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}
//# sourceMappingURL=i18n.js.map
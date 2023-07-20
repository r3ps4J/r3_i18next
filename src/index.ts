import i18next from "i18next";
import languageDetector from "@r3ps4j/i18next-cfx-language-detector";

const exports = globalThis.exports;

exports("createInstance", i18next.createInstance);

function getLanguageDetector() {
    return languageDetector;
}

exports("getLanguageDetector", getLanguageDetector);

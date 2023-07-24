import i18next, { Callback, InitOptions, i18n } from "i18next";
import LanguageDetector from "@r3ps4j/i18next-cfx-language-detector";

const exports = globalThis.exports;

exports("createInstance", i18next.createInstance);

function createInstanceWithPlugins(
    plugins: "languageDetector"[] = ["languageDetector"],
    options?: InitOptions<object>,
    callback?: Callback
): i18n {
    const newInstance = i18next.createInstance(options, callback);
    if (plugins.includes("languageDetector")) {
        newInstance.use(LanguageDetector);
    }
    return newInstance;
}

exports("createInstanceWithPlugins", createInstanceWithPlugins);

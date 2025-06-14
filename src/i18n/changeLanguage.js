import i18n, { SUPPORTED_LANGUAGES } from "@/i18n";

export function changeLanguage(lang) {
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    i18n.global.locale.value = lang;
    localStorage.setItem("language", lang);
  } else {
    console.warn(`Unsupported language: ${lang}`);
  }
}
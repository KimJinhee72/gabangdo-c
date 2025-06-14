  import i18n, { SUPPORTED_LANGUAGES } from "@/i18n";

  export function changeLanguage(lang) {
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    i18n.global.locale.value = lang;
    document.cookie = `language=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1년 유지
  } else {
    console.warn(`Unsupported language: ${lang}`);
  }
}

export function reload() {
  window.location.reload();
}

export function getBrowserDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function getBrowserLang() {
  return window.navigator.language.split('-')[0];
}

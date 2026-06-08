export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "https://www.kiberagirlssocceracademy.co.ke";
}

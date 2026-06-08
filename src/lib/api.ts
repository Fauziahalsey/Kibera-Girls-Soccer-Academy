export function getApiBaseUrl(): string {
  const configured = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

  if (configured && !configured.includes("localhost") && !configured.includes("127.0.0.1")) {
    return configured;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
}

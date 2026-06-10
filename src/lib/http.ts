export async function readJsonResponse<T = unknown>(response: Response): Promise<T> {
  const text = await response.text();

  if (!text.trim()) {
    return {} as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      response.ok
        ? "The payment server returned an invalid response. Please try again."
        : `The payment server returned an invalid response (${response.status}). Please try again.`
    );
  }
}

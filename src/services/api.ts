import axios, { type AxiosInstance } from "axios";

const BASE_URL = "http://localhost:8080/api";

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
});

/**
 * Wraps an API call with a mock fallback. If the backend is unreachable
 * (network error or non-2xx response), the mockFactory runs instead so the
 * UI always has data to render.
 */
export async function withFallback<T>(
  request: () => Promise<T>,
  mockFactory: () => T,
): Promise<T> {
  try {
    return await request();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return mockFactory();
    }
    throw error;
  }
}

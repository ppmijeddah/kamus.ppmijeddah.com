import { env } from "../env";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(
    path: string,
    cache?: RequestCache,
    next?: NextFetchRequestConfig,
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "GET",
      cache: cache ?? "no-cache",
      next: next,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  }

  async post<T, B>(path: string, body: B): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  }

  async patch<T, B>(path: string, body: B): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  }

  async delete<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient(env.baseUrl);

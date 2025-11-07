/**
 * API Client for Backend Communication
 */
import { API_CONFIG, API_ENDPOINTS } from "./api-config";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
  token?: string;
};

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, token } = options;

  const url = `${API_CONFIG.BASE_URL}${endpoint}`;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || error.message || `API request failed: ${response.statusText}`);
  }

  return response.json();
}

export const apiClient = {
  // Auth
  async login(email: string, password: string) {
    // Send email and password as JSON to backend
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(error.detail || "Login failed");
    }
    
    return response.json();
  },

  async register(email: string, password: string) {
    // Post registration data to backend
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: response.statusText }));
      throw new Error(error.detail || "Registration failed");
    }
    
    return response.json();
  },

  // Analysis
  async createAnalysis(kind: string, data: { text_content?: string; file?: File; device_id?: string }, token?: string) {
    const formData = new FormData();
    formData.append("kind", kind);
    if (data.text_content) formData.append("text_content", data.text_content);
    if (data.file) formData.append("file", data.file);
    if (data.device_id) formData.append("device_id", data.device_id);

    const url = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.ANALYZE}`;

    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;

    return fetch(url, {
      method: "POST",
      headers,
      body: formData,
    }).then((r) => r.json());
  },

  async getAnalysis(analysisId: number, token?: string) {
    return apiRequest(`${API_ENDPOINTS.ANALYZE}/${analysisId}`, { token });
  },

  // Stats
  async getStats() {
    return apiRequest(API_ENDPOINTS.STATS);
  },

  // Users
  async getCurrentUser(token: string) {
    // Get user data from backend
    return apiRequest(`${API_ENDPOINTS.USERS}/me`, { token });
  },
};


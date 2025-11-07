/**
 * API Configuration
 * Backend API URL - must be set in environment variables
 */
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
  },
  ANALYZE: "/api/v1/analyze",
  STATS: "/api/v1/stats",
  USERS: "/api/v1/users",
};


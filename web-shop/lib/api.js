"use client";

import { useAuth } from "@clerk/nextjs";

export function useApi() {
  const { getToken } = useAuth();

  async function apiFetch(url, options = {}) {
    const token = await getToken();

    return fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
      {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      }
    );
  }

  return { apiFetch };
}
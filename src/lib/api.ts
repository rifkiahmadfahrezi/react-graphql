const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const api = async (url : string, config ?: RequestInit) => (
   await fetch(API_BASE_URL + url, {
      ...config,
      headers: {
         "Content-Type": "application/json",
         ...config?.headers
      }
   })
)
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,

      login: async (username, password) => {
        try {
          const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
          });

          if (!response.ok) {
            throw new Error("Login failed. Please check your credentials.");
          }

          const data = await response.json();
          const token = data.token || data.accessToken || data.jwt || (typeof data === "string" ? data : null);
          const user = data.user || { username };

          set({ token, user });
          return { success: true };
        } catch (error) {
          console.error("Login error:", error);
          return { success: false, error: error.message };
        }
      },

      register: async (username, email, password) => {
        try {
          // You may need to adjust the endpoint (/auth/register) based on your backend
          const response = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
          });

          if (!response.ok) {
            throw new Error("Registration failed. Please try again.");
          }

          // If backend returns a token upon registration, log them in automatically
          const data = await response.json();
          if (data.token || data.accessToken || data.jwt) {
            const token = data.token || data.accessToken || data.jwt;
            const user = data.user || { username };
            set({ token, user });
          }
          
          return { success: true };
        } catch (error) {
          console.error("Registration error:", error);
          return { success: false, error: error.message };
        }
      },

      logout: () => set({ token: null, user: null }),
      
      // Generic method to fetch data using the stored token
      fetchWithAuth: async (endpoint, options = {}) => {
        const { token } = useAuthStore.getState();
        if (!token) throw new Error("Not authenticated");

        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          ...(options.headers || {}),
        };

        const response = await fetch(`http://localhost:8080${endpoint}`, {
          ...options,
          headers,
        });

        if (response.status === 401 || response.status === 403) {
           // Auto logout on unauthorized
           set({ token: null, user: null });
           throw new Error("Session expired or unauthorized");
        }

        return response;
      }
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;

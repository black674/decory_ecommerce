import { jwtDecode } from "jwt-decode";

export function checkTokenExp(token) {
    if (!token) return true;
    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 < Date.now();
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
}
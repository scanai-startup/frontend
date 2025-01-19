import { useTokenStore } from "@/store/userData";
import { useRouter } from "expo-router";
import { useToast } from "./useToast";
import { useEffect } from "react";
import apiInstance from "@/api/apiInstance";
import * as SecureStore from "expo-secure-store";

export function useAutoLogin() {
    const { setToken } = useTokenStore();
    const router = useRouter();
    const toast = useToast();
  
    useEffect(() => {
      const autoLoginIfDevelopment = async () => {
        if (process.env.EXPO_PUBLIC_ENV === "development") {
          try {
            const response = await apiInstance.post("/auth/login", {
              matricula: "ADMIN",
              senha: "ADMIN",
            });
  
            const token = response.data.token;
            setToken(token);
            await SecureStore.setItemAsync("user-token", token);
            router.push("/(tabs)/");
            toast({ heading: "Sucesso", message: "Seja bem-vindo!" });
          } catch (e) {
            console.error("Auto-login failed", e);
          }
        }
      };
  
      autoLoginIfDevelopment();
    }, []);
  }
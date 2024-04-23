import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/authenticate",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.payload.token;
      localStorage.setItem("token", token);

      router.push("/");
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An error occurred");
      }
    }
  };

  return { login, error };
};

export default useLogin;

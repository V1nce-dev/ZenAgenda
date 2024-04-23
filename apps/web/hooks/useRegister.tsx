import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const useRegister = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        {
          username: username,
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
        setError("An error occured");
      }
    }
  };
  return { register, error };
};

export default useRegister;

import { useState } from "react";
import axios from "axios";

const useCheck = () => {
  const [username, setUsername] = useState<string | null>(null);

  const statusCheck = async () => {
    const authToken = localStorage.getItem("token");
    if (!authToken) {
      return;
    }

    const response = await axios.get("http://localhost:8080/api/user", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    setUsername(response.data.username);
  };

  return { statusCheck, username };
};

export default useCheck;

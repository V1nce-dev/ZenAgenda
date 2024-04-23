import { useState } from "react";
import { useRouter } from "next/router";
import useRegister from "@/hooks/useRegister";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { register, error } = useRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await register(username, email, password);

    router.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Adress"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>click</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterPage;

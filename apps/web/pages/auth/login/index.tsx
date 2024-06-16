import { useState } from "react";
import useLogin from "../../../hooks/useLogin";
import * as stylex from "@stylexjs/stylex";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.headerContainer)}>
          <h1 {...stylex.props(styles.header)}>Log in to ZenAgenda</h1>
        </div>
        <form {...stylex.props(styles.inputForm)} onSubmit={handleSubmit}>
          <input
            {...stylex.props(styles.email)}
            type="email"
            placeholder="Email Adress"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            {...stylex.props(styles.password)}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button {...stylex.props(styles.button)}>Login</button>
          {error && <p {...stylex.props(styles.error)}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

const styles = stylex.create({
  base: {
    minHeight: "100vh",
    paddingTop: 80,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#1E1E2E",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  inputForm: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  header: {
    color: "#CDD6F4",
    fontFamily: "sans-serif",
    fontSize: 32,
    fontWeight: "bold",
    margin: 0,
    padding: 0,
  },
  email: {
    width: 320,
    height: 50,
    borderRadius: 5,
    border: "1px solid #313244",
    background: "#272739",
    color: "#CDD6F4",
    fontSize: 17,
    padding: 10,
    boxShadow: "0px 10px 10px -6px rgba(0, 0, 0, 0.3)",
  },
  password: {
    width: 320,
    height: 50,
    borderRadius: 5,
    border: "1px solid #313244",
    background: "#272739",
    color: "#CDD6F4",
    fontSize: 17,
    padding: 10,
    boxShadow: "0px 10px 10px -6px rgba(0, 0, 0, 0.3)",
  },
  button: {
    width: 320,
    height: 50,
    borderRadius: 5,
    border: "1px solid #313244",
    background: "#272739",
    color: "#CDD6F4",
    fontSize: 17,
    boxShadow: "0px 10px 10px -6px rgba(0, 0, 0, 0.3)",
    cursor: "pointer",
  },
  error: {
    color: "#CDD6F4",
    fontFamily: "sans-serif",
  },
});

export default LoginPage;

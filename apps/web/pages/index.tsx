import { useRouter } from "next/router";
import * as stylex from "@stylexjs/stylex";

const Page = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/create");
  };

  return (
    <div {...stylex.props(styles.base)}>
      <div {...stylex.props(styles.container)}>
        <h1 {...stylex.props(styles.header)}>Welcome</h1>
        <div {...stylex.props(styles.buttonWrapper)}>
          <button {...stylex.props(styles.button)} onClick={handleClick}>
            Create{" "}
            <svg width={11} height={8} viewBox="0 0 11 8" fill="none">
              <path
                d="M10.3536 4.35355C10.5488 4.15829 10.5488 3.84171 10.3536 3.64645L7.17157 0.464466C6.97631 0.269204 6.65973 0.269204 6.46447 0.464466C6.2692 0.659728 6.2692 0.976311 6.46447 1.17157L9.29289 4L6.46447 6.82843C6.2692 7.02369 6.2692 7.34027 6.46447 7.53553C6.65973 7.7308 6.97631 7.7308 7.17157 7.53553L10.3536 4.35355ZM0 4.5H10V3.5H0V4.5Z"
                fill="white"
              />
            </svg>
          </button>
          <div {...stylex.props(styles.ellipse)}></div>
        </div>
      </div>
    </div>
  );
};

const styles = stylex.create({
  base: {
    minHeight: "100vh",
    paddingTop: 80,
    background: "#1E1E2E",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    color: "#CDD6F4",
    marginBottom: "1rem",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 30,
  },
  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  button: {
    height: 30,
    width: 95,
    border: "2px solid #313244",
    borderRadius: 100,
    color: "#CDD6F4",
    backgroundColor: {
      default: "#272739",
      ":hover": "#232331",
    },
    transition: "background-color 0.2s ease",
    cursor: "pointer",
  },
  ellipse: {
    height: 70,
    width: 70,
    borderRadius: 100,
    filter: "blur(20px)",
    background:
      "radial-gradient(circle at 50% 50%,rgba(205, 214, 244, 0.5), rgba(205, 214, 244, 1))",
    position: "absolute",
    top: "50%",
    left: "15%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  },
});

export default Page;

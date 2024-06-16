import { useEffect } from "react";
import Link from "next/link";
import useCheck from "../hooks/useCheck";
import * as stylex from "@stylexjs/stylex";
import { List } from "../styles/list";
import { icon } from "@/public";
import Image from "next/image";

const NavBar: React.FC = () => {
  const { statusCheck, username } = useCheck();

  useEffect(() => {
    statusCheck();
  }, [username]);

  return (
    <nav {...stylex.props(styles.base)}>
      <ul {...stylex.props(styles.navItems)}>
        <List {...stylex.props(styles.header)}>
          <Link href="/" {...stylex.props(styles.listItem)}>
            <Image
              src={icon}
              alt={"icon"}
              {...stylex.props(styles.iconHeader)}
            />
            {username ? username : "ZenAgenda"}
          </Link>
        </List>
        <div {...stylex.props(styles.itemContainer)}>
          <List>
            <Link href="/contact" {...stylex.props(styles.listItem)}>
              Contact
            </Link>
          </List>
          <List>
            <Link href="/auth/register" {...stylex.props(styles.listItem)}>
              <button {...stylex.props(styles.button)}>Register</button>
            </Link>
          </List>
        </div>
      </ul>
    </nav>
  );
};

const styles = stylex.create({
  base: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    height: 80,
    display: "flex",
    alignItems: "center",
    background: "#1E1E2E",
    borderBottom: "1px solid #313244",
  },
  navItems: {
    marginRight: 150,
    marginLeft: 150,
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    fontFamily: "sans-serif",
  },
  listItem: {
    color: "#CDD6F4",
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    display: "flex",
    textAlign: "center",
  },
  iconHeader: {
    marginRight: "1rem",
  },
  itemContainer: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    width: 85,
    height: 35,
    border: "1px solid #313244",
    borderRadius: 5,
    color: "#CDD6F4",
    backgroundColor: {
      default: "#1E1E2E",
      ":hover": "#181827",
    },
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  },
});

export default NavBar;

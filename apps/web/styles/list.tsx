import * as stylex from "@stylexjs/stylex";

const LIST_STYLES = stylex.create({
  base: {
    marginLeft: "1rem",
    fontSize: 15,
  },
});

export const List = ({ ...props }) => {
  return <li {...stylex.props(LIST_STYLES.base)} {...props} />;
};

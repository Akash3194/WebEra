import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        borderRadius: "0",
      },
    },
    MuiButton: {
      root: {
        borderRadius: "0",
      },
    },
  },
});

export default theme;

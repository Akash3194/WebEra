import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  imgFluid: {
    maxWidth: "100%",
    height: "auto",
  },
  heightFluid: {
    height: "100%",
  },
  boxSection: {
    marginBottom: "6vh !important",
    paddingTop: "9vh",
  },
  root: {
    maxWidth: 250,
  },
  media: {
    height: 140,
  },

  cardItem: {
    textTransform: "uppercase",
    fontWeight: "700",
  },
  zeroRadius: {
    borderRadius: "0 !important",
  },
  my4: {
    marginBottom: "1.5rem",
    marginTop: "1.5rem",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  pt4: {
    paddingTop: "1.5rem",
  },
  pb4: {
    paddingTop: "1.5rem",
  },
  pl4: {
    paddingLeft: "1.5rem",
  },
  p4: {
    padding: "1.5rem",
  },
  marginStep: {
    marginBottom: "4.5rem",
  },
  chatImg: {
    height: "100px",
  },
  step: {
    display: "flex",
    width: "100%",
    border: "7px solid blue",
    height: "auto",
    borderRadius: "50px",
    padding: "15px 20px",
    alignItems: "center",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  mb4: {
    marginBottom: "1.5rem",
  },
  mt4: {
    marginTop: "1.5rem",
  },
  mt6: {
    marginTop: "5rem",
  },
  mt5: {
    marginTop: "3.5rem",
  },
  ml4: {
    marginLeft: "1.5rem",
  },
  mt1: {
    marginTop: "0.5rem",
  },
  ml1: {
    marginLeft: "0.5rem",
  },
  mb2: {
    marginBottom: "1rem",
  },
  mt100: {
    marginTop: "120px",
  },
  widthFluid: {
    width: "100%",
  },
  noPadding: {
    padding: "0",
  },
  contactUs: {
    color: "white !important",
    backgroundColor: "#343a40!important",
  },
  contactUsContainerPadding: {
    padding: "20px 30px",
  },
  contactUsFormPadding: {
    paddingTop: "30px",
    paddingBottom: "30px",
  },
  contacts: {
    width: "100%",
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    fontWeight: "600",
  },
  bold: {
    fontWeight: "600",
  },
  profileImage: {
    height: "100px",
    width: "100px",
  },
  aRemoveDefault: {
    textDecoration: "none",
    color: "black",
    "&:hover": {
      color: "blue",
      cursor: "pointer",
      // boxShadow: "inset 0 -2px 0 blue",
    },
  },
  ml150: {
    marginLeft: "150px",
  },
  bgWhite: {
    backgroundColor: "white",
  },

  list: {
    wordBreak: "break-word",
    lineHeight: "1.5",
  },
}));

export default useStyles;

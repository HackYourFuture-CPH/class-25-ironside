import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    h6: {
      fontFamily: "Poppins",
      fontSize: "38px",
      fontWeight: "700",
      lineHeight: "45px" /* 129.412% */,
    },
    subtitle1: {
      fontFamily: "Poppins",
      fontSize: "17px",
      fontStyle: "normal",
      fontWeight: "100",
      lineHeight: "22px" /* 129.412% */,
      letterSpacing: "-0.41px",
      color: "#89899C",
    },
    h5: {
      fontFamily: "Poppins",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: "600",
      lineHeight: "normal" /* 129.412% */,
      letterSpacing: "-0.41px",
      color: "#110D59",
    },
  },
});

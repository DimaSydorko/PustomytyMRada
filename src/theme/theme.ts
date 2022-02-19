import {createTheme} from "@mui/material";
import {colors} from "./colors";

export const theme = createTheme({
  palette: {},
  components: {
    MuiDivider: {
      defaultProps: {
        style: {
          borderColor: `${colors.primary}80`,
          width: '100%',
        }
      },
    },
  },
});

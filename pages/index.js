import { useContext } from "react";

import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { FeedbackContext } from "../util/feedback";

import DialogContent from "../components/modals/dialog";
import MenuContent from "../components/modals/menu";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,

    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    width: 150,
    fontFamily: "Roboto",
    margin: theme.spacing(1)
  }
}));

const Index = () => {
  const classes = useStyles();
  const { addAlert, setDialog, setMenu } = useContext(FeedbackContext);

  const handleAlert = () => addAlert("Example Alert", "success");

  const handleDialog = () =>
    setDialog(
      DialogContent,
      data => data && addAlert(`Chose ${data}`, "success"),
      { override: true }
    );

  const handleMenu = event =>
    setMenu(
      event.currentTarget,
      MenuContent,
      data => data && addAlert(`Chose ${data}`, "success"),
      { override: true }
    );

  return (
    <Box className={classes.content}>
      <Button
        className={classes.button}
        onClick={handleAlert}
        variant="outlined"
      >
        Add Alert
      </Button>
      <Button
        className={classes.button}
        onClick={handleDialog}
        variant="outlined"
      >
        Set Dialog
      </Button>
      <Button
        className={classes.button}
        onClick={handleMenu}
        variant="outlined"
      >
        Show Menu
      </Button>
    </Box>
  );
};

export default Index;

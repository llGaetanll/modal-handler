import { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Box,
  Snackbar,
  Dialog as MuiDialog,
  Menu as MuiMenu
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import { isEmptyObj } from "../util";

const useStyles = makeStyles(theme => ({
  alertList: {
    display: "inline-flex",
    flexDirection: "column-reverse",
    position: "absolute",
    bottom: 0,
    right: 0
  },
  alert: {
    position: "relative",
    margin: theme.spacing(2),
    marginTop: 0,

    transitionDuration: "0.5s",
    transform: "none", // undo styles applied by MUI
    left: 0,
    bottom: 0
  }
}));

export const AlertList = ({ alerts, remAlert }) => {
  const classes = useStyles();

  // this list contains all currently visible alerts.
  // it's updated whenever the context's alert change
  const alertList = Object.keys(alerts).map(key => ({
    ...alerts[key],
    alertKey: key
  }));

  return (
    <Box className={classes.alertList}>
      {alertList.map(alert => (
        <Alert key={alert.alertKey} remAlert={remAlert} {...alert} />
      ))}
    </Box>
  );
};

export const Alert = ({ alertKey: key, msg, severity, remAlert, params }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    // hide the alert visually
    setOpen(false);
  };

  // remove the alert from the list once exit animation is done
  const handleExited = () => remAlert(key);

  const { lifetimeMS } = params;

  return (
    <Snackbar
      open={open}
      autoHideDuration={lifetimeMS}
      onClose={handleClose}
      onExited={handleExited}
      className={classes.alert}
    >
      <MuiAlert elevation={3} variant="filled" severity={severity}>
        {msg}
      </MuiAlert>
    </Snackbar>
  );
};

export const Dialog = ({ children: Children, onClose, remDialog }) => {
  const [open, setOpen] = useState(false);

  // if children are defined, display the element
  useEffect(() => {
    setOpen(Boolean(Children && !isEmptyObj(Children)));
  }, [Children]);

  const handleClose = event => {
    setOpen(false);

    onClose(event);
  };

  const handleExited = () => remDialog();

  if (!Children) return <></>;

  return (
    <MuiDialog
      open={open}
      onClose={() => handleClose(null)}
      onExited={handleExited}
    >
      {<Children onClose={handleClose} />}
    </MuiDialog>
  );
};

export const Menu = ({ anchor, children: Children, onClose, remMenu }) => {
  const [open, setOpen] = useState(false);

  // if the anchor is defined, display the element
  useEffect(() => {
    setOpen(Boolean(anchor));
  }, [anchor]);

  const handleClose = event => {
    setOpen(false);

    onClose(event);
  };

  const handleExited = () => remMenu();

  if (!Children) return <></>;

  return (
    <MuiMenu
      anchorEl={anchor}
      open={open}
      onClose={() => handleClose(null)}
      onExited={handleExited}
    >
      {<Children onClose={handleClose} />}
    </MuiMenu>
  );
};

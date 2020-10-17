import { useState, useEffect, cloneElement } from "react";
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

// Alert Wrapper. Note that this is not exported since all Alerts are displayed in the
// `AlertList` component.
const Alert = ({ alertKey: key, msg, severity, remAlert, params }) => {
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

// AlertList component. handles displaying any and all alerts in a list format
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

// Dialog Wrapper component
export const Dialog = ({ children, onClose, remDialog }) => {
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
      {/* here no need for `cloneElement` since Dialogs don't use refs */}
      {<children.type {...children.props} onClose={handleClose} />}
    </MuiDialog>
  );
};

// Menu Wrapper component
export const Menu = ({ anchor, children, onClose, remMenu }) => {
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
      {/* 
        use `cloneElements` on children to pass down any refs if provided.
        The `onClose` prop is also passed to any child component.
      */}
      {cloneElement(children, { onClose: handleClose })}
    </MuiMenu>
  );
};

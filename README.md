# modal-handler
Modal Handler abstracts away feedback components such as Dialogs, Menus, and Alerts.

## Motivation
Modal Handler strives to resolve 2 problems often encountered when using feedback components: code duplication, and unecessary components.
Instead of creating multiple Dialog components across your app, this system creates one master dialog at the top of your application that you can call at anytime anywhere in your app.

## Usage
To use Modal Handler, you'll need to wrap your application in a `FeedbackProvider`
```JS
const App = () => {

  return (
     <FeedbackProvider>
       {/* ... */}
     </FeedbackProvider>
  );
}

export default App;
```
Under the hood, this uses a Context that lets any child component of your app call on the different functions provided by `FeedbackContext`

### `addAlert(msg: String, severity: String, handleClose: func, params: object)`
Adds an Alert to the AlertList. Returns the key of the newly created alert.
- `msg`: The string to display in the alert.
- `severity`: As defined by (MaterialUI)[https://material-ui.com/api/alert/#props], severity can take on one of four values: `'info'`, `'error'`, `'warning'`, or `'success'`. This will affect the color and icon displayed by the alert.
- `handleClose`: Ran `onClose` by the Alert Wrapper. This function is passed the event.
- `params`
   - `lifeTimeMS = 3000`: How long the Alert should stay on the screen.
### `remAlert(key: String)`
Removes an alert with the given `key` from the AlertList. 
- `key`: A randomly generated uuidv4 returned by `addAlert()`.
### `setDialog(content: elementType, handleClose: func, params: object)`
Displays a Dialog.
- `content`: The React Component to display as the content of the Dialog.
- `handleClose`: Ran `onClose` by the Dialog Wrapper. This function is passed the event.
- `params`
   - `override = false`: If the Dialog should override any current Dialog on the screen.
### `remDialog()`
Removes the current Dialog.
### `setMenu(anchor: elementType, items: elementType, handleClose, params: object)`
Displays a Menu.
- `anchor`: an HTML element that the menu should attach to. In an `onClick` event this is returned by `event.currentTarget`.
- `items`: The React Component to display as the content of the Menu.
- `handleClose`: Ran `onClose` by the Menu Wrapper. This function is passed the event.
- `params`
   - `override = false`: If the Dialog should override any current Dialog on the screen.
### `remMenu()`
Removes the current Menu.

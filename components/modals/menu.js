import { MenuItem } from "@material-ui/core";

const items = ["Profile", "My Account", "Logout"];

const MenuContent = ({ onClose }) => {
  return (
    <>
      {items.map(item => (
        <MenuItem key={item} onClick={() => onClose(item)}>
          {item}
        </MenuItem>
      ))}
    </>
  );
};

export default MenuContent;

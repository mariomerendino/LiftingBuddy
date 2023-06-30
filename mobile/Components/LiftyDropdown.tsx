import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet } from "react-native";

interface Item {
  label: string;
  value: string | number;
}
interface LiftyDropdownProps {
  items: Array<Item>;
  value: string | number | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue:
    | React.Dispatch<React.SetStateAction<string | null>>
    | React.Dispatch<React.SetStateAction<number | null>>;
  placeholder?: string;
  disabled?: boolean;
}

const LiftyDropdown = ({
  items,
  value,
  open,
  setOpen,
  setValue,
  placeholder = "Please Select a value",
  disabled = false,
}: LiftyDropdownProps) => {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      placeholder={placeholder}
      setOpen={setOpen}
      setValue={setValue}
      style={styles.base}
      placeholderStyle={disabled && styles.disabled}
      dropDownContainerStyle={styles.modal}
      disabled={disabled}
    />
  );
};

const styles = StyleSheet.create({
  modal: {
    zIndex: 999,
  },
  base: {
    height: 40,
    borderColor: "lightgray",
    borderRadius: 8,
    borderStyle: "solid",
    borderWidth: 2,
    width: "100%",
    paddingHorizontal: 10,
  },
  disabled: {
    color: "lightgray",
  },
});

export default LiftyDropdown;

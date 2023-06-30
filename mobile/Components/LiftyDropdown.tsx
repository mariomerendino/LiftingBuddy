import DropDownPicker from "react-native-dropdown-picker";

interface Item {
  label: string;
  value: string;
}
interface LiftyDropdownProps {
  items: Array<Item>;
  value: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

const LiftyDropdown = ({
  items,
  value,
  open,
  setOpen,
  setValue,
  placeholder = "Please Select a value",
}: LiftyDropdownProps) => {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      placeholder={placeholder}
      setOpen={setOpen}
      setValue={setValue}
    />
  );
};

export default LiftyDropdown;

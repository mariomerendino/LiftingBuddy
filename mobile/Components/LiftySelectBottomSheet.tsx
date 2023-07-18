import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import IconButton from "./IconButton";
import LiftyText from "./LiftyText";

interface Item {
  label: string;
  value: string | number;
}

interface Props {
  items: Array<Item>;
  setValue: (arg0: any) => void;
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
  value?: any;
}

const LiftySelectBottomSheet = ({
  items,
  setValue,
  isOpen,
  setIsOpen,
  value = undefined,
}: Props) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  useEffect(() => {
    if (!isOpen) {
      sheetRef.current?.close();
    } else {
      sheetRef.current?.expand();
    }
  }, [isOpen]);

  const renderItem = useCallback(
    (item: Item) => (
      <Pressable
        onPress={() => {
          setValue(item.value);
          setIsOpen(false);
        }}
        key={item.value}
        style={styles.itemContainer}
      >
        <LiftyText>{item.label}</LiftyText>
        {item.value === value && <IconButton type="check" onPress={() => {}} />}
      </Pressable>
    ),
    []
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={isOpen ? 1 : -1}
      snapPoints={snapPoints}
      onClose={() => setIsOpen(false)}
      enablePanDownToClose={true}
    >
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {items.map(renderItem)}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    paddingHorizontal: 20,
    margin: 6,
    backgroundColor: "#eee",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default LiftySelectBottomSheet;

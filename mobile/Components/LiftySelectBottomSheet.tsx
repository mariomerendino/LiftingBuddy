import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

interface Item {
  label: string;
  value: string | number;
}

interface Props {
  items: Array<Item>;
  setValue: (arg0: any) => void;
  isOpen: boolean;
  setIsOpen: (arg0: boolean) => void;
}

const LiftySelectBottomSheet = ({
  items,
  setValue,
  isOpen,
  setIsOpen,
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
      <View key={item.value} style={styles.itemContainer}>
        <Pressable
          onPress={() => {
            setValue(item.value);
            setIsOpen(false);
          }}
        >
          <Text>{item.label}</Text>
        </Pressable>
      </View>
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
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default LiftySelectBottomSheet;

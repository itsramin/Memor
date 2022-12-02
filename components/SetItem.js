import { Pressable, StyleSheet, Text } from "react-native";
import { AllColors } from "../UI/AllColors";

const SetItem = ({ setName, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.view}>
      <Text style={styles.text}>{setName}</Text>
    </Pressable>
  );
};

export default SetItem;
const styles = StyleSheet.create({
  view: {
    backgroundColor: AllColors.primary400,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 4,
  },
  text: { color: "white", fontSize: 16 },
});

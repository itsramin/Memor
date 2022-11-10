import { Text, StyleSheet, Pressable } from "react-native";
import { AllColors } from "../UI/AllColors";

const SetNameRow = ({ name, onPress }) => {
  return (
    <Pressable style={styles.view} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
};

export default SetNameRow;
const styles = StyleSheet.create({
  view: {
    backgroundColor: AllColors.primary400,
    padding: 16,
    marginVertical: 8,
    borderRadius: 6,
    elevation: 4,
  },
  text: {
    color: "white",
  },
});

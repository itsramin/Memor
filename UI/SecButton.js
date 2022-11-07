import { Pressable, Text, StyleSheet } from "react-native";
import { AllColors } from "./AllColors";

const PrimaryButton = ({ title, onPress, color = AllColors.primary400 }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.view, { backgroundColor: color }]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
const styles = StyleSheet.create({
  view: {
    backgroundColor: AllColors.primary400,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 5,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});

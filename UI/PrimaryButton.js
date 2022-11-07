import { Pressable, Text, StyleSheet } from "react-native";
import { AllColors } from "./AllColors";

const PrimaryButton = ({
  title,
  onPress,
  bgcolor = AllColors.primary400,
  textColor = "white",
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.view, { backgroundColor: bgcolor }, style]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
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

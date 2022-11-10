import { Pressable, Text, StyleSheet } from "react-native";
import { AllColors } from "./AllColors";
import { Ionicons } from "@expo/vector-icons";
const PrimaryButton = ({
  title,
  onPress,
  bgcolor = AllColors.primary400,
  textColor = "white",
  style,
  icon,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.view, { backgroundColor: bgcolor }, style]}
    >
      {icon && (
        <Ionicons name={icon} color={textColor} size={20} style={styles.icon} />
      )}
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
const styles = StyleSheet.create({
  view: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  icon: {
    marginRight: 8,
  },
});

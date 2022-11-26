import { Pressable, StyleSheet } from "react-native";
import { AllColors } from "./AllColors";
import { MaterialIcons } from "@expo/vector-icons";
const IconButton = ({
  onPress,
  bgcolor = AllColors.primary400,
  textColor = "white",
  icon,
  size = 40,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.view, { backgroundColor: bgcolor }]}
    >
      <MaterialIcons
        name={icon}
        color={textColor}
        size={size}
        style={styles.icon}
      />
    </Pressable>
  );
};

export default IconButton;
const styles = StyleSheet.create({
  view: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  icon: {
    // marginRight: 8,
  },
});

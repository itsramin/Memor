import { View, StyleSheet, Text, Pressable } from "react-native";
import Colors from "../constants/colors";

const PrimaryButton = (props) => {
  return (
    <View style={styles.outer}>
      <Pressable
        onPress={props.onPress}
        style={({ pressed }) =>
          pressed ? [styles.inner, styles.pressed] : styles.inner
        }
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={[styles.text, props.style]}>{props.children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

Colors.primary500;
const styles = StyleSheet.create({
  outer: {
    borderRadius: 100,
    margin: 4,
    overflow: "hidden",
    backgroundColor: Colors.primary300,
  },
  inner: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});

import { Pressable, Text, StyleSheet } from "react-native";

const PrimaryButton = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.box}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
const styles = StyleSheet.create({
  box: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#228fc2",
    borderRadius: 6,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

import { View, StyleSheet, Text } from "react-native";
import { AllColors } from "./AllColors";

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.outer}>
      <View style={[styles.inner, { width: `${progress}%` }]}></View>
    </View>
  );
};

export default ProgressBar;
const styles = StyleSheet.create({
  outer: {
    borderRadius: 100,
    backgroundColor: AllColors.grey200,
    overflow: "hidden",
    marginVertical: 10,
    height: 10,
  },
  inner: {
    backgroundColor: AllColors.green400,
    height: 10,
  },
});

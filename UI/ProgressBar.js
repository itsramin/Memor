import { View, StyleSheet } from "react-native";
import { AllColors } from "./AllColors";

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.outer}>
      <View style={[styles.inner, { width: `${progress * 100}%` }]}></View>
    </View>
  );
};

export default ProgressBar;
const styles = StyleSheet.create({
  outer: {
    borderRadius: 100,
    backgroundColor: AllColors.grey100,
    overflow: "hidden",
    marginVertical: 10,
    marginBottom: 20,
    height: 10,
    marginHorizontal: 20,
  },
  inner: {
    backgroundColor: AllColors.green400,
    height: 10,
  },
});

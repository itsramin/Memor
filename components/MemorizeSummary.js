import { Text, View, StyleSheet } from "react-native";
import PrimaryButton from "../UI/PrimaryButton";

const MemorizeSummary = ({ correctNum, wrongNum, onPress, stage }) => {
  return (
    <View style={styles.screen}>
      <Text>Summary</Text>
      <View style={styles.summaryRow}>
        {wrongNum === 0 && <Text>Stage {stage} complete!</Text>}
      </View>
      <View style={styles.summaryRow}>
        <Text>Corrects: </Text>
        <Text>{correctNum}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text>Wrongs; </Text>
        <Text>{wrongNum}</Text>
      </View>
      <PrimaryButton title="Back" onPress={onPress} />
    </View>
  );
};

export default MemorizeSummary;
const styles = StyleSheet.create({
  screen: { textAlign: "center" },
  summaryRow: {
    flexDirection: "row",
  },
});

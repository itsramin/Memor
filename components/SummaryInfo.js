import { Text, View, StyleSheet } from "react-native";
import PrimaryButton from "../UI/PrimaryButton";

const SummaryInfo = ({ correctNum, wrongNum, onPress }) => {
  return (
    <View>
      <Text>Summary</Text>
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

export default SummaryInfo;
const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: "row",
  },
});

import { Text, View, StyleSheet } from "react-native";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";
import { MaterialIcons } from "@expo/vector-icons";

const MemorizeSummary = ({ correctNum, wrongNum, onPress, stage }) => {
  return (
    <View style={styles.screen}>
      {wrongNum === 0 && (
        <View style={styles.stageView}>
          <MaterialIcons name="done-all" color={AllColors.green500} size={20} />
          <Text style={styles.stageText}>Stage {stage} complete!</Text>
        </View>
      )}

      <View style={styles.summaryView}>
        <Text style={styles.title}>Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={[styles.labelText]}>Corrects</Text>
          <View style={[styles.right, { backgroundColor: AllColors.green400 }]}>
            <Text style={[styles.value]}>{correctNum}</Text>
            <MaterialIcons name="check" size={20} color="white" />
          </View>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.labelText]}>Wrongs</Text>
          <View style={[styles.right, { backgroundColor: AllColors.red400 }]}>
            <Text style={[styles.value]}>{wrongNum}</Text>
            <MaterialIcons name="close" size={20} color="white" />
          </View>
        </View>
      </View>

      <PrimaryButton
        title="Back to Flashcards"
        onPress={onPress}
        icon="keyboard-arrow-left"
      />
    </View>
  );
};

export default MemorizeSummary;
const styles = StyleSheet.create({
  screen: { alignItems: "center" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 3,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    color: AllColors.primary500,
    fontSize: 20,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: AllColors.primary500,
    paddingHorizontal: 40,
    borderBottomWidth: 2,
  },
  summaryView: {
    // backgroundColor: AllColors.primary100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 16,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    padding: 4,
    paddingHorizontal: 10,
  },
  labelText: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: "bold",
    color: AllColors.primary400,
  },
  value: {
    color: "white",
    fontSize: 15,
    paddingHorizontal: 5,
  },
  stageView: {
    backgroundColor: AllColors.green100,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  stageText: {
    color: AllColors.green500,
    marginLeft: 5,
    fontWeight: "bold",
  },
});

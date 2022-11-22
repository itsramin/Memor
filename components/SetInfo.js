import { View, StyleSheet, Text } from "react-native";
import { AllColors } from "../UI/AllColors";

import { MaterialIcons } from "@expo/vector-icons";

const SetInfo = ({ name }) => {
  return (
    <View style={styles.infoBox}>
      <View style={styles.row}>
        <Text style={styles.infoTitle}>{name}</Text>
        {/* <MaterialIcons
          name="edit"
          color={AllColors.grey200}
          size={20}
            onPress={nameIconHandler}
          style={styles.editIcon}
        /> */}
      </View>
      {/* <View>
    <View style={styles.infoRow}>
      <Text style={styles.infoText}>All Cards</Text>
      <Text style={styles.infoText}>
        {targetCards.length + targetSet.dailyCards.length}
      </Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoText}>Stage 1</Text>
      <Text style={styles.infoText}>
        {stageCounter(targetCards, [0, 1]) +
          stageCounter(targetSet.dailyCards, [0, 1])}
      </Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoText}>Stage 2</Text>
      <Text style={styles.infoText}>
        {stageCounter(targetCards, [1, 3]) +
          stageCounter(targetSet.dailyCards, [1, 3])}
      </Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoText}>Stage 3</Text>
      <Text style={styles.infoText}>
        {stageCounter(targetCards, [3, 7]) +
          stageCounter(targetSet.dailyCards, [3, 7])}
      </Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoText}>Stage 4</Text>
      <Text style={styles.infoText}>
        {stageCounter(targetCards, [7, 15]) +
          stageCounter(targetSet.dailyCards, [7, 15])}
      </Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoText}>Stage 5</Text>
      <Text style={styles.infoText}>
        {stageCounter(targetCards, [15, 30]) +
          stageCounter(targetSet.dailyCards, [15, 30])}
      </Text>
    </View>
    <View style={styles.infoRow}>
      <Text style={styles.infoText}>Full Memorize</Text>
      <Text style={styles.infoText}>{fullMemorize}</Text>
    </View>
  </View> */}
      {/* <StageBar values={values} /> */}
    </View>
  );
};

export default SetInfo;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  btn: {
    flex: 1,
  },
  icon: {
    marginHorizontal: 16,
    marginRight: 32,
  },
  infoBox: {
    backgroundColor: AllColors.primary100,
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 50,
    maxWidth: 400,
    marginVertical: 16,
  },
  infoTitle: {
    color: AllColors.primary500,
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 15,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  editIcon: {
    marginHorizontal: 5,
  },
  checkIcon: {
    marginHorizontal: 5,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  buttons: {
    marginHorizontal: 50,
  },
  infoText: {
    color: AllColors.primary400,
  },
});

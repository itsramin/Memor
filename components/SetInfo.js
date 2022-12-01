import { View, StyleSheet, Text } from "react-native";
import { AllColors } from "../UI/AllColors";
import { getLevelsArr } from "../helper/helper";

const SetInfo = ({ name, cards }) => {
  const levelsArr = getLevelsArr(cards);
  return (
    <View style={styles.infoBox}>
      <View style={styles.row}>
        <Text style={styles.infoTitle}>{name}</Text>
      </View>
      <View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>All Cards</Text>
          <Text style={styles.infoText}>{cards.length}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Not review</Text>
          <Text style={styles.infoText}>{levelsArr[0]}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Level 1</Text>
          <Text style={styles.infoText}>{levelsArr[1]}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Level 2</Text>
          <Text style={styles.infoText}>{levelsArr[2]}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Level 3</Text>
          <Text style={styles.infoText}>{levelsArr[3]}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Level 4</Text>
          <Text style={styles.infoText}>{levelsArr[4]}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Level 5</Text>
          <Text style={styles.infoText}>{levelsArr[5]}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Full Memorize</Text>
          <Text style={styles.infoText}>{levelsArr[6]}</Text>
        </View>
      </View>
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

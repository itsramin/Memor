import { View, Text, StyleSheet } from "react-native";
import { AllColors } from "../UI/AllColors";

const StageBar = ({ values }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.text}>Stage</Text>
      <View style={styles.col}>
        <Text>{values.stage1}</Text>
        <View style={styles.stageBar}></View>
        <Text style={styles.value}>1</Text>
      </View>
      <View style={styles.col}>
        <Text>{values.stage2}</Text>
        <View style={styles.stageBar}></View>
        <Text style={styles.value}>2</Text>
      </View>
      <View style={styles.col}>
        <Text>{values.stage3}</Text>
        <View style={styles.stageBar}></View>
        <Text style={styles.value}>3</Text>
      </View>
      <View style={styles.col}>
        <Text>{values.stage4}</Text>
        <View style={styles.stageBar}></View>
        <Text style={styles.value}>4</Text>
      </View>
      <View style={styles.col}>
        <Text>{values.full}</Text>
        <View style={styles.stageBar}></View>
        <Text style={styles.value}>Full</Text>
      </View>
    </View>
  );
};

export default StageBar;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stageBar: {
    height: 5,
    backgroundColor: AllColors.primary300,
    borderRadius: 10,
    alignSelf: "stretch",
    paddingHorizontal: 3,
  },
  col: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 2,
  },
  text: {
    marginRight: 5,
    color: AllColors.primary400,
  },
  value: {
    color: AllColors.primary400,
  },
});
{
  /* <View>
      <View style={styles.row}>
        <Text>Stage</Text>
        <Text>1</Text>
        <Text>2</Text>
        <Text>3</Text>
        <Text>4</Text>
        <Text>Full</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.stageBar}></View>
        <View style={styles.stageBar}></View>
        <View style={styles.stageBar}></View>
        <View style={styles.stageBar}></View>
        <View style={styles.stageBar}></View>
        <View style={styles.stageBar}></View>
      </View>
      <View style={styles.row}>
        <Text>Stage</Text>
        <Text>1</Text>
        <Text>2</Text>
        <Text>3</Text>
        <Text>4</Text>
        <Text>Full</Text>
      </View>
    </View> */
}

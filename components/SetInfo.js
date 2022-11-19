import { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { AllColors } from "../UI/AllColors";
import { setsActions } from "../store/sets";
import { stageCounter } from "../helper/stageCounter";
import StageBar from "./StageBar";

const SetInfo = ({ setId }) => {
  const dispatch = useDispatch();
  const allSets = useSelector((state) => state.sets.allSets);
  const targetSet = allSets.find((item) => item.setId === setId);
  const targetCards = targetSet.cards;
  const [newName, setNewName] = useState(targetSet.name);
  const [nameIsEditing, setNameIsEditing] = useState(false);
  const nameIconHandler = () => {
    setNameIsEditing(true);
  };
  const nameChangeHandler = (value) => {
    setNewName(value);
  };
  const blurHandler = () => {
    setNameIsEditing(false);
    dispatch(setsActions.changeSetName({ setId, newName }));
  };

  const fullMemorize = targetCards.reduce((sum, cur) => {
    if (cur.fullMemorize) ++sum;
    return sum;
  }, 0);

  const values = {
    stage1: stageCounter(targetCards, 1),
    stage2: stageCounter(targetCards, 2),
    stage3: stageCounter(targetCards, 3),
    stage4: stageCounter(targetCards, 4),
    full: fullMemorize,
  };
  return (
    <View style={styles.infoBox}>
      <View style={styles.row}>
        {!nameIsEditing && (
          <>
            <Text style={styles.infoTitle}>{targetSet.name}</Text>
            <MaterialIcons
              name="edit"
              color={AllColors.grey200}
              size={20}
              onPress={nameIconHandler}
              style={styles.editIcon}
            />
          </>
        )}
        {nameIsEditing && (
          <>
            <TextInput
              style={styles.infoTitle}
              defaultValue={targetSet.name}
              onChangeText={nameChangeHandler}
              onBlur={blurHandler}
              autoFocus
            />

            <MaterialIcons
              name="check"
              color={AllColors.grey200}
              size={20}
              onPress={blurHandler}
              style={styles.checkIcon}
            />
          </>
        )}
      </View>
      <View>
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
      </View>
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

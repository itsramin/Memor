import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../UI/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { AllColors } from "../UI/AllColors";
import { setsActions } from "../store/sets";

const SetOverviewScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const curSetId = route.params.setId;
  const shuffle = useSelector((state) => state.sets.shuffle);
  const allSets = useSelector((state) => state.sets.allSets);
  const [nameIsEditing, setNameIsEditing] = useState(false);

  const targetSet = allSets.find((item) => item.setId === curSetId);
  const minStage = targetSet.cards.reduce((min, cur) => {
    if (cur.stage < min) min = cur.stage;
    return min;
  }, 5);
  const allCards = targetSet.cards.filter((card) => card.stage === minStage);

  const cards = shuffle ? shuffleArr(allCards) : allCards;

  useLayoutEffect(() => {
    navigation.setOptions({ title: targetSet.name });
  }, []);

  const viewHandler = () => {
    navigation.navigate("viewCards", { setId: curSetId });
  };
  const memorizeHandler = () => {
    navigation.navigate("memorizeScreen", { setId: curSetId, cards, minStage });
  };
  const addHandler = () => {
    navigation.navigate("cardFormScreen", { setId: curSetId, mode: "new" });
  };
  const resetHandler = () => {
    dispatch(setsActions.resetStage(curSetId));
  };

  const stageCounter = (cards, stage) => {
    const num = cards.reduce((sum, cur) => {
      if (cur.stage === stage) ++sum;
      return sum;
    }, 0);

    return num;
  };

  const fullMemorize = targetSet.cards.reduce((sum, cur) => {
    if (cur.fullMemorize) ++sum;
    return sum;
  }, 0);
  const [newName, setNewName] = useState(targetSet.name);
  const nameIconHandler = () => {
    setNameIsEditing(true);
  };
  const nameChangeHandler = (value) => {
    setNewName(value);
  };
  const blurHandler = () => {
    setNameIsEditing(false);
    dispatch(setsActions.changeSetName({ setId: curSetId, newName }));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.infoBox}>
        <View style={styles.row}>
          {!nameIsEditing && (
            <>
              <Text style={styles.infoTitle}>{targetSet.name}</Text>
              <Ionicons
                name="brush"
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

              <Ionicons
                name="checkmark-circle"
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
            <Text>All Cards</Text>
            <Text>{targetSet.cards.length}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Stage 1</Text>
            <Text>{stageCounter(targetSet.cards, 1)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Stage 2</Text>
            <Text>{stageCounter(targetSet.cards, 2)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Stage 3</Text>
            <Text>{stageCounter(targetSet.cards, 3)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Stage 4</Text>
            <Text>{stageCounter(targetSet.cards, 4)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Full Memorize</Text>
            <Text>{fullMemorize}</Text>
          </View>
        </View>
      </View>
      <PrimaryButton title="Add new card" onPress={addHandler} />
      <PrimaryButton title="View" onPress={viewHandler} />
      <PrimaryButton title="Memorize" onPress={memorizeHandler} />
      <PrimaryButton
        title="Reset stages"
        onPress={resetHandler}
        bgcolor={AllColors.red400}
      />
    </View>
  );
};

export default SetOverviewScreen;
const styles = StyleSheet.create({
  // screen: { alignItems: "center" },
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
});

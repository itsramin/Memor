import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../UI/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { AllColors } from "../UI/AllColors";
import { setsActions } from "../store/sets";
import { shuffleArr } from "../helper/shuffle";

const SetOverviewScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const curSetId = route.params.setId;
  const shuffle = useSelector((state) => state.sets.shuffle);
  const allSets = useSelector((state) => state.sets.allSets);
  const [nameIsEditing, setNameIsEditing] = useState(false);

  const targetSet = allSets.find((item) => item.setId === curSetId);
  const targetCards = targetSet.cards;
  const minStage = targetCards.reduce((min, cur) => {
    if (cur.stage < min) min = cur.stage;
    return min;
  }, 5);
  const allCards = targetCards.filter((card) => card.stage === minStage);

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
  const deleteSetHandler = () => {
    Alert.alert(
      "Delete Set",
      "Are you sure you want to delete this set? All cards will be deleted!",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            navigation.goBack();
            dispatch(setsActions.deleteSet(curSetId));
          },
        },
      ]
    );
  };

  const stageCounter = (cards, stage) => {
    const num = cards.reduce((sum, cur) => {
      if (cur.stage === stage) ++sum;
      return sum;
    }, 0);

    return num;
  };

  const fullMemorize = targetCards.reduce((sum, cur) => {
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
            <Text style={styles.infoText}>All Cards</Text>
            <Text style={styles.infoText}>{targetCards.length}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Stage 1</Text>
            <Text style={styles.infoText}>{stageCounter(targetCards, 1)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Stage 2</Text>
            <Text style={styles.infoText}>{stageCounter(targetCards, 2)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Stage 3</Text>
            <Text style={styles.infoText}>{stageCounter(targetCards, 3)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Stage 4</Text>
            <Text style={styles.infoText}>{stageCounter(targetCards, 4)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Full Memorize</Text>
            <Text style={styles.infoText}>{fullMemorize}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        <PrimaryButton
          title="Add new card"
          onPress={addHandler}
          icon="add-circle"
        />
        {targetCards.length !== 0 && (
          <PrimaryButton
            title="View & edit cards"
            onPress={viewHandler}
            icon="eye"
          />
        )}
        {targetCards.length !== 0 && (
          <PrimaryButton
            title="Memorize"
            onPress={memorizeHandler}
            icon="game-controller"
          />
        )}
        {targetCards.length !== 0 &&
          targetCards.length !== stageCounter(targetCards, 1) && (
            <PrimaryButton
              title="Reset stages"
              onPress={resetHandler}
              bgcolor={AllColors.red400}
              icon="repeat"
            />
          )}
        <PrimaryButton
          title="Delete Set"
          onPress={deleteSetHandler}
          bgcolor={AllColors.red400}
          icon="trash"
        />
      </View>
    </View>
  );
};

export default SetOverviewScreen;
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

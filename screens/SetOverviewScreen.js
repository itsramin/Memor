import { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../UI/PrimaryButton";
import { AllColors } from "../UI/AllColors";
import { setsActions } from "../store/sets";
import { shuffleArr } from "../helper/shuffle";
import SetInfo from "../components/SetInfo";
import { stageCounter } from "../helper/stageCounter";
import { isToday } from "../helper/date";
import { useIsFocused } from "@react-navigation/native";

const SetOverviewScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { setId } = route.params;
  const shuffle = useSelector((state) => state.sets.shuffle);
  const allSets = useSelector((state) => state.sets.allSets);
  const targetSet = allSets.find((item) => item.setId === setId);
  const targetCards = targetSet.cards;
  const lastDaily = targetSet.lastDaily;

  const [dailyModeAllow, setDailyModeAllow] = useState(true);

  useEffect(() => {
    if (lastDaily === new Date().toISOString().slice(0, 10))
      setDailyModeAllow(false);
  }, [isFocused]);

  const minStage = targetCards.reduce((min, cur) => {
    if (cur.stage < min) min = cur.stage;
    return min;
  }, 5);

  const allCards = targetCards.filter((card) => card.stage === minStage);
  // console.log("allCards", allCards.length, allCards);

  const cards = shuffle ? shuffleArr(allCards) : allCards;

  const [dailyCards, setDailyCards] = useState([]);

  useEffect(() => {
    // daily part
    const allNewCards = targetCards.filter((card) => card.nextReview === "");
    const shuffleAllNewCards = shuffle ? shuffleArr(allNewCards) : allNewCards;
    const newCards = shuffleAllNewCards.slice(0, 2);

    // console.log("dailyCards", newCards.length, newCards);

    // today
    const todayCards = targetCards.filter((card) => isToday(card.nextReview));
    // console.log("todayCards", todayCards.length, todayCards);
    if (todayCards.length > 0) {
      setDailyCards((prev) => [...prev, ...newCards, ...todayCards]);
    } else {
      setDailyCards((prev) => [...prev, ...newCards]);
    }
  }, [targetCards, isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: targetSet.name });
  }, []);

  const viewHandler = () => {
    navigation.navigate("viewCards", { setId, source: "sets" });
  };
  const stageModeHandler = () => {
    navigation.navigate("StageModeScreen", { setId, cards, minStage });
  };
  const addHandler = () => {
    navigation.navigate("cardFormScreen", { setId, mode: "new" });
  };
  const dailyModeHandler = () => {
    if (dailyCards.length < 1 || !dailyModeAllow) return;

    navigation.navigate("DailyModeScreen", { setId, cards: dailyCards });
  };
  const resetHandler = () => {
    dispatch(setsActions.resetStage(setId));
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
            dispatch(setsActions.deleteSet(setId));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <SetInfo setId={setId} />
      <View style={styles.buttons}>
        <PrimaryButton title="Add new card" onPress={addHandler} icon="add" />
        {targetCards.length !== 0 && (
          <PrimaryButton
            title="View & edit cards"
            onPress={viewHandler}
            icon="edit"
          />
        )}
        {targetCards.length !== 0 && (
          <PrimaryButton
            title={
              dailyCards.length < 1
                ? "Daily Mode - cards over"
                : !dailyModeAllow
                ? "Daily Mode - Done"
                : "Daily Mode"
            }
            onPress={dailyModeHandler}
            bgcolor={
              dailyCards.length < 1 || !dailyModeAllow
                ? AllColors.grey400
                : AllColors.primary400
            }
            icon="wb-sunny"
          />
        )}
        {targetCards.length !== 0 && (
          <PrimaryButton
            title="Stage Mode"
            onPress={stageModeHandler}
            icon="gamepad"
          />
        )}
        {targetCards.length !== 0 &&
          targetCards.length !== stageCounter(targetCards, 1) && (
            <PrimaryButton
              title="Reset stages"
              onPress={resetHandler}
              bgcolor={AllColors.red400}
              icon="cleaning-services"
            />
          )}
        <PrimaryButton
          title="Delete Set"
          onPress={deleteSetHandler}
          bgcolor={AllColors.red400}
          icon="delete"
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

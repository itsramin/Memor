import { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../UI/PrimaryButton";
import { AllColors } from "../UI/AllColors";
import { setsActions } from "../store/sets";
import SetInfo from "../components/SetInfo";
import { useIsFocused } from "@react-navigation/native";

const SetOverviewScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { setId } = route.params;
  const allSets = useSelector((state) => state.sets.allSets);
  const today = useSelector((state) => state.settings.today);
  const targetSet = allSets.find((item) => item.setId === setId);
  const targetCards = targetSet.cards;
  const lastDaily = targetSet.lastDaily;
  const dailyCards = targetSet.dailyCards;
  const [dailyAllow, setDailyAllow] = useState(false);
  const isFocused = useIsFocused();
  const isDailyCardsCreateToday = targetSet.isDailyCardsCreateToday;
  const dailyCardsAmount = useSelector(
    (state) => state.settings.dailyCardsAmount
  );
  // const [cards, setCards] = useState(todayCards);

  // useEffect(() => {
  //   // console.table(targetCards);

  //   if (lastDaily !== new Date().toISOString().slice(0, 10) && isFocused) {
  //     // console.log(lastDaily);
  //     dispatch(setsActions.createDailyCards({ setId }));
  //     dispatch(setsActions.stageUpAllCards({ setId }));
  //     // console.log(targetSet.dailyCards);
  //     setDailyAllow(true);
  //   } else {
  //     setDailyAllow(false);
  //   }
  // }, [lastDaily, isFocused]);
  // useEffect(() => {
  //   if (lastDaily !== today && isFocused) {
  //     if (!isDailyCardsCreateToday) {
  //       dispatch(setsActions.createDailyCards({ setId, dailyCardsAmount }));
  //       dispatch(setsActions.stageUpAllCards({ setId }));
  //       dispatch(setsActions.changeCreationStatus({ setId }));
  //     }

  //     setDailyAllow(true);
  //   } else if (dailyCards.length > 0 && isFocused) {
  //     setDailyAllow(true);
  //   } else {
  //     setDailyAllow(false);
  //   }
  // }, [dailyCards, isFocused]);
  useEffect(() => {
    if ((lastDaily !== today || dailyCards.length > 0) && isFocused) {
      setDailyAllow(true);
    } else {
      setDailyAllow(false);
    }
  }, [dailyCards, isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: targetSet.name });
  }, []);
  const viewHandler = () => {
    navigation.navigate("viewCards", { setId, source: "sets" });
  };
  const addHandler = () => {
    navigation.navigate("cardFormScreen", { setId, mode: "new" });
  };
  const dailyModeHandler = () => {
    if (!dailyAllow) return;
    navigation.navigate("DailyModeScreen", { setId });
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
            title="Daily Mode"
            onPress={dailyModeHandler}
            icon="wb-sunny"
            bgcolor={dailyAllow ? AllColors.primary400 : AllColors.grey400}
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

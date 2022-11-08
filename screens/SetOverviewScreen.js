import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PrimaryButton from "../UI/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { AllColors } from "../UI/AllColors";
import { setsActions } from "../store/sets";

const SetOverviewScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const curSetId = route.params.setId;

  const allSets = useSelector((state) => state.sets.allSets);

  const targetSet = allSets.find((item) => item.setId === curSetId);
  const shuffle = targetSet.shuffle;
  useLayoutEffect(() => {
    navigation.setOptions({ title: targetSet.name });
  }, []);

  const changeShuffleHandler = () => {
    dispatch(setsActions.changeShuffle({ setId: curSetId }));
  };

  const viewHandler = () => {
    navigation.navigate("viewCards", { setId: curSetId });
  };
  const memorizeHandler = () => {
    navigation.navigate("memorizeScreen", { setId: curSetId });
  };
  const addHandler = () => {
    navigation.navigate("cardFormScreen", { setId: curSetId, mode: "new" });
  };

  const stageCounter = (cards, stage) => {
    const num = cards.reduce((sum, cur) => {
      if (cur.stage === stage) ++sum;
      return sum;
    }, 0);

    return num;
  };

  return (
    <View style={styles.screen}>
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Set info</Text>
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
        </View>
      </View>
      <PrimaryButton title="Add new card" onPress={addHandler} />
      <PrimaryButton title="View" onPress={viewHandler} />
      <PrimaryButton title="Memorize" onPress={memorizeHandler} />
    </View>
  );
};

export default SetOverviewScreen;
const styles = StyleSheet.create({
  // screen: { alignItems: "center" },
  row: {
    flexDirection: "row",
    alignItems: "center",
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
});

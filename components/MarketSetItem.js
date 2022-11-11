import { Pressable, Text, Alert, View, StyleSheet } from "react-native";
import PrimaryButton from "../UI/PrimaryButton";
import { setsActions } from "../store/sets";
import { useDispatch, useSelector } from "react-redux";
import { AllColors } from "../UI/AllColors";
import { useNavigation } from "@react-navigation/native";
const MarketSetItem = ({ name, description, cards, setId }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userSets = useSelector((state) => state.sets.allSets);

  const isExist = userSets.some((set) => set.setId === setId);

  const addFormMarketHandler = () => {
    // if (userSets.some((set) => set.setId === setId)) {
    //   Alert.alert(
    //     "Duplicat Flashcards",
    //     "This Flashcard set has been added already!"
    //   );
    // } else {
    //   dispatch(
    //     setsActions.addFromMarket({
    //       newSet: { name, description, cards, setId },
    //     })
    //   );
    // }
    dispatch(
      setsActions.addFromMarket({
        newSet: { name, description, cards, setId },
      })
    );
  };

  const openSetHandler = () => {
    navigation.navigate("setOverview", {
      setId,
    });
  };

  const pressHandler = () => {
    navigation.navigate("viewCards", { setId, source: "market" });
  };
  return (
    <Pressable style={styles.screen} onPress={pressHandler}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <PrimaryButton
          title={isExist ? "Open" : "Add"}
          onPress={isExist ? openSetHandler : addFormMarketHandler}
          bgcolor={isExist ? AllColors.green400 : AllColors.primary400}
        />
      </View>
      <View style={styles.cardsNumView}>
        <Text style={styles.cardsNumText}>cards: {cards.length}</Text>
      </View>
    </Pressable>
  );
};

export default MarketSetItem;
const styles = StyleSheet.create({
  screen: {
    padding: 15,
    backgroundColor: AllColors.primary100,
    borderRadius: 10,
    marginVertical: 8,
    paddingRight: 9,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    color: AllColors.primary500,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
    paddingLeft: 4,
  },
  description: {
    fontSize: 12,
    color: AllColors.grey500,
  },
  cardsNumView: {
    borderBottomColor: AllColors.primary400,
    borderBottomWidth: 2,
    paddingHorizontal: 5,
    paddingBottom: 2,
    alignSelf: "flex-end",
    marginRight: 10,
  },
  cardsNumText: {
    color: AllColors.primary400,
    fontSize: 12,
  },
  left: {
    flex: 1,
  },
});

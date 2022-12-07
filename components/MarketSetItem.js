import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { dbAddCard, dbNewSet } from "../store/database";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";

const MarketSetItem = ({ set, userSets }) => {
  const navigation = useNavigation();
  const [insertId, setInsertId] = useState();
  const [curLastMemorize, setCurLastMemorize] = useState();
  const [loading, setLoading] = useState(false);

  const userMarketIds = [];
  userSets.forEach((userSet) => {
    userMarketIds.push(userSet.marketId);
  });
  const [isExist, setIsExist] = useState(userMarketIds.includes(set.marketId));

  useEffect(() => {
    if (isExist) {
      const targetSet = userSets.find(
        (userSet) => userSet.marketId === set.marketId
      );
      if (!targetSet) return;

      setInsertId(targetSet.setId);
      setCurLastMemorize(targetSet.lastMemorize);
    }
  }, [isExist, userSets]);
  const addFormMarketHandler = async () => {
    setLoading(true);
    try {
      const res = await dbNewSet(set.setName, set.marketId);
      setInsertId(res.insertId);
      const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      setCurLastMemorize(yesterday);
      set.cards.forEach(async (card) => {
        await dbAddCard(res.insertId, card);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsExist(true);
    }
  };
  const viewCardshandler = () => {
    navigation.navigate("CardListScreen", {
      setName: set.setName,
      cards: set.cards,
      editable: false,
    });
  };
  const openSetHandler = () => {
    navigation.navigate("SetOverviewScreen", {
      setId: insertId,
      lastMemorize: curLastMemorize,
    });
  };
  return (
    <Pressable style={styles.screen} onPress={viewCardshandler}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.title}>{set.setName}</Text>
          <Text style={styles.description}>{set.description}</Text>
        </View>

        <PrimaryButton
          title={loading ? "loading..." : isExist ? "Open" : "Add"}
          onPress={isExist ? openSetHandler : addFormMarketHandler}
          bgcolor={isExist ? AllColors.green400 : AllColors.primary400}
        />
      </View>
      <View style={styles.cardsNumView}>
        <Text style={styles.cardsNumText}>cards: {set.cards.length}</Text>
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

import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import CardList from "../components/CardList";
import { dbFetchAllCards, dbFetchSetName } from "../store/database";

const CardListScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const { setId } = route.params;
  const [curCards, setCurCards] = useState([]);
  const [curSetName, setCurSetName] = useState();

  useEffect(() => {
    const fetchHandler = async () => {
      const cards = await dbFetchAllCards(setId);
      setCurCards(cards);
    };
    if (isFocused) {
      fetchHandler();
    }
    const namefetchHandler = async () => {
      const setName = await dbFetchSetName(setId);
      setCurSetName(setName);
    };
    namefetchHandler();

    navigation.setOptions({ title: curSetName });
  }, [isFocused, curSetName]);

  return <CardList cards={curCards} />;
};

export default CardListScreen;

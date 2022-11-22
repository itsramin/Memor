import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import CardList from "../components/CardList";
import { dbFetchAllCards } from "../store/database";

const CardListScreen = ({ route }) => {
  const isFocused = useIsFocused();
  const { setId } = route.params;
  const [curCards, setCurCards] = useState([]);

  useEffect(() => {
    const fetchHandler = async () => {
      const cards = await dbFetchAllCards(setId);
      setCurCards(cards);
    };
    if (isFocused) {
      fetchHandler();
    }
  }, [isFocused]);

  return <CardList cards={curCards} />;
};

export default CardListScreen;

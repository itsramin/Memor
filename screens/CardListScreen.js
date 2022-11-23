import { useIsFocused } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import CardList from "../components/CardList";
import { dbFetchAllCards } from "../store/database";

const CardListScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const { setId, setName } = route.params;
  const [curCards, setCurCards] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: setName });
  }, []);

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

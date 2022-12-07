// import { useIsFocused } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CardList from "../components/CardList";
import SearchCard from "../components/SearchCard";

const CardListScreen = ({ route, navigation }) => {
  const { setName, cards, deletedCard } = route.params;
  const isFocused = useIsFocused();
  const [cardsLoaded, setCardsLoaded] = useState(cards);
  const [filteredCards, setFilteredCards] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: setName });
  }, []);

  const filterCardsHandler = (cards) => {
    setFilteredCards(cards);
  };
  useEffect(() => {
    if (deletedCard && isFocused) {
      setCardsLoaded((prev) =>
        prev.filter((card) => card.cardId !== deletedCard)
      );
    }
  }, [deletedCard, isFocused]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <SearchCard cards={cardsLoaded} onFilterCards={filterCardsHandler} />
        <CardList cards={filteredCards} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CardListScreen;
const styles = StyleSheet.create({
  screen: { flex: 1 },
});

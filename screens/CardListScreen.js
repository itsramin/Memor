// import { useIsFocused } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import CardList from "../components/CardList";
import SearchCard from "../components/SearchCard";

const CardListScreen = ({ route, navigation }) => {
  const { setName, cards } = route.params;
  const [filteredCards, setFilteredCards] = useState([]);
  const [blur, setBlur] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: setName });
  }, []);

  const blurHandler = () => {
    setBlur((prev) => !prev);
  };

  const filterCardsHandler = (cards) => {
    setFilteredCards(cards);
  };

  return (
    <TouchableWithoutFeedback onPress={blurHandler}>
      <View style={styles.screen}>
        <SearchCard
          cards={cards}
          onFilterCards={filterCardsHandler}
          blur={blur}
        />
        <CardList cards={filteredCards} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CardListScreen;
const styles = StyleSheet.create({
  screen: { flex: 1 },
});

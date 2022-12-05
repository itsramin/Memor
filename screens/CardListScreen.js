// import { useIsFocused } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CardList from "../components/CardList";
import SearchCard from "../components/SearchCard";

const CardListScreen = ({ route, navigation }) => {
  const { setName, cards } = route.params;
  const [filteredCards, setFilteredCards] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: setName });
  }, []);

  const filterCardsHandler = (cards) => {
    setFilteredCards(cards);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <SearchCard cards={cards} onFilterCards={filterCardsHandler} />
        <CardList cards={filteredCards} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CardListScreen;
const styles = StyleSheet.create({
  screen: { flex: 1 },
});

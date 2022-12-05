import { useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { AllColors } from "../UI/AllColors";
import { MaterialIcons } from "@expo/vector-icons";

const SearchCard = ({ cards, onFilterCards }) => {
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const filteredCards = cards.filter(
      (card) =>
        card.question.includes(searchWord) || card.answer.includes(searchWord)
    );

    onFilterCards(filteredCards);
  }, [cards, searchWord]);
  return (
    <View style={styles.searchView}>
      <MaterialIcons
        name="search"
        style={styles.searchIcon}
        size={20}
        color={AllColors.grey400}
      />
      <TextInput
        style={styles.searchText}
        value={searchWord}
        onChangeText={(value) => setSearchWord(value)}
      />
    </View>
  );
};

export default SearchCard;
const styles = StyleSheet.create({
  screen: { paddingBottom: 16, flex: 1 },
  searchView: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 5,
    paddingRight: 30,
    borderRadius: 100,
    backgroundColor: AllColors.grey100,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginLeft: 6,
  },
  searchText: {
    marginHorizontal: 10,
    color: AllColors.primary500,
    flex: 1,
  },
});

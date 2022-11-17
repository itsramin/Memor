import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import CardItem from "../components/CardItem";
import { MaterialIcons } from "@expo/vector-icons";
import { AllColors } from "../UI/AllColors";

const ViewCardsList = ({ targetSet, allowPress }) => {
  const navigation = useNavigation();

  const [searchWord, setSearchWord] = useState("");
  const [cards, setCards] = useState(targetSet.cards);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: targetSet.name,
    });
  }, []);

  useEffect(() => {
    setCards(
      targetSet.cards.filter(
        (card) =>
          card.question.includes(searchWord) || card.answer.includes(searchWord)
      )
    );
  }, [searchWord]);

  const renderItemHandler = (itemData) => {
    const cardPressHandler = () => {
      allowPress &&
        navigation.navigate("cardFormScreen", {
          question: itemData.item.question,
          answer: itemData.item.answer,
          setId: itemData.item.setId,
          cardId: itemData.item.cardId,
          mode: "edit",
        });
    };
    return (
      <CardItem
        nextReview={itemData.item.nextReview}
        question={itemData.item.question}
        answer={itemData.item.answer}
        onPress={cardPressHandler}
      />
    );
  };
  return (
    <View style={styles.screen}>
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
      <FlatList
        data={cards}
        keyExtractor={(item) => item.cardId}
        renderItem={renderItemHandler}
      />
    </View>
  );
};

export default ViewCardsList;

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

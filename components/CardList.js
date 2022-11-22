import { FlatList, Text, View } from "react-native";
import CardItem from "./CardItem";

const CardList = ({ cards }) => {
  const renderItemHandler = (itemData) => {
    return (
      <CardItem
        question={itemData.item.question}
        answer={itemData.item.answer}
        cardId={itemData.item.cardId}
        setId={itemData.item.setId}
      />
    );
  };

  if (cards.length === 0) {
    return (
      <View>
        <Text>No Cards</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={cards}
      keyExtractor={(item) => item.cardId}
      renderItem={renderItemHandler}
    />
  );
};

export default CardList;

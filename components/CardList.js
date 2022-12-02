// import { memo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { AllColors } from "../UI/AllColors";
import CardItem from "./CardItem";

const CardList = ({ cards }) => {
  const renderItemHandler = (itemData) => {
    return (
      <CardItem
        question={itemData.item.question}
        answer={itemData.item.answer}
        cardId={itemData.item.cardId}
        setId={itemData.item.setId}
        stage={itemData.item.stage}
        index={itemData.index + 1}
      />
    );
  };

  return (
    <FlatList
      data={cards}
      keyExtractor={(item) => item.cardId}
      renderItem={renderItemHandler}
    />
  );
};

export default CardList;
const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 20, color: AllColors.primary400 },
});

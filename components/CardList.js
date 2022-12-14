import { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import { dbDeleteCard } from "../store/database";
import CardItem from "./CardItem";

const CardList = ({ cards }) => {
  const [multiSelectActive, setMultiselectActive] = useState(false);

  const [deletedArr, setDeletedArr] = useState([]);
  const [loadedCards, setLoadedCards] = useState([]);

  useEffect(() => {
    setLoadedCards(cards);
  }, [cards]);

  const renderItemHandler = (itemData) => {
    const changeMultiSelectHandler = () => {
      setMultiselectActive((prev) => !prev);
    };
    const addToDeleteArrHandler = (cardId) => {
      setDeletedArr((prev) => [...prev, cardId]);
    };

    const cleanFromDeleteArrHandler = (cardId) => {
      setDeletedArr((prev) => prev.filter((id) => id !== cardId));
    };
    const cleanArrHandler = () => {
      setDeletedArr([]);
    };

    const deleteCardsHandler = () => {
      Alert.alert("Warning", "Are You sure you want to delete these cards?", [
        { text: "No" },
        {
          text: "Yes",
          onPress: () => {
            deletedArr.forEach(async (card) => {
              await dbDeleteCard(card);
            });
            deletedArr.forEach((cardId) => {
              setLoadedCards((prev) =>
                prev.filter((card) => card.cardId !== cardId)
              );
            });
          },
        },
      ]);
    };

    return (
      <CardItem
        question={itemData.item.question}
        answer={itemData.item.answer}
        cardId={itemData.item.cardId}
        setId={itemData.item.setId}
        stage={itemData.item.stage}
        index={itemData.item.indexNum}
        multiSelectActive={multiSelectActive}
        onToggleMultiSelect={changeMultiSelectHandler}
        onAddToDeleteArr={addToDeleteArrHandler}
        onDeleteCards={deleteCardsHandler}
        onCleanCard={cleanFromDeleteArrHandler}
        onCleanArr={cleanArrHandler}
      />
    );
  };

  return (
    <FlatList
      data={loadedCards}
      keyExtractor={(item) => item.cardId}
      renderItem={renderItemHandler}
    />
  );
};

export default CardList;

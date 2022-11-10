import { useLayoutEffect } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import CardItem from "../components/CardItem";

const ViewScreen = ({ route, navigation }) => {
  const curSetId = route.params.setId;
  const allSets = useSelector((state) => state.sets.allSets);

  const targetSet = allSets.find((item) => item.setId === curSetId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: targetSet.name });
  }, []);

  const renderItemHandler = (itemData) => {
    const cardPressHandler = () => {
      navigation.navigate("cardFormScreen", {
        question: itemData.item.question,
        answer: itemData.item.answer,
        setId: curSetId,
        cardId: itemData.item.cardId,
        mode: "edit",
      });
    };
    return (
      <CardItem
        question={itemData.item.question}
        answer={itemData.item.answer}
        onPress={cardPressHandler}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={targetSet.cards}
        keyExtractor={(item) => item.cardId}
        renderItem={renderItemHandler}
      />
    </View>
  );
};

export default ViewScreen;

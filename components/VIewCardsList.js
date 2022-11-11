import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { FlatList, View } from "react-native";
import CardItem from "../components/CardItem";

const ViewCardsList = ({ targetSet, allowPress }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ title: targetSet.name });
  }, []);

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

export default ViewCardsList;

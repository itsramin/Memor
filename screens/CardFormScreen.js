import { useLayoutEffect } from "react";
import { Alert } from "react-native";
import CardFormItem from "../components/CardFormItem";
import { MaterialIcons } from "@expo/vector-icons";
import { dbDeleteCard } from "../store/database";

const CardFormScreen = ({ route, navigation }) => {
  const { setId, cardId, answer, question } = route.params;

  const deleteCardHandler = () => {
    Alert.alert("Delete Card", "Are you sure you want to delete this card?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          await dbDeleteCard(cardId);
          navigation.navigate("CardListScreen", {
            deletedCard: cardId,
            editable: true,
          });
        },
      },
    ]);
  };

  useLayoutEffect(() => {
    if (cardId) {
      navigation.setOptions({
        headerRight: ({ tintColor }) => {
          return (
            <MaterialIcons
              name="delete"
              size={20}
              color={tintColor}
              onPress={deleteCardHandler}
            />
          );
        },
      });
    }
  }, []);
  return (
    <CardFormItem
      setId={setId}
      cardId={cardId}
      answer={answer}
      question={question}
    />
  );
};

export default CardFormScreen;

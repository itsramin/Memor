import { useLayoutEffect } from "react";
import { Alert, View } from "react-native";
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
          navigation.goBack();
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
    <View>
      <CardFormItem
        setId={setId}
        cardId={cardId}
        answer={answer}
        question={question}
      />
    </View>
  );
};

export default CardFormScreen;

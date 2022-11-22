import { useLayoutEffect } from "react";
import { View } from "react-native";
import CardFormItem from "../components/CardFormItem";
import { MaterialIcons } from "@expo/vector-icons";
import { dbDeleteCard } from "../store/database";

const CardFormScreen = ({ route, navigation }) => {
  const { setId, cardId, answer, question } = route.params;

  const deleteCardHandler = async () => {
    await dbDeleteCard(cardId);
    navigation.navigate("CardListScreen", { setId });
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

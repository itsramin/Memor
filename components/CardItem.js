import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { AllColors } from "../UI/AllColors";

const CardItem = ({ question, answer, cardId, setId }) => {
  const navigation = useNavigation();

  const pressCardHandler = () => {
    navigation.navigate("CardFormScreen", { cardId, question, answer, setId });
  };
  return (
    <Pressable style={styles.outer} onPress={pressCardHandler}>
      <View style={styles.question}>
        <Text style={styles.text}>{question}</Text>
      </View>
      <View>
        <Text style={styles.text}>{answer}</Text>
      </View>
    </Pressable>
  );
};

export default CardItem;
const styles = StyleSheet.create({
  outer: {
    backgroundColor: AllColors.primary100,
    padding: 8,
    marginVertical: 8,
    borderRadius: 6,
    margin: 8,
  },
  question: {
    borderBottomColor: AllColors.primary300,
    borderBottomWidth: 1,
    marginBottom: 8,
    paddingBottom: 8,
  },
  text: {
    color: AllColors.primary500,
    margin: 5,
  },
});

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { dbAddCard, dbUpdateCard } from "../store/database";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";

const CardFormItem = ({ setId, cardId, answer, question }) => {
  const navigation = useNavigation();

  const [questionText, setQuestionText] = useState(cardId ? question : "");
  const [answerText, setAnswerText] = useState(cardId ? answer : "");

  const questionChangeHandler = (value) => {
    setQuestionText(value);
  };
  const answerChangeHandler = (value) => {
    setAnswerText(value);
  };

  const saveCardHandler = async () => {
    if (questionText.trim() === "" || answerText.trim() === "") return;

    if (cardId) {
      const updateCard = {
        cardId,
        answer: answerText,
        question: questionText,
      };
      await dbUpdateCard(updateCard);
    } else {
      const newCard = {
        setId,
        answer: answerText,
        question: questionText,
      };
      await dbAddCard(newCard);
    }
    setQuestionText("");
    setAnswerText("");

    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.control}>
        <Text style={styles.label}>Question</Text>
        <TextInput
          value={questionText}
          onChangeText={questionChangeHandler}
          style={styles.input}
          multiline
          numberOfLines={4}
        />
      </View>
      <View style={styles.control}>
        <Text style={styles.label}>Answer</Text>
        <TextInput
          value={answerText}
          onChangeText={answerChangeHandler}
          style={styles.input}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          title={cardId ? "Update" : "Add"}
          onPress={saveCardHandler}
        />
        <PrimaryButton
          title="Cancel"
          bgcolor={AllColors.primary100}
          textColor={AllColors.primary400}
        />
      </View>
    </View>
  );
};

export default CardFormItem;

const styles = StyleSheet.create({
  control: {
    marginVertical: 8,
  },
  label: {
    color: AllColors.primary500,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: AllColors.primary100,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
  },
  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
});

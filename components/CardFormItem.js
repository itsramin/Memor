import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { dbAddCard, dbUpdateCard } from "../store/database";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";

const CardFormItem = ({ setId, cardId, answer, question }) => {
  const navigation = useNavigation();
  const questionRef = useRef();
  const answerRef = useRef();

  const [questionText, setQuestionText] = useState(cardId ? question : "");
  const [answerText, setAnswerText] = useState(cardId ? answer : "");

  const [questionIsInvalid, setQuestionIsInvalid] = useState(false);
  const [answerIsInvalid, setAnswerIsInvalid] = useState(false);

  const questionChangeHandler = (value) => {
    setQuestionText(value);
    setQuestionIsInvalid(false);
  };
  const answerChangeHandler = (value) => {
    setAnswerText(value);
    setAnswerIsInvalid(false);
  };

  const saveCardHandler = async (status) => {
    if (questionText.trim() === "") {
      setQuestionIsInvalid(true);
      answerText.trim() === "" && setAnswerIsInvalid(true);
      questionRef.current.focus();
      return;
    }
    if (answerText.trim() === "") {
      answerRef.current.focus();
      setAnswerIsInvalid(true);
      return;
    }

    if (cardId) {
      const updateCard = {
        cardId,
        answer: answerText,
        question: questionText,
      };
      await dbUpdateCard(updateCard);
    } else {
      const newCard = {
        answer: answerText,
        question: questionText,
      };
      await dbAddCard(setId, newCard);
    }
    setQuestionText("");
    setAnswerText("");

    questionRef.current.focus();
    if (status !== "stay") return navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.control}>
        <Text style={styles.label}>
          Question{"  "}
          {questionIsInvalid && <Text style={styles.error}>requried</Text>}
        </Text>
        <TextInput
          value={questionText}
          onChangeText={questionChangeHandler}
          style={styles.input}
          multiline
          numberOfLines={4}
          ref={questionRef}
        />
      </View>
      <View style={styles.control}>
        <Text style={styles.label}>
          Answer{"  "}
          {answerIsInvalid && <Text style={styles.error}>requried</Text>}
        </Text>
        <TextInput
          value={answerText}
          onChangeText={answerChangeHandler}
          style={styles.input}
          multiline
          numberOfLines={4}
          ref={answerRef}
        />
      </View>

      <View style={styles.actions}>
        {!cardId && (
          <PrimaryButton
            title="Add & Stay"
            onPress={saveCardHandler.bind(this, "stay")}
          />
        )}
        <PrimaryButton
          title={cardId ? "Update" : "Add"}
          onPress={saveCardHandler}
        />
        <PrimaryButton
          title="Cancel"
          bgcolor={AllColors.primary100}
          textColor={AllColors.primary400}
          onPress={cancelHandler}
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
  error: { color: AllColors.red400, fontWeight: "normal", fontSize: 14 },
});

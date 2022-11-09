import { TextInput, Text, View, StyleSheet } from "react-native";

import { AllColors } from "../UI/AllColors";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../UI/PrimaryButton";
import { useEffect, useState } from "react";

const CardForm = ({ mode, submitCard, questionData, answerData }) => {
  const [question, setQuestion] = useState(mode === "edit" ? questionData : "");
  const [answer, setAnswer] = useState(mode === "edit" ? answerData : "");

  const questionInvalid = question.trim().length < 1;
  const answerInvalid = answer.trim().length < 1;

  const [questionTouched, setQuestionTouched] = useState(false);
  const [answerTouched, setAnswerTouched] = useState(false);

  const questionChangeHandler = (value) => {
    setQuestion(value);
  };
  const answerChangeHandler = (value) => {
    setAnswer(value);
  };

  const formIsDone =
    questionTouched && answerTouched && !questionInvalid && !answerInvalid;

  useEffect(() => {
    formIsDone && submitCard({ question, answer });
  }, [formIsDone]);
  return (
    <View style={styles.outer}>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Front</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.text}
            value={question}
            multiline={true}
            numberOfLines={3}
            onChangeText={questionChangeHandler}
            onBlur={() => {
              setQuestionTouched(true);
            }}
          />
        </View>
        {questionTouched && questionInvalid && (
          <Text style={styles.error}>* required</Text>
        )}
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Back</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.text}
            value={answer}
            multiline={true}
            numberOfLines={3}
            onChangeText={answerChangeHandler}
            onBlur={() => {
              setAnswerTouched(true);
            }}
          />
        </View>
        {answerTouched && answerInvalid && (
          <Text style={styles.error}>* required</Text>
        )}
      </View>
    </View>
  );
};

export default CardForm;
const styles = StyleSheet.create({
  outer: {
    padding: 8,
  },
  inputBox: {
    marginVertical: 8,
  },

  label: {
    color: AllColors.primary500,
    marginVertical: 4,
  },
  inputView: {
    backgroundColor: AllColors.primary100,
    padding: 8,
    borderRadius: 6,
  },

  text: {
    color: AllColors.primary500,
    margin: 5,
    textAlignVertical: "top",
  },
  actions: {
    marginVertical: 16,
    flexDirection: "row",
  },
  btn: {
    flex: 1,
    justifyContent: "center",
  },
  error: {
    color: AllColors.red500,
    fontSize: 12,
    marginVertical: 4,
    marginHorizontal: 4,
  },
});

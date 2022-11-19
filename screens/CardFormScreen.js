import { TextInput, Text, View, StyleSheet } from "react-native";
import { AllColors } from "../UI/AllColors";
import { MaterialIcons } from "@expo/vector-icons";
import PrimaryButton from "../UI/PrimaryButton";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setsActions } from "../store/sets";

const CardFormScreen = ({ route, navigation }) => {
  const { setId, cardId, mode } = route.params;
  const dispatch = useDispatch();

  const [question, setQuestion] = useState(
    mode === "edit" ? route.params.question : ""
  );
  const [answer, setAnswer] = useState(
    mode === "edit" ? route.params.answer : ""
  );

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
  const cancelHandler = () => {
    navigation.goBack();
  };

  const deleteCardHandler = () => {
    dispatch(
      setsActions.deleteCard({
        setId,
        cardId,
      })
    );
    navigation.goBack();
  };

  const saveHandler = (status) => {
    if (questionInvalid || answerInvalid) {
      setAnswerTouched(true);
      setQuestionTouched(true);
      return;
    }
    if (mode === "edit") {
      dispatch(
        setsActions.updateCard({
          setId,
          cardId,
          answer,
          question,
        })
      );
    } else {
      dispatch(
        setsActions.addCard({
          setId,
          answer,
          question,
        })
      );
    }
    if (status === "stay") {
      setAnswerTouched(false);
      setQuestionTouched(false);
      setQuestion("");
      setAnswer("");
    } else {
      navigation.goBack();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: mode === "edit" ? "Edit Card" : "Add new Card",
      headerRight: () => {
        return (
          mode === "edit" && (
            <MaterialIcons
              name="delete"
              size={20}
              color="white"
              onPress={deleteCardHandler}
            />
          )
        );
      },
    });
  }, []);

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
      <View style={styles.actions}>
        {mode === "new" && (
          <PrimaryButton
            title="Save & Stay"
            onPress={saveHandler.bind(this, "stay")}
            style={styles.btn}
          />
        )}
        <PrimaryButton
          title="Save"
          onPress={saveHandler.bind(this, "back")}
          style={styles.btn}
        />
        <PrimaryButton
          title="Cancel"
          onPress={cancelHandler}
          bgcolor={AllColors.primary100}
          textColor={AllColors.primary500}
          style={styles.btn}
        />
      </View>
    </View>
  );
};

export default CardFormScreen;
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

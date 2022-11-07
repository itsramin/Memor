import { TextInput, Text, View, StyleSheet } from "react-native";

import { AllColors } from "../UI/AllColors";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../UI/PrimaryButton";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setsActions } from "../store/sets";

const EditScreen = ({ route, navigation }) => {
  const { setId, cardId } = route.params;
  const dispatch = useDispatch();

  const [question, setQuestion] = useState(route.params.question);
  const [answer, setAnswer] = useState(route.params.answer);

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
  const updateCardHandler = () => {
    dispatch(
      setsActions.updateCard({
        setId,
        cardId,
        answer,
        question,
      })
    );
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit Card",
      headerRight: () => {
        return (
          <Ionicons
            name="trash-bin"
            size={20}
            color="white"
            onPress={deleteCardHandler}
          />
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
            onChangeText={questionChangeHandler}
          />
        </View>
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Back</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.text}
            value={answer}
            onChangeText={answerChangeHandler}
          />
        </View>
      </View>
      <View style={styles.actions}>
        <PrimaryButton
          title="Save"
          onPress={updateCardHandler}
          style={styles.btn}
        />
        <PrimaryButton
          title="Cancel"
          onPress={cancelHandler}
          bgcolor={AllColors.primary100}
          textColor={AllColors.primary400}
          style={styles.btn}
        />
      </View>
    </View>
  );
};

export default EditScreen;
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
  },
  actions: {
    marginVertical: 16,
    flexDirection: "row",

    // alignItems: "center",
  },
  btn: {
    flex: 1,
  },
});

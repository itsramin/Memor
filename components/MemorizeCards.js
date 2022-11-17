import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MemorizeSummary from "../components/MemorizeSummary";
import { setsActions } from "../store/sets";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";
import ProgressBar from "../UI/ProgressBar";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MemorizeCards = ({ cards, setId, minStage, mode }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [cardNum, setCardNum] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [cardsOver, setCardsOver] = useState(false);

  const [correctNum, setCorrectNum] = useState(0);
  const [wrongNum, setWrongNum] = useState(0);

  const showAnswerHandler = () => {
    setAnswerVisible((prev) => !prev);
  };
  const card = cards[cardNum];
  const responseHandler = (status) => {
    status === "no"
      ? setWrongNum((prev) => prev + 1)
      : setCorrectNum((prev) => prev + 1);

    if (mode === "daily") {
      let daysCount = 2;
      if (status === "easy") daysCount = 4;
      if (status === "very easy") daysCount = 6;

      dispatch(
        setsActions.changeDate({
          days: daysCount,
          setId: setId,
          cardId: cards[cardNum].cardId,
        })
      );
    } else {
      if (status !== "no") {
        dispatch(
          setsActions.changeStage({
            setId,
            cardId: cards[cardNum].cardId,
          })
        );
      }
    }

    if (cardNum === cards.length - 1) {
      return setCardsOver(true);
    }

    setCardNum((prev) => prev + 1);
  };
  const backHandler = () => {
    navigation.goBack();
    dispatch(setsActions.changeLastDaily({ setId, lastDaily: new Date() }));
  };

  let content = (
    <View style={styles.screen}>
      <View>
        <ProgressBar progress={(cardNum + 1) / cards.length} />
        <Text style={styles.progressText}>
          {cardNum + 1} of {cards.length}
        </Text>
      </View>
      <Pressable style={styles.qaView} onPress={showAnswerHandler}>
        <Text style={styles.text}>
          {answerVisible ? card.answer : card.question}
        </Text>
      </Pressable>

      {mode !== "daily" && (
        <View style={styles.actions}>
          <PrimaryButton
            title={
              <MaterialIcons name="cancel" color={AllColors.red400} size={40} />
            }
            onPress={responseHandler.bind(this, "no")}
            bgcolor="transparent"
          />
          <PrimaryButton
            title={
              <MaterialIcons
                name="check-circle"
                color={AllColors.green400}
                size={40}
              />
            }
            onPress={responseHandler.bind(this, "yes")}
            bgcolor="transparent"
          />
        </View>
      )}
      {mode == "daily" && (
        <View style={styles.actions}>
          <PrimaryButton
            title="No"
            onPress={responseHandler.bind(this, "no")}
            bgcolor={AllColors.red500}
          />
          <PrimaryButton
            title="Normal"
            onPress={responseHandler.bind(this, "normal")}
            bgcolor={AllColors.green300}
          />
          <PrimaryButton
            title="Easy"
            onPress={responseHandler.bind(this, "easy")}
            bgcolor={AllColors.green400}
          />
          <PrimaryButton
            title="Very easy"
            onPress={responseHandler.bind(this, "very easy")}
            bgcolor={AllColors.green500}
          />
        </View>
      )}
    </View>
  );
  if (cardsOver) {
    content = (
      <MemorizeSummary
        correctNum={correctNum}
        wrongNum={wrongNum}
        onPress={backHandler}
        stage={minStage}
      />
    );
  }
  return content;
};

export default MemorizeCards;
const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "space-between" },
  qaView: {
    padding: 16,
    borderColor: AllColors.primary400,
    backgroundColor: AllColors.primary100,
    borderWidth: 2,
    borderRadius: 6,
    marginBottom: 16,
    minHeight: 150,
    justifyContent: "center",
  },
  text: {
    color: AllColors.primary500,
    textAlign: "center",
    fontSize: 24,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  progressText: {
    textAlign: "center",
  },
});

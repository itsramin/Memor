import { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SummaryInfo from "../components/SummaryInfo";
import { setsActions } from "../store/sets";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";
const MemorizeScreen = ({ route, navigation }) => {
  const curSetId = route.params.setId;
  const dispatch = useDispatch();
  const allSets = useSelector((state) => state.sets.allSets);

  const targetSet = allSets.find((item) => item.setId === curSetId);

  const [cardNum, setCardNum] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [cardsOver, setCardsOver] = useState(false);

  const [correctNum, setCorrectNum] = useState(0);
  const [wrongNum, setWrongNum] = useState(0);

  const btnHandler = (status) => {
    status === "yes"
      ? setCorrectNum((prev) => prev + 1)
      : setWrongNum((prev) => prev + 1);

    if (cardNum === targetSet.cards.length - 1) {
      setCardsOver(true);
      return;
    }
    setCardNum((prev) => prev + 1);

    dispatch(
      setsActions.changeDate({
        days: status === "yes" ? 6 : 2,
        setId: curSetId,
        cardId: targetSet.cards[cardNum].cardId,
      })
    );
  };

  const qaBoxHandler = () => {
    setShowAnswer((prev) => !prev);
  };
  const backHandler = () => {
    navigation.goBack();
  };

  let content = (
    <View>
      <Pressable style={styles.qaView} onPress={qaBoxHandler}>
        {!showAnswer ? (
          <Text style={styles.text}>{targetSet.cards[cardNum].question}</Text>
        ) : (
          <Text style={styles.text}>{targetSet.cards[cardNum].answer}</Text>
        )}
      </Pressable>

      <PrimaryButton
        title="Yes"
        onPress={btnHandler.bind(this, "yes")}
        bgcolor={AllColors.green500}
      />
      <PrimaryButton
        title="No"
        onPress={btnHandler.bind(this, "no")}
        bgcolor={AllColors.red500}
      />
    </View>
  );

  if (cardsOver) {
    content = (
      <SummaryInfo
        correctNum={correctNum}
        wrongNum={wrongNum}
        onPress={backHandler}
      />
    );
  }
  return content;
};

export default MemorizeScreen;
const styles = StyleSheet.create({
  qaView: {
    padding: 16,
    backgroundColor: AllColors.primary300,
    borderRadius: 6,
    marginBottom: 16,
  },
  text: {
    color: "white",
  },
});

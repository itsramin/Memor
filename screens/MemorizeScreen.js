import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MemorizeSummary from "../components/MemorizeSummary";
import { shuffleArr } from "../helper/shuffle";
import { setsActions } from "../store/sets";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";

const MemorizeScreen = ({ route, navigation }) => {
  const curSetId = route.params.setId;
  const dispatch = useDispatch();
  const allSets = useSelector((state) => state.sets.allSets);

  const targetSet = allSets.find((item) => item.setId === curSetId);
  const shuffle = useSelector((state) => state.sets.shuffle);

  const [cardNum, setCardNum] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [cardsOver, setCardsOver] = useState(false);

  const [correctNum, setCorrectNum] = useState(0);
  const [wrongNum, setWrongNum] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${targetSet.name} Memorize`,
    });
  }, []);

  const btnHandler = (status) => {
    status === "no"
      ? setWrongNum((prev) => prev + 1)
      : setCorrectNum((prev) => prev + 1);

    if (cardNum === targetSet.cards.length - 1) {
      setCardsOver(true);
      return;
    }
    setCardNum((prev) => prev + 1);
    let daysCount = 2;
    if (status === "easy") daysCount = 4;
    if (status === "very easy") daysCount = 6;

    dispatch(
      setsActions.changeDate({
        days: daysCount,
        setId: curSetId,
        cardId: targetSet.cards[cardNum].cardId,
      })
    );
    if (status !== "no")
      dispatch(
        setsActions.changeStage({
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
  const setCards = [...targetSet.cards];

  const cards = shuffle ? shuffleArr(setCards) : setCards;

  const card = cards[cardNum];

  let content = (
    <View>
      <Pressable style={styles.qaView} onPress={qaBoxHandler}>
        {!showAnswer ? (
          <Text style={styles.text}>{card.question}</Text>
        ) : (
          <Text style={styles.text}>{card.answer}</Text>
        )}
      </Pressable>

      <PrimaryButton
        title="Very easy"
        onPress={btnHandler.bind(this, "very easy")}
        bgcolor={AllColors.green500}
      />
      <PrimaryButton
        title="Easy"
        onPress={btnHandler.bind(this, "easy")}
        bgcolor={AllColors.green400}
      />
      <PrimaryButton
        title="Normal"
        onPress={btnHandler.bind(this, "normal")}
        bgcolor={AllColors.green300}
      />
      <PrimaryButton
        title="I don't know"
        onPress={btnHandler.bind(this, "no")}
        bgcolor={AllColors.red500}
      />
    </View>
  );

  if (cardsOver) {
    content = (
      <MemorizeSummary
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
    // backgroundColor: AllColors.primary300,
    borderColor: AllColors.primary300,
    borderWidth: 2,
    borderRadius: 6,
    marginBottom: 16,
    minHeight: 150,
    justifyContent: "center",
  },
  text: {
    color: AllColors.primary300,
    textAlign: "center",
    fontSize: 24,
  },
});

import { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MemorizeSummary from "../components/MemorizeSummary";
import { shuffleArr } from "../helper/shuffle";
import { setsActions } from "../store/sets";
import { AllColors } from "../UI/AllColors";
import PrimaryButton from "../UI/PrimaryButton";
import ProgressBar from "../UI/ProgressBar";

const MemorizeScreen = ({ route, navigation }) => {
  const curSetId = route.params.setId;
  const { cards, minStage } = route.params;
  const dispatch = useDispatch();
  const allSets = useSelector((state) => state.sets.allSets);

  const targetSet = allSets.find((item) => item.setId === curSetId);
  // const shuffle = useSelector((state) => state.sets.shuffle);
  // console.log(shuffle);

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

  const qaBoxHandler = () => {
    setShowAnswer((prev) => !prev);
  };
  const backHandler = () => {
    navigation.goBack();
  };

  // const minStage = targetSet.cards.reduce((min, cur) => {
  //   if (cur.stage < min) min = cur.stage;
  //   return min;
  // }, 4);

  // console.log(minStage);
  // const allCards = targetSet.cards.filter((card) => card.stage === minStage);

  // const cards = shuffle ? shuffleArr(allCards) : allCards;
  // console.log(cards.length);
  // const [cards, setCards] = useState(initCards);

  const card = cards[cardNum];
  const btnHandler = (status) => {
    status === "no"
      ? setWrongNum((prev) => prev + 1)
      : setCorrectNum((prev) => prev + 1);

    let daysCount = 2;
    if (status === "easy") daysCount = 4;
    if (status === "very easy") daysCount = 6;

    if (status !== "no") {
      // dispatch(
      //   setsActions.changeDate({
      //     days: daysCount,
      //     setId: curSetId,
      //     cardId: cards[cardNum].cardId,
      //   })
      // );
      dispatch(
        setsActions.changeStage({
          setId: curSetId,
          cardId: cards[cardNum].cardId,
        })
      );
    }

    if (cardNum === cards.length - 1) {
      return setCardsOver(true);
    }

    setCardNum((prev) => prev + 1);
  };

  let content = (
    <View>
      <ProgressBar progress={(cardNum + 1) / cards.length} />
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
        stage={minStage}
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

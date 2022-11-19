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
import { shuffleArr } from "../helper/shuffle";

const MemorizeCards = ({ cards, setId }) => {
  // console.log("cards", cards.length, cards);
  // console.log("size", size);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const [cardNum, setCardNum] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [cardsOver, setCardsOver] = useState(false);

  const [correctNum, setCorrectNum] = useState(0);
  const [wrongNum, setWrongNum] = useState(0);

  const shuffle = useSelector((state) => state.settings.shuffle);

  const showAnswerHandler = () => {
    setAnswerVisible((prev) => !prev);
  };

  const cardNum = shuffle ? Math.floor(Math.random() * cards.length) : 0;
  const card = cards[cardNum];
  const responseHandler = (status) => {
    dispatch(setsActions.changeLastDaily({ setId, lastDaily: new Date() }));
    status === "no"
      ? setWrongNum((prev) => prev + 1)
      : setCorrectNum((prev) => prev + 1);

    if (status === "yes") {
      dispatch(setsActions.stageUpCurCard({ setId, cardId: card.cardId }));
    } else {
      dispatch(setsActions.stageDownCurCard({ setId, cardId: card.cardId }));
    }
    // console.log(cards.length);

    if (cards.length === 1) {
      return setCardsOver(true);
    }

    // setCardNum((prev) => prev + 1);
  };
  const backHandler = () => {
    navigation.goBack();
  };

  let content = (
    <MemorizeSummary
      correctNum={correctNum}
      wrongNum={wrongNum}
      onPress={backHandler}
    />
  );

  if (!cardsOver) {
    content = (
      <View style={styles.screen}>
        <View>
          <Text style={styles.progressText}>Cards left : {cards.length}</Text>
          {/* <ProgressBar progress={(cardNum + 1) / cards.length} />
        <Text style={styles.progressText}>
          {cardNum + 1} of {cards.length}
        </Text> */}
        </View>
        <Pressable style={styles.qaView} onPress={showAnswerHandler}>
          <Text style={styles.text}>
            {answerVisible ? card.answer : card.question}
          </Text>
          <Text>
            {card.cardId} - {card.stage}
          </Text>
        </Pressable>

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
      </View>
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

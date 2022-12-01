import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  dbStageDown,
  dbStageUp,
  dbUpdateMemorizeStatus,
  dbUpdateTodayDone,
} from "../store/database";
import { AllColors } from "../UI/AllColors";
import IconButton from "../UI/IconButton";
import ProgressBar from "../UI/ProgressBar";
import CardFlipItem from "./CardFlipItem";
const MemorizeCards = ({ cards, setId }) => {
  const navigation = useNavigation();
  const cardsCount = cards.length;
  const [curNum, setCurNum] = useState(0);
  const [correctNum, setCorrectNum] = useState(0);
  const [wrongNum, setWrongNum] = useState(0);

  const progress = (curNum + 1) / cardsCount;
  const responseHandler = async (status) => {
    if (status === "yes") {
      setCorrectNum((prev) => prev + 1);
      await dbStageUp(cards[curNum].cardId);
    } else {
      setWrongNum((prev) => prev + 1);
      await dbStageDown(cards[curNum].cardId);
    }
    await dbUpdateMemorizeStatus(cards[curNum].cardId, 0);
    if (curNum === cardsCount - 1) {
      await dbUpdateTodayDone(setId, 1);

      status === "yes"
        ? navigation.navigate("MemorizeSummary", {
            setId,
            correctNum: correctNum + 1,
            wrongNum,
          })
        : navigation.navigate("MemorizeSummary", {
            setId,
            correctNum,
            wrongNum: wrongNum + 1,
          });
      return;
    }

    setCurNum((prev) => prev + 1);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.progressView}>
        <ProgressBar progress={progress} />
        <Text style={styles.progressLabel}>
          {curNum + 1} of {cardsCount}
        </Text>
      </View>
      <View>
        <CardFlipItem card={cards[curNum]} />
      </View>
      <View style={styles.actions}>
        <IconButton
          icon="cancel"
          bgcolor={AllColors.red400}
          onPress={responseHandler.bind(this, "no")}
        />
        <IconButton
          icon="check-circle"
          bgcolor={AllColors.green400}
          onPress={responseHandler.bind(this, "yes")}
        />
      </View>
    </View>
  );
};

export default MemorizeCards;
const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "space-between" },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  progressView: {
    alignItems: "center",
  },
  progressLabel: {
    color: AllColors.primary400,
  },
});

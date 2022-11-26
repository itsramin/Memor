import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AllColors } from "../UI/AllColors";
import IconButton from "../UI/IconButton";
import CardFlipItem from "./CardFlipItem";
const MemorizeCards = ({ cards, setId }) => {
  const navigation = useNavigation();
  const cardsCount = cards.length;
  const [curNum, setCurNum] = useState(0);
  const [correctNum, setCorrectNum] = useState(0);
  const [wrongNum, setWrongNum] = useState(0);

  const responseHandler = (status) => {
    if (status === "yes") {
      setCorrectNum((prev) => prev + 1);
    } else {
      setWrongNum((prev) => prev + 1);
    }

    if (curNum === cardsCount - 1) {
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
      <View></View>
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
});

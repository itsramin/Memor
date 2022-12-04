import { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { AllColors } from "../UI/AllColors";

const CardFlipItem = ({ card }) => {
  const [answerVisible, setAnswerVisible] = useState(false);
  const showAnswerHandler = () => {
    setAnswerVisible((prev) => !prev);
  };
  return (
    <Pressable style={styles.qaView} onPress={showAnswerHandler}>
      <Text style={styles.text}>
        {answerVisible ? card.answer : card.question}
      </Text>
    </Pressable>
  );
};

export default CardFlipItem;
const styles = StyleSheet.create({
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
});

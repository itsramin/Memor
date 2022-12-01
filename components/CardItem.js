import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { AllColors } from "../UI/AllColors";

const CardItem = ({ question, answer, cardId, setId, index, stage }) => {
  const navigation = useNavigation();

  const pressCardHandler = () => {
    navigation.navigate("CardFormScreen", { cardId, question, answer, setId });
  };
  return (
    <Pressable style={styles.outer} onPress={pressCardHandler}>
      <View style={styles.card}>
        <View style={styles.question}>
          <Text style={styles.text}>{question}</Text>
        </View>
        <View>
          <Text style={styles.text}>{answer}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.index}>#{index}</Text>
        <View style={styles.stage}>
          <Text style={styles.stageNum}>{stage}</Text>
          <Text style={styles.stageLabel}>stage</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CardItem;
const styles = StyleSheet.create({
  outer: {
    backgroundColor: AllColors.primary100,
    marginVertical: 8,
    borderRadius: 6,
    margin: 8,
    flexDirection: "row",
    overflow: "hidden",
  },
  question: {
    borderBottomColor: AllColors.primary300,
    borderBottomWidth: 1,
    marginBottom: 8,
    paddingBottom: 8,
  },
  text: {
    color: AllColors.primary500,
    margin: 5,
  },
  card: {
    flex: 1,
    padding: 8,
  },
  info: {
    backgroundColor: AllColors.primary200,
    alignItems: "center",
    justifyContent: "space-around",
  },
  index: { fontSize: 14, color: AllColors.primary400, marginVertical: 8 },
  stage: {
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    flex: 1,
  },
  stageNum: { fontSize: 20, color: AllColors.primary400, fontWeight: "bold" },
  stageLabel: {
    fontSize: 12,
    color: AllColors.primary400,
  },
});

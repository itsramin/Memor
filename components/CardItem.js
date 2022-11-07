import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { AllColors } from "../UI/AllColors";
import { Ionicons } from "@expo/vector-icons";

const CardItem = ({ question, answer, onPress }) => {
  return (
    <Pressable style={styles.outer} onPress={onPress}>
      <View style={styles.question}>
        <Text style={styles.text}>{question}</Text>
      </View>
      <View>
        <Text style={styles.text}>{answer}</Text>
      </View>
    </Pressable>
  );
};

export default CardItem;
const styles = StyleSheet.create({
  outer: {
    backgroundColor: AllColors.primary100,
    padding: 8,
    marginVertical: 8,
    borderRadius: 6,
    elevation: 4,
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
});
{
  /* <View style={styles.outer}>
      <View style={styles.question}>
        {status === "view" ? (
          <Text style={styles.text}>{question}</Text>
        ) : (
          <TextInput style={styles.text} defaultValue={question} />
        )}
      </View>
      <View>
        {status === "view" ? (
          <Text style={styles.text}>{answer}</Text>
        ) : (
          <TextInput style={styles.text} defaultValue={answer} />
        )}
      </View>
    </View> */
}

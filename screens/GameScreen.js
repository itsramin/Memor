import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../Components/PrimaryButton";
import Title from "../Components/Title";
import Colors from "../constants/colors";

import { Ionicons } from "@expo/vector-icons";

const randomize = (min, max, exclude) => {
  const randNum = Math.floor(Math.random() * (max - min)) + min;

  //   if (randNum === exclude) {
  //     return randomize(min, max, exclude);
  //   } else {
  //     return randNum;
  //   }

  return randNum;
};

let minVal = 1;
let maxVal = 100;

const GameScreen = ({ answer, gameOver }) => {
  const initGuess = randomize(1, 100, answer);
  const [curGuess, setCurGuess] = useState(initGuess);

  useEffect(() => {
    if (curGuess === +answer) {
      gameOver();
    }
  }, [curGuess, answer, gameOver]);

  const nextGuessHandler = (dir) => {
    if (
      (dir === "lower" && curGuess < answer) ||
      (dir === "higher" && curGuess > answer)
    ) {
      return Alert.alert("Don't lie", "you know that this hs wrong");
    }
    if (dir === "lower") {
      maxVal = curGuess;
    } else {
      minVal = curGuess + 1;
    }
    const newRand = randomize(minVal, maxVal, curGuess);
    setCurGuess(newRand);
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <View style={styles.guessView}>
        <Text style={styles.guess}>{curGuess}</Text>
      </View>
      <View style={styles.questionView}>
        <Text style={styles.questionText}>Higher or lower?</Text>
        <View style={styles.actions}>
          <View style={styles.btn}>
            <PrimaryButton
              onPress={nextGuessHandler.bind(this, "lower")}
              style={styles.btnText}
            >
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.btn}>
            <PrimaryButton
              onPress={nextGuessHandler.bind(this, "higher")}
              style={styles.btnText}
            >
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GameScreen;
const styles = StyleSheet.create({
  screen: { flex: 1, padding: 12, alignItems: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary500,
    textAlign: "center",
    borderColor: Colors.primary500,
    borderWidth: 2,
    padding: 12,
  },
  guessView: {
    backgroundColor: Colors.primary500,
    borderRadius: 100,
    marginHorizontal: 100,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  guess: {
    fontSize: 36,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
    color: Colors.second500,
  },
  questionView: {
    backgroundColor: Colors.primary600,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 8,
    marginTop: 20,
    marginHorizontal: 60,
  },
  questionText: {
    color: Colors.second500,
    paddingTop: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
  actions: { flexDirection: "row", marginVertical: 16 },
  btn: { marginHorizontal: 8, flex: 1 },
  btnText: { fontSize: 25 },
});

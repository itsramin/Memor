import { Image, Text, View, StyleSheet } from "react-native";
import PrimaryButton from "../Components/PrimaryButton";
import Title from "../Components/Title";
import Colors from "../constants/colors";

const EndGame = ({ roundsNum, answer, onStartNewGame }) => {
  return (
    <View style={styles.screen}>
      <Title>Game Over!</Title>
      <View style={styles.imageCon}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <View style={styles.summaryView}>
        <Text style={styles.summaryText}>
          Your phone needed{" "}
          <Text style={styles.highlightText}>{roundsNum}</Text> rounds to guess
          the number <Text style={styles.highlightText}>{answer}</Text>
        </Text>
      </View>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
};

export default EndGame;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  imageCon: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: Colors.primary300,
    margin: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryView: {
    marginVertical: 16,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 15,
    opacity: 0.8,
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 20,
    textAlign: "center",
  },
  highlightText: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});

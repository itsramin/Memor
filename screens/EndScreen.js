import { Image, Text, View, StyleSheet } from "react-native";
import Title from "../Components/Title";

const EndGame = () => {
  return (
    <View style={styles.screen}>
      <Title>Game Over!</Title>
      {/* <Image source={require("../assets/images/success.png")} /> */}
    </View>
  );
};

export default EndGame;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
});

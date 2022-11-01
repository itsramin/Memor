import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

const Title = (props) => {
  return <Text style={styles.title}>{props.children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: Colors.primary500,
    textAlign: "center",
    borderColor: Colors.primary500,
    borderWidth: 2,
    padding: 12,
  },
});

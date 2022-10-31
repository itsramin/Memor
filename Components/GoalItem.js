import { Pressable, StyleSheet, Text, View } from "react-native";

const GoalItem = (props) => {
  const deleteGoalHandler = () => {
    props.deleteGoal(props.id);
  };
  return (
    <View style={styles.goalItem}>
      <Pressable
        onPress={deleteGoalHandler}
        android_ripple={{ color: "#210644" }}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,

    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    color: "#fff",
    padding: 8,
  },
  pressedItem: {
    opacity: 0.8,
  },
});

export default GoalItem;

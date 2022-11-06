import { Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
const AddNewExpenseBtn = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("new")}
      style={styles.addView}
    >
      <Text style={styles.addButton}>+</Text>
    </Pressable>
  );
};

export default AddNewExpenseBtn;
const styles = StyleSheet.create({
  addButton: {
    color: "white",
    fontSize: 24,
  },
  addView: {
    marginHorizontal: 16,
  },
});

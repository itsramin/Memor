import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import ExpenseForm from "../components/ExpenseForm";
import { formatDate } from "../helper/date";
import { expensesActions } from "../store/expensesSlice";

const AddExpenseScreen = ({ navigation }) => {
  // const [title, setTitle] = useState("");
  // const [amount, setAmount] = useState("");
  // const [date, setDate] = useState(null);
  // const [pickerVisible, setPickerVisible] = useState(false);

  // const dispatch = useDispatch();

  // const titleChangeHandler = (value) => {
  //   setTitle(value);
  // };
  // const amountChangeHandler = (value) => {
  //   setAmount(value);
  // };
  // const dateChangeHandler = (event) => {
  //   const {
  //     nativeEvent: { timestamp },
  //   } = event;

  //   setDate(timestamp);

  //   setPickerVisible(false);
  // };
  // const showDate = () => {
  //   setPickerVisible(true);
  // };
  // const addHandler = () => {
  //   if (title.trim().length > 0 && amount > 0) {
  //     dispatch(
  //       expensesActions.addExpense({
  //         title,
  //         amount,
  //         date,
  //         key: Math.random().toString(),
  //       })
  //     );
  //     navigation.navigate("home");
  //   }
  // };
  return (
    // <View style={styles.screen}>
    //   <TextInput
    //     placeholder="Title"
    //     value={title}
    //     onChangeText={titleChangeHandler}
    //     style={styles.title}
    //     selectionColor="#0c266d"
    //   />
    //   <TextInput
    //     placeholder="Amount"
    //     keyboardType="number-pad"
    //     value={amount}
    //     onChangeText={amountChangeHandler}
    //     style={styles.amount}
    //     selectionColor="#0c266d"
    //   />

    //   <Text style={styles.date} onPress={showDate}>
    //     {date && formatDate(new Date(date))}
    //   </Text>
    //   {pickerVisible && (
    //     <RNDateTimePicker
    //       mode="date"
    //       value={new Date()}
    //       onChange={dateChangeHandler}
    //     />
    //   )}

    //   <View style={styles.button}>
    //     <Button title="Add" onPress={addHandler} />
    //   </View>
    // </View>

    <ExpenseForm curId={null} />
  );
};

export default AddExpenseScreen;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 16,
  },
  title: {
    backgroundColor: "#b8cbff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  amount: {
    backgroundColor: "#b8cbff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  date: {
    backgroundColor: "#b8cbff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
  },
});

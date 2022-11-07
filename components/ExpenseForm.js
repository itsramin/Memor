import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { Button, TextInput, View, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../helper/date";
import { expensesActions } from "../store/expensesSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "./PrimaryButton";

const ExpenseForm = ({ curKey }) => {
  const list = useSelector((state) => state.expenses.expenseList);
  const target = list.find((item) => item.key === curKey);

  const [title, setTitle] = useState(target ? target.title : "");
  const [amount, setAmount] = useState(target ? target.amount : "");
  const [date, setDate] = useState(target ? target.date : null);
  const [pickerVisible, setPickerVisible] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    setPickerVisible(false);
  }, [date]);

  const titleChangeHandler = (value) => {
    setTitle(value);
  };
  const amountChangeHandler = (value) => {
    setAmount(value);
  };
  const dateChangeHandler = (event) => {
    const {
      nativeEvent: { timestamp },
    } = event;
    setDate(timestamp);
  };
  const showDate = () => {
    setPickerVisible(true);
  };
  const addHandler = () => {
    if (title.trim().length > 0 && amount > 0) {
      dispatch(
        expensesActions.addExpense({
          title,
          amount,
          date,
          key: Math.random().toString(),
        })
      );
      navigation.navigate("home");
    }
  };

  const editHandler = () => {
    dispatch(expensesActions.edit({ title, amount, key: curKey, date }));
    navigation.navigate("home");
  };
  const delHandler = () => {
    dispatch(expensesActions.del({ curKey }));
    navigation.navigate("home");
  };
  return (
    <View style={styles.screen}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={titleChangeHandler}
        style={styles.title}
        selectionColor="#0c266d"
      />
      <TextInput
        placeholder="Amount"
        keyboardType="number-pad"
        value={amount}
        onChangeText={amountChangeHandler}
        style={styles.amount}
        selectionColor="#0c266d"
      />

      <View style={styles.formRow}>
        <Ionicons
          name="calendar"
          color="white"
          size={20}
          style={styles.icon}
          onPress={showDate}
        />
        <Text style={styles.date} onPress={showDate}>
          {date && formatDate(new Date(date))}
        </Text>
      </View>
      {pickerVisible && (
        <RNDateTimePicker
          mode="date"
          value={new Date()}
          onChange={dateChangeHandler}
        />
      )}

      <View style={styles.buttons}>
        {!curKey && <PrimaryButton title="Add" onPress={addHandler} />}
        {curKey && (
          <>
            <View style={styles.button}>
              <PrimaryButton title="Save" onPress={editHandler} />
            </View>
            <View style={styles.button}>
              <Ionicons
                name="trash"
                color="white"
                onPress={delHandler}
                size={20}
                style={styles.icon}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default ExpenseForm;
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
    flex: 1,
  },
  buttons: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 20,
    flex: 1,
  },
  icon: {
    textAlign: "center",
    marginHorizontal: 10,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});

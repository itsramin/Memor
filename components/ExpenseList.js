import { useNavigation } from "@react-navigation/native";

import { Text, Pressable, StyleSheet, View, FlatList } from "react-native";
import { formatDate } from "../helper/date";

const ExpenseList = ({ list, period }) => {
  const navigation = useNavigation();

  const renderItem = (itemData) => {
    const pressHandler = () => {
      navigation.navigate("edit", { key: itemData.item.key });
    };
    return (
      <Pressable style={styles.expenseRow} onPress={pressHandler}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{itemData.item.title}</Text>
          <Text style={styles.dateText}>
            {formatDate(new Date(itemData.item.date))}
          </Text>
        </View>
        <View style={styles.amountView}>
          <Text style={styles.amountText}>{itemData.item.amount}</Text>
        </View>
      </Pressable>
    );
  };

  const allAmount = list.reduce((sum, cur) => sum + +cur.amount, 0);

  return (
    <View style={styles.screen}>
      <View style={styles.allExpensesRow}>
        <View>
          <Text>{period}</Text>
        </View>
        <View>
          <Text>{allAmount}</Text>
        </View>
      </View>
      <FlatList data={list} renderItem={renderItem} />
    </View>
  );
};

export default ExpenseList;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 16,
  },

  expenseRow: {
    backgroundColor: "#214dc5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 4,
  },
  titleText: {
    color: "white",
    fontSize: 20,
  },
  dateText: { color: "white" },

  amountView: {
    backgroundColor: "#b8cbff",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  allExpensesRow: {
    backgroundColor: "#b8cbff",
    elevation: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
});

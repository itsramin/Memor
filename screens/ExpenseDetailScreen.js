import ExpenseForm from "../components/ExpenseForm";

const ExpenseDetailScreen = ({ route, navigation }) => {
  const key = route.params.key;
  // const list = useSelector((state) => state.expenses.expenseList);

  // const target = list.find((item) => item.key === key);
  // const [title, setTitle] = useState(target.title);
  // const [amount, setAmount] = useState(target.amount);
  // const [date, setDate] = useState(target.date);

  // const dispatch = useDispatch();

  // const titleChangeHandler = (value) => {
  //   setTitle(value);
  // };
  // const amountChangeHandler = (value) => {
  //   setAmount(value);
  // };
  // const addHandler = () => {
  //   dispatch(expensesActions.edit({ title, amount, key }));
  //   navigation.navigate("home");
  // };
  // const delHandler = () => {
  //   dispatch(expensesActions.del({ key }));
  //   navigation.navigate("home");
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

    //   <View style={styles.buttons}>
    //     <View style={styles.button}>
    //       <Button title="Save" onPress={addHandler} />
    //     </View>
    //     <View style={styles.button}>
    //       <Ionicons name="trash" color="white" onPress={delHandler} size={20} />
    //     </View>
    //   </View>
    // </View>
    <ExpenseForm curKey={key} />
  );
};

export default ExpenseDetailScreen;
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     margin: 16,
//   },
//   title: {
//     backgroundColor: "#b8cbff",
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   amount: {
//     backgroundColor: "#b8cbff",
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   buttons: {
//     marginVertical: 10,
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     marginHorizontal: 30,
//   },
// });

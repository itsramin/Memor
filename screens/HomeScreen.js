import { useSelector } from "react-redux";
import ExpenseList from "../components/ExpenseList";

const HomeScreen = () => {
  const list = useSelector((state) => state.expenses.expenseList);

  return <ExpenseList list={list} period="Amount of all expenses" />;
};

export default HomeScreen;

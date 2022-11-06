import ExpenseList from "../components/ExpenseList";
import { useSelector } from "react-redux";

const LastExpenses = () => {
  const list = useSelector((state) => state.expenses.expenseList);

  return <ExpenseList list={list} period="amount of last 7 days" />;
};

export default LastExpenses;

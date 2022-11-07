import ExpenseList from "../components/ExpenseList";
import { useSelector } from "react-redux";

const LastExpenses = () => {
  const list = useSelector((state) => state.expenses.expenseList);
  const today = new Date();
  const last7 = +new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );

  const filteredList = list.filter((item) => item.date > last7);

  return <ExpenseList list={filteredList} period="amount of last 7 days" />;
};

export default LastExpenses;

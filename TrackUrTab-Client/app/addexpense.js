import AddExpense from "../components/AddExpense"; // Ensure the name matches your file
import { useData } from "./dataprovider";

export default function AddExpenseInitiator() {
  const { data } = useData();
  console.log(data);

  return <AddExpense data={data} />;
}

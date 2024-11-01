import { View, Text } from "react-native";
import ExpensesRenderer from "./ExpensesRenderer";

export default function GroupInfo({ data }) {
    console.log('Received in GroupInfo: ', data);
    return (
        <ExpensesRenderer data={data} />
    )
}
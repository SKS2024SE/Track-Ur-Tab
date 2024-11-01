import { View, Text } from "react-native";
import ExpensesRenderer from "./ExpensesRenderer";

export default function GroupInfo({ data }) {

    return (
        <ExpensesRenderer data={data} />
    )
}
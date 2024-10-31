// 
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import GroupInfo from "../components/GroupInfo";
import { useData } from "./dataprovider";

export default function GroupInfoRoute({ params1 }) {
    const route = useRouter();
    const { data } = useData();

   console.log('Groupinfo data: ', data);

    return (
            <GroupInfo data={data} />
    );
}

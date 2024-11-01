// 
import GroupInfo from "../components/GroupInfo";
import { useData } from "./dataprovider";

export default function GroupInfoRoute() {
    const { data } = useData();
    // const[groupData, setGroupData] = useState('');

    const getData = () => {
        const newData = (data && data.type=='group-info') ? data : undefined;
        console.log('Inside GroupInfo route: ', newData);
        return newData;
    }   

    return (
            <GroupInfo data={data.type=='group-info' ? data : undefined} />
    );
}

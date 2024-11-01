import { useData } from "./dataprovider"
import CreateEditGroup from "../components/CreateEditGroup";

export default function GroupCreationForm() {
    const { data } = useData();

    return (
        <CreateEditGroup data={data}></CreateEditGroup>
    )
}
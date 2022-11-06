import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { newUiStateAction } from "../state/actions/ui-state";

const Test = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        newUiStateAction({ keren: 'tomer' })(dispatch);
    }, [dispatch])
    return (
        <div>
            this is test component!
        </div>
    )
}

export default Test;
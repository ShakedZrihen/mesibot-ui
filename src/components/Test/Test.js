import { useEffect } from "react";
import './Test.scss';
import { useDispatch } from "react-redux";
import { newUiStateAction } from "../../state/actions/ui-state";

const Test = ({ className }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        newUiStateAction({ keren: 'tomer' })(dispatch);
    }, [dispatch])
    return (
        <div className={`Test ${className}`}>
            this is test component!
        </div>
    )
}

export default Test;
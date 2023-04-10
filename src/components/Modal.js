import classes from "./Modal.module.css";
import { useDispatch } from 'react-redux';
import DataForm from "./DataForm";
import { UPDATE_DATA, MODAL_CLOSE } from "../store/scc";

function Modal(props) {
    const dispatch = useDispatch();

    const updateDataHandler = (data) => {
        console.log(data);
        dispatch({ type: UPDATE_DATA, data: data, id: data.id });
    };

    return (
        <div className={classes.backdrop}>
            <div className={classes.modal}>
                <DataForm dataHandler={updateDataHandler} />
            </div>
        </div>
    );
}

export default Modal;

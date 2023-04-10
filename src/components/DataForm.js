import { useRef, useState } from "react";
import classes from './DataForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { MODAL_CLOSE } from '../store/scc';

const DataForm = (props) => {
    const [error, setError] = useState(false);
    const titleRef = useRef();
    const bodyRef = useRef();
    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);

    const modalCloseHandler = (e) => {
        dispatch({ type: MODAL_CLOSE });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = localStorage.getItem('id') ? localStorage.getItem('id') : Math.random();
        const intId = +id;
        let enteredTitle = '';
        let enteredBody = '';
        if (titleRef.current.value.length !== 0 && bodyRef.current.value.length !== 0) {
            setError(false);
            enteredTitle = titleRef.current.value;
            enteredBody = bodyRef.current.value;
            const data = { title: enteredTitle, body: enteredBody, id: intId };
            props.dataHandler(data);
            localStorage.removeItem('id');
            bodyRef.current.value = "";
            titleRef.current.value = "";
        }
        else{
            setError(<div className={classes.error}>
                Please, give proper value for all fields.
            </div>)
        }
    }

    return (
        <div className={classes.container}>
            <form onSubmit={handleSubmit}>
                <div className={classes.control}>
                    <label>Title:</label>
                    <input type="text" ref={titleRef} />
                </div>
                <div className={classes.control}>
                    <label>Body:</label>
                    <input type="text" ref={bodyRef} />
                </div>
                <button className={classes.button} type="submit">Submit</button>
                {error}
                {modal && <button className={classes.button} onClick={modalCloseHandler}>Cancel</button>}
            </form>
        </div>
    );
};


export default DataForm;
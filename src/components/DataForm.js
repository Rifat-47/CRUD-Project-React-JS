import { useRef, useState } from "react";
import classes from './DataForm.module.css';
import { useSelector, useDispatch } from 'react-redux';

const DataForm = (props) => {
    const [error, setError] = useState(false);
    const titleRef = useRef();
    const bodyRef = useRef();

    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);

    const modalCloseHandler = (e) => {
        dispatch({ type: 'MODAL_CLOSE' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const enteredTitle = titleRef.current.value.trim();
        const enteredBody = bodyRef.current.value.trim();
        
        if (enteredTitle === '' || enteredBody === '') {
            setError(true);
            return;
        }

        const id = localStorage.getItem('id') || Math.random();
        localStorage.removeItem('id');
        
        const intId = +id;
        const data = { id: intId, title: enteredTitle, body: enteredBody };

        props.dataHandler(data);
        titleRef.current.value = '';
        bodyRef.current.value = '';
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
                {modal && <button className={classes.button} onClick={modalCloseHandler}>Cancel</button>}
                {error && <div className={classes.error}>Please provide a title and a body.</div>}
            </form>
        </div>
    );
};


export default DataForm;
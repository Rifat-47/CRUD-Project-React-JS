import classes from './Alldata.module.css';

const Data = (props) => {
    const { item } = props;

    return (
        <div className={classes.data_item} key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            {props.children}
        </div>
    );
};

export default Data;
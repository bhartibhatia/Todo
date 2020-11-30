import React , {useState} from 'react'
import {List,ListItem, ListItemText,ListItemAvatar, Modal,Button} from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import db from './Firebase'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>(
    {
        paper:{
            position: 'absoulte',
            width:400,
            backgroundColor: theme.palette.background.paper,
            border:'2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2,4,3),
        },
    }));

function Todo(props) {
    const classes=useStyles();
    const [open, setOpen]=useState(false);
    const [input,setInput]=useState('');

    console.log('myprops',props)
    const HandelOpen=() =>{
    setOpen(true);
    }
    const HandelClose=() =>{
        setOpen(false);
    }
const handelUpdate = () =>
{
    // Update the todo with the new input text
    db.collection('todos').doc(props.text.id).set(
    {
        task1:input
    },{ merge:true}
    );
    setOpen(false);
}
    return (
        <>
        <Modal
        open={open}
        onClose={HandelClose}

        >
            <div className={classes.paper}>
                <h1>I am the Modal</h1>
                <input placeholder={props.text.task1} value={input} onChange={event => {
            console.log(event.target.value);
            setInput(event.target.value)
          }}></input>
            <Button onClick = {handelUpdate}>Update Todo</Button>
            </div>
        </Modal>
        <List>
            <ListItem>
                <ListItemAvatar>
                   
                </ListItemAvatar>
             <ListItemText primary={props.text.task1} secondary='Dummy Data'/>
             
            </ListItem>
            
            <Button onClick={() =>{
                setOpen(true)
            }}>Edit</Button>
            <DeleteSweepIcon onClick={
                () =>{
db.collection('todos').doc(props.text.id).delete()
                }
            }/> 
            
        </List>
        {/* // <div>
        //     <li>{props.text}</li>
        // </div> */}
        </>
    )
    
}

export default Todo;

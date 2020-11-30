import React, { useState,useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo'
import './App.css';
import db from './Firebase'
import firebase from 'firebase'

function App() {
  const [todo, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when the app loads , we need to listen to the database and fetch new todos as they are get addrde/remove
  useEffect(() => {
    // this code will run whenever the app comonent loads
    db.collection('todos').orderBy('timestamp','desc').onSnapshot( (snap) =>
    {
// console.log('Shapshot data',snap )
setTodos(snap.docs.map( (document) => {
  // console.log('document',document.data().task1);

  return {id:document.id,task1:document.data().task1}
}))
    })
  }, [])

  const addTodo = (sumbitEvent) => {
    // if (input) {
    //   console.log('if value', [...todo, input])
    //   // setTodos([...todo, input])
    //   // Clear up all the text from the input state bar
    //   setInput('');
    // }

    sumbitEvent.preventDefault();

    db.collection('todos').add({
      task1:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    console.log('i am working')
    console.log([...todo, input])
  }
  return (
    <div className="App">
      <h1>Hello From Bharti!!,Add Your Todo Here</h1>
      <form>
        {/* <input   value={input} onChange ={event =>{
       console.log(event.target.value);
      setInput(event.target.value)
     }} /> */}
        <FormControl>
          <InputLabel htmlFor="my-input">Add Your Todo</InputLabel>
          <Input value={input} onChange={event => {
            console.log(event.target.value);
            setInput(event.target.value)
          }} />

        </FormControl>
        <Button disabled={!input} type={"submit"} onClick={addTodo} variant="contained" color="primary">
          Add Todo
</Button>
        {/* <button type ={"submit"} onClick={addTodo}>Add Todo</button> */}
      </form>


      <ul>
        {/* todo array and item as element of todo  */}
        {todo.map(item => {
          console.log('Item',item)
          return (<Todo text={item}
          />)


        })}
        {/* <li>Take dogs for a walk</li>
       <li>Take the rubbish out</li> */}
      </ul>
    </div>
  );
}

export default App;

import {useState, useRef, useEffect} from 'react';
import Todolist from './Todolist';
import { v4 as uuidv4 } from 'uuid';

const  LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]) 
  const todoNameRef = useRef()

  //will save todos to local storage =>useEffect
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete =!todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
        return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null 
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <>
      <Todolist todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type='text'/>
      <button onClick={handleAddTodo}>Add Todos</button>
  
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <br/>
      <div>{todos.filter(todo => !todo.complete).length} Todos Left</div>
      </>
      
    </div>
  );
}

export default App;

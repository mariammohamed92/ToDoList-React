import TodoList from '../TodoList/TodoList';
import React, { useState, useEffect } from 'react'
import UpdateAndCancel from '../UpdateAndCancel/UpdateAndCancel';
import Add from '../Add/Add';



function App() {

  // state for handle complete
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  // temporary state
  const [updateTask, setUpdateTask] = useState('')  //input which update task

  // tasks state | todoList state which is already added (original state)
  const [todos, setTodos] = useState([]);

  // json
  const flatted = require('flatted');

  useEffect(() => {
    const savedTodoListString = localStorage.getItem('todoList');
    if (savedTodoListString !== null) {
      const savedTodoList = flatted.parse(savedTodoListString);
      if (savedTodoList) {
        setTodos(savedTodoList);
      }
    }
  }, []);


  // delete task
  const deleteTask = (id) => {
    // console.log(id);
    let newTodos = [...todos]
    let newTasks = newTodos.filter((task) => task.id !== id);
    const todoListString = flatted.stringify(newTasks);
    localStorage.setItem('todoList', todoListString);
    setTodos(newTasks)
  }

  // handleComplete
  const handleComplete = (id) => {
    let nweArray = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complete: !todo.complete }
      }
      return todo
    })

    setTodos(nweArray)
  }

  return (
    <>
      <div className='container shadow rounded-3 my-5  py-3 todolist'>
        <h3 className='text-center py-2'>Todo List App (React.js)</h3>
        <div className='container-fluid w-100 my-3 py-2  bg-dark rounded-2'>

          {updateTask ?
            (
              <>
                <UpdateAndCancel
                  updateTask={updateTask}
                  setUpdateTask={setUpdateTask}
                  todos={todos}
                  setTodos={setTodos}
                  flatted={flatted}
                />
              </>
            )
            :
            (
              <>
                <Add
                  todos={todos}
                  setTodos={setTodos}
                  flatted={flatted}
                />
              </>
            )}

          <TodoList
            todos={todos}
            deleteTask={deleteTask}
            handleComplete={handleComplete}
            setUpdateTask={setUpdateTask}
          />

        </div>
      </div>
    </>
  );
}

export default App;

import React, { useEffect, useRef } from 'react'


export default function UpdateAndCancel({ updateTask, setUpdateTask, todos, setTodos, flatted }) {

    const cancelUpdate = () => {
        const defaultValue = updateTask || ' ';
        if (updateTask === undefined) {
            setUpdateTask(defaultValue);
        }
        setUpdateTask('')
    }

    // update Task 
    const changeData = (e) => {
        let newEntry = {
            id: updateTask.id,
            title: e.target.value,
            complete: updateTask.complete ? true : false
        }
        setUpdateTask(newEntry)
    }

    // data after update (updated data)
    const updateData = () => {
        let filterRecord = [...todos].filter(todo => todo.id !== updateTask.id);
        let updatedObject = [...filterRecord, updateTask];
        const todoListString = flatted.stringify(updatedObject);
        localStorage.setItem('todoList', todoListString);
        setTodos(updatedObject);
        const defaultValue = updateTask || ' ';
        if (updateTask === undefined) {
            setUpdateTask(defaultValue);
        }
        setUpdateTask('')
    }

    // focus on input
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // enter keypress for update and escape for cancel
    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            updateData()
        } else if (e.key === 'Escape') {
            cancelUpdate()
        }
    }


    // // test 


    return (
        <>
            {/* update task */}
            <div className='d-flex flex-row justify-content-center  py-3'>
                <div className='position-relative me-3 w-100 holder'>
                    <input onKeyDown={handleKeyPress} value={updateTask && updateTask.title} ref={inputRef} onChange={(e) => changeData(e)} type="text" placeholder='Add a task' className='form-control' />
                    <i className="text-muted position-absolute icon-list fa-solid fa-list-ol"></i>
                </div>
                <div className='me-2' >
                    <button className='btn btn-success w-100' onClick={() => updateData()}>Update</button>
                </div>
                <div >
                    <button className='btn btn-warning w-100' onClick={() => cancelUpdate()}>Cancel</button>
                </div>
            </div>
        </>
    )
}

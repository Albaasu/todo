import React, { useState, useRef } from 'react';
import './style.css';
import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value;
    if (name === '') return;

    const newTodo = {
      id: uuidv4(),
      name: name,
      completed: false,
    };

    setTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });

    todoNameRef.current.value = '';
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleDeleteTodo = (id) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === id);
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div>
      <div className='input-area'>
        <p className='title'>TODOリスト</p>
        <input placeholder='TODOを入力' type='text' ref={todoNameRef} />
        <Button variant='contained' onClick={handleAddTodo}>
          追加
        </Button>
      </div>
      <div className='incomplete-area'>
        <p className='title'>未完了リスト</p>
        <ul>
          {todos
            .filter((todo) => !todo.completed)
            .map((todo) => (
              <div className='list-row' key={todo.id}>
                <li>{todo.name}</li>
                <Button
                  variant='contained'
                  className='btn'
                  onClick={() => toggleTodo(todo.id)}
                >
                  完了
                </Button>
                <Button variant='contained' className='btn'>
                  編集
                </Button>
                <Button
                  variant='contained'
                  className='btn'
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  削除
                </Button>
              </div>
            ))}
        </ul>
      </div>
      <div className='complete-area'>
        <p className='title'>完了リスト</p>
        <ul>
          <div className='list-row'>
            <li>完了したTODO</li>
            <Button variant='contained' className='btn'>
              戻す
            </Button>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default App;

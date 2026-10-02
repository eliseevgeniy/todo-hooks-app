import React, { useState, useCallback } from 'react';
import TodoList from './components/TodoList';
import AddTodoModal from './components/AddTodoModal';
import './App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Оптимизация функции добавления задачи.
    // Зависимость [] — сеттер setTodos из useState всегда стабилен,
    // указывать его в массиве зависимостей не нужно.
    // useCallback даёт реальный эффект, т.к. AddTodoModal обёрнут в React.memo.
    const handleAddTodo = useCallback((newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    }, []);

    // Открытие модального окна. Стабильная ссылка на функцию
    // благодаря useCallback — не создаётся заново при каждом рендере.
    const openModal = useCallback(() => setIsModalOpen(true), []);

    // Закрытие модального окна. onClose передаётся в AddTodoModal,
    // который обёрнут в React.memo — стабильная ссылка предотвращает
    // лишние перерендеры модалки.
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    return (
        <div className="app">
            <h1>Список задач</h1>

            <button className="add-todo-button" onClick={openModal}>
                Добавить задачу
            </button>

            {/* TodoList обёрнут в React.memo — при изменении isModalOpen
                (открытие/закрытие модалки) todos остаётся той же ссылкой,
                поэтому TodoList НЕ будет перерендериваться. */}
            <TodoList todos={todos} />

            {/* Модалка рендерится условно и обёрнута в React.memo.
                Пропсы onAdd и onClose стабильны благодаря useCallback,
                поэтому лишних перерендеров модалки не будет. */}
            {isModalOpen && (
                <AddTodoModal onAdd={handleAddTodo} onClose={closeModal} />
            )}
        </div>
    );
}

export default App;
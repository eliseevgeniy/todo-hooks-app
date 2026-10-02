import React, { useMemo } from 'react';

// React.memo — оборачиваем компонент, чтобы он перерендеривался
// только при изменении пропсов. Здесь пропс один — todos.
// Если todos не менялся (например, при открытии модалки в App),
// TodoList пропустит рендер. Это и есть реальная оптимизация.
const TodoList = React.memo(({ todos }) => {
    // useMemo кэширует массив JSX-элементов между рендерами.
    // Пересчёт происходит только при изменении todos.
    // Совместно с React.memo это даёт ощутимый эффект:
    // 1) React.memo предотвращает сам рендер при неизменных пропсах;
    // 2) useMemo экономит пересборку списка, если рендер всё же случился,
    //    но todos не менялся (например, поменялся другой локальный стейт).
    const renderedTodos = useMemo(() => {
        return todos.map((todo) => (
            // key={todo.id} — используем уникальный id вместо index.
            // Это корректно при удалении/перестановке элементов списка.
            <div
                key={todo.id}
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
            >
                <span>{todo.title}</span>
            </div>
        ));
    }, [todos]);

    return <div className="todo-list">{renderedTodos}</div>;
});

export default TodoList;
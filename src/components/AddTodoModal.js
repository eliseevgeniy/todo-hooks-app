import React, { useRef } from 'react';
import './AddTodoModal.css'; // стили модального окна

// React.memo — компонент перерендерится только при изменении onAdd или onClose.
// Обе функции в App обёрнуты в useCallback, поэтому их ссылки стабильны,
// и модалка не будет перерендериваться при каждом изменении todos.
const AddTodoModal = React.memo(({ onAdd, onClose }) => {
    // useRef — даёт доступ к DOM-элементу input без ре-рендеров.
    // В отличие от useState, изменение inputRef.current НЕ вызывает
    // перерендер компонента. Идеально для работы с полями ввода,
    // когда значение нужно только по действию пользователя (клик «Добавить»).
    const inputRef = useRef();

    const handleAdd = () => {
        // .trim() убирает пробелы по краям — защита от пустых задач
        const title = inputRef.current.value.trim();

        if (title) {
            onAdd({
                id: Date.now(), // уникальный id для key в TodoList
                title,
                completed: false,
            });
            onClose(); // закрываем модалку после добавления
        }
    };

    // Обработка нажатия Enter в поле ввода — удобство UX.
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleAdd();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Добавить задачу</h3>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Название задачи"
                    onKeyDown={handleKeyDown}
                />
                <div className="modal-actions">
                    <button onClick={onClose}>Отмена</button>
                    <button onClick={handleAdd}>Добавить</button>
                </div>
            </div>
        </div>
    );
});

export default AddTodoModal;
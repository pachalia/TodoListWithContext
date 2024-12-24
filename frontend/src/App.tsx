import { AddTodoForm, FindForm, FindFormValue, Todos } from './components';
import { useTodos } from './hooks/use-todos.ts';
import { useState } from 'react';
import { TodoService } from './services/todo.service.ts';
import { AppContext } from './context/app.context.ts';

export const App: React.FC = () => {
	const { handleDelete, updateTodo, todos, handleAdd, setTodos } = useTodos();
	const [isFind, setIsFind] = useState<boolean>(false);

	const handleFindTodo = (data: FindFormValue) => {
		TodoService.findTodo(data.todo).then((res) => {
			setTodos(() => [...res]);
			setIsFind(true);
		});
	};

	return (
		<>
			<h1 style={{ textAlign: 'center' }}>Todo List</h1>
			<h3 style={{ textAlign: 'center' }}>
				Чтобы изменить статус todo кликните на заголовке todo или его статусе
			</h3>
			<AppContext.Provider value={{ todos, handleDelete, updateTodo, setTodos }}>
				<FindForm onSubmit={handleFindTodo} setIsFind={setIsFind} />
				<Todos />
				{!isFind && <AddTodoForm onSubmit={handleAdd} />}
			</AppContext.Provider>
		</>
	);
};

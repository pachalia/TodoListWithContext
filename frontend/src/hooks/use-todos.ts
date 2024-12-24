import { useEffect, useState } from 'react';
import { ITodo } from '../interfaces/interfaces.ts';
import { TodoService } from '../services/todo.service.ts';
import { IAddFormValue } from '../components';

export const useTodos = () => {
	const [todos, setTodos] = useState<ITodo[]>([]);

	useEffect(() => {
		TodoService.getTodos().then((res) => setTodos(res));
	}, []);

	const handleDelete = (id: string) => {
		return TodoService.deleteTodo(id)
			.then((res) => {
				if (res) {
					const newTodo = todos.filter((val) => val.id != id);
					setTodos(newTodo);
					return true;
				} else {
					return false;
				}
			})
			.catch(() => {
				return false;
			});
	};

	const updateTodo = (params: Partial<ITodo>): Promise<ITodo> | undefined => {
		if (params.description) {
			return TodoService.updateTodoDescription(params.id!, params.description!);
		}

		if (params.status || params.status === false) {
			return TodoService.updateStatus(params.id!);
		}
	};

	const handleAdd = (data: IAddFormValue) => {
		TodoService.addTodo(data).then((newTodo) => {
			const newTodos = [newTodo, ...todos];
			setTodos(newTodos);
		});
	};
	return {
		todos,
		handleDelete,
		handleAdd,
		setTodos,
		updateTodo,
	};
};

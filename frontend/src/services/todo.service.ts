import axios from 'axios';

import { ITodo } from '../interfaces/interfaces.ts';
import { IAddFormValue } from '../components';

const url = 'https://andreypachalia.ru/todoapi/api';
// const url = 'http://localhost:4000/api';

export class TodoService {
	static async getTodos(): Promise<ITodo[]> {
		const todosResponse = await axios.get<ITodo[]>(url);
		return todosResponse.data;
	}

	static async updateStatus(id: string): Promise<ITodo> {
		const todoResponse = await axios.put<ITodo>(`${url}/${id}`);
		return todoResponse.data;
	}

	static async deleteTodo(id: string): Promise<boolean> {
		const deleteTodo = await axios.delete<boolean>(`${url}/${id}`);
		return deleteTodo.data;
	}

	static async addTodo(todo: IAddFormValue) {
		const newTodo = await axios.post<ITodo>(url, todo);
		return newTodo.data;
	}

	static async findTodo(todo: string): Promise<ITodo[]> {
		const todos = await axios.get<ITodo[]>(`${url}/find?todo=${todo}`);
		return todos.data;
	}

	static async updateTodoDescription(id: string, description: string): Promise<ITodo> {
		const updateTodo = await axios.put<ITodo>(`${url}/description`, {
			id,
			description,
		});
		return updateTodo.data;
	}
	static async findTodoById(id: string): Promise<ITodo | null> {
		const todo = await axios.get(`${url}/${id}`);
		return todo.data;
	}
}

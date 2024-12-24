import { createContext } from 'react';
import { ITodo } from '../interfaces/interfaces.ts';

export interface AppContext {
	todos: ITodo[];
	handleDelete: (id: string) => void;
	updateTodo: (data: Partial<ITodo>) => void;
	setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

export const AppContext = createContext<AppContext | null>(null);

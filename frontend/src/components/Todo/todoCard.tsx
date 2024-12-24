import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import { TodoService } from '../../services/todo.service.ts';
import { ITodo } from '../../interfaces/interfaces.ts';
import { useTodos } from '../../hooks/use-todos.ts';
import { NotFoundTodo } from '../NotFound/notFoundTodo.tsx';

export const TodoCard = () => {
	const { id } = useParams<{ id: string }>();
	const [todo, setTodo] = useState<ITodo | null>(null);
	const [isFormValid, setIsFormValid] = useState<boolean>(false);
	const [description, setDescription] = useState('');
	const { updateTodo, handleDelete } = useTodos();
	const navigate = useNavigate();
	const [pending, setPending] = useState(true);

	useEffect(() => {
		if (!id) return;
		setPending(true);
		TodoService.findTodoById(id).then((res) => {
			setTodo(res);
			setDescription(res ? res.description : '');
			setPending(false);
		});
	}, [id]);

	const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (todo) {
			updateTodo({ id: todo.id, description: description })?.then(() =>
				navigate(-1),
			);
		}
	};
	const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (!todo) return;
		if (e.target.value.length === 0 || e.target.value === todo.description) {
			setIsFormValid(false);
			setDescription(e.target.value);
		} else {
			setIsFormValid(true);
			setDescription(e.target.value);
		}
	};

	if (!todo && !pending) {
		return <NotFoundTodo />;
	}

	return (
		<>
			{!pending && (
				<div>
					<h3 style={{ textAlign: 'center' }}>{todo?.title}</h3>
					<form onSubmit={onSubmit}>
						<textarea
							style={{
								display: 'block',
								margin: 'auto',
								width: '450px',
								height: '100px',
							}}
							value={description}
							onChange={(e) => onChangeHandler(e)}
						/>
						<button
							type={'submit'}
							disabled={!isFormValid}
							style={{ margin: '10px auto', display: 'block' }}
						>
							Редактировать
						</button>
					</form>
					<div>
						<button
							onClick={() => {
								handleDelete(todo!.id).then((res) =>
									res ? navigate(-1) : null,
								);
							}}
							style={{ margin: '10px auto', display: 'block' }}
						>
							Удалить
						</button>
						<button
							onClick={() => navigate(-1)}
							style={{ margin: 'auto', display: 'block' }}
						>
							Назад
						</button>
					</div>
				</div>
			)}
		</>
	);
};

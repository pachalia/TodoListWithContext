import { SubmitHandler, useController, useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/app.context.ts';
import { TodoService } from '../../services/todo.service.ts';

export type FindFormValue = {
	todo: string;
};
interface IAddFormProps {
	onSubmit: SubmitHandler<FindFormValue>;
	setIsFind: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FindForm: React.FC<IAddFormProps> = ({ onSubmit, setIsFind }) => {
	const { setTodos } = useContext(AppContext) || {};
	const {
		control,
		handleSubmit,
		formState: { isValid },
	} = useForm<FindFormValue>({ mode: 'onChange' });

	const { field } = useController({
		name: 'todo',
		control,
		defaultValue: '',
		rules: {
			required: 'Поле обязательно',
		},
	});

	useEffect(() => {
		if (!setTodos) return;
		if (!isValid) {
			TodoService.getTodos().then((res) => setTodos(() => res));
			setIsFind(false);
		}
	}, [isValid, setIsFind, setTodos]);
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ display: 'flex', justifyContent: 'center' }}
			>
				<input {...field} type="text" />
				<button type={'submit'} disabled={!isValid}>
					Искать
				</button>
			</form>
		</>
	);
};

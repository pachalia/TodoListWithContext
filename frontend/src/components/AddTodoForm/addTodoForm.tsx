import {
	SubmitHandler,
	useController,
	UseControllerProps,
	useForm,
} from 'react-hook-form';
import { ITodo } from '../../interfaces/interfaces.ts';
import { useEffect } from 'react';

export interface IAddFormValue extends Pick<ITodo, 'title' | 'description'> {}

interface IAddFormProps {
	onSubmit: SubmitHandler<IAddFormValue>;
}

const Input = (props: UseControllerProps<IAddFormValue>) => {
	const { field } = useController(props);
	return (
		<div style={{ width: '100%' }}>
			<input
				{...field}
				placeholder={
					props.name === 'title'
						? 'Введите заголовок Todo'
						: 'Введите описание Todo'
				}
				style={{ width: '100%', padding: '10px 0', marginBottom: 20 }}
			/>
		</div>
	);
};

export const AddTodoForm: React.FC<IAddFormProps> = ({ onSubmit }) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { isValid, isSubmitSuccessful },
	} = useForm<IAddFormValue>({
		defaultValues: { title: '', description: '' },
		resetOptions: { keepIsSubmitSuccessful: false },
	});
	useEffect(() => {
		reset();
	}, [isSubmitSuccessful, reset]);
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div
					style={{
						display: 'flex',
						width: '60%',
						margin: '0 auto',
						flexDirection: 'column',
					}}
				>
					<label htmlFor="Title"> Поле обязательно для заполнения</label>
					<Input control={control} name={'title'} rules={{ required: true }} />
					<label htmlFor="Description"> Поле обязательно для заполнения</label>
					<Input
						control={control}
						name="description"
						rules={{ required: true }}
					/>
					<button
						disabled={!isValid}
						type={'submit'}
						style={{
							cursor: 'pointer',
							width: '30%',
							margin: '0 auto',
							padding: '5px 0',
						}}
					>
						Добавить
					</button>
				</div>
			</form>
		</>
	);
};

import './todos.css';
import { TodoItem } from './todoItem.tsx';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context.ts';

const lineTable = [
	'№',
	'Заголовок Todo',
	'Описание',
	'Статус',
	'Дата создания',
	'Удалить',
];

export const Todos: React.FC = () => {
	const { todos } = useContext(AppContext) || {};

	return (
		<>
			{todos && todos.length !== 0 && (
				<table style={{ width: '90%', margin: '0 auto', marginBottom: 40 }}>
					<thead>
						<tr>
							{lineTable.map((val, i) => (
								<th
									style={{
										border: '1px solid black',
										width: i === 1 ? '30%' : 'inherit',
									}}
									key={i}
								>
									{val}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{todos.map((val, i) => (
							<TodoItem key={val.id} val={val} index={i} />
						))}
					</tbody>
				</table>
			)}
		</>
	);
};

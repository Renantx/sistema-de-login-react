import React, { useState } from 'react';

// Definindo o tipo de uma tarefa
interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const Home: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [darkTheme, setDarkTheme] = useState(true);
    const [filter, setFilter] = useState('todas');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (title) {
            const newTask = {
                id: new Date().getTime(),
                title,
                description,
                completed: false
            };
            setTasks([...tasks, newTask]);
            setTitle('');
            setDescription('');
        }
    };

    const removeTask = (taskId: number) => {
        const newTasks = tasks.filter(task => task.id !== taskId);
        setTasks(newTasks);
    };

    const toggleTaskCompletion = (taskId: number) => {
        const newTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(newTasks);
    };

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

    const changeFilter = (newFilter: string) => {
        setFilter(newFilter);
    };

    const shouldDisplayTask = (task: Task) => {
        if (filter === 'concluidas') return task.completed;
        if (filter === 'pendentes') return !task.completed;
        return true;
    };

    const themeClasses = darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
    const textClasses = darkTheme ? 'text-white' : 'text-gray-700';
    const inputClasses = darkTheme ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-900 shadow-lg';
    const taskClasses = darkTheme ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300';
    const activeButtonClass = "bg-blue-600 text-white";
    const inactiveButtonClass = "bg-blue-200 text-blue-800 hover:bg-blue-400";

    return (
        <div className={`${themeClasses} min-h-screen h-full w-full flex flex-col p-4`}>
            <button onClick={toggleTheme} className="mx-auto mb-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 self-start">
                Alternar para Tema {darkTheme ? 'Claro' : 'Escuro'}
            </button>
            <h1 className="text-2xl font-bold mb-4 mx-auto">To-Do List</h1>
            <div className="mb-4 mx-auto">
                <button 
                    onClick={() => changeFilter('todas')} 
                    className={`mb-3 px-4 py-2 rounded mr-2 ${filter === 'todas' ? activeButtonClass : inactiveButtonClass}`}
                >
                    Todas
                </button>
                <button 
                    onClick={() => changeFilter('concluidas')} 
                    className={`mb-3 px-4 py-2 rounded mr-2 ${filter === 'concluidas' ? activeButtonClass : inactiveButtonClass}`}
                >
                    Concluídas
                </button>
                <button 
                    onClick={() => changeFilter('pendentes')} 
                    className={`mb-3 px-4 py-2 rounded ${filter === 'pendentes' ? activeButtonClass : inactiveButtonClass}`}
                >
                    Pendentes
                </button>
            </div>
            <form onSubmit={handleSubmit} className="mb-6 w-3/4 mx-auto">
                <div className="mb-3">
                    <label htmlFor="title" className={`block text-sm font-medium ${textClasses}`}>Título:</label>
                    <input
                        type="text"
                        id="title"
                        className={`mt-1 p-2 w-full rounded-md ${inputClasses}`}
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className={`block text-sm font-medium ${textClasses}`}>Descrição:</label>
                    <textarea
                        id="description"
                        className={`mt-1 p-2 w-full rounded-md ${inputClasses}`}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Adicionar Tarefa</button>
            </form>
            <div className="w-3/4 mx-auto">
            {tasks.filter(shouldDisplayTask).map((task) => (
                    <div key={task.id} className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-lg mb-3 shadow-lg">
                        <div className="flex-1">
                            <h3 className={`text-lg font-semibold ${textClasses}`}>{task.title}</h3>
                            <p className={textClasses}>{task.description}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2 sm:mt-0">
                            <button 
                                onClick={() => toggleTaskCompletion(task.id)}
                                className={`px-3 py-1 text-sm font-semibold rounded ${task.completed ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                            >
                                {task.completed ? 'Marcar como Pendente' : 'Marcar como Concluída'}
                            </button>
                            <button 
                                onClick={() => removeTask(task.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded"
                            >
                                Remover
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {

    const navigate = useNavigate();

    React.useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            navigate('/home');
        }
    }, [navigate]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const mockUsername = 'admin';
        const mockPassword = '12345';

        if (username === mockUsername && password === mockPassword) {
            console.log('Login bem-sucedido');
            localStorage.setItem('isLoggedIn', 'true'); // Armazenando o estado de login
            navigate('/home');
        } else {
            console.log('Credenciais inválidas');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-300">
            <form className="bg-white p-8 rounded shadow-2xl" onSubmit={handleSubmit}>
                <h2 className="text-2xl mb-6 font-semibold">Login</h2>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                        Usuário
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;

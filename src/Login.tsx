import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <form className="bg-white p-8 rounded shadow-2xl">
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
import React from 'react';
import './Login.css';

const Login: React.FC = () => {
  return (
    <div className="login">
      <h2>Login</h2>
      <form>
        <label>
          Usuário:
          <input type="text" name="username" />
        </label>
        <br />
        <label>
          Senha:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
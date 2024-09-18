import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h2>Bem-vindo ao Gerenciador de Orçamento Pessoal</h2>
      <p>
        Gerencie sua renda e despesas mensais de forma simples e eficaz. Adicione, edite e exclua
        entradas de renda e despesas, e tenha controle total sobre suas finanças.
      </p>
    </div>
  );
};

export default Home;
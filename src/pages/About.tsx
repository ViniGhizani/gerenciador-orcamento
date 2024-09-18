import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about">
      <h2>Sobre</h2>
      <p>
        Este site foi criado para ajudar as pessoas a gerenciarem suas finanças pessoais de forma
        fácil e intuitiva.
      </p>
      <p>Desenvolvido por uma equipe dedicada a melhorar sua saúde financeira.</p>
    </div>
  );
};

export default About;
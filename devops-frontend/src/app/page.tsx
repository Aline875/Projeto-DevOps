import React, { useState } from 'react';
import axios from 'axios';

// Defina a URL da API de cadastro
const REGISTER_URL: string = 'http://localhost:3000/api/register'; // Substitua por sua URL real

interface RegisterState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  errorMessage: string;
  isSubmitting: boolean;
}

function Register(): React.FC<void> {
  const [state, setState]: React.useState<RegisterState> = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
    isSubmitting: false,
  });

  const { name, email, password, confirmPassword, errorMessage, isSubmitting } = state;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, name: event.target.value }));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, email: event.target.value }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, password: event.target.value }));
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, confirmPassword: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState((prevState) => ({ ...prevState, isSubmitting: true }));

    try {
      // Validação básica dos dados
      if (name.trim() === '') {
        setState((prevState) => ({ ...prevState, errorMessage: 'O nome é obrigatório' }));
        return;
      }

      if (email.trim() === '') {
        setState((prevState) => ({ ...prevState, errorMessage: 'O email é obrigatório' }));
        return;
      }

      if (password.trim() === '') {
        setState((prevState) => ({ ...prevState, errorMessage: 'A senha é obrigatória' }));
        return;
      }

      if (confirmPassword.trim() === '') {
        setState((prevState) => ({ ...prevState, errorMessage: 'A confirmação da senha é obrigatória' }));
        return;
      }

      if (password !== confirmPassword) {
        setState((prevState) => ({ ...prevState, errorMessage: 'As senhas não coincidem' }));
        return;
      }

      // Envia os dados do formulário para a API
      const response = await axios.post(REGISTER_URL, {
        name,
        email,
        password,
      });

      // Trata a resposta da API
      if (response.status === 201) {
        // Cadastro bem-sucedido
        console.log('Cadastro realizado com sucesso!');
        // Redirecione para a página de login ou outra página relevante
        // ...
      } else {
        // Erro no cadastro
        setState((prevState) => ({ ...prevState, errorMessage: response.data.message }));
      }
    } catch (error) {
      console.error(error);
      setState((prevState) => ({ ...prevState, errorMessage: 'Erro no cadastro. Tente novamente mais tarde.' }));
    } finally {
      setState((prevState) => ({ ...prevState, isSubmitting: false }));
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h1>Cadastro</h1>
  
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
  
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
  
        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
  
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
  
        {errorMessage && (
          <p className={styles.errorMessage}>{errorMessage}</p>
        )}
  
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}  
const axios = require('axios');

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Captura os dados do formulário
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  // Cria um objeto com os dados do formulário
  const dados = {
    nome,
    email,
    senha,
    confirmarSenha
  };

  // Envia os dados para a API usando Axios
  axios.post('http://localhost:3000/cadastro', dados)
    .then(response => {
      console.log('Cadastro realizado com sucesso!');
      alert('Usuário cadastrado com sucesso!');
    })
    .catch(error => {
      console.error('Erro no cadastro:', error);
      alert('Falha ao cadastrar usuário.');
    });
});

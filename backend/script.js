const axios = require('axios');

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const confirmarSenha = document.getElementById('confirmarSenha').value.trim();

  
  if (!nome || !email || !senha || !confirmarSenha) {
    alert('Preencha todos os campos.');
    return;
  }

 
  if (senha !== confirmarSenha) {
    alert('As senhas não coincidem.');
    return;
  }

  
  const dados = {
    nome,
    email,
    senha,
    confirmarSenha
  };

  
  axios.post('http://localhost:3000/cadastro', dados)
    .then(response => {
      console.log('Cadastro realizado com sucesso!');
      alert('Usuário cadastrado com sucesso!');
      window.location.href = 'usuarios.html';
    })
    .catch(error => {
      console.error('Erro no cadastro:', error);
      alert('Falha ao cadastrar usuário.');
    });
});

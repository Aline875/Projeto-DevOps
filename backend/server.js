const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/cadastro', (req, res) => {
  console.log('Dados recebidos:', req.body);

  const nome = req.body.nome.trim();
  const email = req.body.email.trim();
  const senha = req.body.senha.trim();
  const confirmarSenha = req.body.confirmarSenha?.trim();

  if (!nome || !email || !senha || !confirmarSenha) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos.' });
  }

  if (senha !== confirmarSenha) {
    return res.status(400).json({ mensagem: 'As senhas não coincidem.' });
  }

  console.log('Usuário cadastrado:', { nome, email});
  res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
});

app.get('/usuarios', (req, res) => {
  const usuarios = [
    { id: 1, nome: 'Aline Beatriz', email: 'aline@email.com' },
    { id: 2, nome: 'Aline Kessy', email: 'alineKessy@email.com' },
  ];

  res.status(200).json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = { id: 1, nome: 'Aline Beatriz', email: 'aline@email.com' };

  if (!usuario) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
  }

  res.status(200).json(usuario);
});

app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ mensagem: 'Preencha todos os campos.' });
  }

  const usuarioAtualizado = { id, nome, email };

  res.status(200).json(usuarioAtualizado);
});

app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);

  res.status(204).json();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

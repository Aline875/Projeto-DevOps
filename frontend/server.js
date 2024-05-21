const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Parse incoming JSON data

app.post('/cadastro', (req, res) => {
    const { nome, email, senha, confirmarSenha } = req.body;

    // Validação básica dos dados
    if (!nome || !email || !senha || !confirmarSenha) {
        return res.status(400).json({ mensagem: 'Preencha todos os campos.' });
    }

    if (senha !== confirmarSenha) {
        return res.status(400).json({ mensagem: 'As senhas não coincidem.' });
    }

    // Simulando o salvamento do usuário no banco de dados (substitua por sua lógica real)
    console.log('Usuário cadastrado:', { nome, email, senha });
    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

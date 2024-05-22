document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/usuarios')
        .then(response => response.json())
        .then(usuarios => {
            const tbody = document.getElementById('usuarios-tbody');
            usuarios.forEach(usuario => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nome}</td>
                    <td>${usuario.email}</td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar usuários:', error);
        });
});

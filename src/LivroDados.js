import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ControleLivro from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const controleLivros = new ControleLivro();
const controleEditora = new ControleEditora();

const LivroDados = () => {
  // Instanciar opções de editoras
  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  // Definindo estado para título, resumo, autores e editora
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);

  // Hook useNavigate
  const navigate = useNavigate();

  // Método para tratar mudança na combo box (editoras)
  const tratarCombo = (evento) => {
    setCodEditora(Number(evento.target.value));
  };

  // Método para incluir o livro
  const incluir = (evento) => {
    evento.preventDefault();  // Evita comportamento padrão de submit

    // Criação do novo livro
    const novoLivro = {
      codigo: 0,
      titulo,
      resumo,
      autores: autores.split('\n'),  // Separa os autores por linha
      codEditora,
    };

    // Invoca o método incluir do controle de livros
    controleLivros.incluir(novoLivro);

    // Redireciona para a página de listagem (raiz)
    navigate('/');
  };

  return (
    <main className="container mt-4">
      <h1>Adicionar Novo Livro</h1>
      <form onSubmit={incluir}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Resumo</label>
          <textarea
            className="form-control"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Autores (1 por linha)</label>
          <textarea
            className="form-control"
            value={autores}
            onChange={(e) => setAutores(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Editora</label>
          <select className="form-select" value={codEditora} onChange={tratarCombo}>
            {opcoes.map((editora) => (
              <option key={editora.value} value={editora.value}>
                {editora.text}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Incluir</button>
      </form>
    </main>
  );
};

export default LivroDados;

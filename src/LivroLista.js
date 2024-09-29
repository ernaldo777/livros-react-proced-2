
import React, { useState, useEffect } from 'react';
import ControleLivro from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

const controleLivros = new ControleLivro();
const controleEditora = new ControleEditora();

const LinhaLivro = (props) => {
  const { livro, excluir } = props;
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td className="align-middle">
        {livro.titulo}
        <br />
        <button className="btn btn-danger btn-sm mt-2" onClick={() => excluir(livro.codigo)}>
          Excluir
        </button>
      </td>
      <td className="align-middle">{livro.resumo}</td>
      <td className="align-middle">{nomeEditora}</td>
      <td className="align-middle">
        <ul className="list-unstyled">
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setLivros(controleLivros.obterLivros());
    setCarregado(true);
  }, [carregado]);

  const excluir = (codigo) => {
    controleLivros.excluir(codigo);
    setCarregado(false); 
  };

  return (
    <main className="container mt-4">
      <h1 className="mb-4">Catálogo de Livros</h1>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Título</th>
            <th>Resumo</th>
            <th>Editora</th>
            <th>Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <LinhaLivro
              key={livro.codigo}
              livro={livro}
              excluir={excluir}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LivroLista;

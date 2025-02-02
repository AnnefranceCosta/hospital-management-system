import React from 'react';

import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/funcionarios`;

function ListagemFuncionarios() {
  const navigate = useNavigate();
  const [dados, setDados] = React.useState([]);

  const cadastrar = () => {
    navigate('/cadastro-funcionarios');
  };

  const editar = (id) => {
    navigate(`/cadastro-funcionarios/${id}`);
  };

  async function excluir(id) {
    let data = JSON.stringify([id]);
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Funcionario excluído com sucesso!`);
        setDados(dados.filter((dado) => { return dado.id !== id;}))
      })
      .catch((error) => {
        mensagemErro(`Erro ao excluir o funcionário.`);
      });
  }

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
      .catch(() => {
        mensagemErro('Erro ao carregar informações do funcionário.');
      });
  }, []);

  if (!dados.length) return <p>Carregando funcionários...</p>;

  return (
    <div className='container'>
      <Card title='Listagem de Funcionários'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={cadastrar}
              >
                Novo Funcionário
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome Completo</th>
                    <th scope='col'>Setor</th>
                    <th scope='col'>Tipo</th>
                    <th scope='col'>Gênero</th>
                    <th scope='col'>CPF</th>
                    <th scope='col'>Data de Nascimento</th>
                    <th scope='col'>Estado Civil</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nomeCompleto}</td>
                      <td>{dado.setor}</td>
                      <td>{dado.tipoFuncionario}</td>
                      <td>{dado.genero}</td>
                      <td>{dado.cpf}</td>
                      <td>
                        {new Date(dado.dataNascimento).toLocaleDateString()}
                      </td>
                      <td>{dado.estadoCivil}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemFuncionarios;

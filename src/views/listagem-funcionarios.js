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

  const cadastrar = () => {
    navigate(`/cadastro-funcionarios`);
  };

  const editar = (id) => {
    navigate(`/cadastro-funcionarios/${id}`);
  };

  const [dados, setDados] = React.useState([]);

  async function excluir(id) {
    let url = `${baseURL}/${id}`;
    await axios
      .delete(url, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        mensagemSucesso(`Funcionario excluído com sucesso!`);
        setDados(dados.filter((dado) => dado.id !== id));
      })
      .catch(() => {
        mensagemErro(`Erro ao excluir funcionario`);
      });
  }
  
  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
      .catch(() => {
        mensagemErro('Erro ao carregar informações do funcionario');
      });
  }, []);

  if (!dados.length) return <p>Carregando funcionarios...</p>;

  return (
    <div className='container'>
      <Card title='Listagem de Funcionarios'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={cadastrar}
              >
                Cadastrar novo funcionario
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Nome do funcionario</th>
                    <th scope='col'>CPF</th>
                    <th scope='col'>Data de Nascimento</th>
                    <th scope='col'>E-mail</th>
                    <th scope='col'>Logradouro</th>
                    <th scope='col'>Numero</th>
                    <th scope='col'>Complemento</th>
                    <th scope='col'>Bairro</th>
                    <th scope='col'>Cidade</th>
                    <th scope='col'>Estado</th>
                    <th scope='col'>CEP</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dado.nomeFuncionario}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.dataNascimento}</td>
                      <td>{dado.email}</td>
                      <td>{dado.logradouro}</td>
                      <td>{dado.numero}</td>
                      <td>{dado.complemento}</td>
                      <td>{dado.bairro}</td>
                      <td>{dado.cidade}</td>
                      <td>{dado.estado}</td>
                      <td>{dado.cep}</td>
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

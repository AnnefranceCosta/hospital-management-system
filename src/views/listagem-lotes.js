import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import { IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/lotes`;

function ListagemLotes() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-lotes`);
  };

  const editar = (id) => {
    navigate(`/cadastro-lotes/${id}`);
  };

  const [dados, setDados] = React.useState([]);

  async function excluir(id) {
    let url = `${baseURL}/${id}`;
    await axios
      .delete(url, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        mensagemSucesso(`Lote excluído com sucesso!`);
        setDados(
          dados.filter((dado) => dado.id !== id)
        );
      })
      .catch(() => {
        mensagemErro(`Erro ao excluir o lote`);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados.length) return <p>Carregando lotes...</p>;

  return (
    <div className='container'>
      <Card title='Listagem de Lotes'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={cadastrar}
              >
                Novo Lote
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Quantidade em Estoque</th>
                    <th scope='col'>Fornecedor</th>
                    <th scope='col'>Data de Fabricação</th>
                    <th scope='col'>Data de Validade</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.quantidadeEstoque}</td>
                      <td>{dado.fornecedor}</td>
                      <td>{new Date(dado.dataFabricacao).toLocaleDateString()}</td>
                      <td>{new Date(dado.dataValidade).toLocaleDateString()}</td>
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

export default ListagemLotes;

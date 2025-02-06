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

const baseURL = `${BASE_URL}/medicamentos`;

function ListagemMedicamentos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-medicamentos`);
  };

  const editar = (id) => {
    navigate(`/cadastro-medicamentos/${id}`);
  };

  const [dados, setDados] = React.useState([]);

  async function excluir(id) {
    let url = `${baseURL}/${id}`;
    await axios
      .delete(url, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(() => {
        mensagemSucesso(`Medicamento excluído com sucesso!`);
        setDados(dados.filter((dado) => dado.id !== id));
      })
      .catch(() => {
        mensagemErro(`Erro ao excluir o medicamento`);
      });
  }

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
      .catch(() => {
        mensagemErro('Erro ao carregar medicamentos');
      });
  }, []);

  if (!dados.length) return <p>Carregando medicamentos...</p>;

  return (
    <div className='container'>
      <Card title='Listagem de Medicamentos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={cadastrar}
              >
                Novo Medicamento
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome do Medicamento</th>
                    <th scope='col'>Quantidade</th>
                    <th scope='col'>Dosagem</th>
                    <th scope='col'>Forma Farmacêutica</th>
                    <th scope='col'>Categoria</th>
                    <th scope='col'>Tarja</th>
                    <th scope='col'>Lote</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nomeMedicamento}</td>
                      <td>{dado.quantidade}</td>
                      <td>{dado.dosagem}</td>
                      <td>{dado.formaFarmaceutica}</td>
                      <td>{dado.categoria}</td>
                      <td>{dado.tarja}</td>
                      <td>{dado.lote}</td>
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

export default ListagemMedicamentos;

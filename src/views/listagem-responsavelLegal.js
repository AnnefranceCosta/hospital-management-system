import React, { useState, useEffect } from 'react';
import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

const baseURL = `${BASE_URL2}/responsavelLegal`;

function ListagemResponsavelLegal() {
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  const cadastrar = () => {
    navigate('/cadastro-responsavelLegal');
  };

  const editar = (id) => {
    navigate(`/cadastro-responsavelLegal/${id}`);
  };

  const excluir = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      mensagemSucesso('Responsável legal excluído com sucesso!');
      setDados(dados.filter((dado) => dado.id !== id));
    } catch (error) {
      mensagemErro('Erro ao excluir o responsável legal!');
    }
  };

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Responsáveis Legais'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-success'
                onClick={cadastrar}
              >
                Novo Responsável Legal
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>CPF</th>
                    <th scope='col'>Relação com Paciente</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.relacaoPaciente}</td>
                      <td>
                        <Stack spacing={1} direction='row'>
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

export default ListagemResponsavelLegal;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

const baseURL = `${BASE_URL2}/pacientes`;

function ListagemPacientes() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-pacientes`);
  };

  const editar = (id) => {
    navigate(`/cadastro-pacientes/${id}`);
  };

  const [dados, setDados] = useState([]);

  async function excluir(id) {
    let url = `${baseURL}/${id}`;
    await axios
      .delete(url, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        mensagemSucesso(`Paciente excluído com sucesso!`);
        setDados(dados.filter((dado) => dado.id !== id));
      })
      .catch((error) => {
        mensagemErro(`Erro ao excluir o paciente`);
      });
  }

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Pacientes'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-success'
                onClick={() => cadastrar()}
              >
                Novo Paciente
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome Completo</th>
                    <th scope='col'>Gênero</th>
                    <th scope='col'>Data de Nascimento</th>
                    <th scope='col'>CPF</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nomeCompleto}</td>
                      <td>{dado.genero}</td>
                      <td>{dado.dataNascimento}</td>
                      <td>{dado.cpf}</td>
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

export default ListagemPacientes;

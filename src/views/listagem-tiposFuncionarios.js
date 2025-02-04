import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/tiposFuncionarios`;

function ListagemTiposFuncionarios() {
  const navigate = useNavigate();

  const cadastrar = () => navigate(`/cadastro-tiposFuncionarios`);

  const editar = (id) => navigate(`/cadastro-tiposFuncionarios/${id}`);

  const [dados, setDados] = useState([]);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Tipo de funcionário excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a categoria`);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  return (
    <div className="container">
      <Card title="Listagem de Tipos de Funcionários">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button type="button" className="btn btn-success" onClick={() => cadastrar()}>
                Novo Tipo de Funcionário
              </button>
              {dados.length > 0 ? (
                <table className="table table-hover mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Tipo</th>
                      <th scope="col">Descrição</th>
                      <th scope="col">Prontuário de Pacientes</th>
                      <th scope="col">Cadastro de Pacientes</th>
                      <th scope="col">Cadastro de Funcionários</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dados.map((dado) => (
                      <tr key={dado.id}>
                        <td>{dado.tipo}</td>
                        <td>{dado.descricao}</td>
                        <td>{dado.prontuario ? 'Sim' : 'Não'}</td>
                        <td>{dado.cadastroPacientes ? 'Sim' : 'Não'}</td>
                        <td>{dado.cadastroFuncionarios ? 'Sim' : 'Não'}</td>
                        <td>
                          <Stack spacing={1} padding={0} direction="row">
                            <IconButton aria-label="edit" onClick={() => editar(dado.id)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => excluir(dado.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-3">Nenhum tipo de funcionário cadastrado.</p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemTiposFuncionarios;

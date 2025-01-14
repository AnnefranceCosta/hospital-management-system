import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import { mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

function ListagemProntuarios() {
  const navigate = useNavigate();
  const baseURL = `${BASE_URL2}/prontuarios`;

  const [prontuarios, setProntuarios] = useState([]);

  const listarProntuarios = useCallback(async () => {
    try {
      const response = await axios.get(baseURL);
      setProntuarios(response.data);
    } catch (error) {
      mensagemErro('Erro ao listar prontuários.');
    }
  }, [baseURL]);

  function editarProntuario(id) {
    navigate(`/cadastro-prontuarios/${id}`);
  }

  function novoProntuario() {
    navigate(`/cadastro-prontuarios`);
  }

  useEffect(() => {
    listarProntuarios();
  }, [listarProntuarios]);

  return (
    <div className='container'>
      <Card title='Listagem de Prontuários'>
        <div className='bs-component'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Médico</th>
                <th>CRM</th>
                <th>Data da Consulta</th>
                <th>Motivo da Consulta</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {prontuarios.map((prontuario) => (
                <tr key={prontuario.id}>
                  <td>{prontuario.id}</td>
                  <td>{prontuario.nomeCompleto}</td>
                  <td>{prontuario.crm}</td>
                  <td>{new Date(prontuario.dataConsulta).toLocaleDateString()}</td>
                  <td>{prontuario.motivoConsulta}</td>
                  <td>
                    <Stack spacing={1} direction='row'>
                      <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => editarProntuario(prontuario.id)}
                      >
                        Editar
                      </button>
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Stack spacing={1} direction='row' padding={1}>
            <button
              type='button'
              className='btn btn-success'
              onClick={novoProntuario}
            >
              Novo Prontuário
            </button>
          </Stack>
        </div>
      </Card>
    </div>
  );
}

export default ListagemProntuarios;

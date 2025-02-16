import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/categoriaMedicamentos`;

function ListagemCategoriaMedicamentos() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    carregarCategorias();
  }, []);

  async function carregarCategorias() {
    await axios
      .get(baseURL)
      .then((response) => {
        setCategorias(response.data);
      })
      .catch(() => {
        mensagemErro('Erro ao carregar categorias.');
      });
  }

  const cadastrar = () => {
    navigate(`/cadastro-categoriaMedicamentos`);
  };

  const editar = (id) => {
    navigate(`/cadastro-categoriaMedicamentos/${id}`);
  };

  const excluir = async (id) => {
    if (window.confirm('Deseja realmente excluir esta categoria?')) {
      await axios
        .delete(`${baseURL}/${id}`)
        .then(() => {
          mensagemSucesso('Categoria excluída com sucesso!');
          setCategorias(categorias.filter((categoria) => categoria.id !== id));
        })
        .catch(() => {
          mensagemErro('Erro ao excluir a categoria.');
        });
    }
  };

  if (!categorias.length) return <p>Carregando categorias...</p>;

  return (
    <div className='container'>
      <Card title='Listagem de Categorias de Medicamentos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={cadastrar}
              >
                Nova Categoria
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome da Categoria</th>
                    <th scope='col'>Descrição</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((categoria) => (
                    <tr key={categoria.id}>
                      <td>{categoria.nomeCategoria}</td>
                      <td>{categoria.descricao}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(categoria.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(categoria.id)}
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

export default ListagemCategoriaMedicamentos;

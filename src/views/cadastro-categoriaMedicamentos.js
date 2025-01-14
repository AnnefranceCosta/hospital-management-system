import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroCategoriaMedicamentos() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/categoriaMedicamentos`;

  const [id, setId] = useState('');
  const [nomeCategoria, setNomeCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categorias, setCategorias] = useState([]);

  // Carregar categorias existentes
  useEffect(() => {
    async function carregarCategorias() {
      try {
        const response = await axios.get(baseURL);
        setCategorias(response.data);
      } catch (error) {
        mensagemErro('Erro ao carregar categorias');
      }
    }
    carregarCategorias();
  }, []);

  // Buscar dados para edição
  useEffect(() => {
    if (idParam) {
      axios
        .get(`${baseURL}/${idParam}`)
        .then((response) => {
          const dados = response.data;
          setId(dados.id);
          setNomeCategoria(dados.nomeCategoria);
          setDescricao(dados.descricao);
        })
        .catch(() => mensagemErro('Erro ao buscar dados da categoria'));
    }
  }, [idParam]);

  async function salvar() {
    const data = {
      id,
      nomeCategoria,
      descricao,
    };

    const headers = { 'Content-Type': 'application/json' };

    try {
      if (idParam) {
        await axios.put(`${baseURL}/${idParam}`, JSON.stringify(data), {
          headers,
        });
        mensagemSucesso('Categoria atualizada com sucesso!');
      } else {
        await axios.post(baseURL, JSON.stringify(data), { headers });
        mensagemSucesso('Categoria cadastrada com sucesso!');
      }
      navigate('/listagem-categorias');
    } catch (error) {
      mensagemErro('Erro ao salvar categoria');
    }
  }

  return (
    <div className="container">
      <Card title="Cadastro de Categoria de Medicamentos">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Categoria Existente:" htmlFor="selectCategoria">
                <Select
                  id="selectCategoria"
                  value={id}
                  className="form-control"
                  displayEmpty
                  onChange={(e) => setId(e.target.value)}
                >
                  <MenuItem value="">Selecione uma categoria</MenuItem>
                  {categorias.map((categoria) => (
                    <MenuItem key={categoria.id} value={categoria.id}>
                      {categoria.nomeCategoria}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup
                label="Nome da Categoria:"
                htmlFor="inputNomeCategoria"
              >
                <input
                  type="text"
                  id="inputNomeCategoria"
                  value={nomeCategoria}
                  className="form-control"
                  placeholder="Ex: Analgésicos"
                  onChange={(e) => setNomeCategoria(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Descrição:" htmlFor="inputDescricao">
                <textarea
                  id="inputDescricao"
                  value={descricao}
                  className="form-control"
                  rows="3"
                  placeholder="Descreva a categoria"
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction="row">
                <button
                  onClick={salvar}
                  type="button"
                  className="btn btn-success"
                >
                  Salvar
                </button>
                <button
                  onClick={() => navigate('/listagem-categorias')}
                  type="button"
                  className="btn btn-danger"
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroCategoriaMedicamentos;

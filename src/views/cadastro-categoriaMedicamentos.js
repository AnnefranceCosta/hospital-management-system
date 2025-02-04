import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';
import '../custom.css';

function CadastroCategoriaMedicamentos() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/categoriaMedicamentos`;

  const [id, setId] = useState('');
  const [nomeCategoria, setNomeCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categorias, setCategorias] = useState([]);

  const [dadosCategoriaMedicamentos, setDados] = React.useState([]);

  function inicializar() {
    if (!idParam == null) {
      setId('');
      setNomeCategoria('');
      setDescricao('');
      setCategorias('');
    } else {
      setId(dadosCategoriaMedicamentos.id);
      setNomeCategoria(dadosCategoriaMedicamentos.nomeCategoria);
      setDescricao(dadosCategoriaMedicamentos.descricao);
      setCategorias(dadosCategoriaMedicamentos.categoria);
    }
  }

  async function salvar() {
    let data = {
      id,
      nomeCategoria,
      descricao,
      categorias,
    };

    data = JSON.stringify(data);
    if (!idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Medicamento ${nomeCategoria} cadastrado com sucesso!`);
          navigate(`/listagem-categoriaMedicamentos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Medicamento ${nomeCategoria} alterado com sucesso!`);
          navigate(`/listagem-categoriaMedicamentos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }


  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);

        setId(dadosCategoriaMedicamentos.id);
        setNomeCategoria(dadosCategoriaMedicamentos.nomeCategoria);
        setDescricao(dadosCategoriaMedicamentos.descricao);
        setCategorias(dadosCategoriaMedicamentos.categoria);
      });
    }
  }

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

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

if (!dadosCategoriaMedicamentos) return null;

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
                    onClick={inicializar}
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

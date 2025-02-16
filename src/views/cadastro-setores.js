import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';
import '../custom.css';

function CadastroSetores() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL2}/setores`;

  const [id, setId] = useState('');
  const [nomeSetor, setNomeSetor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [setores, setSetores] = useState([]);

  const [dadosSetores, setDados] = useState([]);

  function inicializar() {
    if (!idParam) {
      setId('');
      setNomeSetor('');
      setDescricao('');
      setSetores([]);
    } else {
      setId(dadosSetores.id);
      setNomeSetor(dadosSetores.nomeSetor);
      setDescricao(dadosSetores.descricao);
      setSetores(dadosSetores.setor);
    }
  }

  async function salvar() {
    let data = { id, nomeSetor, descricao, setores };
    data = JSON.stringify(data);

    if (!idParam) {
      await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          mensagemSucesso(`Setor ${nomeSetor} cadastrado com sucesso!`);
          navigate(`/listagem-setores`);
        })
        .catch((error) => mensagemErro(error.response.data));
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          mensagemSucesso(`Setor ${nomeSetor} alterado com sucesso!`);
          navigate(`/listagem-setores`);
        })
        .catch((error) => mensagemErro(error.response.data));
    }
  }

  async function buscar() {
    if (idParam) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
        setId(dadosSetores.id);
        setNomeSetor(dadosSetores.nomeSetor);
        setDescricao(dadosSetores.descricao);
        setSetores(dadosSetores.setor);
      });
    }
  }

  useEffect(() => {
    async function carregarSetores() {
      try {
        const response = await axios.get(baseURL);
        setSetores(response.data);
      } catch (error) {
        mensagemErro('Erro ao carregar setores');
      }
    }
    carregarSetores();
  }, []);

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dadosSetores) return null;

  return (
    <div className="container">
      <Card title="Cadastro de Setores">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Setor Existente:" htmlFor="selectSetor">
                <Select
                  id="selectSetor"
                  value={id}
                  className="form-control"
                  displayEmpty
                  onChange={(e) => setId(e.target.value)}
                >
                  <MenuItem value="">Selecione um setor</MenuItem>
                  {setores.map((setor) => (
                    <MenuItem key={setor.id} value={setor.id}>
                      {setor.nomeSetor}
                    </MenuItem>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup label="Nome do Setor:" htmlFor="inputNomeSetor">
                <input
                  type="text"
                  id="inputNomeSetor"
                  value={nomeSetor}
                  className="form-control"
                  placeholder="Ex: Financeiro"
                  onChange={(e) => setNomeSetor(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Descrição:" htmlFor="inputDescricao">
                <textarea
                  id="inputDescricao"
                  value={descricao}
                  className="form-control"
                  rows="3"
                  placeholder="Descreva o setor"
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

export default CadastroSetores;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
<<<<<<< HEAD
import Stack from "@mui/material/Stack";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import SubCard from "../components/sub-card";
import { mensagemSucesso, mensagemErro } from "../components/toastr";
import axios from "axios";
import { BASE_URL } from "../config/axios";
import "../custom.css";

function CadastroFuncionario() {
  const { idParam } = useParams();
  const navigate = useNavigate();
=======

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";
import SubCard from "../components/sub-card";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import "../custom.css";

import axios from "axios";
import { BASE_URL } from "../config/axios";

function CadastroFuncionarios() {
  const { idParam } = useParams();
  const navigate = useNavigate();

>>>>>>> cfe5ef7a63be80941d0248afcbfdddcbc42b9ce8
  const baseURL = `${BASE_URL}/funcionarios`;

  const [dadosTipoFuncionarios, setDadosTipoFuncionarios] = useState([]);
  const [id, setId] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [setor, setSetor] = useState("");
  const [tipoFuncionario, setTipoFuncionario] = useState(0);
  const [genero, setGenero] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [telefoneCelular, setTelefoneCelular] = useState("");
  const [telefoneFixo, setTelefoneFixo] = useState("");
  const [email, setEmail] = useState("");
  const [dados, setDados] = useState({});

  const inicializar = useCallback(() => {
    if (!idParam) {
      setId("");
      setNomeCompleto("");
      setSetor("");
      setTipoFuncionario(0);
      setGenero("");
      setCpf("");
      setDataNascimento("");
      setEstadoCivil("");
      setTelefoneCelular("");
      setTelefoneFixo("");
      setEmail("");
    } else {
      setId(dados.id);
      setNomeCompleto(dados.nomeCompleto);
      setSetor(dados.setor);
      setTipoFuncionario(dados.tipoFuncionario);
      setGenero(dados.genero);
      setCpf(dados.cpf);
      setDataNascimento(dados.dataNascimento);
      setEstadoCivil(dados.estadoCivil);
    }
  }, [dados, idParam]);

  const salvar = async () => {
    const data = {
      id,
      nomeCompleto,
      setor,
      tipoFuncionario,
      genero,
      cpf,
      dataNascimento,
      estadoCivil,
      telefoneCelular,
      telefoneFixo,
      email,
    };

    try {
      if (!idParam) {
        await axios.post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Funcionário ${nomeCompleto} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        mensagemSucesso(`Funcionário ${nomeCompleto} alterado com sucesso!`);
      }
      navigate("/listagem-funcionarios");
    } catch (error) {
      mensagemErro(error.response?.data || "Erro ao salvar funcionário.");
    }
  };

  const buscar = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/${idParam}`);
      setDados(response.data);
    } catch (error) {
      mensagemErro("Erro ao buscar dados do funcionário.");
    }
  }, [baseURL, idParam]);

  useEffect(() => {
    const fetchTiposFuncionarios = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/tiposFuncionarios`);
        setDadosTipoFuncionarios(response.data);
      } catch (error) {
        mensagemErro("Erro ao carregar os tipos de funcionários.");
      }
    };
    fetchTiposFuncionarios();
  }, []);

  useEffect(() => {
    if (idParam) {
      buscar();
    }
  }, [idParam, buscar]);

  return (
    <div className="container">
      <Card title="Cadastro de Funcionários">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome Completo: *" htmlFor="inputNomeCompleto">
                <input
                  type="text"
                  id="inputNomeCompleto"
                  value={nomeCompleto}
                  className="form-control"
                  onChange={(e) => setNomeCompleto(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Setor: *" htmlFor="inputSetor">
                <select
                  id="inputSetor"
                  className="form-control"
                  value={setor}
                  onChange={(e) => setSetor(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="Geral">Geral</option>
                  <option value="Clínico">Clínico</option>
                  <option value="RH">Recursos Humanos</option>
                </select>
              </FormGroup>

              <FormGroup
                label="Tipo de Funcionário: *"
                htmlFor="inputTipoFuncionario"
              >
                <select
                  id="inputTipoFuncionario"
                  className="form-control"
                  value={tipoFuncionario}
                  onChange={(e) => setTipoFuncionario(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {dadosTipoFuncionarios.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.tipo}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label="Gênero: *" htmlFor="inputGenero">
                <input
                  type="text"
                  id="inputGenero"
                  value={genero}
                  className="form-control"
                  onChange={(e) => setGenero(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="CPF: *" htmlFor="inputCpf">
                <input
                  type="text"
                  id="inputCpf"
                  value={cpf}
                  className="form-control"
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Data de Nascimento: *"
                htmlFor="inputDataNascimento"
              >
                <input
                  type="date"
                  id="inputDataNascimento"
                  value={dataNascimento}
                  className="form-control"
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Estado Civil: *" htmlFor="inputEstadoCivil">
                <input
                  type="text"
                  id="inputEstadoCivil"
                  value={estadoCivil}
                  className="form-control"
                  onChange={(e) => setEstadoCivil(e.target.value)}
                />
              </FormGroup>
              <br />
              <SubCard title="Contatos">
                <div className="form-group">
                  <label>Telefone Celular:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={telefoneCelular}
                    onChange={(e) => setTelefoneCelular(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Telefone Fixo:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={telefoneFixo}
                    onChange={(e) => setTelefoneFixo(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </SubCard>
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

<<<<<<< HEAD
export default CadastroFuncionario;
=======
export default CadastroFuncionarios;
>>>>>>> cfe5ef7a63be80941d0248afcbfdddcbc42b9ce8

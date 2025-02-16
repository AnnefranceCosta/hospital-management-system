import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import SubCard from "../components/sub-card";
import { mensagemSucesso, mensagemErro } from "../components/toastr";
import axios from "axios";
import { BASE_URL } from "../config/axios";
import { BASE_URL2 } from "../config/axios";
import "../custom.css";

function CadastroFuncionarios() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/funcionarios`;

  const [dadosTipoFuncionarios, setDadosTipoFuncionarios] = useState([]);
  const [setores, setSetores] = useState([]);
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
  const [endereco, setEndereco] = useState({
    logradouro: "",
    numero: "",
    cep: "",
    bairro: "",
    uf: "",
    complemento: "",
  });

  const [dadosFuncionario, setDados] = useState([]);

  async function buscarSetores() {
    try {
      const response = await axios.get(`${BASE_URL2}/setores`);
      setSetores(response.data);
    } catch (error) {
      mensagemErro("Erro ao buscar setores.");
    }
  }

  async function buscarTiposFuncionarios() {
    try {
      const response = await axios.get(`${BASE_URL}/tiposFuncionarios`);
      setDadosTipoFuncionarios(response.data);
    } catch (error) {
      mensagemErro("Erro ao buscar tipos de funcionários.");
    }
  }

  async function inicializar() {
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
      setEndereco({
        logradouro: "",
        numero: "",
        cep: "",
        bairro: "",
        uf: "",
        complemento: "",
      });
    } else {
      setId(dadosFuncionario.id);
      setNomeCompleto(dadosFuncionario.nomeCompleto);
      setSetor(dadosFuncionario.setor);
      setTipoFuncionario(dadosFuncionario.tipoFuncionario);
      setGenero(dadosFuncionario.genero);
      setCpf(dadosFuncionario.cpf);
      setDataNascimento(dadosFuncionario.dataNascimento);
      setEstadoCivil(dadosFuncionario.estadoCivil);
      setEndereco(dadosFuncionario.endereco);
    }
  }

  async function salvar() {
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
      endereco,
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
      navigate(`/listagem-funcionarios`);
    } catch (error) {
      mensagemErro(error.response.data);
    }
  }

  async function buscar() {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const funcionario = response.data;
        setDados(funcionario);

        setId(funcionario.id);
        setNomeCompleto(funcionario.nomeCompleto);
        setSetor(funcionario.setor);
        setTipoFuncionario(funcionario.tipoFuncionario);
        setGenero(funcionario.genero);
        setCpf(funcionario.cpf);
        setDataNascimento(funcionario.dataNascimento);
        setEstadoCivil(funcionario.estadoCivil);
        setTelefoneCelular(funcionario.telefoneCelular);
        setTelefoneFixo(funcionario.telefoneFixo);
        setEmail(funcionario.email);
        setEndereco(
          funcionario.endereco || {
            logradouro: "",
            numero: "",
            cep: "",
            bairro: "",
            uf: "",
            complemento: "",
          }
        );
      } catch (error) {
        mensagemErro("Erro ao buscar funcionário.");
      }
    }
  }

  useEffect(() => {
    buscar();
    buscarSetores();
    buscarTiposFuncionarios();
  }, []);

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

              <FormGroup label="Setor Existente:" htmlFor="selectSetor">
                <select
                  id="selectSetor"
                  className="form-control"
                  value={setor}
                  onChange={(e) => setSetor(e.target.value)}
                >
                  <option value="">Selecione um setor</option>
                  {setores.map((setor) => (
                    <option key={setor.id} value={setor.nomeSetor}>
                      {setor.nomeSetor}
                    </option>
                  ))}
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

              <SubCard title="Endereços">
                <div className="form-group">
                  <label>Logradouro:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={endereco.logradouro}
                    onChange={(e) =>
                      setEndereco({ ...endereco, logradouro: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Número:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={endereco.numero}
                    onChange={(e) =>
                      setEndereco({ ...endereco, numero: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>CEP:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={endereco.cep}
                    onChange={(e) =>
                      setEndereco({ ...endereco, cep: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Bairro:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={endereco.bairro}
                    onChange={(e) =>
                      setEndereco({ ...endereco, bairro: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>UF:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={endereco.uf}
                    onChange={(e) =>
                      setEndereco({ ...endereco, uf: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Complemento:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={endereco.complemento}
                    onChange={(e) =>
                      setEndereco({ ...endereco, complemento: e.target.value })
                    }
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

export default CadastroFuncionarios;

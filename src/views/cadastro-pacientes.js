import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/card";
import SubCard from "../components/sub-card";
import FormGroup from "../components/form-group";
import { mensagemSucesso, mensagemErro } from "../components/toastr";
import "../custom.css";
import axios from "axios";
import { BASE_URL2 } from "../config/axios";

function CadastroPacientes() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL2}/pacientes`;

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("0");
  const [genero, setGenero] = useState("");
  const [tipoSanguineo, setTipoSanguineo] = useState("");
  const [alergias, setAlergias] = useState("");
  const [telefoneCelular, setTelefoneCelular] = useState("0");
  const [telefoneFixo, setTelefoneFixo] = useState("0");
  const [email, setEmail] = useState("");
  const [profissao, setProfissao] = useState("");
  const [religiao, setReligiao] = useState("");
  const [convenios, setConvenios] = useState(false);
  const [numeroCarteirinha, setNumeroCarteirinha] = useState("0");
  const [endereco, setEndereco] = useState({
    logradouro: "",
    numero: "0",
    cep: "0",
    bairro: "",
    uf: "",
    complemento: "",
  });
  const [responsavelLegal, setResponsavelLegal] = useState("");
  const [responsaveisLegais, setResponsaveisLegais] = useState([
    { id: 1, nome: "Maria Silva", responsavelLegal: "Mãe" },
    { id: 2, nome: "João Pereira", responsavelLegal: "Pai" },
  ]);
  const [dadosPaciente, setDados] = useState([]);

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
    }
  }

  useEffect(() => {
    buscar();
  }, [idParam]);

  async function salvar() {
    let data = {
      nomeCompleto,
      cpf,
      dataNascimento,
      genero,
      tipoSanguineo,
      alergias,
      telefoneCelular,
      telefoneFixo,
      email,
      profissao,
      religiao,
      convenios,
      numeroCarteirinha,
      endereco,
      responsavelLegal,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Paciente ${nomeCompleto} cadastrado com sucesso!`);
          navigate(`/listagem-pacientes`);
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
          mensagemSucesso(`Paciente ${nomeCompleto} atualizado com sucesso!`);
          navigate(`/listagem-pacientes`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  if (!dadosPaciente) return null;

  return (
    <div className="container">
      <Card title="Cadastro de Pacientes">
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
              <FormGroup label="Gênero: *" htmlFor="inputGenero">
                <select
                  id="inputGenero"
                  value={genero}
                  className="form-control"
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </FormGroup>
              <FormGroup label="Tipo Sanguíneo:" htmlFor="inputTipoSanguineo">
                <input
                  type="text"
                  id="inputTipoSanguineo"
                  value={tipoSanguineo}
                  className="form-control"
                  onChange={(e) => setTipoSanguineo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Alergias:" htmlFor="inputAlergias">
                <textarea
                  id="inputAlergias"
                  value={alergias}
                  className="form-control"
                  onChange={(e) => setAlergias(e.target.value)}
                />
              </FormGroup>
              <br></br>
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
              <br></br>
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
              <SubCard title="Informações Adicionais">
                <div className="form-group">
                  <FormGroup label="Responsável Legal: *" htmlFor="selectResponsavelLegal">
                    <select
                      id="selectResponsavelLegal"
                      className="form-control"
                      value={responsavelLegal}
                      onChange={(e) => setResponsavelLegal(e.target.value)}
                    >
                      <option value="">Selecione...</option>
                      {responsaveisLegais.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.nome} - {r.responsavelLegal}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                  <label>Profissão:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profissao}
                    onChange={(e) => setProfissao(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Religião:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={religiao}
                    onChange={(e) => setReligiao(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Convênios:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={convenios}
                    onChange={(e) => setConvenios(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Numero Carteirinha:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={numeroCarteirinha}
                    onChange={(e) =>
                      setNumeroCarteirinha(e.target.value)
                    }
                  />
                </div>
              </SubCard>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroPacientes;

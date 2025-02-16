import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Card from "../components/card";

import SubCard from "../components/sub-card";

import FormGroup from "../components/form-group";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

import "../custom.css";
import axios from "axios";
import { BASE_URL2 } from "../config/axios";

function CadastroProntuario() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL2}/prontuarios`;

  const [id, setId] = useState("");
  const [nomePaciente, setNomePaciente] = useState("");
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [crm, setCrm] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");
  const [horaConsulta, setHoraConsulta] = useState("");
  const [motivoConsulta, setMotivoConsulta] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);
  const [examesLaudos, setExamesLaudos] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [listaMedicamentos, setListaMedicamentos] = useState([]);
  const [dadosProntuario, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId("");
      setNomePaciente("");
      setNomeCompleto("");
      setCrm("");
      setDataConsulta("");
      setHoraConsulta("");
      setMotivoConsulta("");
      setSintomas("");
      setDiagnostico("");
      setMedicamentos([]);
      setExamesLaudos("");
      setObservacoes("");
    } else {
      setId(dadosProntuario.id);
      setNomePaciente(dadosProntuario.nomePaciente);
      setNomeCompleto(dadosProntuario.nomeCompleto);
      setCrm(dadosProntuario.crm);
      setDataConsulta(dadosProntuario.dataConsulta);
      setHoraConsulta(dadosProntuario.horaConsulta);
      setMotivoConsulta(dadosProntuario.motivoConsulta);
      setSintomas(dadosProntuario.sintomas);
      setDiagnostico(dadosProntuario.diagnostico);
      setMedicamentos(dadosProntuario.medicamentos);
      setExamesLaudos(dadosProntuario.examesLaudos);
      setObservacoes(dadosProntuario.observacoes);
    }
  }

  async function salvar() {
    let data = {
      id,
      nomePaciente,
      nomeCompleto,
      crm,
      dataConsulta,
      horaConsulta,
      motivoConsulta,
      sintomas,
      diagnostico,
      medicamentos,
      examesLaudos,
      observacoes,
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(
            `Prontuário de ${nomePaciente} cadastrado com sucesso!`
          );
          navigate(`/listagem-prontuarios`);
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
          mensagemSucesso(
            `Prontuário de ${nomePaciente} atualizado com sucesso!`
          );
          navigate(`/listagem-prontuarios`);
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

        setId(dadosProntuario.id);
        setNomePaciente(dadosProntuario.nomePaciente);
        setNomeCompleto(dadosProntuario.nomeCompleto);
        setCrm(dadosProntuario.crm);
        setDataConsulta(dadosProntuario.dataConsulta);
        setHoraConsulta(dadosProntuario.horaConsulta);
        setMotivoConsulta(dadosProntuario.motivoConsulta);
        setSintomas(dadosProntuario.sintomas);
        setDiagnostico(dadosProntuario.diagnostico);
        setMedicamentos(dadosProntuario.medicamentos);
        setExamesLaudos(dadosProntuario.examesLaudos);
        setObservacoes(dadosProntuario.observacoes);
      });
    }
  }

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dadosProntuario) return null;

  return (
    <div className="container">
      <Card title="Cadastro de Prontuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <SubCard title="Dados do Médico">
                <FormGroup
                  label="Nome Completo do Médico: *"
                  htmlFor="inputNomeCompleto"
                >
                  <input
                    type="text"
                    id="inputNomeCompleto"
                    value={nomeCompleto}
                    className="form-control"
                    onChange={(e) => setNomeCompleto(e.target.value)}
                  />
                </FormGroup>
                <FormGroup label="CRM: *" htmlFor="inputCrm">
                  <input
                    type="text"
                    id="inputCrm"
                    value={crm}
                    className="form-control"
                    onChange={(e) => setCrm(e.target.value)}
                  />
                </FormGroup>
              </SubCard>

              <SubCard title="Dados do Paciente">
                <FormGroup
                  label="Nome do Paciente: *"
                  htmlFor="inputNomePaciente"
                >
                  <input
                    type="text"
                    id="inputNomePaciente"
                    value={nomePaciente}
                    className="form-control"
                    onChange={(e) => setNomePaciente(e.target.value)}
                  />
                </FormGroup>

                <FormGroup
                  label="Data da Consulta: *"
                  htmlFor="inputDataConsulta"
                >
                  <input
                    type="date"
                    id="inputDataConsulta"
                    value={dataConsulta}
                    className="form-control"
                    onChange={(e) => setDataConsulta(e.target.value)}
                  />
                </FormGroup>

                <FormGroup
                  label="Hora da Consulta: *"
                  htmlFor="inputHoraConsulta"
                >
                  <input
                    type="time"
                    id="inputHoraConsulta"
                    value={horaConsulta}
                    className="form-control"
                    onChange={(e) => setHoraConsulta(e.target.value)}
                  />
                </FormGroup>
              </SubCard>
              <SubCard title="Informações do Atendimento">
                <FormGroup
                  label="Motivo da Consulta: *"
                  htmlFor="inputMotivoConsulta"
                >
                  <textarea
                    id="inputMotivoConsulta"
                    value={motivoConsulta}
                    className="form-control"
                    rows={3}
                    onChange={(e) => setMotivoConsulta(e.target.value)}
                  />
                </FormGroup>

                <FormGroup label="Sintomas:" htmlFor="inputSintomas">
                  <textarea
                    id="inputSintomas"
                    value={sintomas}
                    className="form-control"
                    rows={3}
                    onChange={(e) => setSintomas(e.target.value)}
                  />
                </FormGroup>

                <FormGroup label="Diagnóstico:" htmlFor="inputDiagnostico">
                  <textarea
                    id="inputDiagnostico"
                    value={diagnostico}
                    className="form-control"
                    rows={3}
                    onChange={(e) => setDiagnostico(e.target.value)}
                  />
                </FormGroup>

                <FormGroup label="Medicamentos:" htmlFor="inputMedicamentos">
                  <select
                    id="inputMedicamentos"
                    value={medicamentos}
                    className="form-control"
                    multiple
                    onChange={(e) =>
                      setMedicamentos(
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                  >
                    {listaMedicamentos.map((medicamento) => (
                      <option key={medicamento.id} value={medicamento.id}>
                        {medicamento.nome}
                      </option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup label="Exames/Laudos:" htmlFor="inputExamesLaudos">
                  <textarea
                    id="inputExamesLaudos"
                    value={examesLaudos}
                    className="form-control"
                    rows={3}
                    onChange={(e) => setExamesLaudos(e.target.value)}
                  />
                </FormGroup>

                <FormGroup label="Observações:" htmlFor="inputObservacoes">
                  <textarea
                    id="inputObservacoes"
                    value={observacoes}
                    className="form-control"
                    rows={3}
                    onChange={(e) => setObservacoes(e.target.value)}
                  />
                </FormGroup>
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

export default CadastroProntuario;

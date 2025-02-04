import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL, BASE_URL2 } from "../config/axios";
import '../custom.css';

function CadastroAgendamentos() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/agendamentos`; 

  const [id, setId] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacienteId, setPacienteId] = useState(''); 
  const [medicoId, setMedicoId] = useState('');
  const [dataHora, setDataHora] = useState('');

  const [dadosAgendamento, setAgendamento] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setPacienteId('');
      setMedicoId('');
      setPacientes('');
      setMedicos('');
      setDataHora('');
    }else{
      setPacienteId(dadosAgendamento.pacienteId);
      setMedicoId(dadosAgendamento.medicoId);
      setPacientes(dadosAgendamento.paciente);
      setMedicos(dadosAgendamento.medicoId);
      setDataHora(dadosAgendamento.dataHora);
    }
  }

  async function salvar() {
    let data = {
      id,
      pacienteId,
      medicoId,
      pacientes,
      medicos,
      dataHora
    };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
      .post(baseURL, data, {
        headers:{ 'Content-Type': 'application/json'},
      })
      .then(function (response) {
        mensagemSucesso(`Agendamento ${dataHora} cadastrado com sucesso!`);
        navigate(`/listagem-agendamentos`);
      })
      .catch(function (error) {
        mensagemErro(error.response.data);
      });
    }else{
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Agendamento ${dataHora} cadastrado com sucesso!`);
          navigate(`/listagem-agendamentos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null){
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setAgendamento(response.data);

        setId(dadosAgendamento.id);
        setPacienteId(dadosAgendamento.pacienteId);
        setMedicoId(dadosAgendamento.medicoId);
        setPacientes(dadosAgendamento);
        setMedicos(dadosAgendamento);
        setDataHora(dadosAgendamento);
      });
    }
  }

  useEffect(() => {
    axios.get(`${BASE_URL2}/pacientes`).then((response) => {
      setPacientes(response.data);
    });
  
    axios.get(`${BASE_URL}/funcionarios`).then((response) => {
      setMedicos(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dadosAgendamento) return null;

  return (
    <div className="container">
      <Card title="Cadastro de Agendamento">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Paciente: *" htmlFor="inputPacientes">
                <select
                  id="inputPacientes"
                  value={pacienteId}
                  onChange={(e) => setPacienteId(e.target.value)}
                  className="form-control"
                >
                  <option value="">Selecione o paciente</option>
                  {pacientes.map((paciente) => (
                    <option key={paciente.id} value={paciente.id}>
                      {paciente.nomeCompleto}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label="Médico: *" htmlFor="inputMedico">
                <select
                  id="inputMedico"
                  value={medicoId}
                  onChange={(e) => setMedicoId(e.target.value)}
                  className="form-control"
                >
                  <option value="">Selecione o médico</option>
                  {medicos
                    .filter(
                      (funcionario) =>
                        funcionario.tipoFuncionario === "Médico/a"
                    ) // Filtra médicos e médicas
                    .map((medico) => (
                      <option key={medico.id} value={medico.id}>
                        {medico.nomeCompleto}
                      </option>
                    ))}
                </select>
              </FormGroup>

              <FormGroup label="Data e Hora: *" htmlFor="inputDataHora">
                <input
                  type="datetime-local"
                  id="inputDataHora"
                  value={dataHora}
                  onChange={(e) => setDataHora(e.target.value)}
                  className="form-control"
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction="row">
                <button onClick={salvar} type="button" className="btn btn-success">
                  Salvar
                </button>
                <button onClick={inicializar} type="button" className="btn btn-danger" >
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

export default CadastroAgendamentos;

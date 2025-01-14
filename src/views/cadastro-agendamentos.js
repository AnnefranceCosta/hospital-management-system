import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL, BASE_URL2 } from "../config/axios"; // Use a constante BASE_URL aqui

function CadastroAgendamentos() {
  const { idParam } = useParams();
  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/agendamentos`; // Use BASE_URL
  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacienteId, setPacienteId] = useState(""); // Corrigido: pacienteId ao invés de pacientesId
  const [medicoId, setMedicoId] = useState("");
  const [dataHora, setDataHora] = useState("");

  const [agendamento, setAgendamento] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL2}/pacientes`).then((response) => {
      // Use BASE_URL
      setPacientes(response.data);
    });
    axios.get(`${BASE_URL}/funcionarios`).then((response) => {
      // Use BASE_URL
      setMedicos(response.data);
    });
    if (idParam) {
      axios.get(`${baseURL}/${idParam}`).then((response) => {
        setAgendamento(response.data);
        setPacienteId(response.data.pacienteId);
        setMedicoId(response.data.medicoId);
        setDataHora(response.data.dataHora);
      });
    }
  }, [idParam]);

  const salvar = async () => {
    const data = {
      pacienteId,
      medicoId,
      dataHora,
    };

    if (idParam) {
      await axios
        .put(`${baseURL}/${idParam}`, data)
        .then(() => {
          mensagemSucesso("Agendamento atualizado com sucesso!");
          navigate("/listagem-agendamentos");
        })
        .catch((error) => mensagemErro(error.response.data));
    } else {
      await axios
        .post(baseURL, data)
        .then(() => {
          mensagemSucesso("Agendamento realizado com sucesso!");
          navigate("/listagem-agendamentos");
        })
        .catch((error) => mensagemErro(error.response.data));
    }
  };

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
                <button
                  type="button"
                  onClick={salvar}
                  className="btn btn-success"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/listagem-agendamentos")}
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

export default CadastroAgendamentos;

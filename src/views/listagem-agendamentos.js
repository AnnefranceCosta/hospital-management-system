import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "../components/card";

import { mensagemErro } from "../components/toastr";
import axios from "axios";
import { BASE_URL2 } from "../config/axios";

function ListagemAgendamentos() {
  const navigate = useNavigate();
  const baseURL = `${BASE_URL2}/agendamentos`;

  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setAgendamentos(response.data);
      })
      .catch((error) => mensagemErro(error.response?.data || "Erro ao carregar agendamentos."))
      .finally(() => setLoading(false));
  }, [baseURL]);

  const editar = (id) => {
    navigate(`/cadastro-agendamentos/${id}`);
  };

  const excluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este agendamento?")) {
      axios
        .delete(`${baseURL}/${id}`)
        .then(() => {
          setAgendamentos((prev) => prev.filter((item) => item.id !== id));
        })
        .catch((error) =>
          mensagemErro(error.response?.data || "Erro ao excluir agendamento.")
        );
    }
  };

  const novoAgendamento = () => {
    navigate("/cadastro-agendamentos");
  };

  return (
    <div className="container">
      <Card title="Listagem de Agendamentos">
        <div className="bs-component">
          <Stack spacing={1} direction="row" padding={1}>
            <button
              type="button"
              className="btn btn-success"
              onClick={novoAgendamento}
            >
              Novo Agendamento
            </button>
          </Stack>
          {loading ? (
            <div>Carregando agendamentos...</div>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Paciente</th>
                  <th>Médico</th>
                  <th>Data e Hora</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {agendamentos.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Nenhum agendamento encontrado
                    </td>
                  </tr>
                ) : (
                  agendamentos.map((agendamento) => (
                    <tr key={agendamento.id}>
                      <td>{agendamento.id}</td>
                      <td>{agendamento.paciente.nomeCompleto}</td>
                      <td>{agendamento.medico.nomeCompleto}</td>
                      <td>{new Date(agendamento.dataHora).toLocaleString()}</td>
                      <td>
                        <Stack spacing={1} direction="row">
                          <IconButton
                            aria-label="edit"
                            onClick={() => editar(agendamento.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => excluir(agendamento.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}

export default ListagemAgendamentos;

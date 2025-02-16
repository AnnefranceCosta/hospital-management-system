import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Card from "../components/card";
import { mensagemErro } from "../components/toastr";
import axios from "axios";
import { BASE_URL2 } from "../config/axios";

function ListagemProntuarios() {
  const navigate = useNavigate();
  const baseURL = `${BASE_URL2}/prontuarios`;

  const [prontuarios, setProntuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setProntuarios(response.data);
      })
      .catch((error) =>
        mensagemErro(error.response?.data || "Erro ao carregar prontuários.")
      )
      .finally(() => setLoading(false));
  }, [baseURL]);

  const editar = (id) => {
    navigate(`/cadastro-prontuarios/${id}`);
  };

  const novoProntuario = () => {
    navigate("/cadastro-prontuarios");
  };

  return (
    <div className="container">
      <Card title="Listagem de Prontuários">
        <div className="bs-component">
          <Stack spacing={1} direction="row" padding={1}>
            <button
              type="button"
              className="btn btn-warning"
              onClick={novoProntuario}
            >
              Novo Prontuário
            </button>
          </Stack>
          {loading ? (
            <div>Carregando prontuários...</div>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Nome do Médico</th>
                  <th>CRM</th>
                  <th>Data da Consulta</th>
                  <th>Hora da Consulta</th>
                  <th>Nome do Paciente</th>
                  <th>Motivo da Consulta</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {prontuarios.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Nenhum prontuário encontrado
                    </td>
                  </tr>
                ) : (
                  prontuarios.map((prontuario) => {
                    const data = new Date(prontuario.data);
                    const hora = prontuario.hora;

                    const dataFormatada = data.toLocaleDateString();

                    const horaFormatada = hora;

                    return (
                      <tr key={prontuario.id}>
                        <td>{prontuario.nomeCompleto}</td>
                        <td>{prontuario.crm}</td>
                        <td>{dataFormatada}</td>
                        <td>{horaFormatada}</td>
                        <td>{prontuario.nomePaciente}</td>
                        <td>{prontuario.motivoConsulta}</td>
                        <td>
                          <Stack spacing={1} direction="row">
                            <IconButton
                              aria-label="edit"
                              onClick={() => editar(prontuario.id)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Stack>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}

export default ListagemProntuarios;

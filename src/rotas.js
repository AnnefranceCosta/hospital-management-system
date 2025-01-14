import React from 'react';
import Login from './views/login';
import CadastroFuncionarios from './views/cadastro-funcionarios';
import ListagemFuncionarios from './views/listagem-funcionarios';
import CadastroTiposFuncionarios from './views/cadastro-tiposFuncionarios';
import ListagemTiposFuncionarios from './views/listagem-tiposFuncionarios';

import CadastroMedicamentos from './views/cadastro-medicamentos';
import ListagemMedicamentos from './views/listagem-medicamentos';
import CadastroLotes from './views/cadastro-lotes';
import ListagemLotes from './views/listagem-lotes';
import CadastroCategoriaMedicamentos from './views/cadastro-categoriaMedicamentos';
import ListagemCategoriaMedicamentos from './views/listagem-categoriaMedicamentos';

import CadastroPacientes from './views/cadastro-pacientes';
import ListagemPacientes from './views/listagem-pacientes';
import CadastroResponsavelLegal from './views/cadastro-responsavelLegal';
import ListagemResponsavelLegal from './views/listagem-responsavelLegal';
import CadastroProntuarios from './views/cadastro-prontuarios';
import ListagemProntuarios from './views/listagem-prontuarios';

import CadastroAgendamentos from './views/cadastro-agendamentos';
import ListagemAgendamentos from './views/listagem-agendamentos';
import Relatorios from './views/relatorios';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro-funcionarios/:idParam?' element={<CadastroFuncionarios />} />
        <Route path='/listagem-funcionarios' element={<ListagemFuncionarios />} />
        <Route path='/cadastro-tiposFuncionarios/:idParam?' element={<CadastroTiposFuncionarios />} />
        <Route path='/listagem-tiposFuncionarios' element={<ListagemTiposFuncionarios />} />
        <Route path='/cadastro-medicamentos/:idParam?' element={<CadastroMedicamentos />} />
        <Route path='/listagem-medicamentos' element={<ListagemMedicamentos />} />
        <Route path='/cadastro-lotes/:idParam?' element={<CadastroLotes />} />
        <Route path='/listagem-lotes' element={<ListagemLotes />} />
        <Route path='/cadastro-categoriaMedicamentos/:idParam?' element={<CadastroCategoriaMedicamentos />} />
        <Route path='/listagem-categoriaMedicamentos' element={<ListagemCategoriaMedicamentos />} />
        <Route path='/cadastro-pacientes/:idParam?' element={<CadastroPacientes />} />
        <Route path='/listagem-pacientes' element={<ListagemPacientes />} />
        <Route path='/cadastro-responsavelLegal/:idParam?' element={<CadastroResponsavelLegal />} />
        <Route path='/listagem-responsavelLegal' element={<ListagemResponsavelLegal />} />
        <Route path='/cadastro-prontuarios/:idParam?' element={<CadastroProntuarios />} />
        <Route path='/listagem-prontuarios' element={<ListagemProntuarios />} />
        <Route path='/cadastro-agendamentos/:idParam?' element={<CadastroAgendamentos />} />
        <Route path='/listagem-agendamentos' element={<ListagemAgendamentos />} />
        <Route path='/relatorios' element={<Relatorios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;

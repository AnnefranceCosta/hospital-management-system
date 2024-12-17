import React from 'react';
import Login from './views/login';
import ListagemMedicamentos from './views/listagem-medicamentos';
import CadastroMedicamentos from './views/cadastro-medicamentos';
import CadastroLotes from './views/cadastro-lotes';
import ListagemLotes from './views/listagem-lotes';
import CadastroCategoriaMedicamentos from './views/cadastro-categoriaMedicamentos';
import ListagemCategoriaMedicamentos from './views/listagem-categoriaMedicamentos';


import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro-medicamentos/:idParam?' element={<CadastroMedicamentos />} />
        <Route path='/listagem-medicamentos' element={<ListagemMedicamentos />} />
        <Route path='/cadastro-lotes/:idParam?' element={<CadastroLotes />} />
        <Route path='/listagem-lotes' element={<ListagemLotes />} />
        <Route path='/cadastro-categoriaMedicamentos/:idParam?' element={<CadastroCategoriaMedicamentos />} />
        <Route path='/listagem-categoriaMedicamentos' element={<ListagemCategoriaMedicamentos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;

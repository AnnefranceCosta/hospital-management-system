import React from "react";
import "bootswatch/dist/flatly/bootstrap.css";
import NavbarItem from "./navbarItem";

function Navbar(props) {
  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <a href="/" className="navbar-brand">
          SGH
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav mr-auto">
            <NavbarItem render={true} href="/listagem-funcionarios" label="Funcionários" />
            <NavbarItem render={true} href="/listagem-tiposFuncionarios" label="Tipos de Funcionários" />
            <NavbarItem render={true} href="/listagem-pacientes" label="Pacientes" />
            <NavbarItem render={true} href="/listagem-responsavelLegal" label="Responsável Legal" />
            <NavbarItem render={true} href="/listagem-prontuarios" label="Prontuários" />
            <NavbarItem render={true} href="/listagem-medicamentos" label="Medicamentos" />
            <NavbarItem render={true} href="/listagem-lotes" label="Lotes" />
            <NavbarItem render={true} href="/listagem-categoriaMedicamentos" label="Categoria de Medicamentos" />
            <NavbarItem render={true} href="/listagem-agendamentos" label="Agendamentos" />
          </ul>
          <ul className="navbar-nav ml-auto">
            <NavbarItem render={true} href="/login" label="Entrar" />
            <NavbarItem render={true} href="/" label="Sair" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

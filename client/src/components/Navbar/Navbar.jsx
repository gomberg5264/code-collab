import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default function NavbarComponent() {
  return (
    <>
      <Navbar.Brand href="#home" className="code-navbar">
        <i class="fa fa-code" aria-hidden="true"></i> <span>CodeCollab</span>
      </Navbar.Brand>
      </>
  );
}

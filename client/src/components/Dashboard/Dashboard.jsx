import React from "react";
import NavbarComponent from "../Navbar/Navbar";
import { getUniqueId } from "../../utils/helpers";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div className="wrapper">
        <h2>
          Share Code in real time<br></br>
          with other developers
        </h2>
        <div className="btn-grad">
          <Link
            to={`/sharecode/${getUniqueId()}`}
          >
            Start Code Share
          </Link>
        </div>
      </div>
    </div>
  );
}

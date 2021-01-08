import React from "react";
import NavbarComponent from "../Navbar/Navbar";
import { getUniqueId } from "../../utils/helpers";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Footer from "../Footer/Footer";
import Pricing from "../Pricing/Pricing";

export default function Dashboard() {
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div className="wrapper">
        <div className="hero-banner pb50 text-center">
          <h2>
            Share Code in real time<br></br>
            with other developers
          </h2>
          <div className="btn-grad">
            <Link to={`/sharecode/${getUniqueId()}`}>Start Free Trial</Link>
          </div>
        </div>
        <div className="how-works pb50 text-center">
          <h2>How it works?</h2>
          <br></br>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="mb-10">
                  <i class="fa fa-play fa-3x" aria-hidden="true"></i>
                </div>
                The interviewer starts the pair programming clicking on Start
                Code Share Button
              </div>
              <div className="col-md-4">
                <div className="mb-10">
                  <i class="fa fa-share-alt fa-3x" aria-hidden="true"></i>
                </div>
                The interviewer shares the shareable link to the candidate via
                message or text
              </div>
              <div className="col-md-4">
                <div className="mb-10">
                  <i class="fa fa-terminal fa-3x" aria-hidden="true"></i>
                </div>
                Once candidates hits the shareable link two way communication
                channel is established and the interviewer and the candidate can
                start pair programming
              </div>
            </div>
          </div>
        </div>
        <Pricing/>
      </div>
      <Footer />
    </div>
  );
}

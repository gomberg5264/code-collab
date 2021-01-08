import React from "react";
import "./pricing.css";

export default function Pricing() {


  const gotoPateron = () => {
    window.open('https://paypal.me/RajdeepC?locale.x=en_GB' ,"_blank")
  }


  return (
    <div className="pricing text-center pb50">
      <section>
        <h1>Pricing</h1>
        <br />
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-lg-4">
              <div class="card">
                <div class="card-body">
                  <div class="plan-name">Free</div>
                  <div class="plan-description">
                    <div class="plan-price month">
                      $0<sub> / month</sub>
                    </div>
                    <p>
                      Great free for personal users and the self-employed who are
                      going for better opportunities and pair programming
                    </p>
                  </div>
                  <div class="plan-description specs">
                    30 mins of Pair Programming Time
                    <br /> 1+ User per session
                    <br /> Real Time Code changes highlighter
                  </div>
                  <div class="plan-cta">
                    <button className="btn-grad" onClick={gotoPateron}>Get Started</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="card disabled">
                <div class="card-body">
                  <div class="plan-name">Basic </div>
                  <div class="plan-description">
                    <div class="plan-price month">
                      $29<sub> / month</sub>
                    </div>
                    <p>
                      Great for personal users and the self-employed who are
                      considering analytics and need branding.
                    </p>
                  </div>
                  <div class="plan-description specs">
                    5,000 Branded Links
                    <br /> 3+ User Seats
                    <br /> 5+ Custom Domains{" "}
                  </div>
                  <div class="plan-cta">
                    <button className="btn-grad" onClick={gotoPateron}>Get Started</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 col-lg-4">
              <div class="card disabled">
                <div class="card-body">
                  <div class="plan-name">Pro </div>
                  <div class="plan-description">
                    <div class="plan-price month">
                      $99<sub> / month</sub>
                    </div>
                    <p>
                      Great for personal users and the self-employed who are
                      considering analytics and need branding.
                    </p>
                  </div>
                  <div class="plan-description specs">
                    20,000 Branded Links
                    <br /> 10+ User Seats
                    <br /> 10+ Custom Domains{" "}
                  </div>
                  <div class="plan-cta">
                    <button className="btn-grad" onClick={gotoPateron}>Get Started</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

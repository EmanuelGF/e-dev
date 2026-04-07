import React from "react";
import "./home.scss";
import About from "../../Components/About/about";
import ConsentNotice from "../../Components/ConsentNotice/consentNotice";
import Folio from "../../Components/Folio/folio";
import Header from "../../Components/Header/header";

export default function Home() {
  return (
    <div className="home_container">
      <Header />
      <About />
      <Folio />
      <ConsentNotice />
    </div>
  );
}

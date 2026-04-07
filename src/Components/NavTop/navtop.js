import React from "react";
import { Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { useTranslation } from "react-i18next";
//CSS
import "./navtop.scss";
//Imgs
import FaceIcon from "../../Images/Facebook.png";
import LinkedInIcon from "../../Images/Linkedin.png";
import YoutubeIcon from "../../Images/YouTube.png";
import GitIcon from "../../Images/Github.png";
//Context
export default function NavTop() {
  const { t, i18n } = useTranslation();
  const changeLang = () => i18n.changeLanguage(i18n.language === "en" ? "pt" : "en");

  return (
    <div className="navtop-container">
      <div className="navtop-logo">
        <Link to="/" className="navtop-logo-link" aria-label="Go to homepage">
          <span className="navtop-logo-bracket">&lt;</span>
          <span className="navtop-logo-text">emanuel-dev</span>
          <span className="navtop-logo-bracket">/&gt;</span>
        </Link>
      </div>
      <div className="navtop-info">
        <h5>{t("navTop.message")}</h5>
      </div>
      <div className="navtop-menu">
        <ul className="cube-menu">
          <li>
            <Link to="/">{t("navTop.Menu.item1")}</Link>
          </li>
          <li>
            <Link to="/blog">{t("navTop.Menu.item2")}</Link>
          </li>
          <li>
            <Link to="/games">{t("navTop.Menu.item3")}</Link>
          </li>
          <li>
              <Button type="button" onClick={changeLang} size="sm" >
                {i18n.language === "en" ? "PT" : "EN" }
              </Button>
          </li>
        </ul>
        <ul className="cube-social-icons">
          <li>
            <a
              href="https://www.linkedin.com/in/emanuel-fa%C3%ADsca-19b100196/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="cube-social-img" src={LinkedInIcon} alt="icon" />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/emanuel.faisca"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="cube-social-img" src={FaceIcon} alt="icon" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/channel/UCEWC_3zEaze1Tjv-WS8Bz5g"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="cube-social-img" src={YoutubeIcon} alt="icon" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/EmanuelGF"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="cube-social-img" src={GitIcon} alt="icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

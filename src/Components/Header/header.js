import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./header.scss";
import DanceGif from "../../Images/9cIT.gif";
import CubeHomeAvatar from "../../Images/emanuel-dev.png";

const particles = [
  { size: 18, left: "6%", top: "14%", duration: 14, delay: 0 },
  { size: 12, left: "18%", top: "72%", duration: 18, delay: 3 },
  { size: 24, left: "28%", top: "18%", duration: 16, delay: 5 },
  { size: 10, left: "42%", top: "66%", duration: 20, delay: 2 },
  { size: 14, left: "56%", top: "24%", duration: 17, delay: 1 },
  { size: 20, left: "68%", top: "78%", duration: 15, delay: 6 },
  { size: 16, left: "76%", top: "10%", duration: 19, delay: 4 },
  { size: 12, left: "88%", top: "54%", duration: 13, delay: 7 },
  { size: 22, left: "92%", top: "24%", duration: 21, delay: 2 }
];

export default function Header() {
  const { t } = useTranslation();
  const [activeSide, setActiveSide] = useState("front");

  return (
    <Container className="header p-0" fluid>
      <Row className="justify-content-center">
        <div className="particles" aria-hidden="true">
          {particles.map((particle, index) => (
            <span
              key={`${particle.left}-${particle.top}`}
              className="particle"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: particle.left,
                top: particle.top,
                animationDuration: `${particle.duration}s`,
                animationDelay: `${particle.delay}s`,
                opacity: 0.25 + ((index % 4) * 0.12),
              }}
            />
          ))}
        </div>
        <Col md={12} className="header-menu">
          <div className="scene">
            <div className={`cube show-${activeSide}`}>
              <div className="cube__face cube__face--front">
                <img src={CubeHomeAvatar} className="cube-home-avatar" alt="" aria-hidden="true" />
                <div className="cube-home-copy">
                  <h3>{t("header.home.title")}</h3>
                  <h5>{t("header.home.intro")}</h5>
                  <p>{t("header.home.subTitle")}</p>
                </div>
              </div>
              <div className="cube__face cube__face--top">
                <h3>{t("header.folio.title")}</h3>
                <h5>
                  {t("header.folio.text1")}
                  <a href="#folio">{t("header.folio.linkText1")}</a>
                  {t("header.folio.text2")}
                </h5>
                <hr />
                <p>{t("header.folio.text3")}</p>
                <h5>{t("header.folio.text4")}</h5>
                <p>{t("header.folio.text5")}</p>
              </div>
              <div className="cube__face cube__face--right">
                <h3>
                  {t("header.blog.title")}
                  <Link to="/blog">{t("header.blog.linkText4")}</Link>!
                </h3>
                <p>{t("header.blog.text1")}</p>
                <p>{t("header.blog.text2")}</p>
                <p>
                  {t("header.blog.text3")}
                  <br />
                  <br />
                  <a
                    href="https://www.linkedin.com/in/emanuel-fa%C3%ADsca-19b100196/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("header.blog.linkText1")}
                  </a>
                </p>
              </div>
              <div className="cube__face cube__face--left">
                <h5>{t("header.contacts.title")}</h5>
                <p>
                  <a
                    href="https://www.linkedin.com/in/emanuel-fa%C3%ADsca-19b100196/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("header.contacts.text1")}
                  </a>
                </p>
                <p>{t("header.contacts.text2")}</p>
                <h3>{t("header.contacts.text3")}</h3>
              </div>
              <div className="cube__face cube__face--back">
                <h3>{t("header.credits.title")}</h3>
                <p>{t("header.credits.text1")}</p>
                <p>{t("header.credits.text2")}</p>
                <h5>{t("header.credits.title2")}</h5>
                <p>{t("header.credits.text4")}</p>
                <p>
                  <a href="https://www.codecademy.com" target="_blank" rel="noopener noreferrer">
                    {t("header.credits.text5")}
                  </a>
                </p>
                <p>
                  <a href="https://www.eddiehub.org/" target="_blank" rel="noopener noreferrer">
                    {t("header.credits.text6")}
                  </a>
                </p>
              </div>
              <div className="cube__face cube__face--bottom">
                <h3>{t("header.about.title")}</h3>
                <img src={DanceGif} className="header-about-gif" alt="" />
                <hr />
                <p>{t("header.about.text1")}</p>
              </div>
            </div>
          </div>
          <div className="header-menu-controls">
            <ul className="header-menu-buttons">
              <li>
                <button
                  type="button"
                  className={activeSide === "front" ? "is-active" : ""}
                  onClick={() => setActiveSide("front")}
                >
                  {t("cubeMenu.linkText1")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activeSide === "top" ? "is-active" : ""}
                  onClick={() => setActiveSide("top")}
                >
                  {t("cubeMenu.linkText2")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activeSide === "right" ? "is-active" : ""}
                  onClick={() => setActiveSide("right")}
                >
                  {t("cubeMenu.linkText3")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activeSide === "left" ? "is-active" : ""}
                  onClick={() => setActiveSide("left")}
                >
                  {t("cubeMenu.linkText4")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activeSide === "bottom" ? "is-active" : ""}
                  onClick={() => setActiveSide("bottom")}
                >
                  {t("cubeMenu.linkText5")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activeSide === "back" ? "is-active" : ""}
                  onClick={() => setActiveSide("back")}
                >
                  {t("cubeMenu.linkText6")}
                </button>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

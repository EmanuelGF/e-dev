import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import "./folio.scss";
import { settings } from "./sliderConf";
import { projects } from "../../content/projects";

export default function Folio() {
  const { t } = useTranslation();

  return (
    <Container fluid id="folio">
      <Row>
        <Col md={12} className="folio-title">
          <h5>{t("recentWork.title")}</h5>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="folio-slider-container">
          <Slider {...settings}>
            {projects.map((project) => (
              <div key={project.id} className="folio-slider-item">
                <img src={project.image} alt={project.title} />
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {"<"}
                  {project.title}
                  {">"}
                </a>
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
    </Container>
  );
}

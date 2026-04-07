import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./footer.scss";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <Container fluid className="footer">
      <Row>
        <Col md={12} className="text-center">
          <div className="footer-year">© emanuel-dev {new Date().getFullYear()}</div>
          <div className="footer-quickmenu">
            <ul>
              <li>
                <Link to="/privacy-policy">{t("footer.linkText1")}</Link>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

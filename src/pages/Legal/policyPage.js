import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./legalPage.scss";

export default function PolicyPage() {
  return (
    <Container fluid className="privacy-policy">
      <Row>
        <Col md={12}>
          <section className="privacy-policy-container">
            <div className="privacy-policy-card">
              <h2>Privacy Policy (EN)</h2>
              <p>
                This website is a personal static site. It does not provide user accounts, login
                areas, payment flows, or forms intended to collect personal information.
              </p>
              <p>
                The site may store small preferences in your browser, such as language selection
                and consent notice state, so the interface works correctly between visits.
              </p>
              <p>
                Limited technical or usage data may be collected in the future to understand how
                the site is used and to improve performance, content, and user experience. This
                should be treated as anonymous or aggregated usage information, not as a profile
                of individual visitors.
              </p>
              <p>
                This site does not intentionally store personal user data, does not sell visitor
                data, and does not use the frontend to collect sensitive information.
              </p>
              <p className="privacy-policy-note">
                By continuing to use this website, you acknowledge this privacy policy.
              </p>
            </div>

            <div className="privacy-policy-card">
              <h2>Política de Privacidade (PT)</h2>
              <p>
                Este website é um site pessoal estático. Não disponibiliza contas de utilizador,
                áreas de login, pagamentos ou formulários destinados a recolher informação
                pessoal.
              </p>
              <p>
                O site pode guardar pequenas preferências no seu browser, como a escolha de idioma
                e o estado do aviso de consentimento, para que a interface funcione corretamente
                entre visitas.
              </p>
              <p>
                No futuro, poderá ser recolhida informação técnica ou de utilização limitada para
                compreender como o site é usado e para melhorar desempenho, conteúdo e experiência
                de utilização. Esta informação deverá ser tratada como anónima ou agregada, não
                como um perfil individual dos visitantes.
              </p>
              <p>
                Este site não armazena intencionalmente dados pessoais de utilizadores, não vende
                dados de visitantes e não usa o frontend para recolher informação sensível.
              </p>
              <p className="privacy-policy-note">
                Ao continuar a navegar neste website, reconhece esta política de privacidade.
              </p>
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
}

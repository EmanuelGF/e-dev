import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../pages/Games/gameDetail.scss";
import { GAMES_BASE_ROUTE } from "./constants";
import { readGameBySlug } from "./data";

export default function GameDetailPage(props) {
  const { t } = useTranslation();
  const { slug } = props.match.params;
  const game = readGameBySlug(slug);

  return (
    <Container fluid className="game-detail">
      <Row>
        <Col md={12}>
          {!game ? (
            <section className="game-detail-container">
              <h2>{t("games.notFound")}</h2>
              <Link to={GAMES_BASE_ROUTE}>{t("games.back")}</Link>
            </section>
          ) : (
            <section className="game-detail-container">
              <div className="game-detail-header">
                <h2>{game.title}</h2>
                <p>{game.description}</p>
                <div className="game-detail-meta">
                  <span>{t("games.author")}: {game.author}</span>
                  <span>{t("games.published")}: {game.publishedAt}</span>
                  <span>{game.statusLabel}</span>
                </div>
              </div>

              <div className="game-frame">
                <iframe
                  title={game.title}
                  src={game.launchPath}
                  className="game-iframe"
                  loading="lazy"
                />
              </div>

              <div className="game-detail-actions">
                <a href={game.launchPath} target="_blank" rel="noopener noreferrer">
                  {t("games.openStandalone")}
                </a>
                <Link to={GAMES_BASE_ROUTE}>{t("games.backToGames")}</Link>
              </div>
            </section>
          )}
        </Col>
      </Row>
    </Container>
  );
}

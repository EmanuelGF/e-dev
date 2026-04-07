import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../pages/Games/games.scss";
import { getGameRoute } from "./constants";
import { listGames } from "./data";

export default function GamesPage() {
  const { t } = useTranslation();
  const games = listGames();

  return (
    <Container fluid className="games">
      <Row>
        <Col md={12}>
          <section className="games-container">
            <h2>{t("games.title")}</h2>
            <p className="games-intro">{t("games.intro")}</p>
            <div className="games-list">
              {games.map((game) => (
                <article key={game.id} className="game-card">
                  <h3>{game.title}</h3>
                  <p>{game.description}</p>
                  <div className="game-meta">
                    <span>{t("games.author")}: {game.author}</span>
                    <span>{t("games.published")}: {game.publishedAt}</span>
                    <span>{game.statusLabel}</span>
                  </div>
                  <Link to={getGameRoute(game.slug)} className="game-launch-link">
                    {t("games.launch")}
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
}

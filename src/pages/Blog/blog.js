import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./blog.scss";
import { listPosts } from "../../services/content";

export default function Blog() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(listPosts());
  }, []);

  return (
    <Container fluid className="blog">
      <Row>
        <Col md={12}>
          <section className="blog-article-container">
            <h2>{t("navTop.Menu.item2")}</h2>
            <ul>
              {articles.map((article) => (
                <li key={article.id}>
                  <Link to={`/blog/${article.slug}`}>
                    <div>
                      <h4>{article.title}</h4>
                      <small>{article.subtitle}</small>
                    </div>
                    <hr />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Col>
      </Row>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./article.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import ReactMarkdown from "react-markdown";
import { markdownComponents } from "../../Helpers/customMarkdown";
import { readPostBySlug } from "../../services/content";

export default function ArticleTemplate(props) {
  const { t } = useTranslation();
  const { slug } = props.match.params;
  const article = readPostBySlug(slug);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(Boolean(article));

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      if (!article?.contentFile) {
        setContent("");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(article.contentFile);
        const markdown = await response.text();

        if (isMounted) {
          setContent(markdown);
        }
      } catch (error) {
        if (isMounted) {
          setContent(t("article.loadError"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, [article, t]);

  return (
    <Container fluid className="article">
      <Row>
        <Col md={12}>
          {!article ? (
            <section className="article-container">
              <h2>{t("article.notFound")}</h2>
              <p>{t("article.notFoundText")}</p>
              <Link to="/blog">{t("article.back")}</Link>
            </section>
          ) : (
            <section className="article-container">
              <h6>{t("article.author")}: {article.author}</h6>
              <ins dateTime={article.createdAt}>
                <small>{article.createdAt}</small>
              </ins>

              <hr />

              <h2>{article.title}</h2>
              <h5>{article.subtitle}</h5>

              <LazyLoadImage
                src={article.heroImage}
                width="70%"
                alt={article.title}
                style={{ borderRadius: "10%" }}
                effect="blur"
              />

              <br />
              {isLoading ? (
                <div className="loading">
                  {t("article.loading")}
                  <div className="square"></div>
                </div>
              ) : (
                <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
              )}
              <hr />
              <Link to="/blog">{t("article.back")}</Link>
            </section>
          )}
        </Col>
      </Row>
    </Container>
  );
}

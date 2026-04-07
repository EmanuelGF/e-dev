import React from 'react'
import {
    Container,
    Row,
    Col
} from 'react-bootstrap'
import { useTranslation } from "react-i18next";
import './about.scss'

export default function About() {
    const { t } = useTranslation();
    return (
        <Container fluid id="about">
            <Row>
                <Col md="12" >
                    <div className="about-title-animation">
                        <h1>{t("about.title")} </h1>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <div className="about-content">
                        <p className="prompt">{t("about.aboutSection.fakePrompt1")}</p>
                        <p>{t("about.aboutSection.text1")}</p>
                        <p>
                            - <u>{t("about.aboutSection.expTitle")}</u>: <br />
                            {t("about.aboutSection.exp0")} <br />
                            {t("about.aboutSection.exp1")} <br />
                            {t("about.aboutSection.exp2")} <br />
                            {t("about.aboutSection.exp3")}
                        </p>
                        <p>
                            - <u>{t("about.aboutSection.eduTitle")}</u>: <br />
                            {t("about.aboutSection.edu1")} <br /> 
                            {"{"}<a href="https://www.codecademy.com/profiles/EmanuelGF">{t("about.aboutSection.edu2")}</a>{"}"} <br /> 
                            {t("about.aboutSection.edu3")}
                        </p>

                        <p className="prompt">[emanuel-dev@localhost~]$</p>
                    </div>                
                </Col>
            </Row>
        </Container>
    )
}

import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppRoute } from "./Helpers/helpers.js";
import DefaultLayout from "./Layouts/DefaultLayout/defaultLayout";
import NotFound from "./pages/NotFound/notFound";
import Blog from "./pages/Blog/blog";
import { GamesPage, GameDetailPage, GAMES_BASE_ROUTE } from "./features/games";
import Home from "./pages/Home/home";
import PolicyPage from "./pages/Legal/policyPage";
import ArticleTemplate from "./Templates/Article/article";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Switch>
        <AppRoute exact path="/" layout={DefaultLayout} component={Home} />
        <AppRoute exact path="/privacy-policy" layout={DefaultLayout} component={PolicyPage} />
        <AppRoute exact path="/blog" layout={DefaultLayout} component={Blog} />
        <AppRoute exact path={GAMES_BASE_ROUTE} layout={DefaultLayout} component={GamesPage} />
        <AppRoute exact path={`${GAMES_BASE_ROUTE}/:slug`} layout={DefaultLayout} component={GameDetailPage} />
        <AppRoute exact path="/blog/:slug" layout={DefaultLayout} component={ArticleTemplate} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

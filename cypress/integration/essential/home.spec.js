const orientations = Cypress.env("orientations");
const viewports = Cypress.env("viewports");

describe("Homepage smoke", () => {
  viewports.forEach((viewport) => {
    for (let i = 0; i < orientations.length; i += 1) {
      it(`(${viewport}-${orientations[i]}) renders the main homepage chrome`, () => {
        cy.clearLocalStorage();
        cy.viewport(viewport, orientations[i]);
        cy.visit("/");

        cy.get(".navtop-container").should("be.visible");
        cy.get(".navtop-logo-text").should("contain", "emanuel-dev");
        cy.get(".header").should("be.visible");
        cy.get(".cube__face--front h3").should("contain", "Emanuel");
        cy.get(".header-menu-buttons button").should("have.length", 6);
      });

      it(`(${viewport}-${orientations[i]}) switches the UI language`, () => {
        cy.clearLocalStorage();
        cy.viewport(viewport, orientations[i]);
        cy.visit("/");

        cy.contains("button", "PT").click();
        cy.get(".cube__face--front h3").should("contain", "Emanuel");
        cy.get(".cube__face--front h5").should("contain", "Portugal");
        cy.get(".cube-menu").should("contain", "<jogos>");
      });

      if (viewport === "macbook-11") break;
    }
  });
});

const orientations = Cypress.env("orientations");
const viewports = Cypress.env("viewports");

describe("Content and routes smoke", () => {
  viewports.forEach((viewport) => {
    for (let i = 0; i < orientations.length; i += 1) {
      it(`(${viewport}-${orientations[i]}) opens the blog and an article`, () => {
        cy.clearLocalStorage();
        cy.viewport(viewport, orientations[i]);
        cy.visit("/blog");

        cy.contains("h4", "Stride3D Tutorials").should("be.visible");
        cy.contains("h4", "Stride3D Tutorials")
          .closest("a")
          .scrollIntoView()
          .click({ force: true });
        cy.url().should("include", "/blog/stride3d-tutorials");
        cy.get(".article-container h2").should("contain", "Stride3D Tutorials");
      });

      it(`(${viewport}-${orientations[i]}) opens the games area and game detail page`, () => {
        cy.clearLocalStorage();
        cy.viewport(viewport, orientations[i]);
        cy.visit("/games");

        cy.contains("h3", "Power Connect Puzzle").should("be.visible");
        cy.contains("a", "Launch Game").click();
        cy.url().should("include", "/games/power-connect-puzzle");
        cy.get(".game-iframe").should("have.attr", "src", "/games/power-connect-puzzle/index.html");
      });

      it(`(${viewport}-${orientations[i]}) renders the privacy policy page`, () => {
        cy.clearLocalStorage();
        cy.viewport(viewport, orientations[i]);
        cy.visit("/privacy-policy");

        cy.contains("h2", "Privacy Policy (EN)").should("be.visible");
        cy.contains("h2", "Politica de Privacidade (PT)").should("be.visible");
      });

      if (viewport === "macbook-11") break;
    }
  });
});

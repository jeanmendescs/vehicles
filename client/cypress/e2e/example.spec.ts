describe("Accomplishment dashboard", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("teste", () => {
    cy.contains("Login").should("be.visible");
  });
});

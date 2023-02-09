/// <reference types="cypress" />

describe("Vehicles", () => {
  beforeEach(() => {
    cy.visit("/vehicles");
  });

  it("should add a vehicle after filling the form", () => {
    cy.get(
      "[data-src='/static/media/add.c9808b1ff7fbd6813f75337d1d671c0d.svg']",
    ).click();
    cy.get("[data-testid='form']");
    cy.get("[data-testid='form-vehicle']").type("Voyage");
    cy.get("[data-testid='form-brand']").type("Volkswagen");
    cy.get("[data-testid='form-year']").type("1988");
    cy.get("[data-testid='isSold']").click();
    cy.get("[data-testid='form-description']").type("A nice car");
    cy.get("[data-testid='form-submit-button']").click();
    cy.contains("Vehicle created successfully");
  });
});

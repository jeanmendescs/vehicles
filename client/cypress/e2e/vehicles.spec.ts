/// <reference types="cypress" />

import vehicle from "../fixtures/vehicle";

describe("Vehicles", () => {
  before(() => {
    cy.fixture("idToDelete.json").then((data) => {
      if (data.id) {
        cy.request("DELETE", `http://localhost:4000/vehicles/${data.id}`);
        cy.writeFile("cypress/fixtures/idToDelete.json", {});
      }
    });
  });

  beforeEach(() => {
    cy.visit("/vehicles");
  });

  it("should add a vehicle after filling the form", () => {
    cy.intercept("POST", "http://localhost:4000/vehicles").as("post");

    cy.get(
      "[data-src='/static/media/add.c9808b1ff7fbd6813f75337d1d671c0d.svg']",
    ).click();
    cy.get("[data-testid='form']");
    cy.get("[data-testid='form-vehicle']").type(vehicle.vehicle);
    cy.get("[data-testid='form-brand']").type(vehicle.brand);
    cy.get("[data-testid='form-year']").type(String(vehicle.year));
    cy.get("[data-testid='form-is-sold']").click();
    cy.get("[data-testid='form-description']").type(vehicle.description);
    cy.get("[data-testid='form-submit-button']").click();

    cy.wait("@post").then((interception) => {
      expect(interception.response?.statusCode).to.be.eq(200);
      expect(interception.request?.body.vehicle).to.be.eq(vehicle.vehicle);
      expect(interception.request?.body.brand).to.be.eq(vehicle.brand);
      expect(interception.request?.body.year).to.be.eq(Number(vehicle.year));
      expect(interception.request?.body.description).to.be.eq(
        vehicle.description,
      );

      cy.writeFile("cypress/fixtures/idToDelete.json", {
        id: interception.response?.body.insertedId,
      });
    });

    cy.contains("Vehicle created successfully").should("be.visible");
  });
});

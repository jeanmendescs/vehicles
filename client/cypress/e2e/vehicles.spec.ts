/// <reference types="cypress" />

import getVehicle from "../fixtures/vehicle";

describe("Vehicles", () => {
  afterEach(() => {
    cy.delete();
  });

  it("should add a vehicle after filling the form", () => {
    cy.on("fail", () => {
      cy.delete();
    });

    const vehicle = getVehicle("create");

    cy.intercept("POST", "http://localhost:4000/vehicles").as("post");

    cy.visit("/vehicles");

    cy.get("[data-testid='addButton']").should("be.visible").click();
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
      }).then(() => {
        cy.contains("Vehicle created successfully").should("be.visible");
      });
    });
  });

  it("should edit a vehicle", () => {
    cy.on("fail", () => {
      cy.delete();
    });

    const vehicle = getVehicle("edit");

    cy.request({
      url: "http://localhost:4000/vehicles",
      method: "POST",
      body: vehicle,
    }).then((interception) => {
      cy.writeFile("cypress/fixtures/idToDelete.json", {
        id: interception.body.insertedId,
      });
    });

    cy.intercept("PUT", /^http\:\/\/localhost:4000\/vehicles/).as("put");

    cy.visit("/vehicles");

    cy.contains(vehicle.vehicle).should("be.visible").click();

    cy.get(".descriptions__info")
      .and("contain", vehicle.brand)
      .and("contain", vehicle.vehicle)
      .and("contain", vehicle.year)
      .and("contain", vehicle.description);

    cy.get("[data-testid='editButton']").click();

    cy.get("[data-testid='form']");
    cy.get("[data-testid='form-vehicle']").clear().type("Virtus");
    cy.get("[data-testid='form-submit-button']").click();

    cy.wait("@put").then((interception) => {
      expect(interception.response?.statusCode).to.be.eq(200);
      expect(interception.request?.body.vehicle).to.be.eq("Virtus");
      expect(interception.request?.body.brand).to.be.eq(vehicle.brand);
      expect(interception.request?.body.year).to.be.eq(Number(vehicle.year));
      expect(interception.request?.body.description).to.be.eq(
        vehicle.description,
      );
    });

    cy.contains("Vehicle edited successfully").should("be.visible");
  });

  it("should list a searched vehicle", () => {
    cy.on("fail", () => {
      cy.delete();
    });

    const vehicle = getVehicle("");

    cy.request({
      url: "http://localhost:4000/vehicles",
      method: "POST",
      body: vehicle,
    }).then((interception) => {
      cy.writeFile("cypress/fixtures/idToDelete.json", {
        id: interception.body.insertedId,
      });
    });

    cy.visit("/vehicles");

    cy.get("[data-testid='header-input']").type(vehicle.vehicle);

    cy.contains(vehicle.vehicle).should("be.visible");
  });
});

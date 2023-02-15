/// <reference types="cypress" />

import getVehicle from "../fixtures/vehicle";

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

  it.skip("should add a vehicle after filling the form", () => {
    const vehicle = getVehicle("create");

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

  it("should edit a vehicle", () => {
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

    cy.get(".vehicles__card__content")
      .and("contain", vehicle.brand)
      .and("contain", vehicle.vehicle)
      .and("contain", vehicle.year)
      .click();

    cy.get(".descriptions__info")
      .and("contain", vehicle.brand)
      .and("contain", vehicle.vehicle)
      .and("contain", vehicle.year)
      .and("contain", vehicle.description);

    cy.get(
      "[data-src='/static/media/edit.b75b06450e1aedda807a2b4744e4ae46.svg']",
    ).click();

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

  it.skip("should list a searched vehicle", () => {
    const vehicle = getVehicle();

    cy.request({
      url: "http://localhost:4000/vehicles",
      method: "POST",
      body: vehicle,
    }).then((interception) => {
      cy.writeFile("cypress/fixtures/idToDelete.json", {
        id: interception.body.insertedId,
      });
    });

    cy.intercept(
      "GET",
      /^http\:\/\/localhost:4000\/vehicles\?search\=Fusca/,
    ).as("get");

    cy.get("[data-testid='header-input']").type(vehicle.vehicle);

    cy.get(".vehicles__card__content")
      .and("contain", vehicle.brand)
      .and("contain", vehicle.vehicle)
      .and("contain", vehicle.year)
      .should("be.visible");

    cy.wait("@get").then((interception) => {
      console.log(interception);
      const findVehicle = interception.response?.body.find(
        (item) => item.vehicle === vehicle.vehicle,
      );

      console.log(findVehicle);

      if (findVehicle) {
        expect(findVehicle.vehicle).to.be.eq(vehicle.vehicle);
        expect(findVehicle.brand).to.be.eq(vehicle.brand);
        expect(findVehicle.year).to.be.eq(Number(vehicle.year));
        expect(findVehicle.description).to.be.eq(vehicle.description);
      }
    });
  });
});

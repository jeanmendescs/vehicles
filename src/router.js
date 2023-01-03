const express = require("express");

const { validate } = require("./middlewares/validate");
const vehiclesSchema = require("./middlewares/vehiclesSchema");
const vehiclesModel = require("./models/vehiclesModel");

const router = express.Router();

router.get(
  "/vehicles",
  validate(vehiclesSchema.getAllVehiclesSchema),
  vehiclesModel.getAllVehicles
);

router.get(
  "/vehicles/:id",
  validate(vehiclesSchema.vehicleByIdSchema),
  vehiclesModel.getVehicleByIdSchema
);

router.post(
  "/vehicles",
  validate(vehiclesSchema.postVehicleSchema),
  vehiclesModel.postVehicle
);

router.put(
  "/vehicles:id",
  validate(vehiclesSchema.putVehicleSchema),
  vehiclesModel.updateVehicle
);

router.patch(
  "/vehicles:id",
  validate(vehiclesSchema.patchVehicleSchema),
  vehiclesModel.updateVehicle
);

router.delete(
  "/vehicles:id",
  validate(vehiclesSchema.vehicleByIdSchema),
  vehiclesModel.deleteVehicle
);

module.exports = router;

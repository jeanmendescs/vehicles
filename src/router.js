const express = require("express");

const { validate } = require("./middlewares/validate");
const vehiclesSchema = require("./middlewares/vehiclesSchema");
const vehiclesController = require("./controllers/vehiclesController");

const router = express.Router();

router.get(
  "/vehicles",
  validate(vehiclesSchema.getAll),
  vehiclesController.getAll
);

router.get(
  "/vehicles/:id",
  validate(vehiclesSchema.byId),
  vehiclesController.getById
);

router.post(
  "/vehicles",
  validate(vehiclesSchema.post),
  vehiclesController.create
);

router.put(
  "/vehicles/:id",
  validate(vehiclesSchema.put),
  vehiclesController.update
);

router.patch(
  "/vehicles/:id",
  validate(vehiclesSchema.patch),
  vehiclesController.update
);

router.delete(
  "/vehicles/:id",
  validate(vehiclesSchema.byId),
  vehiclesController.remove
);

module.exports = router;

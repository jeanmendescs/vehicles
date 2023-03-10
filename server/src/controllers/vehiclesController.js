const vehiclesModel = require("../models/vehiclesModel");
const { getById: getVehicleById } = require("../models/vehiclesModel");

const create = async (req, res) => {
  const vehicle = req.body;
  const createdAt = new Date().toISOString();
  const body = await vehiclesModel.create({
    ...vehicle,
    createdAt,
    updatedAt: "",
  });

  return res.json(body);
};

const getAll = async (req, res) => {
  const pageSize = req.query.pageSize || 0;
  const pageNumber = req.query.pageNumber || 10;
  const search = req.query.search;

  const vehicles = await vehiclesModel.getAll({
    pageSize,
    pageNumber,
    search,
  });

  return res.json(vehicles);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const vehicle = await vehiclesModel.getById(id);

  return res.json(vehicle);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const body = await vehiclesModel.remove(id);

  return res.json(body);
};

const update = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    return res.status(404).send();
  }

  const updatedAt = new Date().toISOString();
  const newVehicle = { ...vehicle, ...body, updatedAt };

  await vehiclesModel.update({ newVehicle, id });

  return res.json({ id });
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};

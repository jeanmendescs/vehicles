const vehiclesModel = require("../models/vehiclesModel");

const create = async (req, res) => {
  const vehicle = req.body;
  const body = await vehiclesModel.create(vehicle);

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
  const newVehicle = req.body;
  const { id } = req.params;
  const body = await vehiclesModel.update({ newVehicle, id });

  return res.json(body);
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};

const { ObjectId } = require("mongodb");

const { getDB } = require("./connection");

const deleteVehicle = async (req) => {
  const { id } = req.params;

  return await getDB()
    .collection("vehicles")
    .deleteOne({ _id: ObjectId(id) });
};

const getAllVehicles = async (req) => {
  const pageSize = req.query.pageSize || 0;
  const pageNumber = req.query.pageNumber || 10;
  const search = req.query.search;

  const searchQuery = search ? { $text: { $search: search } } : "";

  let vehicles = [];

  await getDB()
    .collection("vehicles")
    .find(searchQuery)
    .sort({ vehicle: 1 })
    .skip(pageSize * pageNumber)
    .forEach((vehicle) => vehicles.push(vehicle));

  return vehicles;
};

const getVehicleByIdSchema = async (req) => {
  const { id } = req.param;

  return await getDB()
    .collection("vehicles")
    .findOne({ _id: ObjectId(id) });
};

const postVehicle = async (req) => {
  const vehicle = req.body;
  return await getDB().collection("vehicles").insertOne(vehicle);
};

const updateVehicle = async (req) => {
  const newVehicle = req.body;
  const { id } = req.params;

  return getDB()
    .collection("vehicles")
    .updateOne({ _id: ObjectId(id) }, { $set: newVehicle });
};

module.exports = {
  deleteVehicle,
  getAllVehicles,
  getVehicleByIdSchema,
  postVehicle,
  updateVehicle,
};

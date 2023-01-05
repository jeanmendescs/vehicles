const { ObjectId } = require("mongodb");

const { getDB } = require("./connection");

const create = async (vehicle) =>
  await getDB().collection("cars").insertOne(vehicle);

const getAll = async ({ pageSize, pageNumber, search }) => {
  const searchQuery = search ? { $text: { $search: search } } : "";

  let vehicles = [];

  await getDB()
    .collection("cars")
    .find(searchQuery)
    .sort({ vehicle: 1 })
    .skip(pageSize * pageNumber)
    .forEach((vehicle) => vehicles.push(vehicle));

  return vehicles;
};

const getById = async (id) =>
  await getDB()
    .collection("cars")
    .findOne({ _id: ObjectId(id) });

const remove = async (id) => {
  return await getDB()
    .collection("cars")
    .deleteOne({ _id: ObjectId(id) });
};

const update = async ({ newVehicle, id }) =>
  getDB()
    .collection("cars")
    .updateOne({ _id: ObjectId(id) }, { $set: newVehicle });

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};

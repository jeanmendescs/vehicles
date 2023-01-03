const yup = require("yup");
const { ObjectId } = require("mongodb");

yup.addMethod(yup.string, "mongoDBId", function (errorMessage) {
  return this.test("Invalid Id", errorMessage, function () {
    const { path, createError, parent } = this;

    const { id } = parent;
    return ObjectId.isValid(id) || createError({ path, message: errorMessage });
  });
});

const getAllVehiclesSchema = yup.object({
  query: yup.object({
    pageSize: yup.number().min(0).optional(),
    pageNumber: yup.number().min(0).optional(),
    search: yup.string().optional(),
  }),
});

const vehicleByIdSchema = yup.object({
  params: yup.object({
    id: yup.string().mongoDBId("Invalid Id").required(),
  }),
});

const postVehicleSchema = yup.object({
  body: yup
    .object({
      vehicle: yup.string().required(),
      brand: yup.string().required(),
      year: yup.number().required(),
      description: yup.string().required(),
      isSold: yup.boolean().required(),
      createdAt: yup.date().required(),
      updatedAt: yup
        .string()
        .test(
          (dateString) => new Date(dateString).toString() !== "Invalid Date"
        ),
    })
    .noUnknown()
    .strict(),
});

const putVehicleSchema = yup.object({
  body: yup
    .object({
      vehicle: yup.string().required(),
      brand: yup.string().required(),
      year: yup.number().required(),
      description: yup.string().required(),
      isSold: yup.boolean().required(),
      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
    })
    .noUnknown()
    .strict(),
  params: yup.object({
    id: yup.string().mongoDBId().required(),
  }),
});

const patchVehicleSchema = yup.object({
  body: yup
    .object({
      vehicle: yup.string().optional(),
      brand: yup.string().optional(),
      year: yup.number().optional(),
      description: yup.string().optional(),
      isSold: yup.boolean().optional(),
      createdAt: yup.date().optional(),
      updatedAt: yup.date().optional(),
    })
    .noUnknown()
    .strict(),
  params: yup.object({
    id: yup.string().mongoDBId().required(),
  }),
});

module.exports = {
  patchVehicleSchema,
  postVehicleSchema,
  putVehicleSchema,
  getAllVehiclesSchema,
  vehicleByIdSchema,
};

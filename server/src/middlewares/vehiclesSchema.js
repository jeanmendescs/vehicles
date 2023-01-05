const yup = require("yup");
const { ObjectId } = require("mongodb");

yup.addMethod(yup.string, "mongoDBId", function (errorMessage) {
  return this.test("Invalid Id", errorMessage, function () {
    const { path, createError, parent } = this;

    const { id } = parent;
    return ObjectId.isValid(id) || createError({ path, message: errorMessage });
  });
});

const validateDateFormat = yup.string("required field").test((dateString) => {
  return new Date(dateString).toString() !== "Invalid Date";
});

const getAll = yup.object({
  query: yup.object({
    pageSize: yup.number().min(0).optional(),
    pageNumber: yup.number().min(0).optional(),
    search: yup.string().optional(),
  }),
});

const byId = yup.object({
  params: yup.object({
    id: yup.string().mongoDBId("Invalid Id").required(),
  }),
});

const patch = yup.object({
  body: yup
    .object({
      vehicle: yup.string().optional(),
      brand: yup.string().optional(),
      year: yup.number().optional(),
      description: yup.string().optional(),
      isSold: yup.boolean().optional(),
      createdAt: yup.string().optional(),
      updatedAt: yup.string().optional(),
    })
    .noUnknown()
    .strict(),
  params: yup.object({
    id: yup.string().mongoDBId("Invalid Id").required(),
  }),
});

const post = yup.object({
  body: yup
    .object({
      vehicle: yup.string().required(),
      brand: yup.string().required(),
      year: yup.number().required(),
      description: yup.string().required(),
      isSold: yup.boolean().required(),
      createdAt: yup.string().required(),
      updatedAt: yup.string().required(),
    })
    .noUnknown()
    .strict(),
});

const put = yup.object({
  body: yup
    .object({
      vehicle: yup.string().required(),
      brand: yup.string().required(),
      year: yup.number().required(),
      description: yup.string().required(),
      isSold: yup.boolean().required(),
      createdAt: yup.string().required(),
      updatedAt: yup.string().required(),
    })
    .noUnknown()
    .strict(),
  params: yup.object({
    id: yup.string().mongoDBId("Invalid Id").required(),
  }),
});

module.exports = {
  byId,
  getAll,
  patch,
  post,
  put,
};

import { rest } from "msw";
import MOCK from "../data/MOCK";
import getVehicle from "../utils/get-vehicle";

const url = "http://localhost:4000/vehicles";

export default [
  rest.get(url, (_, res, ctx) => {
    return res(ctx.json(MOCK));
  }),

  rest.get(`${url}/:id`, (req, res, ctx) => {
    const vehicle = getVehicle(MOCK, req.params.id);
    return res(ctx.json(vehicle));
  }),

  rest.post(url, (_, res) => {
    return res();
  }),

  rest.put(`${url}/:id`, (_, res) => {
    return res();
  }),
];

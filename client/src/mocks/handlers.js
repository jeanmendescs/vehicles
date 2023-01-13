import { rest } from "msw";
import MOCK from "../data/MOCK";

const url = "http://localhost:4000/vehicles";

export default [
  rest.get(url, (_, res, ctx) => {
    return res(ctx.json(MOCK));
  }),
];

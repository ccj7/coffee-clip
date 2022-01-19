import { Router, Request, Response } from "express";
// import {} from "./controller";

const basePath = "/api/tasks";
const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.json({ message: `😸 Yay!` });
});

// routes.get(basePath, getTasks);
// routes.get(`${basePath}/:id`, getTaskById);

// // TODO: create more routes here
// routes.post(`${basePath}/`, createTask);
// routes.delete(`${basePath}/:id`, deleteTaskById);

export default routes;

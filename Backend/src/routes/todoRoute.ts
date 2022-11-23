import { Router, Request, Response } from "express";
import {
  destroyTodo,
  getTodoById,
  getTodos,
  saveTodo,
} from "../functions/todoFunctions";

const todoRouter: Router = Router();

/*
 * Route path: http://www.localhost:4000/todo/3
 * Type: GET
 * Usage: Pass the userid of the user at the end of url
 * Purpose: To fetch all the todos of a single user from the database (todos.json)
 */
todoRouter.get("/:userId", (req: Request, res: Response) => {
  const data = getTodos(req.params["userId"]);
  res.status(200).json(data);
});

/*
 * Route path: http://www.localhost:4000/todo/3/2
 * Type: GET
 * Usage: Pass the userid of the user at the end of url
 * Purpose: To fetch the single todo of a single user from the database (todos.json)
 */

todoRouter.get("/:userId/:todoId", (req: Request, res: Response) => {
  const todo = getTodoById(req.params.userId, req.params.todoId);
  res.status(200).json(todo);
});

/*
 * Route path: http://www.localhost:4000/destroy/3/2
 * Type: DELETE
 * Usage: Pass the userid of the user and the todoId of the todo to the url as params.
 * Purpose: To delete a particular todo of a single user from the database (todos.json)
 */

todoRouter.delete("/:userId/:todoId", (req: Request, res: Response) => {
  const { userId, todoId } = req.params;
  console.log(req.params);
  destroyTodo(userId, todoId);
  res.status(200).json("It has been deleted");
});

/*
 * Route path: http://www.localhost:4000/todo
 * Type: POST
 * Request body:{
 *      'id':1,            // Userid of requester
 *      'title':""         // Todo Title
 *      'description':""   // Description of Todo
 * }
 * Purpose: To save a new todo to the object of the user in the Todos.json
 */
todoRouter.post("", (req: Request, res: Response) => {
  saveTodo(req.body);
  res.status(200).send("Response saved!");
});

export default todoRouter;

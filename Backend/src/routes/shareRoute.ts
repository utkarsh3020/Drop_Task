import { Router, Request, Response } from "express";
import {
  getShareRecords,
  createShareRecord,
} from "../functions/shareFunctions";

const shareRouter: Router = Router();

/*
 * Route path: http://www.localhost:4000/sharedrecords
 * Request body:{
 *      'senderId':1,          // Userid of the requester who is going to share his/her todo
 *      'todoId':1             // Todo ID of the todo to be shared by the requester
 *      'receiver':[1,2]       // Array of userid that user wants to share his/her todo with
 * }
 * Purpose: To create a share record in the database(shared_list.json)
 */
shareRouter.post("", (req: Request, res: Response) => {
  createShareRecord(req.body);
  res.status(200).json(req.body);
});

/*
 * Route: http://www.localhost:4000/sharedrecords/2
 * Usage: Pass the userid of the user at the end of url
 * Purpose: To fetch all the todos shared to the requester by anyone in the organisation.
 *          Using the databases, todos.json and shared_list.json
 */
shareRouter.get("/:id", (req: Request, res: Response) => {
  const jsonResponse: any[] = getShareRecords(parseInt(req.params["id"]));
  res.status(200).json(jsonResponse);
});

export default shareRouter;

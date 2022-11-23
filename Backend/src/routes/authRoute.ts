import { Router, Request, Response } from "express";
import { createUser, loginUser, userList } from "../functions/userFunction";

const authRouter: Router = Router();

/*
 * Route path: http://www.localhost:4000/signup
 * Request body:{
 *      fname: string;       // First name of user
 *      lname: string;       // Last name of the user
 *      username: string;    // Username of the user
 *      email: string;       // Email of the user
 *      password: string;    // Password of the user account
 * }
 * Purpose: To authenticate user after checking its details.
 */
authRouter.post("/signup", function (req: Request, res: Response) {
  const response = createUser(req.body);
  res.status(200).json(response);
});

/*
 * Route path: http://www.localhost:4000/login
 * Request body:{
 *      'username':johndoe,            // Username of the user
 *      'password':password            // Password of the user
 * }
 * Purpose: To authenticate user after checking its details.
 */
authRouter.post("/login", function (req: Request, res: Response) {
  const user = loginUser(req.body);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user);
});

/*
 * Route path: http://www.localhost:4000/userlist
 * Purpose: To fetch the user list from user.json
 */
authRouter.get("/userlist", (req: Request, res: Response) => {
  const jsonResponse: any[] = userList();
  res.status(200).json(jsonResponse);
});

export default authRouter;

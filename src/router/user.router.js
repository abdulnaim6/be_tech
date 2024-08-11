import express from "express";
import userController from "../controller/user.controller.js";

const router = express.Router();

router.get("/users", userController.listUser);
router.post("/login", userController.loginUser);
router.post("/signup", userController.createUsers);
router.put("/update/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.get("/data/:id", userController.getDataByID);
router.get("/search/", userController.search);

export default router;

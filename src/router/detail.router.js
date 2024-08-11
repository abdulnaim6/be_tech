import express from "express";
import detailController from "../controller/detail.controller.js";

const router = express.Router();

router.get("/detail", detailController.listDetail);
router.post("/detail/:id", detailController.createDetail);
router.put("/data/:id", detailController.updateData);
router.delete("/data/:id", detailController.deleteData);
router.get("/detail/:id", detailController.getDetailById);

export default router;

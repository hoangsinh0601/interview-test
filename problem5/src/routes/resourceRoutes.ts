import { Router } from "express";
import {
  createResource,
  listResources,
  getResource,
  updateResource,
  deleteResource,
} from "../controllers/resourceCotroller";

const router: Router = Router();

router.post("/", createResource);
router.get("/", listResources);
router.get("/:id", getResource);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);

export default router;

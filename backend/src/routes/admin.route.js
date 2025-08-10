import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from "../controllers/admin.controller.js";

const router = Router();

// Protect all routes
router.use(protectRoute, requireAdmin);

// Check admin status
router.get("/check", checkAdmin);

// Songs
router.get("/songs", createSong);
router.delete("/songs/:id", deleteSong);

// Albums
router.get("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;

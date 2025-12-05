import express from "express";
import getRoute from "./get.js";
import postRoute from "./post.js";
import putRoute from "./put.js";
import deleteRoute from "./delete.js";

const router = express.Router();

router.use(getRoute);
router.use(postRoute);
router.use(putRoute);
router.use(deleteRoute);

export default router;

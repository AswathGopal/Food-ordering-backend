import express  from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();


router.get(
    "/:restaurantId",
    param("restaurantId")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("RestaurantId paramenter must be a valid string"),
    RestaurantController.getRestaurant
  );


router.get("/search/:city",
    param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("city paramater should be a valid string and should not be empty"),
    RestaurantController.searchRestaurant
);

export default router;
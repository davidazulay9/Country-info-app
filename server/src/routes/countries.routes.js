import express from "express";
import { countriesController } from "../controllers/countries.controller.js";


const countriesRouter = express.Router()

countriesRouter.get("/", countriesController.getAllCountries);
countriesRouter.get("/:ID", countriesController.getCountryDetails);

export default countriesRouter;
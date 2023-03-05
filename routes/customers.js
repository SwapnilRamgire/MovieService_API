import express from "express";
import { validate, Customer } from "../models/customer.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send(`User with ${req.params.id} id does not exists...`);
  res.send(customer);
});

router.post("/", async (req, res) => {
  const getValidation = validate(req.body);
  if (getValidation.error)
    return res.status(400).send(getValidation.error.details[0].message);
  const customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const getValidation = validate(req.body);
  if (getValidation.error)
    return res.status(400).send(getValidation.error.details[0].message);

  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    },
    { new: true }
  );
  if (!updatedCustomer)
    return res
      .status(404)
      .send(`User with ${req.params.id} id does not exists...`);
  res.send(updatedCustomer);
});

router.delete("/:id", async (req, res) => {
  const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
  if (!deletedCustomer)
    return res
      .status(404)
      .send(`User with ${req.params.id} id does not exists...`);
  res.send(deletedCustomer);
});

export { router as customers };

import mongoose from "mongoose";

/**
 * Define the Plan schema for MongoDB using Mongoose.
 * 
 * @typedef {Object} PlanSchema
 * @property {Number} plan_id - The id of the plan
 * @property {String} type - The type of the plan
 * @property {String} name - The name of the plan
 * @property {String} description - The description of the plan
 * @property {String} small_description - The small description of the plan
 * @property {String} price_id - The id of the price
 * @property {String} price - price of the plan
 * @property {String} anchor_price - anchor price of the plan
 * @property {String} currency - The currency of the plan
 * @property {Array} availableFeatures - The available features of the plan
 * @property {Array} unavailableFeatures - The unavailable features of the plan
 * @property {String} footer - The footer
 * @property {String} status - status of the plan
 * 
 * @returns {Model<PlanDocument>} The Mongoose model for the Plan schema.
 */
const PlanSchema = new mongoose.Schema(
  {
    plan_id: { type: Number, required: true, unique: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    small_description: { type: String, required: true },
    price_id: { type: String, required: true },
    price: { type: String, required: true },
    anchor_price: { type: String, required: false },
    currency: { type: String, required: true },
    availableFeatures: { type: Array, required: false },
    unavailableFeatures: { type: Array, required: false },
    footer: { type: String, required: false },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);

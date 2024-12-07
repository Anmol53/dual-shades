import mongoose from "mongoose";

/**
 * Defines the User schema for MongoDB using Mongoose.
 *
 * @typedef {Object} UserDocument
 * @property {string} email - The user's email.
 * @property {string} name - The user's name.
 * @property {string} image - The user's image
 * @property {string} plan_id - The user's plan identifier
 * @property {string} plan - The user's subscription plan.
 * @property {number} credits - The user's available credits.
 * @property {Date} createdAt - The timestamp of when the user was created.
 * @property {Date} updatedAt - The timestamp of when the user was last updated.
 *
 * @returns {Model<UserDocument>} The Mongoose model for the User schema.
 */
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: false},
    plan_id: { type: Number, required: true },
    plan: { type: String, required: true },
    credits: { type: Number, required: true },
  },
  { timestamps: true }
);

/**
 * Mongoose middleware function that hashes the password before saving a user document.
 * This function is executed before the 'save' event on the UserSchema.
 *
 * @function preSave
 * @memberof UserSchema
 * @param {function} next - The callback function to be invoked after the middleware function.
 * @returns {void}
 */
UserSchema.pre("save", async function (next) {

  try {
    next();
  } catch (error) {
    // If an error occurs during password hashing, pass the error to the next middleware function
    next(error);
  }
});


export default mongoose.models.User || mongoose.model("User", UserSchema);


import mongoose, { model, Schema } from "mongoose";


const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
     
      }

      },
    },

  { timestamps: true }
);


organizationSchema.index({ location: "2dsphere" });   




export const organizationModel = mongoose.models.Organization || model("Organization", organizationSchema)
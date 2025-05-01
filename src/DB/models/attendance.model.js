

import mongoose, { model, Schema } from "mongoose";


const attendanceSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    checkInLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    checkInTime: {
      type: Date,
      required: true,
      default: Date.now,
    },
    checkOutLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
    checkOutTime: {
      type: Date,
      default: null,
    },
    workDurationMinutes: {
      type: Number, //in minutes
    },
    status: {
      type: String,
      enum: ["present", "absent", "late", "left-early"],
      default: "present",
    },
  
  },
  { timestamps: true }
);

attendanceSchema.index({ employee: 1, checkInTime: 1 }, { unique: true });
attendanceSchema.index({ checkInLocation: "2dsphere" });
attendanceSchema.index({ checkOutLocation: "2dsphere" });


export const attendanceModel = mongoose.models.Attendance || model("Attendance" , attendanceSchema)
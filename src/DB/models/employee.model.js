import mongoose, { model, Schema } from "mongoose";

const employeeSchema = new Schema({


   name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
    },
    organization:{
        type:Schema.Types.ObjectId,
        ref:"Organization",
        required:true
    },
},{timestamps:true})

export const employeeModel = mongoose.models.Employee || model("Employee", employeeSchema)

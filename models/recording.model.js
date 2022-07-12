import mongoose from "mongoose"
import { v4 as uuid } from "uuid"
import {getPresignedUrlForFile} from "../utils/s3.js";

const recordingSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => uuid(),
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 0,
    required: true
  },
  labelId: {
    type: String,
    required: false
  }
})

export default mongoose.model("Recording", recordingSchema)

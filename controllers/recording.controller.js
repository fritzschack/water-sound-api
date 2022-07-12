import Recording from "../models/recording.model.js"
import {deleteFile, getPresignedUrlForFile, uploadFile} from "../utils/s3.js"

async function getPresignedUrls (recordings) {
  let results = []
  for (const recording of recordings) {
    recording["presignedUrl"] = await getPresignedUrlForFile(recording.name)
    results.push(recording)
  }
  return results
}

export async function recordings_index (req, res) {
  try {
    let recordings = await Recording.find()
    if (!recordings) return res.status(404).json({ error: "No recordings found." })
    recordings = await getPresignedUrls(JSON.parse(JSON.stringify(recordings)))
    return res.status(200).json(recordings)
  } catch(error) {
    return res.status(500).json(error)
  }
}

export async function recordings_create (req, res) {
  try {
    const { recording } = req.files
    if (!recording) {
      return res.status(409).json({ error: "No file uploaded." })
    } else {
      await recording.mv("./uploads/" + recording.name)
      await uploadFile(recording)
      let instance = await Recording.create({ name: recording.name, size: recording.size, createdAt: Date.now() })
      return res.status(201).json({ message: "Recording is uploaded.", data: instance })
    }
  } catch(error) {
    return res.status(500).json(error)
  }
}

export async function recordings_delete (req, res) {
  try {
    const { id } = req.params
    const recording = await Recording.findById(id)
    if (!recording) {
      return res.status(404).json({ message: `No recording with the id ${id}.` })
    } else {
      await deleteFile(recording.name)
      await Recording.remove({ _id: id })
      return res.status(200).json({ message: `Successfully deleted recording with the id ${id}.` })
    }
  } catch(error) {
    return res.status(500).json(error)
  }
}
import Recording from "../models/recording.model.js"
import {getPresignedUrlForFile, uploadFile} from "../utils/s3.js"

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
    if (!recordings) {
      return res.status(404).json({ error: "No recordings found." })
    }
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
      // TODO: Instead of saving to local folder, save to S3 Bucket (or similar)
      await recording.mv("./uploads/" + recording.name)
      let file = await uploadFile(recording)
      console.log(file)
      let instance = await Recording.create({
        name: recording.name,
        size: recording.size,
        createdAt: Date.now()
      })

      return res.status(201).json({
        message: "Recording is uploaded.",
        data: instance
      })
    }
  } catch(error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
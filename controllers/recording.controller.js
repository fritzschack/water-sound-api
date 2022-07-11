import Recording from "../models/recording.model.js"

export async function recordings_index (req, res) {
  try {
    const recordings = await Recording.find()
    if (!recordings) {
      return res.status(404).json({ error: "No recordings found." })
    }
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
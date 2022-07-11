export async function recordings_index (req, res) {
  try {
    const recordings = [{
      id: "test_id",
      data: "test_data"
    }]
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
    const { data } = req.body
    if (!data) {
      return res.status(409).json({ error: "Please send valid sound data." })
    }
    return res.status(200).json({
      id: "test_id",
      data: data
    })
  } catch(error) {
    return res.status(500).json(error)
  }
}
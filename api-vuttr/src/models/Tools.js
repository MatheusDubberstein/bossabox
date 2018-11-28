import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
  tags: [String]
})

export default mongoose.model('Tools', schema)

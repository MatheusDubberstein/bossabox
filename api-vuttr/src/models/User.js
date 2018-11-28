import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  google: {
    id: String,
    name: String,
    email: String
  },
  active: { type: Boolean, default: true }
})

export default mongoose.model('Users', schema)

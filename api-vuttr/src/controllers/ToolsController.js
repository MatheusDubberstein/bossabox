import Tools from '../models/Tools'

export const create = async (req, res) => {
  const tool = await Tools.create(req.body)
  return res.json(tool)
}

export const update = async (req, res) => {
  const tool = await Tools.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
  return res.json(tool)
}

export const findById = async (req, res) => {
  const tool = await Tools.findById(req.params.id)
  return res.json(tool)
}

export const findAll = async (req, res) => {
  const { query } = req
  const filter = query.tag !== undefined ? { tags: { $all: [query.tag] } } : {}
  const tools = await Tools.find(filter)
  return res.json(tools)
}

export const destroy = async (req, res) => {
  await Tools.findByIdAndRemove(req.params.id)
  return res.send()
}

const Cat = require('./catSchema');

exports.findAll = async () => {
  return await Cat.find();
}

exports.findByIdAndUpdateImg = async (id, fileName) => {
  const cat = await Cat.findById(id)
  console.log(cat)
  cat.imgUrl = `http://localhost:8001/media/${fileName}`
  const newCat = await cat.save()
  return newCat.readOnlyData
}

exports.findCatByIdWithoutPassword = async (catId) => {
  const cat = await Cat.findById(catId).select('-password')
  return cat
}

exports.findCatByEmail = async (email) => {
  const cat = await Cat.findOne({ email })
  return cat
}

exports.existsByEmail = async (email) => {
  const result = await Cat.exists({ email })
  return result
}

exports.create = async (cat) => {
  return await Cat.create(cat)
}

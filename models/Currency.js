const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  descriptionId: {type: Number, required: true},
  date: {type: Date, default: Date.now},
  owner: { type: Types.ObjectId, ref: 'User' }
})

module.exports = model('Currency', schema);
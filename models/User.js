const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  currencys: [{ type: Types.ObjectId, ref: 'Currency' }]
})

module.exports = model('User', schema);
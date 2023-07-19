const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default:'user' },
  addressess: { type: [Schema.Types.Mixed] }, 
  name: { type: String },
  salt: {type:Buffer}
});

const virtual = userSchema.virtual('id');
virtual.get(function () {
  return this._id;
});
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

userSchema.pre('save', function(next){
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const encryptedPassord = bcrypt.hashSync(user.password,SALT);
  user.password = encryptedPassord;
  next();
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password,this.password);
}

userSchema.methods.genJWT = function() {
  return jwt.sign({id:this._id,email:this.email},'auth_secret',{
      expiresIn: '1h'
  })
}

exports.User = mongoose.model('User', userSchema);
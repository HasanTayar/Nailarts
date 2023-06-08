const mongoose = require('mongoose');
let image =' https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg';
const UserSchema = new mongoose.Schema({
    firstName:{type: String , required : true},
    lastName:{type:String , required:true},
    phone:{type:Number},
    photo:{type: String ,
    default: image,
    },
    
    password:{type:String , required:true}
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
import mongoose, { model , Schema , Types  } from "mongoose";
import bcryptjs from "bcryptjs"



const userSchema = new Schema({

name:{
    type:String,
    required:true,
    minLength:3,
    maxLength:20,
},
email:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true,
    minLength:8,
},
gender:{
    type:String,
    enum:["male","female"],
    required:true
},
dateOfBirth:{
    type:Date,
    required:true
},
phone:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:['user' , 'admin'],
    default:'user'
},
isConfirmed:{
    type:Boolean,
    default:false,
},
forgetCode:{
    type:String,
},
activationCode:{
    type:String,
},
stripe_account_id:{
    type: String
},
stripe_seller:{},

stripeSession: [{
  bookingId: {
    type: Types.ObjectId,
    ref: "Booking"
  },
  session: {
    type: Object
  }
}]

},{timestamps:true})

userSchema.pre("save", function () {
  if (!this.isModified("password")) {
    return 
  }

  this.password = bcryptjs.hashSync(this.password,Number(process.env.SALT_ROUND));

});

userSchema.methods.comparePassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
}

export const userModel=mongoose.models.User || model('User' , userSchema)
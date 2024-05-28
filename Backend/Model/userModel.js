const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, "User name is Required"],
    },
    email:{
        type:String,
        required:[true, "Email is Required"],
    },
    password:{
        type:String,
        required:[true, "Password is Required"],
        minlength:[6, "Password must be at least 6 characters"],
    },
    phoneNo:{
        type:Number,
        required:[true, "Phone Number is Required"],
    },
    gender:{
        type:String,
    },
    createdAt:{
        type:Date,
    },
    passwordUpdatedAt:{
        type:Date,
    },
    tokenExpiryTime:{
        type:Date,
    },
    images:[{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        },
    }],
    noOfDeletedTask:{
        type:Number,
        default:0,
    }
});

userSchema.pre('save',async function(next){
    try{
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, 12);
        }
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
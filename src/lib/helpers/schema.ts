import {model, Schema, SchemaTypes} from "mongoose";

let commentSchemaJson = {
    commenter:{
        type:[SchemaTypes.ObjectId],
        ref:"users",
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0,
    },
};

let postSchemaJson = {
    anonymous:Boolean,
    poster:{
        type:SchemaTypes.ObjectId,
        ref:"users",
        required:true
    },
    post:{
        type:String,
        required:true
    },
    datePosted:{
        type:Number,
        default:new Date().getTime()
    },
    likes:{
        type:[SchemaTypes.ObjectId],
        ref:"users",
        default:null
    },
    comments:{
        type:[SchemaTypes.ObjectId],
        ref:"comments",
        default:null
    },
};

let userSchemaJson = {
    username: {
        type:String,
        required:true,
        unique:true
    },
    visible:{
        type:Boolean,
        default:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    pfp:{
        type:String,
        default:null
    },
    dateJoined:{
        type:Number,
        default: new Date().getTime()
    },
    pendingRequest:{
        type:[SchemaTypes.ObjectId],
        ref:"users",
        default:null
    },
    friends:{
        type:[SchemaTypes.ObjectId],
        ref:"users",
        default:null,
    },
    posts:{
        type:[SchemaTypes.ObjectId],
        ref:"posts",
        default:null
    },
    likedPosts:{
        type:[SchemaTypes.ObjectId],
        ref:"posts",
        default:null
    },
    commentedPosts:{
        type:[SchemaTypes.ObjectId],
        ref:"posts",
        default:null
    },
    isVerified:{
        type:Boolean,
        defualt:false
    }
};

const commentSchema = new Schema(commentSchemaJson);
const postSchema = new Schema(postSchemaJson);
const userSchema = new Schema(userSchemaJson);

const Comment = model("comments",commentSchema);
const Post = model("posts",postSchema);
const User = model("users",userSchema);

export {
    Comment,
    Post,
    User,
}
import {model, Schema, SchemaTypes} from "mongoose";

let commentSchemaJson = {
    commenter:{
        type:[SchemaTypes.ObjectId],
        ref:"ju_posts_users",
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
        ref:"ju_posts_users",
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
        ref:"ju_posts_users",
        default:null
    },
    comments:{
        type:[SchemaTypes.ObjectId],
        ref:"ju_posts_comments",
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
        ref:"ju_posts_users",
        default:null
    },
    notification:{
        type:[SchemaTypes.ObjectId],
        ref:"ju_posts_notification",
        default:null
    },
    friends:{
        type:[SchemaTypes.ObjectId],
        ref:"ju_posts_users",
        default:null,
    },
    posts:{
        type:[SchemaTypes.ObjectId],
        ref:"ju_posts_posts",
        default:null
    },
    likedPosts:{
        type:[SchemaTypes.ObjectId],
        ref:"ju_posts_posts",
        default:null
    },
    commentedPosts:{
        type:[SchemaTypes.ObjectId],
        ref:"ju_posts_posts",
        default:null
    },
    isVerified:{
        type:Boolean,
        defualt:false
    }
};

let exchangePostSchemaJson = {
    poster:{
        type:SchemaTypes.ObjectId,
        ref:"ju_posts_users",
        required:true,
    },
    ownedCourse:{
        type:String,
        required:true
    },
    ownedCourseTime:{
        type:String,
        required:true
    },
    requestedCourse:{
        type:String,
        required:true
    },
    requestedCourseTime:{
        type:String,
        required:true
    },
    contactMethod:{
        type:String,
        required:true
    },
    contactLink:String,
}

let notificationSchemaJson = {
    user:{
        type:SchemaTypes.ObjectId,
        ref:"ju_posts_users",
        required:true
    },
    text:{
        type:String,
        required:true
    }
}

const notificationSchema = new Schema(notificationSchemaJson);
const exchangePostSchema = new Schema(exchangePostSchemaJson);
const commentSchema = new Schema(commentSchemaJson);
const postSchema = new Schema(postSchemaJson);
const userSchema = new Schema(userSchemaJson);

const Notification = model("ju_posts_notification",notificationSchema);
const ExchangePost = model("ju_posts_exchangePost",exchangePostSchema);
const Comment = model("ju_posts_comments",commentSchema);
const Post = model("ju_posts_posts",postSchema);
const User = model("ju_posts_users",userSchema);

export {
    Notification,
    ExchangePost,
    Comment,
    Post,
    User,
}
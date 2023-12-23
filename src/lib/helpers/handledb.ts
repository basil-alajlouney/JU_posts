import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage,ref, uploadBytes } from "firebase/storage";
import {connect} from "mongoose";
import {Redis} from "ioredis";
import {Mongodb_connection_string, redis_caching_db} from "$env/static/private";
import {Comment,Post,User,} from "./schema.js";
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from "../../routes/login/$types.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKjcUgdWNF6u7McXkHPrrSlZZU2almpN0",
  authDomain: "postsapp-dfffc.firebaseapp.com",
  projectId: "postsapp-dfffc",
  storageBucket: "postsapp-dfffc.appspot.com",
  messagingSenderId: "141291300967",
  appId: "1:141291300967:web:bc4b8c26d552931030ccc2",
  measurementId: "G-Z88W3TFB0H"
};

function sessionIdGenerator(){
  const letters = "1234567890-=!@#$%^&*()_+QWERYIOP}ASDFGHJKLZXCVBNM<>?";
  let id = "";

  for(let i=0;i<25;i++){
    let index = Math.floor(Math.random() * 52);
    id+= letters[index];
  }

  return id;

}

initializeApp(firebaseConfig);
connect(Mongodb_connection_string); //mongoose
const redis = new Redis(redis_caching_db);
const storage = getStorage();


async function addUser(formData:FormData) {

    let unique = await isUniqueUser(
      formData.get("email") as string,
      formData.get("username") as string
  )

  if(!unique.email){
    error(405,{
      message:"this email is already in use"
    })
  }

  if(!unique.username){
    error(405,{
      message:"this email is already in use"
    })
  }

  
  const user = new User({
    username:formData.get("username"),
    email:formData.get("email"),
    password:formData.get("password"),
    dateJoined: new Date().getTime(),
    pfp:null,
  })

  const pfp = formData.get("PFP") as File;

  if(!pfp.size){
    user.save();
    return;
  }

  const filename = user.id + "." + pfp.type.split("/").at(-1);

  const pictureRef = ref(storage,`profilePicture/${filename}`);
  await uploadBytes(pictureRef, pfp as any);

  user.pfp = await getDownloadURL(pictureRef);

  user.save();

  return user._id;

}

async function verify_user({request}:{request:Request}) {
  const {verificationCode} = await request.json();

  const id = await redis.get(verificationCode as string);

  const user = await User.findById(id);

  if(!user)
    error(401,{
      message:"somthing went wrong"
    })

  user!.isVerified = true;

  return json({
    message:"user verified successfuly"
  })

}

async function isUniqueUser(email:string,username:string){
  const userData = await User.findOne({
    username,
    email
  })

  if(!userData)
      return {
        email:true,
        username:true
      };

    return {
      email:email != userData.email,
      username:username != userData.username
    };


}

async function checkUser({request}:{request:Request}) {
  const data = await request.formData();

  let userData = await User.findOne({
    username:data.get("username"),
    password:data.get("password")
  })
  .populate("pendingRequest")
  .populate("friends")
  .populate("posts");

  
  if(!userData)
  return json(error(404,{
    message:"user doesn't exist"
  }))

  let sessionId = sessionIdGenerator();
  redis.set(sessionId,JSON.stringify(userData),"EX", 60 * 5);

  return json({
    authToken:sessionId,
    userData
  });
}

async function accept_friend_request({request}:{request:Request}) {
  const sessionId = request.headers.get("JU_POSTS_SESSION_ID");
  const {reciverid,senderId} = await request.json();

  let user = 
  await User.findById(reciverid).populate("pendingRequest");

  let sender = await User.findById(senderId);

  sender?.friends.push(user?._id!);

  user!.pendingRequest = user?.pendingRequest?.filter((el)=>{
    if(el._id != senderId)
      return true;

      user?.friends.push(el);
      return false;
  })!;

  sender?.save();
  user?.save();

  redis.set(sessionId!,JSON.stringify(user),"EX", 60 * 5);

  return json({
    message:"message accept successfully"
  })

}

async function decline_friend_request({request}:{request:Request}) {
  const sessionId = request.headers.get("JU_POSTS_SESSION_ID");

  const {reciverid,senderId} = await request.json();

  let user = 
  await User.findById(reciverid).populate("pendingRequest");

  user!.pendingRequest = user?.pendingRequest?.filter((el)=>
    el._id != senderId
  )!;

  user?.save();

  redis.set(sessionId!,JSON.stringify(user),"EX", 60 * 5);

  return json({
    message:"message decline successfully"
  })

}

async function searchUsers({request}:{request:Request}){
  const {search}:{search:string} = await request.json();

  const x = await User.find({
    "username":{"$regex":search},
    visible:true
  });

  return json(x);
}

async function user_by_id({request}:{request:Request}){
  const {id}:{id:string} = await request.json();

  console.log("meow!!");
  
  let userData:any = null;

  try{
    userData = await User.findById(id);
  }
  catch{
    error(500);
  }

  console.log(userData);

  return json(
    userData
  );
}

async function updateUsername({request}:{request:Request}){
  const sessionId = request.headers.get("JU_POSTS_SESSION_ID");

  const {id,newUsername}:{id:string,newUsername:string}
  = await request.json();
  const user = await User.findOneAndUpdate(
    {_id:id,},{$set:{username:newUsername}}
    );

  user?.save();

  redis.set(sessionId!,JSON.stringify(user),"EX", 60 * 5);

  return json({
    state:"success"
  })
}

async function user_by_sessionId({request}:{request:Request}){
  const sessionId = request.headers.get("JU_POSTS_SESSION_ID");

  return json(
    JSON.parse((await redis.get(sessionId!))!)
  );
}

async function update_visibility({request}:{request:Request}) {
  const {id,visiblity}:{id:string,visiblity:boolean} = await request.json();
  const user = User.findOneAndUpdate(
    {_id:id,},{$set:{visible:visiblity}}
    );

    (await user)?.save();

    return json({
      staus:"success"
    });

}

async function add_friend({request}:{request:Request}){
  const {senderId,reciverId}:{senderId:string,reciverId:string} = await request.json();

  const reciver = await User.findById(reciverId);

  reciver?.pendingRequest.push(senderId as any);

  reciver?.save();

  return json({
    message:"friend request sent successfully"
  })

}

async function make_post({request}:{request:Request}){
  const sessionId = request.headers.get("JU_POSTS_SESSION_ID");

  const {postText,id}:{postText:string,id:string} = await request.json();

  const user = await User.findById(id);

  const post= new Post({
    poster:user,
    post:postText,
    datePosted: new Date().getTime()
  })
  
  await post.save();

  user?.posts.push(post._id);

  await user?.save();

  redis.set(sessionId!,JSON.stringify(user),"EX", 60 * 5);

  return json({
    message:"sent successfully"
  })

}

async function get_posts_by_user_id({request}:{request:Request}){
  const {id} = await request.json();

  const user = await User.findById(id).populate("posts");

  return json(user!.posts)
}

async function get_post_by_id({request}:{request:Request}){
  const {id}:{id:string} = await request.json();

  const post = 
  await Post.findById(id)
  .populate("poster")
  .populate({
    path:"comments",
    populate:"commenter"
  });

  return json(post);
}

async function get_friends_post({request}:{request:Request}){
  const {id} = await request.json();

  let data = await User.findById(id).select("friends").populate({
    path:"friends",
    populate:"posts"
  }) as any

  data = data?.friends.map((e:any)=>({
    username:e.username,
    pfp:e.pfp,
    posts:e.posts
  }))

  console.log(data);

  return json(data);
}

async function logAlive(action:RequestEvent) {
  const sessionId = action.request.headers.get("JU_POSTS_SESSION_ID");

  if(!sessionId)
    error(401,{
      message:"has not logged"
    });

  if(await redis.get(sessionId!) === null)
    throw error(401,{
      message:"session expired"
  });

  redis.pexpire(sessionId,1000 * 60 * 10);

  return json(action);
}

async function update_entries(){
  const x = await User.find();

  for(let i of x)
    i.save();

    return json({
      updated:true
    })
}

async function make_comment({request}:{request:Request}){
  const sessionId = request.headers.get("JU_POSTS_SESSION_ID");

  const {comment,commenterId,postId}
  :{comment:string,commenterId:string,postId:string} = await request.json();

  const commenter = await User.findById(commenterId);

  const post = await Post.findById(postId);

  const commentEntry = new Comment({
    comment,
    commenter,
  })
  commentEntry.save();

  post?.comments.push(commentEntry._id);
  post?.save();

  redis.set(sessionId!,JSON.stringify(commenter),"EX", 60 * 5);

  return json({
    message:"comment has been commented"
  })

}

async function get_all_users({request}:{request:Request}) {

  const {username} = await request.json();

  if(username != "ADMIN")
    error(401,{
      message:"only the admin has access to this website"
    })

  let data = await User.find()
  .populate("friends")
  .populate({
    path:"posts",
    populate:"comments"
  })

  return json(data);

}


export{
  addUser,
  checkUser,
  verify_user,
  searchUsers,
  user_by_id,
  updateUsername,
  logAlive,
  user_by_sessionId,
  update_visibility,
  update_entries,
  add_friend,
  accept_friend_request,
  decline_friend_request,
  get_posts_by_user_id,
  make_post,
  make_comment,
  get_post_by_id,
  get_friends_post,
  get_all_users
}
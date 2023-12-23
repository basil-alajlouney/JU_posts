import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from './$types.js';
import {
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
    verify_user,
    get_all_users
} from '$lib/helpers/handledb.js';

async function use(middleware:(action:RequestEvent)=>Promise<Request>,action:RequestEvent):Promise<RequestEvent>{
    return await (await middleware(action)).json();
}

export let POST= async (action)=>{

    const endpoint = action.url.href.split("/").at(-1);

    if(endpoint === "update_entries")
        return await update_entries();

    await use(logAlive as any,action as any);

    if(endpoint === "update_visibility")
        return await update_visibility(action);

    if(endpoint === "add_friend")
        return await add_friend(action);

    if(endpoint === "user_by_sessionId")
        return await user_by_sessionId(action);

    if(endpoint === "make_post")
        return await make_post(action);

    if(endpoint === "test")
        return json({
            isAlive:true
    });

    if(endpoint === "search")
        return await searchUsers(action);

    if(endpoint === "user_by_id")
        return await user_by_id(action);

    if(endpoint === "change_username")
        return await updateUsername(action);

    if(endpoint === "decline_friend_request")
        return await decline_friend_request(action);

    if(endpoint === "accept_friend_request")
        return await accept_friend_request(action);

    if(endpoint === "get_posts_by_user_id")
        return await get_posts_by_user_id(action);

    if(endpoint === "make_comment")
        return await make_comment(action);

    if(endpoint === "get_post_by_id")
        return await get_post_by_id(action);

    if(endpoint === "get_friends_post")
        return await get_friends_post(action);

    if(endpoint === "verify_user")
        return await verify_user(action);

    if(endpoint === "get_all_users")
        return await get_all_users(action);

    return error(404,{
        message:"not found"
    })

}
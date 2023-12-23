async function getUserData() {
    const headers = new Headers();
    headers.append("JU_POSTS_SESSION_ID",
    localStorage.getItem("JU_POSTS_SESSION_ID")!)

    const res = await fetch("/api/user_by_sessionId",{
        method:"POST",
        headers
    })

    return await res?.json() ?? null;
}

function getHeaders(){
    const headers = new Headers();
    headers.append("JU_POSTS_SESSION_ID",
    localStorage.getItem("JU_POSTS_SESSION_ID")!)

    return headers;
}

export {
    getUserData,
    getHeaders
}
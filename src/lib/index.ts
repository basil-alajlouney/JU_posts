import { writable, type Writable } from "svelte/store";

export let postElementId:Writable<number> = writable(0);
export let commentId:Writable<number> = writable(0);

import HomeSvelte from "../routes/Home.svelte";
import { writable } from "svelte/store";

export const state = writable({
  loading: true,
  screen: HomeSvelte,
})
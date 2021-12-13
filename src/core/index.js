import { default as createStore } from "./store";

const core = {};
core.createStore = createStore;

export { core as default, createStore };

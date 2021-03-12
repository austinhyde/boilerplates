import { ipcRenderer } from "electron";
import App from "./App.svelte";

new App({
	target: document.body,
});
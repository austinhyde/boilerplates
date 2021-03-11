import { ipcRenderer } from "electron";
import App from "./App.svelte";

const makeCall = () => {
	console.log("making call");
	ipcRenderer.send("test", "hello");
}

ipcRenderer.on("cool", console.log);

new App({
	target: document.body,
	props: {
		name: 'World',
		makeCall
	}
});
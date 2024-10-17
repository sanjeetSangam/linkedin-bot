import genIcon from "~/assets/generate.svg";
import insertIconSrc from "~/assets/insert.svg";
import { createModalHtml } from "./popup/components/modal";
import {
	handleGenerateClick,
	handleInsertClick,
	handleMessageFormClick,
} from "./popup/helpers/message";
import { handleClickOutsideModal } from "./popup/helpers/modal";
import "./popup/style.css";

export default defineContentScript({
	matches: ["*://*.linkedin.com/*"],

	main() {
		document.body.insertAdjacentHTML("beforeend", createModalHtml(insertIconSrc, genIcon));

		const modal = document.getElementById("custom-modal") as HTMLDivElement;
		const modalContent = document.getElementById("modal-content") as HTMLDivElement;
		const generateBtn = document.getElementById("generate-btn") as HTMLButtonElement;
		const insertBtn = document.getElementById("insert-btn") as HTMLButtonElement;
		const inputText = document.getElementById("input-text") as HTMLInputElement;

		let lastGeneratedMessage = "";
		let parentElement: HTMLElement | null = null;

		const sharedState = {
			lastGeneratedMessage,
			parentElement,
			modal,
			modalContent,
			generateBtn,
			insertBtn,
			inputText,
		};

		document.addEventListener("click", (event) => handleMessageFormClick(event, sharedState));

		document.addEventListener("click", (event) => handleClickOutsideModal(event, sharedState));

		generateBtn.addEventListener("click", (e) => handleGenerateClick(e, sharedState));

		insertBtn.addEventListener("click", () => handleInsertClick(sharedState));
	},
});

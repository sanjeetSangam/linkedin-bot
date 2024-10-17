import { openModal, resetModal } from "./modal";
import editIcon from "~/assets/edit.svg";
import reGenIcon from "~/assets/regenerate.svg";

// Handle clicks on message form
export const handleMessageFormClick = (event: MouseEvent, sharedState: any) => {
	const { modal, inputText } = sharedState;
	const target = event.target as HTMLElement;

	if (
		target.matches(".msg-form__contenteditable") ||
		target.matches(".msg-form__contenteditable > p")
	) {
		sharedState.parentElement = target.closest(".msg-form__contenteditable");

		if (!sharedState.parentElement) return;

		if (!sharedState.parentElement.querySelector(".edit-icon")) {
			insertIcon(editIcon, sharedState.parentElement, (e) => {
				e.stopPropagation();
				openModal(modal, inputText);
			});
		}
	} else {
		const existingIcon = document.querySelector(".edit-icon") as HTMLElement;
		if (existingIcon && modal.classList.contains("hidden")) {
			existingIcon.remove();
		}
	}
};

// Handle generate button click
export const handleGenerateClick = (e: MouseEvent, sharedState: any) => {
	e.stopPropagation();
	const { inputText, generateBtn, insertBtn } = sharedState;

	const inputValue = inputText.value.trim();
	if (!inputValue) return;

	appendMessage(inputValue, "right");
	generateBtn.disabled = true;

	sharedState.lastGeneratedMessage = generateMessage();
	appendMessage(sharedState.lastGeneratedMessage, "left");

	generateBtn.innerHTML = `<img src="${reGenIcon}" alt="Regenerate"> <b>Regenerate</b>`;
	inputText.value = "";
	insertBtn.classList.replace("hidden", "flex");
};

// Handle insert button click
export const handleInsertClick = (sharedState: any) => {
	const { parentElement, lastGeneratedMessage } = sharedState;

	if (lastGeneratedMessage && parentElement) {
		const messageParagraph = document.createElement("p");
		messageParagraph.textContent = lastGeneratedMessage;

		const placeHolderElement = parentElement.nextElementSibling?.classList.contains(
			"msg-form__placeholder"
		)
			? (parentElement.nextElementSibling as HTMLElement)
			: null;
		if (placeHolderElement) {
			placeHolderElement.style.setProperty("content", "none");
			placeHolderElement.classList.remove("msg-form__placeholder");
		}

		const emptyElement = (parentElement.children[0] as HTMLElement) ?? null;
		if (emptyElement && emptyElement.textContent?.trim() === "") {
			parentElement.removeChild(parentElement.children[0]);
		}

		parentElement.appendChild(messageParagraph);
		resetModal(sharedState);
	}
};

// Generate a static message
export const generateMessage = () => {
	const messages = [
		"Thank you for the opportunity! If you have any more questions, feel free to ask.",
		"Let's build something together!",
		"I'm here to help!",
		"How can I help you?",
		"I'm ready to help!",
		"Let's get started!",
	];
	return messages[0];
};

// Insert icon in parent element
export const insertIcon = (
	iconSrc: string,
	parent: HTMLElement,
	clickHandler: (e: Event) => void
) => {
	const icon = document.createElement("img");
	icon.className = "edit-icon block";
	icon.src = iconSrc;
	icon.alt = "Custom Icon";
	Object.assign(icon.style, {
		position: "absolute",
		bottom: "5px",
		right: "5px",
		width: "30px",
		height: "30px",
		cursor: "pointer",
		zIndex: "1000",
	});
	if (parent.classList.contains("msg-form__contenteditable")) {
		parent.appendChild(icon);
	} else {
		parent.removeChild(icon);
	}

	icon.addEventListener("click", clickHandler);
};

// Append message to messages div
export const appendMessage = (message: string, align: "left" | "right") => {
	const messagesDiv = document.getElementById("messages") as HTMLDivElement;
	const messageDiv = document.createElement("div");
	messageDiv.textContent = message;

	Object.assign(messageDiv.style, {
		backgroundColor: align === "right" ? "#DFE1E7" : "#DBEAFE",
		color: "#666D80",
		borderRadius: "12px",
		padding: "16px",
		marginBottom: "5px",
		maxWidth: "80%",
		alignSelf: align === "right" ? "flex-end" : "flex-start",
		margin: align === "right" ? "0 0 0 auto" : "0 auto 0 0",
	});

	messagesDiv.appendChild(messageDiv);
	messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

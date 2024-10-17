import genIcon from "~/assets/generate.svg";

// Open modal and focus on input
export const openModal = (modal: HTMLDivElement, inputText: HTMLInputElement) => {
	modal.classList.remove("hidden");
	modal.style.display = "flex";
	modal.style.top = `50%`;
	modal.style.left = `50%`;
	modal.style.transform = `translate(-50%, -50%)`;
	modal.style.zIndex = "1000";
	modal.style.height = "100%";
	modal.style.width = "100%";
	inputText.focus();
};

// Reset modal state
export const resetModal = (sharedState: any) => {
	const { modal, generateBtn, insertBtn, inputText } = sharedState;

	modal.classList.add("hidden");
	document.getElementById("messages")!.innerHTML = "";
	inputText.value = "";
	insertBtn.classList.replace("flex", "hidden");

	generateBtn.innerHTML = `<img src="${genIcon}" alt="Generate"> <b>Generate</b>`;
	generateBtn.disabled = false;
};

// Handle clicks outside modal
export const handleClickOutsideModal = (event: MouseEvent, sharedState: any) => {
	const { modal, modalContent } = sharedState;
	const target = event.target as HTMLElement;

	if (
		modal.style.display === "flex" &&
		!modalContent.contains(target) &&
		!target.classList.contains("edit-icon")
	) {
		resetModal(sharedState);
	}
};

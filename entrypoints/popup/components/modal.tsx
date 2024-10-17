export const createModalHtml = (insertIcon: string, genIcon: string) => `
  <div id="custom-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden justify-center items-center z-1">
    <div id="modal-content" class="bg-white rounded-lg w-full max-w-5xl p-6">
      
      <div id="messages" class="overflow-y-auto flex flex-col !gap-6"></div>
      
      <div class="my-6">
        <input id="input-text" type="text" placeholder="Your prompt" class="ai-bot-input" />
      </div>

      <div class="text-right flex justify-end items-center gap-6">
        <button id="insert-btn" class="hidden insert-button">
          <img src="${insertIcon}" alt="Insert">
          <b>Insert</b>
        </button>
        <button id="generate-btn" class="generate-btn">
          <img src="${genIcon}" alt="Generate">
          <b>Generate</b>
        </button>
      </div>
    </div>
  </div>
`;

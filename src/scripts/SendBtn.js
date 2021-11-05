import { sendLetter } from "./dataAccess.js"

document.addEventListener("click",
    (event) => {
        if (event.target.id === "sendBtn") {
            sendLetter()
        }
    })

export const sendBtn = () => {
    let html = `
        <button class="button" id="sendBtn">Send letter! 📬</button>
    `
    return html
}
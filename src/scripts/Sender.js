import { getLetterBuilder, getPenPals, setSender } from "./dataAccess.js"

document.addEventListener("change",
    event => {
        if (event.target.id === "sender") {
            const senderId = parseInt(event.target.value)
            setSender(senderId)
        }
    })

export const Senders = () => {
    const senders = getPenPals()
    const letterBuilder = getLetterBuilder()

    let html = ""

    html += `<div class="field">
                <label class="label" for="sender">Sender: <em style="font-size:12px;">(Required)</em></label>
                <select id="sender">
                <option value="0">Who is sending this letter?...</option>
                `
    for (const sender of senders) {
        if (letterBuilder.senderId === sender.id) {
            html += `<option value="${sender.id}" selected>${sender.firstName} ${sender.lastName}</option>`
        }
        else {
            html += `<option value="${sender.id}">${sender.firstName} ${sender.lastName}</option>`
        }
    }
    html += `
                </select>
            </div>`

    return html
}
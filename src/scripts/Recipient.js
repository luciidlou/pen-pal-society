import { getLetterBuilder, getPenPals, setRecipient } from "./dataAccess.js"

document.addEventListener("change",
    event => {
        if (event.target.id === "recipient") {
            const recipientId = parseInt(event.target.value)
            setRecipient(recipientId)
        }
    })

export const Recipients = () => {
    const recipients = getPenPals()
    const letterBuilder = getLetterBuilder()

    let html = ""

    html += `<div class="field">
                <label class="label" for="recipient">Recipient: <em style="font-size:12px;">(Required)</em></label>
                <select id="recipient">
                <option value="0">Who is recieving this letter?...</option>
                `
    for (const recipient of recipients) {
        if (letterBuilder.recipientId === recipient.id) {
            html += `<option value="${recipient.id}" selected>${recipient.firstName} ${recipient.lastName}</option>`
        }
        else {
            html += `<option value="${recipient.id}" >${recipient.firstName} ${recipient.lastName}</option>`
        }
    }
    html += `   </select>
            </div>`
    return html
}
import { Author } from "./Sender.js"
import { Letters } from "./Letter.js"
import { Message } from "./Message.js"
import { Recipient } from "./Recipient.js"
import { sendBtn } from "./SendBtn.js"
import { Topics } from "./Topics.js"

export const PenPal = () => {
    return `
    <h1>Pen Pal Society</h1>
    <section class="letterForm">
        ${Author()}
        ${Message()}
        ${Topics()}
        ${Recipient()}
        ${sendBtn()}
    </section>

    <section class="letters">
        <h2 class="letter-header">Letters</h2>
        ${Letters()}
    </section>
    `
}

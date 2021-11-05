import { Senders } from "./Sender.js"
import { Letters } from "./Letters.js"
import { Message } from "./Message.js"
import { Recipients } from "./Recipient.js"
import { sendBtn } from "./SendBtn.js"
import { Topics } from "./Topics.js"

export const PenPal = () => {
    return `
    <h1>Pen Pal Society</h1>
    <section class="letterForm">
        ${Senders()}
        ${Message()}
        ${Topics()}
        ${Recipients()}
        ${sendBtn()}
    </section>

    <section class="letters">
        <h2 class="letter-header">Letters</h2>
        ${Letters()}
    </section>
    `
}

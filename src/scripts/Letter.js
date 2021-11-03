import { getLetters, getPenPals, getTopics } from "./dataAccess.js";

const buildLetter = (letter) => {
    const recipients = getPenPals()
    const senders = getPenPals()
    const topics = getTopics()

    const foundRecipient = recipients.find(recipient => {
        return recipient.id === letter.recipientId
    })
    const foundSender = senders.find(sender => {
        return sender.id === letter.senderId
    })
    const foundTopics = topics.filter(topic => {
        return letter.topicId.includes(topic.id)
    })
    const generateTopics = () => {
        let topics = []
        for (const topicObj of foundTopics) {
            topics.push(topicObj.topic)
        }
        return topics
    }
    const topicList = generateTopics()

    return `<div class="letter">
                <div class="letter__header">
                    Dear ${foundRecipient.firstName} ${foundRecipient.lastName} (${foundRecipient.email}),
                </div>
                <br>
                <div class="letter__body">
                    ${letter.message}
                </div>
                <br>
                <div class="letter__close">
                    Cheers! 
                    <br>
                    ${foundSender.firstName} ${foundSender.lastName} (${foundSender.email})
                </div>
                <br>
                <div class="letter__date">
                Sent on: ${letter.date}
                </div>
                <br>
                <div class="letter__topic">
                    ${topicList.join(" // ")}
                </div>
            </div>
    `
}



export const Letters = () => {
    const letters = getLetters()
    let html = `<div class="letter-container">`
    const letterItems = letters.map(buildLetter)
    html += letterItems.join("")
    html += `</div>`
    return html
}
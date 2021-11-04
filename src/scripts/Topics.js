import { getLetterBuilder, getTopics, setTopic } from "./dataAccess.js";

document.addEventListener("change",
    (event) => {
        const topics = getTopics()
        if (event.target.name === "topic") {
            for (const topic of topics) {
                const topicId = parseInt(event.target.value)
                if (topicId === topic.id)
                    setTopic(topicId)
            }
        }
    })

const buildCheckBoxes = (topic) => {
    const letterBuilder = getLetterBuilder()
    if (letterBuilder.topicId.includes(topic.id)) {
        return `<input type="checkbox" name="topic" value="${topic.id}" checked /> ${topic.topic}`
    }
    else {
        return `<input type="checkbox" name="topic" value="${topic.id}"  /> ${topic.topic}`
    }
}

export const Topics = () => {
    const topics = getTopics()
    let html = `<label class="label topic" for="topics">Topics <em style="font-size:12px;">(Requires at least one)</em></label>`
    const checkBoxes = topics.map(buildCheckBoxes)
    html += checkBoxes.join("")
    return html
}
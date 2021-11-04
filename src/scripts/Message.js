export const Message = () => {
    let html = `
        <div class="field">
            <label class="label" for="message">Message: <em style="font-size:12px;">(Required)</em></label>
            <textarea id="messageBox" name="message" ></textarea>
        </div>
    `
    return html
}
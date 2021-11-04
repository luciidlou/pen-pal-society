import { fetchData } from "./dataAccess.js"
import { PenPal } from "./PenPal.js"

const mainContainer = document.querySelector("#container")


const render = () => {
    fetchData().then(
        () => {
            mainContainer.innerHTML = PenPal()
        }
    )
}

render()

document.addEventListener("letterSent",
    (event) => {
        console.log(`Your letter has been sent 📤 Regenerating HTML...`)
        render()
    })
    
document.addEventListener("letterDeleted",
    (event) => {
        console.log(`Your letter has been deleted ❌ Regenerating HTML...`)
        render()
    })


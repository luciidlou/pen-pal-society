// We need a place to store our data from the .json file, so we create a new object with the same key names of they keys we want to capture from the .json file
const applicationState = {
    penPals: [],
    topics: [],
    letters: [],
    letterBuilder: {
        topicIds: []
    }
}

const API = "http://localhost:8088"

// This function is responsible for FETCHING all of the data from our API one array of objects at a time (i.e. one fetch call for API/penPals and then a seperate one for API/topics etc.)
export const fetchData = () => {
    fetch(`${API}/penPals`)
        .then(response => response.json())
        .then(
            (penPals) => {
                applicationState.penPals = penPals
            })
    fetch(`${API}/topics`)
        .then(response => response.json())
        .then(
            (topics) => {
                applicationState.topics = topics
            })
    return fetch(`${API}/letters`)
        .then(response => response.json())
        .then(
            (letters) => {
                applicationState.letters = letters
            })
}

// GET FUNCTIONS
export const getPenPals = () => {
    return applicationState.penPals.map(f => ({ ...f }))
}
export const getTopics = () => {
    return applicationState.topics.map(f => ({ ...f }))
}
export const getLetters = () => {
    return applicationState.letters.map(f => ({ ...f }))
}
export const getLetterBuilder = () => {
    const letterBuilder = Object.assign({}, applicationState.letterBuilder)
    return letterBuilder
}

// SET FUNCTIONS
export const setTopic = (id) => {
    applicationState.letterBuilder.topicIds.push(id)
}
export const setSender = (id) => {
    applicationState.letterBuilder.senderId = id
}
export const setRecipient = (id) => {
    applicationState.letterBuilder.recipientId = id
}

// // Can I declare a removeTopic function and use .splice on the topicIds array to remove the correct topicId?? 
// export const removeTopic = (i, id) => {
//     applicationState.letterBuilder.topicIds.splice(i, id)
// }


// This function performs the POST method in order to send the letter object to the API (the letter object we want to POST is passed in as an argument to the function)
const postLetter = (letter) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(letter)
    }
    // We then return a fetch call on the array from the API that we want the user input data to. Pass in our newly decared fetchOptions object as the second argument in the fetch call
    return fetch(`${API}/letters`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("letterSent"))
        })
}
// This function is called when the user clicks the send letter button
export const sendLetter = () => {
    // get a copy of the letterBuilder object (transient state)
    const newLetter = { ...applicationState.letterBuilder }
    // query the DOM for the value of the textarea element (what the user typed into the message textbox)
    const message = document.querySelector("textarea[id='messageBox']").value
    // declare a variable that will store the date that the letter was sent
    const date = new Date()
    // add a new key to the newLetter object, called message, that's value will be the value of our message variable we declared a few lines up
    newLetter.message = message
    // add a new key to the newLetter object, called date, that's value will be the value of our date variable of declard a few lines up
    newLetter.date = date.toLocaleDateString("en-US")
    // IF the user has not filled out all the required fields, run a window alert to notify them
    if (!newLetter.senderId || !newLetter.recipientId || newLetter.topicIds === [] || !newLetter.message) {
        window.alert("You have not entered all the required input")
    }
    // ELSE (meaning we have all of the necessary user input) call the postLetter function and pass in our newly built newLetter object as the argument
    else {
        postLetter(newLetter)
    }
    // reset the transient state (letterBuilder)
    applicationState.letterBuilder = { topicIds: [] }
}

// this function is called when the user clicks a delete button on a letter card
export const deleteLetter = (id) => {
    return fetch(`${API}/letters/${id}`, { method: "DELETE" })
        .then(
            () => {
                document.dispatchEvent(new CustomEvent("letterDeleted"))
            }
        )
}
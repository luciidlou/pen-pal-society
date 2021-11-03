const mainContainer = document.querySelector("#container")

// We need a place to store our data from the .json file, so we create a new object with the same key names of they keys we want to capture from the .json file
const applicationState = {
    penPals: [],
    topics: [],
    letters: [],
    letterBuilder: {
        topicId: []
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
    applicationState.letterBuilder.topicId.push(id)
}
export const setSender = (id) => {
    applicationState.letterBuilder.senderId = id
}
export const setRecipient = (id) => {
    applicationState.letterBuilder.recipientId = id
}


// This function performs the POST request in order to save the request object to the API (the request object we want to POST is passed in as an argument to the function)
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

export const sendLetter = () => {
    const newLetter = { ...applicationState.letterBuilder }
    const message = document.querySelector("textarea[id='messageBox']").value
    const date = new Date()
    newLetter.message = message
    newLetter.date = date.toLocaleDateString("en-US")
    if (!newLetter.senderId || !newLetter.recipientId || newLetter.topicId === [] || !newLetter.message) {
        window.alert("You have not entered all the required input")
    }
    else {
        postLetter(newLetter)
    }
    applicationState.letterBuilder = { topicId: [] }
}
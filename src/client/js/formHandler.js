export function handleSubmit(event) {
    event.preventDefault()

    document.getElementById('results').innerHTML = ""
    document.getElementById('subjectivity').innerHTML = ""
    document.getElementById('score').innerHTML = ""

    // check what text was put into the form field
    let userInput = document.getElementById('inputURL').value
    const errorElement = document.getElementById('errorMessage')
    if (!Client.checkURL(userInput)) {
        console.log('Bad input')
        errorElement.innerHTML = 'Input is not a valid URL. It should start with http:// or https:// and contain no spaces.'
        return
    } else {
        errorElement.innerHTML = ""
    }

    console.log("::: Form Submitted :::")

    getAnalysis('http://localhost:8081/call', userInput)
}

async function getAnalysis(url, userInput) {

    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'text/plain',
        },
        // Body data type must match "Content-Type" header        
        body: userInput,
    })
        .then(res => res.json())
        .then(function (res) {
            updateUI(res)
        })
}

function updateUI(res) {

    const resultsElement = document.getElementById('results')
    const subjectivityElement = document.getElementById('subjectivity')
    const scoreElement = document.getElementById('score')

    resultsElement.innerHTML = `Status - ${res.message}`
    if ("status" in res) {
        console.log('good data, should update')
        let subjectivity = res.subjectivity
        subjectivity = subjectivity.toLowerCase()
        subjectivity = subjectivity[0].toUpperCase() + subjectivity.substring(1);
        subjectivityElement.innerHTML = `Subjectivity - ${subjectivity}`
        scoreElement.innerHTML = `Positivity - ${scoreDescription(res.score_tag)}`
    }
}

export function scoreDescription(score) {
    switch (score) {
        case "P+":
            return "Strongly Positive"
        case "P":
            return "Positive"
        case "NEU":
            return "Neutral"
        case "N":
            return "Negative"
        case "N+":
            return "Strongly Negative"
        case "NONE":
            return "No sentiment"
        default:
            return "Invalid data"
    }
}
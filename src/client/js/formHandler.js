export function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let userInput = document.getElementById('inputURL').value

    console.log("::: Form Submitted :::")

    getAnalysis('http://localhost:8081/call', userInput)
}

export async function getAnalysis(url, userInput) {

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
            const resultsElement = document.getElementById('results')
            const subjectivityElement = document.getElementById('subjectivity')
            const scoreElement = document.getElementById('score')
            resultsElement.innerHTML = res.message
            if ("status" in res) {
                console.log('good data, should update')
                let subjectivity = res.subjectivity
                subjectivity = subjectivity.toLowerCase()
                subjectivity = subjectivity[0].toUpperCase() + subjectivity.substring(1);
                subjectivityElement.innerHTML = subjectivity
                switch (res.score_tag) {
                    case "P+":
                        scoreElement.innerHTML = "Strongly Positive"
                        break
                    case "P":
                        scoreElement.innerHTML = "Positive"
                        break
                    case "NEU":
                        scoreElement.innerHTML = "Neutral"
                        break
                    case "N":
                        scoreElement.innerHTML = "Negative"
                        break
                    case "N+":
                        scoreElement.innerHTML = "Strongly Negative"
                        break
                    default:
                        scoreElement.innerHTML = "No Sentiment"
                }
            } else {
                subjectivityElement.innerHTML = ""
                scoreElement.innerHTML = ""
            }
        })
}


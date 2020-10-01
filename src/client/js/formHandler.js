export function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let userInput = document.getElementById('name').value

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
            document.getElementById('results').innerHTML = res.message
        })
}


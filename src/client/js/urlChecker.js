export function checkURL(userInput) {
    console.log("::: Running checkURL :::", userInput)
    const httpCheck = /^http:\/\/|^https:\/\//i
    const spaceCheck = /\s/
    return (httpCheck.test(userInput) && !spaceCheck.test(userInput))
}

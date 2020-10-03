import { getAnalysis } from '../src/client/js/formHandler'

describe("Check the connection to server and API return", () => {
    test("Should return the mock API from the server file", async () => {
        const data = await getAnalysis('http://localhost:8081/test', "https://www.udacity.com")
        expect(data).toEqual(
            {
                'title': 'test json response',
                'message': 'this is a message',
                'time': 'now'
            }
        )
    })
    test("Should return status code '0' from API", async () => {
        const data = await getAnalysis('http://localhost:8081/call', "https://www.udacity.com")
        expect(data.status.code).toEqual("0")
    })
})
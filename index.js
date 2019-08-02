const searchUrl = 'https://developer.nps.gov/api/v1/places?'
const apiKey = 'api_key=z2hPxOk745e1ir6aS8UO3ro3YncW3fVWbsfSUOzv'

// EXAMPLE ----- https://developer.nps.gov/api/v1/places?stateCode=CA&stateCode=TX&api_key=z2hPxOk745e1ir6aS8UO3ro3YncW3fVWbsfSUOzv

function apiRequest(userInput) {
    const urlString = createApiString(userInput)
    const jsonResult = makeFetchRequest(urlString)
}

function createApiString(userInput) {
    // search ?places=statecode
    console.log(`working with ${userInput}`)
    const stateArray = userInput.split(',')
    const stateSnippet = []
    for (let i=0;i<stateArray.length;i++) {
        stateSnippet.push(`stateCode=${stateArray[i]}&`)
    }
    const joinedState = stateSnippet.join('')
    const urlString = `${searchUrl}${joinedState}${apiKey}`
    console.log(`making URL  ${urlString}`)
    return urlString
}

function makeFetchRequest(urlString) {
    // fetch thing
    // 1st .then() check ok
    // convert response to JSON
    // 2nd .then() pass

    fetch(urlString) //
        .then(function (response) {
            if (response.ok === true) {
                return response.json()
            }
            throw new Error(response.statusText)
        })
        .then(function (jsonResult) {
            renderHTML(jsonResult) //
        })
        .catch(function (error) {
            console.log("hey something broke", error)
        })
}

function renderHTML(jsonResult) {
    console.log(jsonResult)
    $('.results').empty()
    for (let i = 0; i < jsonResult.length; i++) {
        const repoName = jsonResult[i].name
        const repoUrl = jsonResult[i].url

        $('.results').append(`
        <div class='repo-name'>${repoName}</div>
        <div class="repo-url">${repoUrl}</div>
    `)
    }
    // traverse items, get stuff
    //display repo name
    //display repo URL
}

function listenSubmit() {
    $('form').submit(function (e) {
        e.preventDefault();
        const userInput = $('.input-field').val()
        console.log(userInput)
        apiRequest(userInput)
    });
}
console.log('test')

function main() {
    listenSubmit()
}

$(main)
const searchUrl = 'https://developer.nps.gov/api/v1/places?limit=10&stateCode='
const apiKey = 'api_key=z2hPxOk745e1ir6aS8UO3ro3YncW3fVWbsfSUOzv'

https://developer.nps.gov/api/v1/places?stateCode=ca%2Cny%2Ctx%2Cut%2Caz&api_key=z2hPxOk745e1ir6aS8UO3ro3YncW3fVWbsfSUOzv

// EXAMPLE ----- https://developer.nps.gov/api/v1/places?stateCode=CA&stateCode=TX&api_key=z2hPxOk745e1ir6aS8UO3ro3YncW3fVWbsfSUOzv

function apiRequest(userInput) {
    const urlString = createApiString(userInput)
    makeFetchRequest(urlString)
}

function createApiString(userInput) {
    console.log(`working with ${userInput}`)

    const urlString = `${searchUrl}${userInput.trim()}&${apiKey}`
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
    for (let i = 0; i < jsonResult.data.length; i++) {
        const parkName = jsonResult.data[i].title
        const description = jsonResult.data[i].url
        const parkUrl = jsonResult.data[i].listingdescription
        console.log(parkName,parkUrl,description)

        $('.results').append(`
        <div class='park-name'>${parkName}</div>
        <div class="park-description">${description}</div>
        <div class="park-url">${parkUrl}</div>
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
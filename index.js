const searchUrl = 'https://api.github.com/users/'

//https://api.github.com/users/clipqq/repos

function apiRequest(userInput) {
    const urlString = createApiString(userInput)
    const jsonResult = makeFetchRequest(urlString)
}

function createApiString(userInput) {

    const urlString = `${searchUrl}${userInput}/repos`
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
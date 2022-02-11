export const GET_FETCH = {
    method: "GET"
}

export const POST_FETCH = {
    method: "POST",
    headers: {"Content-Type": "application/json"}
}

function endpoint(details) {
    return 'http://localhost:5000/' + details;
}

async function otherFunction() {
    fetch("http://localhost:5000/list_fruit")
    fetch(endpoint('list_fruit'), GET_FETCH).then(resp => resp.json())
                                            .then(json => console.table(json));
}

export {endpoint};
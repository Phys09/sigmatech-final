const GET_FETCH = {
    method: "GET"
}

const POST_FETCH = {
    method: "POST",
    headers: {"Content-Type": "application/json"}
}

function endpoint(details) {
    return 'http://localhost:5000/' + details;
}

async function someFunction() {
    var name = document.getElementById("fruit-name").value;
    fetch(endpoint(`create_fruit/${name}`), POST_FETCH).then(resp => console.log(resp));
}

async function otherFunction() {
    fetch("http://localhost:5000/list_fruit")
    fetch(endpoint('list_fruit'), GET_FETCH).then(resp => resp.json())
                                            .then(json => console.table(json));
}

export default {someFunction, otherFunction};
async function someFunction() {
    var resp = await fetch("http://localhost:5000/createFruit");
    console.log(await resp.json());
}

function otherFunction() {
    console.log("test");
}

export default {someFunction, otherFunction};
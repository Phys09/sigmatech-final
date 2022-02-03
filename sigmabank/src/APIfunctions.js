async function someFunction() {
    var resp = await fetch("http://localhost:5000/createFruit");
    console.log(await resp.json());
}

async function otherFunction() {
    var resp = await fetch("http://localhost:5000/express_backend");
    console.log(await resp.json());
}

export default {someFunction, otherFunction};
const ApiKey = "https://api.github.com/users/"

 async function getProfile(username){
    const response = await fetch(ApiKey+username);
    const data = await response.json()
    console.log(data);
}

getProfile("taylorotwell")
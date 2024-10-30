const ApiKey = "https://api.github.com/users/"
const main = document.getElementById('main')


const btn = document.getElementById('btn');



btn.addEventListener('click', getProfile);

const input = document.querySelector('input');
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault;
        getProfile();
    }
})


async function getProfile() {
    const name = document.getElementById('Search').value;

    const response = await fetch(ApiKey + name);
    const data = await response.json()
    console.log(data);

    const card = `
    <div class="card">
        
            
            <div class="content">
                <div class="avatar">
                    <img id="img" src="${data.avatar_url}" alt="avatar">
                </div>

                <div class="oc">
                    <h2>${data.name}</h2>
                    <h4>${data.bio}</h4>
                    <ul>
                        <li>Followers : ${data.followers} <li>
                        <li>Following : ${data.following}</li>
                        <li>Repos : ${data.public_repos}</li>
                    </ul>
                </div>

            </div>

        </div>
`


    main.innerHTML = card;




}





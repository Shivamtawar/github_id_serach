const ApiKey = "https://api.github.com/users/";
const main = document.getElementById('main');
const btn = document.getElementById('btn');
const input = document.querySelector('input');

btn.addEventListener('click', getProfile);
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        getProfile();
    }
});

async function getProfile() {
    const username = document.getElementById('Search').value;

    try {
        const userResponse = await fetch(ApiKey + username);
        const userData = await userResponse.json();

        // Handle user not found
        if (userData.message === "Not Found") {
            main.innerHTML = `<p>User not found. Please try another username.</p>`;
            return;
        }

        // Fetch starred repos count separately
        const starredResponse = await fetch(`${ApiKey + username}/starred`);
        const starredData = await starredResponse.json();
        const starredCount = starredData.length;

        // Fetch user repositories for additional details
        const reposResponse = await fetch(userData.repos_url);
        const reposData = await reposResponse.json();

        // Extract repo details: total stars and languages
        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const languagesUsed = Array.from(new Set(reposData.map(repo => repo.language).filter(Boolean))).join(', ');

        const card = `
        <div class="card">
            <div class="avatar">
                <img src="${userData.avatar_url}" alt="User Avatar">
            </div>
            <div class="content">
                <h2>${userData.name || "No name provided"}</h2>
                <h4>${userData.bio || "No bio available"}</h4>
                <p><strong>Location:</strong> ${userData.location || "Not specified"}</p>
                <p><strong>Company:</strong> ${userData.company || "Not specified"}</p>
                <p><strong>Website:</strong> ${userData.blog ? `<a href="${userData.blog}" target="_blank">${userData.blog}</a>` : "Not specified"}</p>
                <p><strong>GitHub Profile:</strong> <a href="${userData.html_url}" target="_blank">${userData.html_url}</a></p>
                <ul>
                    <li><strong>Followers:</strong> ${userData.followers}</li>
                    <li><strong>Following:</strong> ${userData.following}</li>
                    <li><strong>Public Repos:</strong> ${userData.public_repos}</li>
                    <li><strong>Public Gists:</strong> ${userData.public_gists}</li>
                    <li><strong>Starred Repositories:</strong> ${starredCount}</li>
                    <li><strong>Total Stars on Repos:</strong> ${totalStars}</li>
                    <li><strong>Languages Used:</strong> ${languagesUsed || "Not specified"}</li>
                    <li><strong>Account Created:</strong> ${new Date(userData.created_at).toLocaleDateString()}</li>
                    <li><strong>Last Updated:</strong> ${new Date(userData.updated_at).toLocaleDateString()}</li>
                </ul>
            </div>
        </div>`;

        main.innerHTML = card;

    } catch (error) {
        main.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
        console.error(error);
    }
}

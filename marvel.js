// Configuration
const publicKey = '8b65ce5539a1684a03b6f168d65f7198';
const privateKey = '419fccbf666d3e1cf80d859f26e57f24fa6ec359';
const baseUrl = 'https://gateway.marvel.com/v1/public';
const generatedHash = '950460707704a8ceb0ba1fb9ddb22934'; 
function generateAuthParams() {
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);
    return { ts, hash, apikey: publicKey };
}

async function fetchMarvelCharacters(offset = 0, limit = 20) {
    try {
        const auth = generateAuthParams();
        const url = `${baseUrl}/characters?ts=${auth.ts}&apikey=${auth.apikey}&hash=${auth.hash}&limit=${limit}&offset=${offset}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.code !== 200) {
            throw new Error(`Marvel API error: ${data.status}`);
        }

        return {
            characters: data.data.results,
            total: data.data.total,
            offset: data.data.offset,
            count: data.data.count
        };
    } catch (error) {
        console.error('Error fetching Marvel characters:', error);
        throw error;
    }
}


function updateUI(characters) {
    const container = document.getElementById('characters-container');
    if (!container) return;

    container.innerHTML = '';

    characters.forEach(character => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';
        
        // Safely construct image URL
        const imgPath = character.thumbnail ? 
            `${character.thumbnail.path}/standard_large.${character.thumbnail.extension}` :
            'placeholder-image.jpg';
        
        characterCard.innerHTML = `
            <div class="character-image">
                <img src="${imgPath}" 
                     alt="${character.name}"
                     onerror="this.src='placeholder-image.jpg'">
            </div>
            <div class="character-info">
                <h3>${character.name}</h3>
                <p>${character.description || 'No description available'}</p>
                <div class="character-comics">
                    Comics: ${character.comics?.available || 0}
                </div>
            </div>
        `;
        
        container.appendChild(characterCard);
    });
}

// Main execution with loading state and error handling
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('characters-container');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Loading characters...';

    try {
        container.appendChild(loadingDiv);
        
        const { characters } = await fetchMarvelCharacters();
        
        if (!characters || characters.length === 0) {
            throw new Error('No characters found');
        }

        updateUI(characters);
    } catch (error) {
        container.innerHTML = `
            <div class="error">
                <p>Error loading characters: ${error.message}</p>
                <button onclick="location.reload()">Try Again</button>
            </div>`;
    } finally {
        loadingDiv.remove();
    }
});
// Main execution
document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('characters-container');
    try {
        // Display loading message
        container.innerHTML = '<div class="loading">Loading characters...</div>';
        
        const characters = await fetchMarvelCharacters();
        updateUI(characters);
    } catch (error) {
        // Display error message in the container
        container.innerHTML = `<div class="error">Error loading characters: ${error.message}</div>`;
    }
});
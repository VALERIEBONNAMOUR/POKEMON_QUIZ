const submitButton = document.getElementById('submit-button');
const pokemonInput = document.getElementById('pokemon-input');
const pokeGallery = document.getElementById('pokeapi-gallery');

// Fonction pour appeler l'API Pokémon
function fetchPokemonData(pokemonName) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`; // Construire l'URL de l'API

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon non trouvé');
            }
            return response.json();
        })
        .then(data => {
            // Affichage des données du Pokémon
            const pokemonElement = document.createElement('div');
            pokemonElement.classList.add('pokemon');

            const pokemonImage = document.createElement('img');
            pokemonImage.src = data.sprites.front_default;
            pokemonElement.appendChild(pokemonImage);

            const pokemonName = document.createElement('h3');
            pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1); // Capitaliser le nom
            pokemonElement.appendChild(pokemonName);

            const pokemonTypes = document.createElement('p');
            pokemonTypes.textContent = `Types: ${data.types.map(type => type.type.name).join(', ')}`;
            pokemonElement.appendChild(pokemonTypes);

            // Ajouter le Pokémon à la galerie
            pokeGallery.innerHTML = ''; // Réinitialiser la galerie
            pokeGallery.appendChild(pokemonElement);
        })
        .catch(error => {
            // En cas d'erreur (si le Pokémon n'est pas trouvé)
            pokeGallery.innerHTML = `<p>${error.message}</p>`;
        });
}

// Ajouter un événement au bouton pour appeler la fonction lors du clic
submitButton.addEventListener('click', function() {
    const pokemonName = pokemonInput.value.trim(); // Récupérer le nom du Pokémon
    if (pokemonName) {
        fetchPokemonData(pokemonName); // Appeler la fonction pour récupérer les données
    } else {
        pokeGallery.innerHTML = '<p>Veuillez entrer un nom de Pokémon.</p>';
    }
});
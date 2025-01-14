const pokemonInput = document.getElementById('pokemon-input');
const pokemonUrl = 'https://pokeapi.co/api/v2/version/{id or name}/';

pokemonInput.addEventListener('change', async (event) => {
    event.preventDefault(); 

    const submitButton = document.getElementById('submit-button');
    const pokeGallery = document.getElementById('pokeapi-gallery');
    const errorElement = document.querySelector('#error');
    errorElement.textContent ='';
    pokeGallery.innerHTML ='';

    if (!pokemonInput){
        errorElement.textContent ='Entrez le nom de Pokémon';
        text.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`${pokemonUrl}${pokemonInput.toLowerCase()}/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const data = await response.json(); 
            const pokemonElement = document.createElement('div');
            pokemonElement.classList.add('pokemon');
           
            pokeGallery.appendChild(pokemonElement);
            
        }else{
            throw new Error("Pokémon non trouvé");

        }

    } catch (error) {
        console.error("Erreur lors de l'appel à l'API:", error);
        errorElement.textContent = error.message;
    }
});


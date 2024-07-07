// Add Recipe
document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var recipeName = document.getElementById('recipe-name').value;
    var ingredients = document.getElementById('ingredients').value;
    var steps = document.getElementById('preparation-steps').value;

    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.push({ name: recipeName, ingredients: ingredients, steps: steps });
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Clear form fields
    document.getElementById('recipe-name').value = '';
    document.getElementById('ingredients').value = '';
    document.getElementById('preparation-steps').value = '';

    alert('Recipe added successfully!');
});

// Function to display recipes
function displayRecipes() {
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    var recipesList = document.getElementById('recipes-list');
    recipesList.innerHTML = '';

    recipes.forEach(function(recipe, index) {
        var recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <h2>${recipe.name}</h2>
            <p>Ingredients: ${recipe.ingredients}</p>
            <p>Preparation Steps: ${recipe.steps}</p>
            <div class="recipe-actions">
                <button onclick="deleteRecipe(${index})">Delete</button>
            </div>
        `;
        recipeCard.onclick = function() {
            showModal(recipe);
        };
        recipesList.appendChild(recipeCard);
    });
}

// Function to delete a recipe
function deleteRecipe(index) {
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes(); // Refresh the displayed recipes after deletion
}

// Function to show recipe details in a modal
function showModal(recipe) {
    var modal = document.getElementById('recipeModal');
    var modalRecipeName = document.getElementById('modal-recipe-name');
    var modalIngredients = document.getElementById('modal-ingredients');
    var modalSteps = document.getElementById('modal-steps');

    modalRecipeName.textContent = recipe.name;
    modalIngredients.textContent = 'Ingredients: ' + recipe.ingredients;
    modalSteps.textContent = 'Preparation Steps: ' + recipe.steps;

    modal.style.display = 'block';
}

// Get the modal
var modal = document.getElementById('recipeModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Initial call to display recipes when the page loads
displayRecipes();

// Search Recipes
function searchRecipes(event) {
    event.preventDefault();

    var query = document.getElementById('search-query').value.toLowerCase();
    var recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    var searchResults = recipes.filter(function(recipe) {
        return recipe.name.toLowerCase().includes(query) || 
               recipe.ingredients.toLowerCase().includes(query) ||
               recipe.steps.toLowerCase().includes(query);
    });

    var resultsList = document.getElementById('search-results');
    resultsList.innerHTML = '';

    if (searchResults.length === 0) {
        resultsList.innerHTML = '<p>No recipes found.</p>';
    } else {
        searchResults.forEach(function(recipe) {
            var recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <h2>${recipe.name}</h2>
                <p>Ingredients: ${recipe.ingredients}</p>
                <p>Preparation Steps: ${recipe.steps}</p>
            `;
            resultsList.appendChild(recipeCard);
        });
    }
}

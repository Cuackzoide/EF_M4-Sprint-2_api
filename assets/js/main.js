function removeAccents(str) {
  const accents = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
    ñ: "n",
    Ñ: "N",
    ö: "o",
    Ö: "Ö",
    ü: "u",
    Ü: "U",
  };
  return str
    .split("")
    .map((char) => accents[char] || char)
    .join("");
}

function formatter(string) {
  const strValue = string.toLowerCase().trim();
  return removeAccents(strValue);
}

let searchHistory = [
  "onion",
  "chicken",
  "garlic",
  "beef",
  "tomato",
  "potatoes",
];

function updateHistory(string) {
  if (searchHistory.includes(string)) {
    let position = searchHistory.indexOf(string);
    searchHistory.splice(position, 1);
  }
  searchHistory.unshift(string);
  if (searchHistory.length > 6) {
    searchHistory.pop();
  }
}

function showRecipes(recipesArray, elementHTML) {
  elementHTML.innerHTML = "";
  if (!recipesArray || recipesArray.length === 0) {
    elementHTML.innerHTML = `<p class="text-center w-100 lead">No recipes found.</p>`;
    return;
  }
  recipesArray.forEach((product) => {
    elementHTML.innerHTML += `<article class="col">
        <div class="card h-100">
        <img
    src="${product.strMealThumb}"
    class="card-img-top img-fit"
          alt="${product.strMeal}"
          loading="lazy"
          />
          <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.strMeal}</h5>
          <p class="card-text">${product.idMeal}</p>
          <button class="btn btn-primary mt-auto">
          GO to Recipe
          </button>
          </div>
          </div>
          </article>`;
  });
}

function showTabs(categoriesArray, TabsBar) {
  TabsBar.innerHTML = "";
  categoriesArray.forEach((category) => {
    TabsBar.innerHTML += `
    <li class="nav-item"
    role="presentation">
    <a class="nav-link" 
    href="#" 
    data-target="${category}">
    ${category}</a>
    </li>`;
  });
}

async function searchIngredient() {
  const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  try {
    const response = await fetch(url);
    const { meals } = await response.json();
    return meals.map((ingredient) => ingredient.strIngredient);
  } catch (error) {
    console.error("Error retrieving ingredients:", error);
    return [];
  }
}

async function searchMeals(ingredient) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  try {
    const response = await fetch(url);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const searchForm = document.querySelector('form[role="search"]');
const searchInput = document.getElementById("searchInput");
const recipeContainer = document.querySelector("#recipe-container");
const navTabs = document.querySelector(".nav-tabs");
const navBrand = document.querySelector(".navbar-brand");

document.addEventListener("DOMContentLoaded", async (e) => {
  showTabs(searchHistory, navTabs);
  showRecipes(await searchMeals(searchHistory[0]), recipeContainer);
  const links = document.querySelectorAll(".nav-link");
  links.forEach((el) => el.classList.remove("active"));
  if (links[0]) links[0].classList.add("active");
});

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchTerm = formatter(searchInput.value);
  const ingredientList = await searchIngredient();
  const match = ingredientList.some(
    (ingredient) => ingredient.toLowerCase() === searchTerm
  );
  if (match) {
    const recipes = await searchMeals(searchTerm);
    showRecipes(recipes, recipeContainer);
    updateHistory(searchTerm);
    showTabs(searchHistory, navTabs);
    const links = document.querySelectorAll(".nav-link");
    links.forEach((el) => el.classList.remove("active"));
    if (links[0]) links[0].classList.add("active");
  } else {
    recipeContainer.innerHTML = `<p class="text-center w-100 lead">There are no recipes for "${searchTerm}" or It's not a valid search.</p>`;
    const links = document.querySelectorAll(".nav-link");
    links.forEach((el) => el.classList.remove("active"));
  }
  searchInput.value = "";
  searchInput.focus();
});

navTabs.addEventListener("click", async (e) => {
  e.preventDefault();
  const link = e.target.closest(".nav-link");
  if (!link) return;
  const links = document.querySelectorAll(".nav-link");
  links.forEach((el) => el.classList.remove("active"));
  link.classList.add("active");

  const ingredient = e.target.textContent.trim();
  const recipes = await searchMeals(ingredient);
  showRecipes(recipes, recipeContainer);
});

navBrand.addEventListener("click", async (e) => {
  e.preventDefault();
  showTabs(searchHistory, navTabs);
  showRecipes(await searchMeals(searchHistory[0]), recipeContainer);
  const links = document.querySelectorAll(".nav-link");
  links.forEach((el) => el.classList.remove("active"));
  if (links[0]) links[0].classList.add("active");
});

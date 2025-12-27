const recetas = [];

function showRecipes(productsArray, elementHTML) {
  elementHTML.innerHTML = "";
  productsArray.forEach((product) => {
    elementHTML.innerHTML += `<article class="col">
      <div class="card h-100">
        <img
          src="${product.imagen}"
          class="card-img-top img-fit"
          alt="${product.nombre}"
          loading="lazy"
        />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.nombre}</h5>
          <p class="card-text">${product.descripcion}</p>
          <button class="btn btn-primary mt-auto">
            Ver receta
          </button>
        </div>
      </div>
    </article>`;
  });
}

function showTabs(categoriesArray, navBar) {
  categoriesArray.forEach((category) => {
    navBar.innerHTML += `
    <li class="nav-item"
      role="presentation">
      <a class="nav-link" 
      href="#" 
      data-target="${category}">
      ${category} min.</a>
    </li>`;
  });
}

function timeCategorizer(productsArray) {
  const categorias = [];
  productsArray.forEach((product) => {
    if (!categorias.includes(product.tiempo)) {
      categorias.push(product.tiempo);
    }
  });
  return categorias.sort((a, b) => a - b);
}

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

const recipeContainer = document.querySelector("#recipe-container");
const navTabs = document.querySelector(".nav-tabs");
const allRecipes = document.querySelector("#allRecipes");
const categorias = timeCategorizer(recetas);

navTabs.addEventListener("click", (e) => {
  e.preventDefault();
  document
    .querySelectorAll(".nav-link")
    .forEach((link) => link.classList.remove("active"));
  e.target.classList.add("active");
  if (e.target.id === "allRecipes") {
    showRecipes(recetas, recipeContainer);
  } else {
    const timeTab = parseInt(e.target.dataset.target);
    const filtredRecipes = recetas.filter(
      (receta) => receta.tiempo === timeTab
    );
    showRecipes(filtredRecipes, recipeContainer);
  }
});

const searchForm = document.querySelector('form[role="search"]');
const searchInput = document.getElementById("searchInput");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = removeAccents(searchInput.value.trim()).toLowerCase();
  if (!searchTerm) {
    recipeContainer.innerHTML = "No hay resultados";
    return;
  }
  const filteredRecipes = recetas.filter((receta) => {
    const matchNombre = removeAccents(receta.nombre)
      .toLowerCase()
      .includes(searchTerm);
    const matchDescripcion = removeAccents(receta.descripcion)
      .toLowerCase()
      .includes(searchTerm);
    const matchIngredientes = receta.ingredientes.some((ingrediente) =>
      removeAccents(ingrediente).toLowerCase().includes(searchTerm)
    );
    const matchTiempo = receta.tiempo.toString().includes(searchTerm);
    return matchNombre || matchDescripcion || matchIngredientes || matchTiempo;
  });

  if (filteredRecipes.length > 0) {
    showRecipes(filteredRecipes, recipeContainer);
    document
      .querySelectorAll(".nav-link")
      .forEach((link) => link.classList.remove("active"));
  } else {
    recipeContainer.innerHTML = `<article class="col">
      <div class="card h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">No se encontraron recetas</h5>
          <p class="card-text">que coincidan con: <b>${searchTerm}</b></p>
          <button id="resetSearch" class="btn btn-primary mt-auto">
            Ver todas las recetas
          </button>
        </div>
      </div>
    </article>`;
  }
  document.querySelector("#resetSearch").addEventListener("click", () => {
    searchInput.value = "";
    showRecipes(recetas, recipeContainer);
    document.getElementById("allRecipes").classList.add("active");
  });
});

async function searchIngredient() {
  const url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  try {
    const response = await fetch(url);
    const { meals } = await response.json();
    let ingredientList = [];
    meals.forEach((ingredient) => {
      ingredientList.push(ingredient.strIngredient);
    });
    return ingredientList;
  } catch (error) {
    console.error("Error al obtener ingredientes:", error);
  }
}

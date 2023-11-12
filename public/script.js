const getRecipes = async() => {
    try {
        return (await fetch("api/recipes/")).json();
    } catch (error) {
        console.log(error);
    }
};

const showRecipes = async() => {
    let recipes = await getRecipes();
    let recipesDiv = document.getElementById("recipe-list");
    recipesDiv.innerHTML = "";
    recipes.forEach((recipe) => {
        const section = document.createElement("section");
        section.classList.add("recipe");
        recipesDiv.append(section);

        const h3 = document.createElement("h3");
        h3.innerHTML = recipe.name;
        section.append(h3);

        const p = document.createElement("p");
        section.append(p);
        p.innerHTML = recipe.description;

        const ul = document.createElement("ul");
        section.append(ul);
        console.log(recipe.ingredients);
        recipe.ingredients.forEach((ingredient) => {
            const li = document.createElement("li");
            ul.append(li);
            li.innerHTML = ingredient;
        });
    });
};

const addEditRecipe = async(e) => {
    e.preventDefault();
    const form = document.getElementById("add-edit-recipe-form");
    const formData = new FormData(form);
    let response;
    //trying to add a new recipe
    if (form._id.value == -1) {
        formData.delete("_id");
        formData.delete("img");
        formData.append("ingredients", getIngredients());

        console.log(...formData);

        response = await fetch("/api/recipes", {
            method: "POST",
            body: formData
        });
    }

    //successfully got data from server
    if (response.status != 200) {
        console.log("Error posting data");
    }

    response = await response.json();
    resetForm();
    document.querySelector(".dialog").classList.add("transparent");
    showRecipes();
};

const getIngredients = () => {
    const inputs = document.querySelectorAll("#ingredient-boxes input");
    let ingredients = [];

    inputs.forEach((input) => {
        ingredients.push(input.value);
    });

    return ingredients;
}

const resetForm = () => {
    const form = document.getElementById("add-edit-recipe-form");
    form.reset();
    form._id = "-1";
    document.getElementById("ingredient-boxes").innerHTML = "";
};

const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("add-edit-title").innerHTML = "Add Recipe";
    resetForm();
};

const addIngredient = (e) => {
    e.preventDefault();
    const section = document.getElementById("ingredient-boxes");
    const input = document.createElement("input");
    input.type = "text";
    section.append(input);
}

window.onload = () => {
    showRecipes();
    document.getElementById("add-edit-recipe-form").onsubmit = addEditRecipe;
    document.getElementById("add-link").onclick = showHideAdd;

    document.querySelector(".close").onclick = () => {
        document.querySelector(".dialog").classList.add("transparent");
    };

    document.getElementById("add-ingredient").onclick = addIngredient;
};
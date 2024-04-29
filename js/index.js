// ^ HTML VARIABLES
let searchInput = document.querySelector("#searchone");
let homeMeals = document.querySelector(".mainMealContainer"); //& CATCH THE CONTAINER THAT WILL HOLD ALL THE MEALS , etc...
async function getMainMeals() {
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=` //& THE WHOLE API LINK
  );
  var MainMealsData = await response.json();
  console.log(MainMealsData);
  displayMainMeals(MainMealsData.meals); //* CALL THE DISPLAY MAIN MEALS FUNCTIONS AS WE OPEN AND FIND THE MEALS
}
getMainMeals();

// ^ HIDE AND SHOW SIDE NAV
const sideNavWidth = $(".hidden-nav-side").outerWidth(); //! THE VARIABLLE THAT HOLDS THE WIDTH OF THE HIDDEN NAVBAR
$(".hidden-nav-side").css({ left: `-${sideNavWidth}px` }, 400);
let isShown = false;
$(".changeable-icon").on("click", function () {
  if (isShown == false) {
    //~ THIS MEANS THAT THE NAVBAR IS CLOSED and we open it
    console.log("show it");
    $(".hidden-nav-side").animate({ left: `0px` }, 400);
    $(".side-nav").animate({ left: `${sideNavWidth}` }, 400);
    $(".nav-item").addClass("topInWillOpen");
    listUp();
    displayClose();
    isShown = true;
  } else {
    //~ THIS MEANS IT IS ALREADY OPENED and we close it
    console.log("Hide It");
    $(".hidden-nav-side").animate({ left: `-${sideNavWidth}px` }, 400);
    $(".side-nav").animate({ left: `0px` }, 400);
    listDown();
    displayOpen();
    isShown = false;
  }
});
function displayClose() {
  //~ FUNCTION TO EXCHANGE THE ICON INTO THE CLOSE ICON WHEN NAV IS OPEN
  $(".changeable-icon").removeClass("fa-bars");
  $(".changeable-icon").addClass("fa-xmark");
}
function displayOpen() {
  //~ FUNCTION TO EXCHANGE THE ICON INTO THE OPEN ICON WHEN NAV IS CLOSED
  $(".changeable-icon").addClass("fa-bars");
  $(".changeable-icon").removeClass("fa-xmark");
}
function closeSideNavbar() {
  //~ FUNCTION TO CLOSE THE NAVBAR AGAIN WHEN WE OPEN ANY OTHER PAGE
  console.log("Hide It");
  $(".hidden-nav-side").animate({ left: `-${sideNavWidth}px` }, 400);
  $(".side-nav").animate({ left: `0px` }, 400);
  displayOpen();
  isShown = false;
}

// ! FUNCTIONS TO ANIMATE UL IN HIDDEN NAVBAR
function listDown() {
  // while closing
  $(".nav-item").animate({ top: `120px` }, 300);
} // while opening;
function listUp() {
  $(".nav-item").animate({ top: `0px` }, 400);
}

// ! LOADING FUNCTIONS TO MAKE LOADING PAGES FADE
function loadingfade() {
  $(".loading-screen").fadeOut(800);
}
function innerFade() {
  $(".inner-loading").fadeOut(800);
}
function loading() {
  homeMeals.innerHTML = ` <div
    class="inner-loading vh-100 w-100 position-fixed bg-black align-items-center justify-content-center"
  >
    <span class="loadertwo text-center"></span>
  </div>`;
  innerFade();
}
// ^ DISPLAY MEALS IN MAIN PAGE
function displayMainMeals(arr) {
  loadingfade();
  let mealsContainer = ""; //! THE VARIABLE THAT WILL CONTAIN THINGS THAT WILL BE PUT IN HTML THROUGH JS
  console.log();
  for (let i = 0; i < arr.length; i++) {
    mealsContainer += `
    <div class="col-md-3 overflow-hidden position-relative meal-div " onclick="getMealDetails(${arr[i].idMeal})">
     <img src="${arr[i].strMealThumb}" class="w-100 rounded-1">
     <div  class="overlay-photo position-absolute d-flex">
      <h3 class="my-auto ps-2">${arr[i].strMeal}</h3>
     </div>
    </div>
    `;
  }
  homeMeals.innerHTML = mealsContainer;
}
// ^GET EACH MEAL'S DETAILS
async function getMealDetails(mealID) {
  //~ GET EVERY MEAL'S DETAIL THROUGH THE ID THAT IS IN THE API
  console.log("YES YOU ARE GETTING THE DETAILS");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  ); //& API LINK THAT GETS THINGS FROM ID
  let data = await response.json();
  displayMealDetails(data.meals[0]); //* CALLED THE DISPLAY DETAILS FUNCTION TO ACCESS THINGS FROM THE API
  console.log(data.meals[0]);
}
// ^ DISPLAY MEAL DETAILS
async function displayMealDetails(mealName) {
  let searchInput = document.querySelector("#searchone");
  searchInput.innerHTML = "";
  //~ DISPLAYS THE MEAL DETAILS THAT WE GOT THROUGH AN ID FROM API ABOVE
  let ingredientsContainer = ``; //! THE VARIABLE THAT CONTAINS THE INGREDIENTS WE GET FROM API
  for (let i = 1; i <= 20; i++) {
    console.log("hi");
    if (mealName[`strIngredient${i}`]) {
      ingredientsContainer += `
         <li class="alert alert-info m-1 p-2">${mealName[`strMeasure${i}`]}
         ${mealName[`strIngredient${i}`]}
         </li>
         `;
    }
  }
  let tags = mealName.strTags;
  if (!tags) {
    tags = [];
  }
  let mealsContainer = "";
  mealsContainer = `
  <div
  class="inner-loading vh-100 w-100 position-fixed bg-black align-items-center justify-content-center"
>
  <span class="loadertwo text-center"></span>
</div>
    <div class="col-md-4 bg-black pt-4 vh-120">
     <img src="${mealName.strMealThumb}" class="w-100 rounded-2">
     <h3 class="text-white pt-2">${mealName.strMeal}</h3>
    </div>
    <div class="col-md-8 pt-3 bg-black vh-120">
    <h2 class="text-white">Insructions</h2>
    <p class="text-white">${mealName.strInstructions}</p>
       <h3 class="text-white">Area: ${mealName.strArea}</h3>
        <h3 class="text-white">Category: ${mealName.strCategory}</h3>
       <h3 class="text-white">Recipe:</h3>
        <ul class= " list-unstyled d-flex flex-wrap g-3 "> ${ingredientsContainer}</ul>
       <h3 class="text-white">Tags : ${tags}<h3>
       <div class="srcAndYTButtons">
       <button type="button" class="btn btn-success black">
       <a href="${mealName.strSource}">
          Source
       </a>
       </button>
       <button type="button" class="btn btn-danger">
       <a href="${mealName.strYoutube}">
       Youtube
       </a>
       </button>
       </div>
       </div>
    `;
  homeMeals.innerHTML = mealsContainer;
  innerFade();
}

// & SEARCH BY NAME
async function searchByName(name) {
  loading();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  ); //&API LINK THAT LETS US SEARCH THROUGH NAME
  let data = await response.json();
  if (data.meals) {
    displayMainMeals(data.meals);
  } else {
    displayMainMeals([]);
  }
}
// & SEARCH BY FIRST LETTER
async function searchByLetter(letter) {
  loading();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  ); //& API LINK THAT LETS US SEARCH THROUGH 1ST LETTER
  let data = await response.json();
  if (data.meals) {
    displayMainMeals(data.meals);
  } else {
    displayMainMeals([]);
  }
}

// & OPEN SEARCH PAGE
$("#search").on("click", function openSearch() {
  closeSideNavbar();
  console.log("make it work");
  $(".side-nav").addClass("addTop");
  $(".hidden-nav-side").addClass("addTop");
  homeMeals.innerHTML = "";
  searchInput.innerHTML = `
       <input type="text" placeholder="Search By Name" class=" form-control searchByName w-35  mt-2 rounded-2 p-1 border-white bg-black text-white" onkeyup="searchByName(this.value)" >
       <input type="text" placeholder="Search By Letter" class=" form-control searchByLetter w-35 mt-2 rounded-2 p-1 border-white bg-black text-white" onkeyup="searchByLetter(this.value)" maxlength="1" >
    
    <div
    class="inner-loading vh-100 w-100 position-fixed bg-black align-items-center justify-content-center"
  >
    <span class="loadertwo text-center"></span>
  </div>
    `;
  innerFade();
});

//! OPEN CATEGORIES PAGE & GET API OF CATEGORIES
$("#categories").on("click", async function openCategories() {
  closeSideNavbar();
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  ); //& THE API LINK WE GOT THE CATEGORIES FROM
  let categoriesdata = await response.json();
  console.log(categoriesdata);
  console.log("HELLO FROM CATEGORIES");
  displayCategories(categoriesdata.categories);
});
//! DISPLAY THE CATEGORIES
function displayCategories(catArr) {
  let categoriesContainer = ``;
  let searchInput = document.querySelector("#searchone");
  searchInput.innerHTML = "";
  for (let i = 0; i < catArr.length; i++) {
    categoriesContainer += `
    <div
    class="inner-loading vh-100 w-100 position-fixed bg-black align-items-center justify-content-center"
  >
    <span class="loadertwo text-center"></span>
  </div>
            <div class="col-md-3 overflow-hidden position-relative category-div" onclick="getCategoryMeals('${catArr[i].strCategory}')">
                <div class="category-content overflow-hidden">
                     <img src="${catArr[i].strCategoryThumb}" class="w-100 rounded-1">
                     <div class="category-overlay position-absolute d-flex rounded-1 flex-column text-center">
                       <h3 class="category-name">${catArr[i].strCategory}</h3>
                       <p class="category-p">${catArr[i].strCategoryDescription}</p>
                     </div>
                </div>
            </div>
        `;
  }
  homeMeals.innerHTML = categoriesContainer;
  innerFade();
}
//! GET MEALS OF EACH CATEGORY
async function getCategoryMeals(categoryName) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  let data = await response.json();
  console.log(data);
  displayCategoryMeals(data.meals);
}

//! DISPLAY MEALS OF EACH CATEGORY
function displayCategoryMeals(arr) {
  let searchInput = document.querySelector("#searchone");
  searchInput.innerHTML = "";
  let mealsContainer = ""; //! THE VARIABLE THAT WILL CONTAIN THINGS THAT WILL BE PUT IN HTML THROUGH JS
  console.log();
  for (let i = 0; i < arr.length; i++) {
    mealsContainer += `
    <div
    class="inner-loading vh-100 w-100 position-fixed bg-black align-items-center justify-content-center"
  >
    <span class="loadertwo text-center"></span>
  </div>
      <div class="col-md-3 overflow-hidden position-relative meal-div " onclick="getMealDetails(${arr[i].idMeal})">
       <img src="${arr[i].strMealThumb}" class="w-100 rounded-1">
       <div  class="overlay-photo position-absolute d-flex">
        <h3 class="my-auto ps-2">${arr[i].strMeal}</h3>
       </div>
      </div>
      `;
  }
  homeMeals.innerHTML = mealsContainer;
  innerFade();
}

//^ OPEN AREA AND GET AREA LIST API
$("#area").on("click", async function openArea() {
  closeSideNavbar();
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  ); //& THE API LINK WE GOT THE AREAS FROM
  let areaData = await response.json();
  console.log(areaData);
  console.log("HELLO FROM AREA");
  displayAreas(areaData.meals);
});
//^ DISPLAY THE AREAS
function displayAreas(Arr) {
  let areasContainer = ``;
  let searchInput = document.querySelector("#searchone");
  searchInput.innerHTML = "";
  for (let i = 0; i < Arr.length; i++) {
    areasContainer += `
    <div
    class="inner-loading vh-100 w-100 position-fixed bg-black align-items-center justify-content-center"
  >
    <span class="loadertwo text-center"></span>
  </div>
              <div class="col-md-3 d-flex flex-column justify-content-center align-items-center position-relative area-div p-5 text-white" onclick="getAreaMeals('${Arr[i].strArea}')">
                <i class="fa-solid fa-house fs-1"></i>
                <h2 class="area-name">${Arr[i].strArea}<h2>
              </div>
          `;
  }
  homeMeals.innerHTML = areasContainer;
  innerFade();
}
//^ GET MEALS OF EACH AREA
async function getAreaMeals(areaName) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  let data = await response.json();
  console.log(data);
  console.log("hello meals from area");
  displayAreaMeals(data.meals);
}
//^ DISPLAY ALL MEALS OF EACH AREA
function displayAreaMeals(arr) {
  let mealsContainer = ""; //! THE VARIABLE THAT WILL CONTAIN THINGS THAT WILL BE PUT IN HTML THROUGH JS
  let searchInput = document.querySelector("#searchone");
  searchInput = "";
  console.log("hello from display");
  for (let i = 0; i < arr.length; i++) {
    mealsContainer += `
    <div
    class="inner-loading vh-100 w-100 position-fixed bg-black align-items-center justify-content-center"
  >
    <span class="loadertwo text-center"></span>
  </div>
        <div class="col-md-3 overflow-hidden position-relative meal-div " onclick="getMealDetails(${arr[i].idMeal})">
         <img src="${arr[i].strMealThumb}" class="w-100 rounded-1">
         <div  class="overlay-photo position-absolute d-flex">
          <h3 class="my-auto ps-2">${arr[i].strMeal}</h3>
         </div>
        </div>
        `;
  }
  homeMeals.innerHTML = mealsContainer;
  innerFade();
}

//* OPEN Ingredients AND GET INGREDIENTS LIST API
$("#ingredients").on("click", async function openIngredients() {
  closeSideNavbar();
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  ); //& THE API LINK WE GOT THE Ingredients FROM
  let catData = await response.json();
  console.log(catData);
  console.log("HELLO FROM CATEGORIES");
  displayIngredients(catData.meals.slice(0, 20));
});
//* DISPLAY THE INGREDIENTS
function displayIngredients(Arr) {
  let areasContainer = ``;
  let searchInput = document.querySelector("#searchone");
  searchInput.innerHTML = "";
  for (let i = 0; i < Arr.length; i++) {
    areasContainer += `
    <div
    class="inner-loading vh-100 w-100 position-fixed bg-black align-items-center justify-content-center"
  >
    <span class="loadertwo text-center"></span>
  </div>
                <div class="col-md-3 d-flex flex-column justify-content-center align-items-center position-relative area-div p-5 text-white" onclick="getIngredientsMeals('${
                  Arr[i].strIngredient
                }')">
                <i class="fa-solid fa-drumstick-bite fs-1 text-center"></i>
                  <h2 class="Ingredient-name fs-1 text-center">${
                    Arr[i].strIngredient
                  }<h2>
                  <p class="ingredient-describe fs-5 text-center">${Arr[
                    i
                  ].strDescription
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}</p>
                </div>
            `;
  }
  homeMeals.innerHTML = areasContainer;
  innerFade();
}
//* GET MEALS OF EACH AREA
async function getIngredientsMeals(ingredientName) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`
  );
  let data = await response.json();
  console.log(data);
  console.log("hello meals from ingredients");
  displayIngredinetMeals(data.meals);
}
//* DISPLAY ALL MEALS OF EACH AREA
function displayIngredinetMeals(arr) {
  let mealsContainer = ""; //! THE VARIABLE THAT WILL CONTAIN THINGS THAT WILL BE PUT IN HTML THROUGH JS
  let searchInput = document.querySelector("#searchone");
  searchInput.innerHTML = "";
  console.log("hello from meals of ingredient");
  for (let i = 0; i < arr.length; i++) {
    mealsContainer += `
    <div
    class="inner-loading vh-100 w-100 position-fixed bg-black align-items-center justify-content-center"
  >
    <span class="loadertwo text-center"></span>
  </div>
          <div class="col-md-3 overflow-hidden position-relative meal-div " onclick="getMealDetails(${arr[i].idMeal})">
           <img src="${arr[i].strMealThumb}" class="w-100 rounded-1">
           <div  class="overlay-photo position-absolute d-flex">
            <h3 class="my-auto ps-2">${arr[i].strMeal}</h3>
           </div>
          </div>
          `;
  }
  homeMeals.innerHTML = mealsContainer;
  innerFade();
}

// ! CONTACT
function showContacts() {
  closeSideNavbar();
  let searchInput = document.querySelector("#searchone");
  searchInput.innerHTML = "";
  homeMeals.innerHTML = `
  <div
  class="inner-loading vh-100 w-100 position-fixed bg-black align-items-center justify-content-center"
>
  <span class="loadertwo text-center"></span>
</div>
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed!!
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@zzmail/icloud.com
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid Phone Number..
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid age..
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter a valid password with a minimum eight characters, at least one letter and one number;
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter the same password as before
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
  innerFade();
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
//~ LOADING SCREEN

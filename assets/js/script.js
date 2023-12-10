// Global variables and constants
const timeouts = [0, 10, 50, 100, 300, 500, 750, 1000, 1500, 2000]

// Endpoints and URLS
const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZmViM2ZlMDMxZTAwMTliYTE0ZjYiLCJpYXQiOjE3MDIwMzkzMDksImV4cCI6MTcwMzI0ODkwOX0.mBhcHRomhIJsRdAjQW0eM51hxKeC9RDFGWPz7aPZPRI"
const endPointUrl = "https://striveschool-api.herokuapp.com/api/product/"
const fakeData = "https://fakestoreapi.com/products"

// Array of all products available on the fake store
let products = [];


// Pages
const homePage = document.querySelector("#homePage");
const productPage = document.querySelector('#productPage');
const insertFormPage = document.querySelector("#insertForm");

// Home page
const homePageRow = document.querySelector('.homePageRow');

// Add product page
const insertFormContainer = document.querySelector(".insertFormContainer");
const productPageRow = document.querySelector('.productPageRow');
const menuBtn = document.querySelector(".menuBtn");
const sideMenu = document.querySelector(".sideMenu");
const resetButtons = document.querySelectorAll('.resetForm');
const addNewItemBtn = document.querySelector('.addNewItem');
const addProductBtn = document.querySelector('.addProduct');
let productName = document.querySelector('#name');
let brand = document.querySelector('#brand');
let imageUrl = document.querySelector('#imageUrl');
let price = document.querySelector('#price');
let description = document.querySelector('#description');
let allFieldsElements = document.querySelectorAll('input, textarea');
setResetButton();





// CORE CODE

// Gets data from fake e-commerce API and populates products array
getFakeData(fakeData);
setTimeout(setSideMenu, timeouts[7]);

// Gets all data from API to the Home Page
getDataToHomePage("");

// Makes info buttons clickable and able to open product page
setTimeout(openProductPage, timeouts[7]);

// Makes button clickable to go to insert new product form
setTimeout(setAddNewItemPage, timeouts[9])

// Prints products in the array
setTimeout(() => {
    console.log(products)
}, timeouts[9]);


setTimeout(insertDataInForm, timeouts[9])


// -------------FUNCTIONS----------------

// --------------HOMEPAGE----------------

// GET DATA and POPULATE HOMEPAGE
async function getDataToHomePage(_id) {
    try {
        const response = await fetch(endPointUrl + _id, {
            headers: {
                "Authorization": apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        populateHomePage(data);
    } catch (error) {
        console.log("Error: ", error);
    }
}
// Populate homepage with products from API
function populateHomePage(articles) {
    // Add single product to HTML
    homePageRow.innerHTML = '';
    for (let i = 0; i < articles.length; i++) {
        homePageRow.innerHTML += `                  
                        <div class="col mb-3">
                            <div class="card" style=="width: 18rem;" data-id=${articles[i]["_id"]}>
                                <img src="${articles[i].imageUrl}" class="card-img-top" alt="${articles[i].name}">
                                <div class="card-body">
                                    <h5 class="card-title resize-title">${articles[i].name}</h5>
                                    <p class="brand card-text">${articles[i].brand}</p>
                                    <p class="card-text resize-text">${articles[i].description}</p>
                                    <p>${articles[i].price} €</p>
                                    <p>${articles[i]._id}</p>
                                    <button type="button" class="findOutMoreBtn btn btn-primary">Scopri di più</button>
                                    <button type="button" class="modifyBtn btn btn-danger">Modifica</button>
                                </div>
                            </div>
                        </div>
                    `
    }
}

// ---------------PRODUCT PAGE---------------

// Shows side menu with all products available to add
function setSideMenu() {
    menuBtn.addEventListener('click', (event) => {
        event.preventDefault();
        sideMenu.classList.toggle('slideIn');

    })
    // Populates side menu with items
    populateSideMenu();
}

// OPENS PRODUCT PAGE
function openProductPage() {
    const findOutMoreLinks = document.querySelectorAll('.findOutMoreBtn');
    findOutMoreLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            let productCard = link.closest(".card");
            console.log(productCard)
            // Make a request to the server using the id stored in the data-id attribute
            getDataToProductPage(productCard.dataset.id)
            // Hides previous page
            setTimeout(() => goToPage(productPage), timeouts[7])
            setTimeout(() => backToHomePage(0), timeouts[7])
        });
    });
}

// GET DATA TO PRODUCT PAGE
async function getDataToProductPage(_id) {
    try {
        const response = await fetch(endPointUrl + _id, {
            headers: {
                "Authorization": apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        // Populate product page
        setTimeout(() => populateProductPage(data), timeouts[5]);
    } catch (error) {
        console.log("Error: ", error);
    }
}

// POPULATES PRODUCT PAGE WITH DATA
function populateProductPage(singleArticle) {
    // Add single product to HTML
    productPageRow.innerHTML = '';
    productPageRow.innerHTML = `                  
                        <div class="col">
                            <img src="${singleArticle.imageUrl}" alt=${singleArticle.name}>
                        </div>
                        <div class="col">
                            <h2>${singleArticle.name}</h2>
                            <h3>${singleArticle.brand}</h3>
                            <p class="productDescription">${singleArticle.description}</p>
                            <p>${singleArticle.price} €</p>
                            <a href="#" class="modifyBtn btn btn-danger">Modifica</a>
                        </div>
                    `
}

// ---------------INSERT FORM PAGE--------------------

// Sets insert form page
function setAddNewItemPage() {

    addNewItemBtn.addEventListener('click', (event) => {
        event.preventDefault();
        setTimeout(() => goToPage(insertFormPage), timeouts[7]);

        // Button Creates new object and posts it to the API
        addProductBtn.addEventListener('click', (event) => {
            event.preventDefault();
            // Take info in the objects from the fields and create object
            itemToAdd = new createArticle(productName.value, description.value, brand.value, imageUrl.value, parseFloat(price.value));
            // Make a post request with the object passed as argument
            console.log(itemToAdd);
            setTimeout(() => postData(itemToAdd), timeouts[6]);
            // Nascondere la pagina corrente
            document.querySelector('.visible').classList.remove('visible');
            // Iniettare i dati nuovi nella home page
            setTimeout(() => getDataToHomePage(""), timeouts[7]);
            // Rendere la home page visibile
            setTimeout(() => homePage.classList.add('visible'), timeouts[9]);
        })
        setTimeout(() => backToHomePage(1), timeouts[9])
    });
}

// Populates side menu HTML
function populateSideMenu() {
    sideMenu.innerHTML = '';
    products.forEach((item) => {
        sideMenu.innerHTML += `
                        <div class="sideMenuItem d-flex">
                            <img src=${item.imageUrl} alt=${item.name}>
                            <p>${item.name}</p>
                            <p>${item.price} €</p>
                        </div>
                    `
    });
}

function insertDataInForm() {
    const menuItems = document.querySelectorAll(".sideMenuItem");
    menuItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            // Find element that matches in product
            productToFillFields = products.find((element) => element.name === item.querySelector('p').innerText);
            console.log(item.querySelector('p').innerText)
            productName.value = productToFillFields.name;
            brand.value = productToFillFields.brand;
            imageUrl.value = productToFillFields.imageUrl;
            price.value = parseFloat(productToFillFields.price);
            description.value = productToFillFields.description;
            sideMenu.classList.remove('slideIn');
        })
    });

}

// Sets buttons that reset input form
function setResetButton() {
    resetButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            allFieldsElements.forEach((element) => {
                element.value = '';
            });
        })
    });
}

// -----------GENERIC FUNCTIONS------------------

// TRIMS first word to return a brand back from FAKE STORE product
function getFirstWord(inputString) {
    const trimmedString = inputString.trim();
    const firstWord = trimmedString.split(' ')[0];
    return firstWord;
}

// Constructor for object to put inside cart
function createArticle(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
}

// Makes the new page visible and hides all the others
function goToPage(toPage) {
    document.querySelector('.visible').classList.remove('visible');
    toPage.classList.add('visible');
}
// Makes homepage visible and hides previous page
function backToHomePage(index) {
    document.querySelectorAll(".homePageBtn")[index].addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector(".visible").classList.remove('visible');
        document.querySelector('#homePage').classList.add('visible');
    })
};

// POST DATA Request
async function postData(_object) {
    try {
        const response = await fetch(endPointUrl, {
            method: "POST",
            body: JSON.stringify(_object),
            headers: {
                "Authorization": apiKey,
                "Content-Type": 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error: ", error);
    }
}

// PUT DATA Request
async function putData(_object, _id) {
    try {
        const response = await fetch(endPointUrl + _id, {
            method: "PUT",
            body: JSON.stringify(_object),
            headers: {
                "Authorization": apiKey,
                "Content-Type": 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error: ", error);
    }

}

// DELETE Data Request
async function deleteData(_id) {
    try {
        const response = await fetch(endPointUrl + _id, {
            method: "DELETE",
            headers: {
                "Authorization": apiKey,
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("Error: ", error);
    }
}

// Get data request from fake store and populates local array of products
async function getFakeData(_address) {
    try {
        const response = await fetch(_address)

        if (!response.ok) {
            throw new Error(`HTTP error! Status ${response.status}`);
        }
        const data = await response.json();
        data.forEach((item) => {
            // console.log(item.image);
            let brand = getFirstWord(item.title);
            let articleForDatabase = new createArticle(item.title, item.description, brand, item.image, item.price);
            products.push(articleForDatabase);
        });
    } catch (error) {
        console.log("Error: ", error);
    }
}

// -----------------------------------------------

//MODIFICA
// Il form deve mostrarmi i campi precompilati di titolo, testo, marca e prezzo da poter cambiare
// Nella schermata di modifica, la pagina deve mostrarmi quanto è presente nei campi, con la possibilità di modificarli. Il tipo di richiesta sarà un PUT.
// La schermata deve darmi la possibilità di cancellare la risorsa dalla API.
// Il pulsante di reset del form deve ripristinare i valori dei campi a quelli memorizzati nella API


// DELETE BEFORE STARTING

// setTimeout(() => {
//     deleteData("65737770fe031e0019ba1c75")
// }, 3000)
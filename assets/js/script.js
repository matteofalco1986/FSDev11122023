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
const modifyProductPage = document.querySelector("#modifyForm");

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

// Modify product page
const submitChangesBtn = document.querySelector('.submitChangesBtn');
const deleteBtn = document.querySelector('.deleteBtn');
let productIdMod = document.querySelector("#productId");
let productNameMod = document.querySelector('#nameMod');
let brandMod = document.querySelector('#brandMod');
let imageUrlMod = document.querySelector('#imageUrlMod');
let priceMod = document.querySelector('#priceMod');
let descriptionMod = document.querySelector('#descriptionMod');
const homePageButtons = document.querySelectorAll('.homePageBtn');





// CORE CODE

// Gets data from fake e-commerce API and populates products array
getFakeData(fakeData);
setTimeout(setSideMenu, timeouts[7]);

// Gets all data from API to the Home Page
getDataToHomePage("");

// Makes info buttons clickable and able to open product page
setTimeout(setDetailPageButtons, timeouts[7]);

// Makes modify buttons clickable and able to open modify page
setTimeout(setModifyItemButtons, timeouts[7]);

// Set delete buttons for form
setTimeout(setDeleteBtn, timeouts[7]);

// Set change buttons for form
setTimeout(setSubmitChangesBtn, timeouts[7]);

// Makes button clickable to go to insert new product form
setTimeout(setAddNewItemPage, timeouts[9])

// Prints products in the array
setTimeout(() => {
    console.log(products)
}, timeouts[9]);


setTimeout(insertDataInForm, timeouts[9])


setTimeout(()=>{
    homePageButtons.forEach((item) => {
        item.addEventListener('click', () => location.reload());
    });

}, timeouts[8]);


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
                                    <button type="button" class="findOutMoreBtn btn btn-primary">Scopri di più</button>
                                    <button type="button" class="modifyBtn btn btn-danger">Modifica</button>
                                </div>
                            </div>
                        </div>
                    `
    }
}

// Set buttons to send to detail page
function setDetailPageButtons() {
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

// Set buttons to send to detail page
function setModifyItemButtons() {
    const modifyButtons = document.querySelectorAll('.modifyBtn');
    modifyButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            let productCard = button.closest(".card");
            console.log(productCard)
            // Make a request to the server using the id stored in the data-id attribute
            getDataToModifyPage(productCard.dataset.id)
            // Hides previous page
            setTimeout(() => goToPage(modifyProductPage), timeouts[7])
            setTimeout(() => backToHomePage(2), timeouts[7])
        });
    });
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
        setTimeout(() => {
            let modFromPage = document.querySelector(".modFromDetailsPageBtn");
            modFromPage.addEventListener('click', () => {
                // popolare il modify form section con i dati
                setTimeout(() => insertDataInModifyForm(data), timeouts[5]);
                // nascondere la pagina corrente
                productPage.classList.remove('visible');
                // mostrare la pagina di modifica form
                setTimeout(() => modifyProductPage.classList.add('visible'), timeouts[7]);
            })
        }, timeouts[9])
    } catch (error) {
        console.log("Error: ", error);
    }
}


// POPULATES PRODUCT PAGE WITH DATA
function populateProductPage(singleArticle) {
    // Add single product to HTML
    productPageRow.innerHTML = '';
    productPageRow.innerHTML = `                  
                        <div class="detailElement">
                            <img src="${singleArticle.imageUrl}" alt=${singleArticle.name}>
                        </div>
                        <div class="detailElement">
                            <h2>${singleArticle.name}</h2>
                            <h3>${singleArticle.brand}</h3>
                            <p class="productDescription">${singleArticle.description}</p>
                            <p>${singleArticle.price} €</p>
                            <button class="modFromDetailsPageBtn btn btn-danger">Modifica</button>
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
            // console.log(itemToAdd);
            setTimeout(() => postData(itemToAdd), timeouts[6]);
            // Nascondere la pagina corrente
            document.querySelector('.visible').classList.remove('visible');
            // Iniettare i dati nuovi nella home page
            setTimeout(() => getDataToHomePage(""), timeouts[7]);
            // Rendere la home page visibile
            setTimeout(() => location.reload(), timeouts[9]);
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

// -------------MODIFY AND DELETE FORM PAGE----------------------

async function getDataToModifyPage(_id) {
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
        // Popola campi input
        setTimeout(() => insertDataInModifyForm(data), timeouts[5]);

    } catch (error) {
        console.log("Error: ", error);
    }
}

function insertDataInModifyForm(product) {

    productIdMod.innerHTML = product._id;
    productNameMod.value = product.name;
    brandMod.value = product.brand;
    imageUrlMod.value = product.imageUrl;
    priceMod.value = parseFloat(product.price);
    descriptionMod.value = product.description;
}


// SET MODIFY ITEM
// Button Creates new object and posts it to the API

function setSubmitChangesBtn() {
    submitChangesBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const myProductId = productIdMod.innerHTML;
        // Take info in the objects from the fields and create object
        itemToAdd = new createArticle(productNameMod.value, descriptionMod.value, brandMod.value, imageUrlMod.value, parseFloat(priceMod.value));
        // Make a post request with the object passed as argument
        // console.log(itemToAdd);
        setTimeout(() => putData(itemToAdd, myProductId), timeouts[6]);
        // Nascondere la pagina corrente
        document.querySelector('.visible').classList.remove('visible');
        // Iniettare i dati nuovi nella home page
        setTimeout(() => getDataToHomePage(""), timeouts[7]);
        // Rendere la home page visibile
        setTimeout(() => location.reload(), timeouts[9]);
    })
}


function setDeleteBtn() {
    deleteBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const myProductId = productIdMod.innerHTML;
        deleteData(myProductId);
        modifyProductPage.classList.remove('visible');
        setTimeout(() => getDataToHomePage(''), timeouts[5])

        setTimeout(() => location.reload(), timeouts[9])
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
        window.alert(`${error} Il prodotto è già stato aggiunto`);
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

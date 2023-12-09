const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZmViM2ZlMDMxZTAwMTliYTE0ZjYiLCJpYXQiOjE3MDIwMzkzMDksImV4cCI6MTcwMzI0ODkwOX0.mBhcHRomhIJsRdAjQW0eM51hxKeC9RDFGWPz7aPZPRI"
const endPointUrl = "https://striveschool-api.herokuapp.com/api/product/"
const fakeData = "https://fakestoreapi.com/products"
let products = [];
const timeouts = [0, 10, 50, 100, 300, 500, 750, 1000, 1500, 2000]
const homePageRow = document.querySelector('.homePageRow');
const productPageRow = document.querySelector('.productPageRow');
const insertFormSection = document.querySelector(".insertFormContainer");
const productPage = document.querySelector('#productPage');
const addNewItemBtn = document.querySelector('addNewItem');


// Gets data from fake e-commerce API and populates products array
getFakeData(fakeData);

// Gets all data from API to the Home Page
getDataToHomePage("");

// Makes info buttons clickable and able to open product page
setTimeout(openProductPage, timeouts[7]);

// Prints products in the array
setTimeout(() => {
    console.log(products)
}, timeouts[9]);


addNewItemBtn.addEventListener('click', toInsertForm)



// Update home page with new data
// Make page disappear
// Make home page visible



// GET DATA
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
        populateProductPage(data);
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
                            <p>${singleArticle.price}</p>
                            <a href="#" class="modifyBtn btn btn-danger">Modifica</a>
                        </div>
                    `
}

// OPENS PRODUCT PAGE
function openProductPage() {
    const findOutMoreLinks = document.querySelectorAll('.findOutMoreBtn');
    findOutMoreLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            let productCard = link.closest(".card");
            // Make a request to the server using the id stored in the data-id attribute
            getDataToProductPage(productCard.dataset.id)
            // Hides previous page
            setTimeout(() => {
                document.querySelector('.visible').classList.remove('visible');
                document.querySelector('#productPage').classList.add('visible');
            }, timeouts[5])
            setTimeout(() => backToHomePage(0), timeouts[7])
        });
    });
}

// POST DATA
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

// PUT data
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

// DELETE data
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

// GET FAKE DATA FROM FAKE STORE
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
                                    <a href="#" class="findOutMoreBtn btn btn-primary">Scopri di più</a>
                                    <a href="#" class="modifyBtn btn btn-danger">Modifica</a>
                                </div>
                            </div>
                        </div>
                    `
    }
}



// MAKES HOME PAGE VISIBLE AGAIN
function backToHomePage(index) {
    document.querySelectorAll(".homePageBtn")[index].addEventListener('click', () => {
        document.querySelector(".visible").classList.remove('visible');
        document.querySelector('#homePage').classList.add('visible');
    })
};

function toInsertForm() {
    populateInsertForm();
    // Select all the items in the page
    // The red button must reset the form
    allFieldsElements = document.querySelectorAll('input, textarea');
    resetBtn = document.querySelector('.resetForm');
    addProductBtn = document.querySelector('.addProduct');
    // Resets all fields
    resetBtn.addEventListener('click', (event) => {
        event.preventDefault();
        allFieldsElements.forEach((element) => {
            element.value = '';
        });
    })
    // The green button must create a new object
    addProductBtn.addEventListener('click', (event) => {
        event.preventDefault();
        let productName = document.querySelector('#name');
        let brand = document.querySelector('#brand');
        let imageUrl = document.querySelector('#imageUrl');
        let price = document.querySelector('#price');
        let description = document.querySelector('#description');
        // Take info in the objects from the fields and create object
        itemToAdd = new createArticle(productName.value, description.value, brand.value, imageUrl.value, parseFloat(price.value));
        // Make a post request with the object passed as argument
        console.log(itemToAdd);
        setTimeout(() => postData(itemToAdd), timeouts[9]);
    })
    setTimeout(() => backToHomePage(1), timeouts[1])

    // Select all the items in the page
    // The red button must reset the form
    // The green button must create a new object
    // Take info in the objects from the fields
    // Make a post request with the object passed as argument
    // Update home page with new data
    // Make page disappear
    // Make home page visible
}


function populateInsertForm() {
    insertFormSection.innerHTML = '';
    const textToInject = `
                    <form action="" class="insertForm">
                        <div class="inputField d-flex">
                            <label for="name">Product name</label>
                            <input type="text" name="name" id="name" placeholder="Type in the name of the product">
                        </div>
                        <div class="inputField d-flex">
                            <label for="brand">Brand</label>
                            <input type="text" name="brand" id="brand" placeholder="Type in the product brand">
                        </div>
                        <div class="inputField d-flex">
                            <label for="imageUrl">Image URL</label>
                            <input type="text" name="imageUrl" id="imageUrl" placeholder="Type in an image URL">
                        </div>
                        <div class="inputField d-flex">
                            <label for="price">Price in €</label>
                            <input type="text" name="price" id="price"
                            placeholder="Type in the price for the product. Use numbers only">
                        </div>
                        <div class="inputField d-flex">
                            <label for="description">Description</label>
                            <textarea name="desciption" id="description" cols="60" rows="5" placeholder="Type in a description of the product"></textarea>
                        </div>
                        <div class="buttonsContainer d-flex justify-content-center">
                            <button type="button" class="resetForm btn btn-danger">Reset form</button>
                            <button type="submit" class="addProduct btn btn-success">Add product</button>
                        </div>
                    </form>
                </div>
            `
    insertFormSection.innerHTML = textToInject;
}

//MODIFICA
// Il form deve mostrarmi i campi precompilati di titolo, testo, marca e prezzo da poter cambiare
// Nella schermata di modifica, la pagina deve mostrarmi quanto è presente nei campi, con la possibilità di modificarli. Il tipo di richiesta sarà un PUT.
// La schermata deve darmi la possibilità di cancellare la risorsa dalla API.
// Il pulsante di reset del form deve ripristinare i valori dei campi a quelli memorizzati nella API






// DELETE BEFORE STARTING

// setTimeout(() => {
//     deleteData("6574496c2c6a0d00184959d3")
// }, 3000)
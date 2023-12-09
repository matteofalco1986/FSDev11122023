const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZmViM2ZlMDMxZTAwMTliYTE0ZjYiLCJpYXQiOjE3MDIwMzkzMDksImV4cCI6MTcwMzI0ODkwOX0.mBhcHRomhIJsRdAjQW0eM51hxKeC9RDFGWPz7aPZPRI"
const endPointUrl = "https://striveschool-api.herokuapp.com/api/product/"
const fakeData = "https://fakestoreapi.com/products"
let products = [];
const timeouts = [0, 10, 50, 100, 300, 500, 750, 1000, 1500, 2000]
const homePageRow = document.querySelector('.homePageRow');
const productPageRow = document.querySelector('.productPageRow');


// Gets data from fake e-commerce API and populates products array
getFakeData(fakeData);

// Gets all data in API
getDataToHomePage("");

// Makes info buttons clickable and able to open product page
setTimeout(openInfoPage, timeouts[7]);

// Prints products in the array
setTimeout(() => {
    console.log(products)
}, timeouts[9]);



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
        // populateHomePage(data);
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

function openInfoPage() {
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
            setTimeout(backToHomePage, timeouts[7])
        });
    });
}


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
                        <button type="button" class="homePageBtn btn btn-primary">Home page</button>
                    `
}

function backToHomePage() {
    document.querySelector(".homePageBtn").addEventListener('click', () => {
        document.querySelector(".visible").classList.remove('visible');
        document.querySelector('#homePage').classList.add('visible');
    })
};


// CREAZIONE
// Quando clicco nuovo, deve comparire una finestra con un elenco di possibili prodotti da aggiungere
// Cliccando sul prodotto deve aprirsi la pagina del form per l'aggiunta alla API
// Il bottone di reset del form, deve ripristinare i campi ai valori di default del prodotto da aggiungere dall'array PRODUCTS.
// Il bottone crea risorsa, deve caricare il prodotto sulla API tramite una richiesta POST.

//MODIFICA
// Il form deve mostrarmi i campi precompilati di titolo, testo, marca e prezzo da poter cambiare
// Nella schermata di modifica, la pagina deve mostrarmi quanto è presente nei campi, con la possibilità di modificarli. Il tipo di richiesta sarà un PUT.
// La schermata deve darmi la possibilità di cancellare la risorsa dalla API.
// Il pulsante di reset del form deve ripristinare i valori dei campi a quelli memorizzati nella API
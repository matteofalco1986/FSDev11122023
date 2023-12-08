const apiKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcyZmViM2ZlMDMxZTAwMTliYTE0ZjYiLCJpYXQiOjE3MDIwMzkzMDksImV4cCI6MTcwMzI0ODkwOX0.mBhcHRomhIJsRdAjQW0eM51hxKeC9RDFGWPz7aPZPRI"
const endPointUrl = "https://striveschool-api.herokuapp.com/api/product/"
const fakeData = "https://fakestoreapi.com/products"
let image = document.querySelector('img');
let products = [];
getFakeData(fakeData)
console.log(products[0])


function createArticle(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
}


const articleToSell = new createArticle('Nokia 3310', "Indestructible cellphone", "Nokia", "url", 95);


console.log(JSON.stringify(articleToSell))

getData(endPointUrl);

// postData(endPointUrl, testArticle, 1)
// postData(endPointUrl, articleToSell, 1)






// DELETE data
async function deleteData(_address, _id) {
    try {
        const response = await fetch(_address + _id, {
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


// PUT data
async function putData(_address, _object, _id) {
    try {
        const response = await fetch(_address + _id, {
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

// POST DATA
async function postData(_address, _object) {
    try {
        const response = await fetch(_address, {
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

// GET DATA
async function getData(_address) {
    try {
        const response = await fetch(_address, {
            headers: {
                "Authorization": apiKey
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
            console.log(item);
            
        });
    } catch (error) {
        console.log("Error: ", error);
    }
}




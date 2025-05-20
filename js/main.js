let product = document.getElementById("p-name"),
  categories = document.getElementById("p-categories"),
  quntity = document.getElementById("p-quntity"),
  price = document.getElementById("p-price"),
  descount = document.getElementById("p-descount"),
  total = document.getElementById("p-total"),
  addProduct = document.getElementById("add-product");

// Save Data in Array
let productsArray,
  // add product button stats
  createBtnStats = "create",
  globalID;

if (localStorage.products != null) {
  productsArray = JSON.parse(localStorage.products);
  countData();
} else {
  productsArray = [];
}
//create product
addProduct.onclick = function () {
  let datdOpj = {
    pName: product.value.toLowerCase(),
    pCategories: categories.value.toLowerCase(),
    pQuntity: quntity.value,
    pPrice: price.value,
    pDescount: descount.value,
    pTotal: total.innerHTML,
  };
  if (product.value != "" && price.value != "") {
    if (createBtnStats === "create") {
      productsArray.push(datdOpj);
    } else {
      productsArray[globalID] = datdOpj;
      addProduct.style.backgroundColor = "green";
    }
    restData();
  } else {
    showAlert();
  }
  //save localstorage
  localStorage.setItem("products", JSON.stringify(productsArray));
  showData();
  countData();
  getTotal();
};
//read data
function showData() {
  let productData = "";
  for (i = 0; i < productsArray.length; i++) {
    productData += `<tr>
        <td>${i + 1}</td>
        <td>${productsArray[i].pName}</td>
        <td>${productsArray[i].pCategories}</td>
        <td>${productsArray[i].pQuntity}</td>
        <td>${productsArray[i].pPrice}</td>
        <td>${productsArray[i].pDescount}</td>
        <td>${productsArray[i].pTotal}</td>
        <td>
        <div class="update" onclick="updateData(${i})">update</div>
        <div class="delete" onclick="deleteData(${i})">deletw</div>
        </td>
        </tr>
        `;
  }
  document.getElementById("t-body").innerHTML = productData;
  let deleteAll = document.querySelector(".delete-all");
  if (productsArray.length > 0) {
    deleteAll.innerHTML = `<button onclick="deleteAll()">delete all</button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
//delete data
function deleteData(id) {
  productsArray.splice(id, 1);
  localStorage.products = JSON.stringify(productsArray);
  countData();
  showData();
}
// Delete All
function deleteAll() {
  productsArray.splice(0);
  localStorage.clear();
  showData();
}
//update data
function updateData(id) {
  product.value = productsArray[id].pName;
  categories.value = productsArray[id].pCategories;
  quntity.value = productsArray[id].pQuntity;
  price.value = productsArray[id].pPrice;
  descount.value = productsArray[id].pDescount;
  total.innerHTML = productsArray[id].pTotal;
  createBtnStats = "update";
  globalID = id;
  addProduct.style.backgroundColor = "red";
}
//count
function countData() {
  let allProducts = document.querySelector(".total-products span");
  allProducts.innerHTML = productsArray.length;
}
//search data
let searchBtnStats = "name";
function getSearchBtnStats(id) {
  let search = document.getElementById("search-input");
  if (id === "s-by-name") {
    searchBtnStats = "name";
    search.placeholder = "Search by Name";
  } else {
    searchBtnStats = "categort";
    search.placeholder = "Search by Categort";
  }
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let productData = "";
  if (searchBtnStats === "name") {
    for (i = 0; i < productsArray.length; i++) {
      if (productsArray[i].pName.includes(value.toLowerCase())) {
        productData += `<tr>
        <td>${i + 1}</td>
        <td>${productsArray[i].pName}</td>
        <td>${productsArray[i].pCategories}</td>
        <td>${productsArray[i].pQuntity}</td>
        <td>${productsArray[i].pPrice}</td>
        <td>${productsArray[i].pDescount}</td>
        <td>${productsArray[i].pTotal}</td>
        <td>
        <div class="delete" onclick="deleteData(${i})">deletw</div>
        <div class="update" onclick="updateData(${i})">update</div>
        </td>
        </tr>
        `;
      }
    }
  } else {
    for (i = 0; i < productsArray.length; i++) {
      if (productsArray[i].pCategories.includes(value.toLowerCase())) {
        productData += `<tr>
        <td>${i + 1}</td>
        <td>${productsArray[i].pName}</td>
        <td>${productsArray[i].pCategories}</td>
        <td>${productsArray[i].pQuntity}</td>
        <td>${productsArray[i].pPrice}</td>
        <td>${productsArray[i].pDescount}</td>
        <td>${productsArray[i].pTotal}</td>
        <td>
        <div class="delete" onclick="deleteData(${i})">deletw</div>
        <div class="update" onclick="updateData(${i})">update</div>
        </td>
        </tr>
        `;
      }
    }
  }
  document.getElementById("t-body").innerHTML = productData;
}
//get total
function getTotal() {
  if (price.value != "") {
    let result = price.value - descount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#30a54a";
  } else {
    total.innerHTML = 0;
    total.style.backgroundColor = "#d93749";
  }
}
//rest inputs
function restData() {
  product.value = "";
  categories.value = "";
  quntity.value = "";
  price.value = "";
  descount.value = "";
  total.innerHTML = 0;
}
//showAlert
function showAlert() {
  let div = document.createElement("div");
  div.className = "alert-div";
  div.innerHTML = "please enter product details";
  document.body.appendChild(div);
  setTimeout(() => {
    document.querySelector(".alert-div").remove();
  }, 1000);
}
showData();

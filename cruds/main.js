let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

// Add event listeners to input fields
price.addEventListener("input", getTotal);
taxes.addEventListener("input", getTotal);
ads.addEventListener("input", getTotal);
discount.addEventListener("input", getTotal);

function getTotal() {
  // Convert values to numbers
  let priceValue = parseFloat(price.value) || 0;
  let taxesValue = parseFloat(taxes.value) || 0;
  let adsValue = parseFloat(ads.value) || 0;
  let discountValue = parseFloat(discount.value) || 0;

  // Check if the price input is zero or not a valid number
  if (isNaN(priceValue) || priceValue === 0) {
    total.innerHTML = "Total: ";
    total.style.backgroundColor = "#a00d02"; // Red background
    return;
  }

  // Calculate total
  let result = priceValue + taxesValue + adsValue - discountValue;

  // Update the total HTML element
  total.innerHTML = "Total: " + result.toFixed(2); // Display result with two decimal places

  // Change background color to green
  total.style.backgroundColor = "#040";
}

let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };


  if(title.value != '' 
  && price.value != ''
  && category.value != ''
  && newpro.count < 100){
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) {
          datapro.push(newpro);
        }
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[tmp] = newpro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
      clearData();

    }
  
  }
 
  localStorage.setItem("product", JSON.stringify(datapro));

  showData();
};

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// ... (existing code)

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
      <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" class="update">update</button></td>
        <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
      </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (datapro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">delete All (${datapro.length}</button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

// ... (existing code)

function deleteData(index) {
  console.log(index);
  // Add logic to delete the item at the given index from the 'datapro' array
  datapro.splice(index, 1);
  // Update localStorage with the modified 'datapro' array
  localStorage.setItem("product", JSON.stringify(datapro));
  showData();

  // Refresh the displayed data
}

function deleteAll() {
  localStorage.clear();
  datapro.splice(0);
  showData();
}

function updateData(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = datapro[i].category;
  submit.innerHTML = "Update";
  mood = "ubdate";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = 'Search By '+ searchMood;
  search.focus();
  search.value = '';
  showData();
}

function searchData(value) {
  let table = '';

  for (let i = 0; i < datapro.length; i++) {
    let match = (searchMood === 'title' && datapro[i].title.includes(value.toLowerCase())) ||
                (searchMood === 'category' && datapro[i].category.includes(value.toLowerCase()));

    if (match) {
      table += `
        <tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].taxes}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].category}</td>
          <td><button onclick="updateData(${i})" class="update">update</button></td>
          <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
        </tr>
      `;
    }
  }

  document.getElementById("tbody").innerHTML = table;
}





let currentUser = localStorage.getItem("currentUser") || null;
let cart = JSON.parse(localStorage.getItem(currentUser)) || [];
let cartLength = document.getElementById("home__cartLength");
cartLength.innerText = cart.length;
let home__login = document.getElementById("home__login");
let home__logoutCont = document.getElementById("home__logoutCont");
let home__logoutBtn = document.getElementById("home__logoutBtn");

home__logoutBtn.addEventListener("click", () => {
  if (currentUser) {
    currentUser = null;
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserId");
    alert("logged out Successfully!");
    window.location.reload();
  }
});

if (currentUser) {
  home__login.addEventListener("mouseenter", () => {
    home__logoutCont.style.display = "block";
  });

  home__nav.addEventListener("mouseleave", () => {
    home__logoutCont.style.display = "none";
  });
}

if (currentUser) {
  home__login.innerText = `Hi, ${currentUser}`;
} else {
  home__login.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

let arr = JSON.parse(localStorage.getItem("productDetails")) || [];

window.addEventListener("load", () => {
  arr = JSON.parse(localStorage.getItem("productDetails")) || [];
  cartLength.innerText = cart.length;
  check(arr);
});

let api = "https://nordstorm-db-json.onrender.com/products";

let checkSizeSelected = "";

let singlePageProductDetailsMainDiv = document.getElementById(
  "singlePageProductDetailsMainDiv"
);

let home__searchBar = document.getElementById("home__searchBar");
home__searchBar.addEventListener("click", () => {
  window.location.href = "products.html";
});

let left = document.getElementById("left");
let right = document.getElementById("right");

function check(data) {
  singlePageProductDetailsMainDiv.innerHTML = "";
  data.forEach((element) => {
    let img = document.createElement("img");
    img.src = element.image;
    img.id = "single__productImg";
    let p = document.createElement("h1");
    p.innerText = element.title;

    left.append(img);

    let description = document.createElement("p");
    description.innerText = element.description;

    let rating = document.createElement("p");
    rating.innerText = "Rating " + element.rating;

    let price = document.createElement("h1");
    price.innerText = "INR " + element.price;

    let add = document.createElement("button");
    add.innerText = "Add To Bag";

    add.addEventListener("click", (e) => {
      e.preventDefault();
      Cart1(element);
    });

    let select = document.createElement("select");
    let option1 = document.createElement("option");
    option1.innerText = "CHOOSE SIZE";

    let option2 = document.createElement("option");
    option2.innerText = "S";

    let option3 = document.createElement("option");
    option3.innerText = "M";

    let option4 = document.createElement("option");
    option4.innerText = "L";

    select.append(option1, option2, option3, option4);
    select.addEventListener("change", () => {
      checkSizeSelected = select.value;
    });

    right.append(p, price, description, rating, select, add);

    singlePageProductDetailsMainDiv.append(left, right);
  });
}

function Cart1(para) {
  let falg = false;

  falg = cart.some((item) => {
    if (item.id == para.id) {
      falg = true;
      return falg;
    }
    falg = false;
    return falg;
  });

  if (checkSizeSelected == "") {
    alert("Please Select The Size");
  } else if (falg == true) {
    alert("product already in Bag");
  } else {
    para.size = checkSizeSelected;
    para.qty = 1;
    cart.push(para);
    alert("Product added to Bag");
    localStorage.setItem(currentUser, JSON.stringify(cart));
    cartLength.innerText = cart.length;
  }
}

// Navbar link to cart start----------------------------------------------------------
let home__cart = document.getElementById("home__cart");
let home__logo = document.getElementById("home__logo");
let home__purchase = document.getElementById("home__purchase");

home__purchase.addEventListener("click", () => {
  window.location.href = "purchase.html";
});

home__logo.addEventListener("click", () => {
  window.location.href = "index.html";
});

home__cart.addEventListener("click", () => {
  window.location.href = "cart.html";
});

// Navbar link to cart end----------------------------------------------------------

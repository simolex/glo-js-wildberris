export const cart = () => {
  const cartButton = document.querySelector(".button-cart");
  const modalCart = document.getElementById("modal-cart");
  const closeModalCart = modalCart.querySelector(".modal-close");
  const goodsContainer = document.querySelector(".long-goods-list");
  const cartTable = document.querySelector(".cart-table__goods");
  const totalCartTable = document.querySelector(".card-table__total");
  const formModal = document.querySelector(".modal-form");

  const deleteFromCart = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(newCart);
  };

  const plusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.map((item) => {
      if (item.id === id) {
        item.count++;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(newCart);
  };

  const minusCartItem = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.map((item) => {
      if (item.id === id && item.count > 1) {
        item.count--;
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    renderCartGoods(newCart);
  };

  const addToCard = (id) => {
    const goods = JSON.parse(localStorage.getItem("goods"));
    const clickedGood = goods.find((item) => item.id === id);
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    if (cart.some((item) => item.id === clickedGood.id)) {
      cart.map((item) => {
        if (item.id === clickedGood.id) {
          item.count++;
        }
        return item;
      });
    } else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const renderCartGoods = (goods) => {
    let totalPrice = 0;
    cartTable.innerHTML = "";
    goods.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
						<td>${item.name}</td>
						<td>${item.price}$</td>
						<td><button class="cart-btn-minus"">-</button></td>
						<td>${item.count}</td>
						<td><button class=" cart-btn-plus"">+</button></td>
						<td>${item.price * item.count}$</td>
						<td><button class="cart-btn-delete"">x</button></td>					
      `;
      cartTable.append(tr);
      totalPrice += item.price * item.count;

      tr.addEventListener("click", (e) => {
        if (e.target.classList.contains("cart-btn-minus")) {
          minusCartItem(item.id);
        } else if (e.target.classList.contains("cart-btn-plus")) {
          plusCartItem(item.id);
        } else if (e.target.classList.contains("cart-btn-delete")) {
          deleteFromCart(item.id);
        }
      });
    });
    totalCartTable.textContent = `${totalPrice}$`;
  };

  const sendForm = () => {
    const cartArray = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        cart: cartArray,
        name: "", //todo
        phone: "", //todo
      }),
    }).then(() => {
      modalCart.style.display = "";
      //todo очистить корзину
    });
  };
  formModal.addEventListener("submit", (e) => {
    e.preventDefault();
    sendForm();
  });

  cartButton.addEventListener("click", () => {
    const cartArray = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    renderCartGoods(cartArray);
    modalCart.style.display = "flex";
  });

  closeModalCart.addEventListener("click", (e) => {
    modalCart.style.display = "";
  });

  modalCart.addEventListener("click", (e) => {
    if (!e.target.closest(".modal") && e.target.classList.contains("overlay")) {
      modalCart.style.display = "";
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalCart.style.display = "";
    }
  });

  if (goodsContainer) {
    goodsContainer.addEventListener("click", (e) => {
      if (e.target.closest(".add-to-cart")) {
        const buttonAddToCart = e.target.closest(".add-to-cart");
        const goodId = buttonAddToCart.dataset.id;
        addToCard(goodId);
        //console.log(clickedGood);
      }
    });
  }
};


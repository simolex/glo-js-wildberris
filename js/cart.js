const cart = () => {
  const cartButton = document.querySelector(".button-cart");
  const modalCart = document.getElementById("modal-cart");
  const closeModalCart = modalCart.querySelector(".modal-close");
  //console.dir(modalCart);

  cartButton.addEventListener("click", () => {
    modalCart.style.display = "flex";
  });

  closeModalCart.addEventListener("click", () => {
    modalCart.style.display = "none";
  });
};
cart();

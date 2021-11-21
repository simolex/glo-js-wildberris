const search = () => {
  const inputSearch = document.querySelector(".search-block > input");
  const buttonSearch = document.querySelector(".search-block > button");
  let valueInput;

  inputSearch.addEventListener("input", (event) => {
    valueInput = event.target.value;
  });
  buttonSearch.addEventListener("click", () => {
    console.log(valueInput);
  });
};

search();

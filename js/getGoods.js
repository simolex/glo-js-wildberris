const getGoods = () => {
  const links = document.querySelectorAll(".navigation-link");

  const getData = () => {
    fetch("db/db.json")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("goods", JSON.stringify({ name: data }));
      });
  };

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      getData();
    });
  });
};

getGoods();

const getShoes = async () => {
  const res = await fetch("Shoes.json");
  const data = await res.json();
  const shoes = data.shoes;
  return shoes;
  // console.log(data.Shoes)
};


// display shoes
const displayShoes = (shoes, center) => {
  let display = shoes.map(
    ({ title, image, regularPrice }) =>
    `
      <div class="shoe">
        <div class="shoe-header">
          <img src=${image} alt="" />
        </div>
        <div class="shoe-footer">
          <h3>${title}</h3>
          
          <div class="rating">
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
          </div>

          <div class="shoe-price">
            <h4>$${regularPrice}</h4>
          </div>
        </div>
        <ul>
          <li>
              <a href="#">
                  <i class="far fa-eye"></i>
              </a>
          </li>
          <li>
              <a href="#">
                  <i class="far fa-heart"></i>
              </a>
          </li>
          <li>
              <a href="#">
                  <i class="fas fa-sync"></i>
              </a>
          </li>
        </ul>
      </div>
    `
  );
  display = display.join("");
  center.innerHTML = display;
};

//! filtering
const catContainer = document.querySelector(".sort-category");
const filterBtns = [...document.querySelectorAll(".filter-btn")];
// console.log(filterBtns)

if (catContainer){
  catContainer.addEventListener("click", async (e) => {
    const target = e.target.closest(".section-title");
    if (!target) return;
    const id = target.dataset.id; // console.log(id);
    const shoes = await getShoes();

    if (id){
      filterBtns.forEach( (btn) => {
        btn.classList.remove("active");
      });
      target.classList.add("active");
      const menuCat = shoes.filter( (shoe) => shoe.category === id);
    // console.log(menuCat);
      shoeCenter.classList.add("animate__animated", "animate__backInUp"); // taken animate.css website
      setTimeout( () => {
        shoeCenter.classList.remove("animate__animated", "animate__backInUp");
      }, 1000);
      displayShoes(menuCat, shoeCenter);
    }
  });
}




const shoeCenter = document.querySelector(".shoe-center");
const latestCenter = document.querySelector(".latest-center");
const shopCenter = document.querySelector(".shop-center");

const filterArray = async (type) => {
  const shoes = await getShoes();
  return shoes.filter( shoe => shoe.category === type);
};

window.addEventListener("DOMContentLoaded", async () => {
  const shoes = await getShoes();
  const defaultShoes = await filterArray("Trend");
  const latestShoes = await filterArray("Latest");


  displayShoes(defaultShoes, shoeCenter);
  displayShoes(latestShoes, latestCenter);
  displayShoes(shoes, shopCenter);
});

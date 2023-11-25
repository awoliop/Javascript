// in order for modules to work we need to use the live server and not directly open the webpage from file explorer!!

import { products } from "../data/products.js";
import { cart, addToCart } from "../data/cart.js";
import { convertor } from "./utils/money.js";

let productsHTML = "";

products.forEach((product) => {
  const html = ` <div class="product-container">
   <div class="product-image-container">
     <img 
       class="product-image"
       src="${product.image}"
     />
   </div>

   <div class="product-name limit-text-to-2-lines">
     ${product.name}
   </div>

   <div class="product-rating-container">
     <img
       class="product-rating-stars"
       src="images/ratings/rating-${product.rating.stars * 10}.png"
     />
     <div class="product-rating-count link-primary">${
       product.rating.count
     }</div>
   </div>

   <div class="product-price">$${convertor(product)}</div>

   <div class="product-quantity-container">
     <select class="js-selector-${product.id}">
       <option selected value="1">1</option>
       <option value="2">2</option>
       <option value="3">3</option>
       <option value="4">4</option>
       <option value="5">5</option>
       <option value="6">6</option>
       <option value="7">7</option>
       <option value="8">8</option>
       <option value="9">9</option>
       <option value="10">10</option>
     </select>
   </div>

   <div class="product-spacer"></div>

   <div class="added-to-cart added-to-cart-opacity js-added-to-cart-${
     product.id
   }" >
     <img src="images/icons/checkmark.png" />
     Added
   </div>

   <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
     product.id
   }">Add to Cart</button>
 </div>`;
  productsHTML += html;
  //  productIDD=product.id;
});

// console.log(productIDD);

function updateCartQuantity() {
  let totalCartSize = 0;
  cart.forEach((item) => {
    totalCartSize += item.selectorValue;
  });

  let cartDisplay = document.querySelector(".js-cart-quantity");
  cartDisplay.innerHTML = totalCartSize;
}

function addNotification(productId) {
  cart.forEach((cartItem) => {
    let timeoutId;
    if (productId === cartItem.productId) {
      clearTimeout(timeoutId);

      let addedMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );
      addedMessage.classList.add("opacity");
      addedMessage.classList.remove("added-to-cart-opacity");

      timeoutId = setTimeout(() => {
        addedMessage.classList.remove("opacity");
        addedMessage.classList.add("added-to-cart-opacity");
      }, 2000);
    }
  });
}

const prodcutDisplay = document.querySelector(".js-products-grid");
prodcutDisplay.innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    /* THE DATASET IS ACTUALLY AN OBJECT AND IT HOLDS SEVERAL VALUES
     🔥 ONLY CONVENTION ITS STTRIBUTE SHOULD BE ATTACHED WITH THE FOLLOWING FORMAT
     data-(outnaming)='';
    */
    // NOTICE THAT THE NAMING IT CONVERTED FROM KEBAB CASE TO CAMEL CASE !! BY DEFAULT

    const productId = button.dataset.productId;

    addToCart(productId);
    updateCartQuantity();
    addNotification(productId);
  });
});

/* 
 BENEFITS OF MODULES

 can avoid naming conflicts
 we don't have to worry about order of our codes!! example the order we loaded the ffollowing!!
    <script src="/data/cart.js"></script>
    <script src="/data/products.js"></script>
    <script src="/scripts/amazon.js"></script>
  ⬆️⬆️⬆️ we had to worry that we have to load the cart first then products and then the amazon.js but with modules we just import it regardless of the order!!
  */

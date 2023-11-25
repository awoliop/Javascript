export let cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart= [{
    productId: 'c2a82c5e-aff4-435f-9975-517cfaba2ece',
    selectorValue: 1
    
  },{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    selectorValue: 1
    
  }];

}




function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}



export function addToCart(productId) {
    let matchingItem; 
  cart.forEach((item)=>{
    if(productId===item.productId){
      matchingItem=item;
    }
  })
  
  const selector=document.querySelector(`.js-selector-${productId}`);
  const selectorValue=parseInt(selector.value);
  
  if(matchingItem){
    matchingItem.selectorValue += selectorValue;
  }else{
    cart.push({
      productId,
      selectorValue,
    })
  }
  saveToStorage();
  }

  export function removeFromCart(productId) {
    let newCart=[];
    cart.forEach((cartItem)=>{
      if(cartItem.productId!==productId){
        newCart.push(cartItem);
      }
    });
    
    cart=newCart;

    saveToStorage();

  }


const button = document.querySelector('.weekly-product__btn');
const addToBasket = document.querySelector('.add-to-basket');
const overlay = addToBasket.querySelector('.add-to-basket__overlay');

button.addEventListener('click', function(evt) {
  evt.preventDefault();
  addToBasket.classList.add('add-to-basket--show');
});

overlay.addEventListener('click', function(){
    addToBasket.classList.remove('add-to-basket--show');
});

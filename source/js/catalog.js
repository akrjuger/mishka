const buttons = document.querySelectorAll('.product__basket');
const addToBasket = document.querySelector('.add-to-basket');
const overlay = addToBasket.querySelector('.add-to-basket__overlay');

for (let i = 0; i < buttons.length; i++){
  buttons[i].addEventListener('click', function(evt) {
    evt.preventDefault();
    addToBasket.classList.add('add-to-basket--show');
});
};

overlay.addEventListener('click', function(){
    addToBasket.classList.remove('add-to-basket--show');
});

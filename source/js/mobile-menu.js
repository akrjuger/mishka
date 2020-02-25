let mobileMenuButton = document.querySelector('.page-header__mobile-button');
let mobileHeader = document.querySelector('.page-header');
mobileHeader.classList.add('page-header--closed');
mobileMenuButton.classList.add('mobile-burger--show');

mobileMenuButton.addEventListener('click', function(){
    mobileHeader.classList.toggle('page-header--closed');
    mobileMenuButton.classList.toggle('mobile-burger--close');
});

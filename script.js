const body = document.querySelector('body');
const foodSection = document.querySelector('.foodSection');
const addBtn = document.querySelectorAll('.add');
const dialog = document.querySelector('#myDialog');
const closeDialog = document.querySelector('#closeDialog');
const dialogCart = document.querySelector('#myDialogAddToCart');
const addToCart = document.querySelector('.addToCart');
const outerDivCart = document.querySelector('.outerDivCart');
const subtotal = document.querySelector('.subtotal');
const totalPriceDisplay = document.querySelector('#totalPriceDisplay');
const cart = [];
let foodNameHeading;
let finalPrice;
let startFinalPrice;

addBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        dialog.showModal();
        body.style.overflow = 'hidden';

        let priceAdd = btn.parentElement;
        finalPrice = parseInt(priceAdd.firstElementChild.textContent.replace(/\D/g, ''));
        startFinalPrice = finalPrice;

        let actualPrice = priceAdd.children[1].innerHTML;
        foodNameHeading = priceAdd.previousElementSibling.firstElementChild.textContent;

        let siblingFoodImage = priceAdd.previousElementSibling.previousElementSibling.src;

        document.getElementById('dialogImg').src = siblingFoodImage;
        document.querySelector('#dialogFoodName').innerHTML = foodNameHeading;
        document.querySelector('#myDialogPriceBold').innerHTML = finalPrice;
        document.querySelector('#myDialogPriceCut').innerHTML = actualPrice;
    });
});

dialogCart.addEventListener('click', () => {
    dialog.close();
    body.style.overflow = 'visible';
    addToCart.style.display = 'block';

    const product = {
        name: foodNameHeading,
        price: finalPrice,
        quantity: 1
    };

    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
        updateCartDisplay();
    } else {
        cart.push(product);
        createCartItem(outerDivCart, product);
    }

    updateTotalPrice();
});

closeDialog.addEventListener('click', () => {
    dialog.close();
    body.style.overflow = 'visible';
});

function createCartItem(outerDivCart, product) {
    let createDiv = document.createElement('div');
    createDiv.className = 'targetCreateDiv';
    createDiv.style.backgroundColor = 'white';
    createDiv.style.width = '100%';
    createDiv.style.height = '22%';
    createDiv.style.marginTop = '1%';
    createDiv.style.position = 'relative';

    let foodNameCart = document.createElement('h3');
    foodNameCart.style.fontFamily = 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif';
    foodNameCart.style.display = 'block';
    foodNameCart.textContent = product.name;
    foodNameCart.style.fontSize = '1.05rem';
    foodNameCart.style.width = '50%';
    foodNameCart.style.position = 'absolute';
    foodNameCart.style.top = '20%';
    foodNameCart.style.left = '5%';
    foodNameCart.style.color = 'black';

    let counter = document.createElement('div');
    counter.style.width = '27%';
    counter.style.height = '20%';
    counter.style.border = '1px solid rgb(238, 122, 6)';
    counter.style.borderRadius = '20px';
    counter.style.position = 'absolute';
    counter.style.top = '20%';
    counter.style.left = '67.5%';

    let minusCount = document.createElement('i');
    minusCount.classList.add('fa-solid', 'fa-minus', 'minusCountClass');
    minusCount.style.fontSize = '1rem';
    minusCount.style.color = 'rgb(238, 122, 6)';
    minusCount.style.margin = '2% 0 0 10%';
    minusCount.style.cursor = 'pointer';

    let numberCount = document.createElement('input');
    numberCount.className = 'countClass';
    numberCount.value = product.quantity;
    numberCount.disabled = true;
    numberCount.style.width = '25%';
    numberCount.style.paddingLeft = '3%';
    numberCount.style.border = 'none';
    numberCount.style.color = 'rgb(238, 122, 6)';
    numberCount.style.fontSize = '1.2rem';
    numberCount.style.margin = '2% 0 0 15%';

    let plusCount = document.createElement('i');
    plusCount.className = 'plusCountClass';
    plusCount.classList.add('fa-solid', 'fa-plus');
    plusCount.style.fontSize = '1rem';
    plusCount.style.color = 'rgb(238, 122, 6)';
    plusCount.style.margin = '2% 0 0 12%';
    plusCount.style.cursor = 'pointer';

    let createCustomise = document.createElement('h4');
    createCustomise.style.fontFamily = 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif';
    createCustomise.innerHTML = 'Customise';
    createCustomise.style.color = 'rgb(238, 122, 6)';
    createCustomise.style.fontSize = '1rem';
    createCustomise.style.position = 'absolute';
    createCustomise.style.top = '70%';
    createCustomise.style.left = '5%';

    let createPrice = document.createElement('input');
    createPrice.style.display = 'block';
    createPrice.style.fontFamily = 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif';
    createPrice.disabled = true;
    createPrice.style.width = '23%';
    createPrice.style.border = 'none';
    createPrice.style.color = 'black';
    createPrice.style.fontWeight = '700';
    createPrice.style.backgroundColor = 'white';
    createPrice.style.fontSize = '1.05rem';
    createPrice.style.position = 'absolute';
    createPrice.style.top = '70%';
    createPrice.style.left = '74%';
    createPrice.value = `₹${(product.price * product.quantity).toFixed(2)}/-`;

    counter.appendChild(minusCount);
    counter.appendChild(numberCount);
    counter.appendChild(plusCount);
    createDiv.appendChild(counter);
    createDiv.appendChild(createCustomise);
    createDiv.appendChild(createPrice);
    createDiv.appendChild(foodNameCart);
    outerDivCart.insertBefore(createDiv, subtotal);

    plusCount.addEventListener('click', () => {
        let count = Number(numberCount.value);
        count += 1;
        numberCount.value = count;
        product.quantity = count;
        createPrice.value = `₹${(product.price * count).toFixed(2)}/-`;
        updateTotalPrice();
    });

    minusCount.addEventListener('click', () => {
        let count = Number(numberCount.value);
        if (count > 1) {
            count -= 1;
            numberCount.value = count;
            product.quantity = count;
            createPrice.value = `₹${(product.price * count).toFixed(2)}/-`;
        } else {
            outerDivCart.removeChild(createDiv);
            cart.splice(cart.indexOf(product), 1);
            if (cart.length === 0) {
                addToCart.style.display = 'none';
            }
        }
        updateTotalPrice();
    });
}

function updateCartDisplay() {
    cart.forEach(product => {
        document.querySelectorAll('.targetCreateDiv').forEach(div => {
            if (div.querySelector('h3').textContent === product.name) {
                let countInput = div.querySelector('.countClass');
                let createPrice = div.querySelector('input[type="text"]');
                countInput.value = product.quantity;
                createPrice.value = product.price * product.quantity;
            }
        });
    });
}

function updateTotalPrice() {
    let totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    totalPriceDisplay.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i> ${totalPrice.toFixed(2)}/-`;
}

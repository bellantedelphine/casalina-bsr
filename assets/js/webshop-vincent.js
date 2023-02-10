const isElementDisplayed = (ele) => {
  return window.getComputedStyle(ele).display !== 'none';
};

document.addEventListener('click', (e) => {
  // console.log(e.target);
  // console.log(e.target.closest('.menu--item--dropdown'));
  if (e.target.closest('.menu--item--dropdown')) return;
  dropdownMenu.style.display = 'none';
});

// menu desktop
const menuItemDropdown = document.querySelector('.menu--item--dropdown');
const dropdownMenu = document.querySelector('.dropdown--menu');
menuItemDropdown.addEventListener('click', (e) => {
  dropdownMenu.style.display = 'block';
});

// menu phone
const btnMenu = document.querySelector('.btn--menu');
const menuXs = document.querySelector('.menu--xs');
const menuItemDropdownXs = document.querySelector('.menu--item--dropdown--xs');
const dropdownMenuXS = document.querySelector('.dropdown--menu--xs');

const HAMBURGER = 'icon--hamburger';
const CLOSE = 'icon--close';
btnMenu.addEventListener('click', (e) => {
  if (e.target.classList.contains(HAMBURGER)) {
    e.target.classList.remove(HAMBURGER);
    e.target.classList.add(CLOSE);
    menuXs.style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
  } else {
    e.target.classList.add(HAMBURGER);
    e.target.classList.remove(CLOSE);
    menuXs.style.display = 'none';
    document.querySelector('body').style.overflow = 'scroll';
  }
});

menuItemDropdownXs.addEventListener('click', (e) => {
  if (!isElementDisplayed(dropdownMenuXS)) {
    dropdownMenuXS.style.display = 'block';
  } else {
    dropdownMenuXS.style.display = 'none';
  }
});

// commande
const PRODUCTS = [
  {
    name: 'figo',
    id: 'figo',
    price: 25,
    quantity: 0,
    content: [
      '1 confiture samore',
      '1 confiture de figue',
      '1 chutney de prunes',
      '2 passata',
      '1 sirop de baies de sureau',
    ],
  },
  {
    name: 'oro di puglia',
    id: 'oro_di_puglia',
    price: 40,
    quantity: 0,
    content: [
      "1 bouteille d'huile d'olive",
      '1 ketchup',
      '2 passata',
      '1 confiture de figue',
      '1 chutney de prunes',
    ],
  },
  {
    name: 'grande belezza',
    id: 'grande_belezza',
    price: 50,
    quantity: 0,
    content: [
      "1 bouteille d'huile d'olive",
      '3 passata 1 ketchup',
      '1 confiture de figue',
      "1 confiture d'amarene",
      '1 confiture samore',
      '1 confiture de sambuco',
      "1 bouteille d'amaro",
    ],
  },
];

const productSuggestBtns = document.querySelectorAll(
  '.product--last-line > button'
);

const addRemoveOrderLineImg = document.querySelectorAll(
  '.order--quantity >img'
);

addRemoveOrderLineImg.forEach((img) => {
  img.addEventListener('click', (e) => {
    console.count();
  });
});

const resetCartModal = () => {
  modal.classList.toggle('hidden');
  document.querySelector('.order--content').innerHTML = '';
  const hiddenSuggestedProducts = document.querySelectorAll(
    '.carousel__slide.hidden'
  );
  hiddenSuggestedProducts.forEach((hiddenProduct) =>
    hiddenProduct.classList.toggle('hidden')
  );
};

// close modal
const modalCloseBtn = document.querySelector('.btn--icon.icon--close');
const modal = document.querySelector('.modal');
// modalCloseBtn.addEventListener('click', resetCartModal);

// open modal
const cardFooterBtns = document.querySelectorAll('.product--footer > .btn');

productSuggestBtns.forEach((addProductBtn) => {
  addProductBtn.addEventListener('click', (e) => {
    const { productId } = e.currentTarget.dataset;
    const product = PRODUCTS.find((x) => x.id === productId);
    insertOrderLine(product);
    updateProductSuggestedVisibility(product);
  });
});
// card outside the modal
cardFooterBtns.forEach((cardBtn) => {
  cardBtn.addEventListener('click', (e) => {
    modal.classList.toggle('hidden');
    const selectedProductId = e.currentTarget.dataset.productId;
    const selectedProduct = PRODUCTS.find((x) => x.id === selectedProductId);
    console.count();
    updateProductSuggestedVisibility(selectedProduct);
    insertOrderLine(selectedProduct);
  });
});

const updateProductSuggestedVisibility = (product) => {
  document
    .querySelector(`#product_slide_${product.id}`)
    .classList.toggle('hidden');
  // hide suggestion producs when there is no more suggestion
  const hiddenSuggestedProducts = document.querySelectorAll(
    '.carousel__slide.hidden'
  );
  if (hiddenSuggestedProducts.length === PRODUCTS.length) {
    document.querySelector('.order--total + h2').classList.toggle('hidden');
  }
};

const insertOrderLine = (product) => {
  const orderContent = document.querySelector('.order--content');
  product.quantity = 1;
  const htmlToInsert = `
  <div class="order--line" data-product-id="${product.id}">
            <span class="order--product">${product.name}</span>
            <span class="quantity--controls">

            <svg data-action="remove" data-product-id="${
              product.id
            }" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.66634 7.33325V8.66659H11.333V7.33325H4.66634ZM7.99967 1.33325C4.31967 1.33325 1.33301 4.31992 1.33301 7.99992C1.33301 11.6799 4.31967 14.6666 7.99967 14.6666C11.6797 14.6666 14.6663 11.6799 14.6663 7.99992C14.6663 4.31992 11.6797 1.33325 7.99967 1.33325ZM7.99967 13.3333C5.05967 13.3333 2.66634 10.9399 2.66634 7.99992C2.66634 5.05992 5.05967 2.66659 7.99967 2.66659C10.9397 2.66659 13.333 5.05992 13.333 7.99992C13.333 10.9399 10.9397 13.3333 7.99967 13.3333Z" fill="#0A313E"/>
            </svg>
              <span class="order--quantity">${product.quantity}</span>
              <svg data-action="add" data-product-id="${
                product.id
              }" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.33301 11.3333H8.66634V8.66659H11.333V7.33325H8.66634V4.66659H7.33301V7.33325H4.66634V8.66659H7.33301V11.3333ZM7.99967 14.6666C7.07745 14.6666 6.21079 14.4915 5.39967 14.1413C4.58856 13.7915 3.88301 13.3166 3.28301 12.7166C2.68301 12.1166 2.20812 11.411 1.85834 10.5999C1.50812 9.78881 1.33301 8.92214 1.33301 7.99992C1.33301 7.0777 1.50812 6.21103 1.85834 5.39992C2.20812 4.58881 2.68301 3.88325 3.28301 3.28325C3.88301 2.68325 4.58856 2.20814 5.39967 1.85792C6.21079 1.50814 7.07745 1.33325 7.99967 1.33325C8.9219 1.33325 9.78856 1.50814 10.5997 1.85792C11.4108 2.20814 12.1163 2.68325 12.7163 3.28325C13.3163 3.88325 13.7912 4.58881 14.141 5.39992C14.4912 6.21103 14.6663 7.0777 14.6663 7.99992C14.6663 8.92214 14.4912 9.78881 14.141 10.5999C13.7912 11.411 13.3163 12.1166 12.7163 12.7166C12.1163 13.3166 11.4108 13.7915 10.5997 14.1413C9.78856 14.4915 8.9219 14.6666 7.99967 14.6666ZM7.99967 13.3333C9.48856 13.3333 10.7497 12.8166 11.783 11.7833C12.8163 10.7499 13.333 9.48881 13.333 7.99992C13.333 6.51103 12.8163 5.24992 11.783 4.21659C10.7497 3.18325 9.48856 2.66659 7.99967 2.66659C6.51079 2.66659 5.24967 3.18325 4.21634 4.21659C3.18301 5.24992 2.66634 6.51103 2.66634 7.99992C2.66634 9.48881 3.18301 10.7499 4.21634 11.7833C5.24967 12.8166 6.51079 13.3333 7.99967 13.3333Z" fill="#0A313E"/>
              </svg>
              </span>
            <span class="order--price">${
              product.quantity * product.price
            } </span>
          </div>
  `;
  if (orderContent.innerHTML) {
    orderContent.insertAdjacentHTML('beforeend', htmlToInsert);
  } else {
    orderContent.innerHTML = htmlToInsert;
  }
  addClickListenerOnLineOrderBtns();
  updateTotalPrice();
};

const addClickListenerOnLineOrderBtns = () => {
  const productQuantityBtns = document.querySelectorAll(
    '.quantity--controls > svg'
  );
  for (
    let i = productQuantityBtns.length - 2;
    i < productQuantityBtns.length;
    i++
  ) {
    productQuantityBtns[i].addEventListener('click', (e) => {
      const { action, productId } = e.currentTarget.dataset;
      handleClickOnOrderLineQuantity(
        action,
        PRODUCTS.find((x) => x.id === productId)
      );
    });
  }
};

const handleClickOnOrderLineQuantity = (action, product) => {
  if (action === 'add') {
    product.quantity++;
  } else {
    if (product.quantity >= 1) {
      product.quantity--;
    }
  }
  updateProductLine(product);
};

const updateProductLine = (product) => {
  const productLine = document.querySelector(
    `.order--line[data-product-id="${product.id}"]`
  );
  productLine.querySelector('.order--quantity').textContent = product.quantity;
  productLine.querySelector('.order--price').textContent =
    product.quantity * product.price;
  updateTotalPrice();
};

const updateTotalPrice = () => {
  let total = 0;
  document.querySelectorAll('.order--price').forEach((price) => {
    total += +price.textContent;
  });
  document.querySelector('#total_order').textContent = total;
};

document.addEventListener(
  'scroll',
  function () {
    const heroPicture = document.querySelector('.hero--picture');
    isInViewport(heroPicture);
    console.log(isInViewport(heroPicture));
  },
  {
    passive: true,
  }
);

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  // console.log('ELement');
  console.log(rect.top);
  // console.log('window');
  // console.log(window.innerHeight);
  // console.log(document.documentElement.clientHeight);
  return (
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.top >= -40 &&
    rect.top <= 20
  );
}

// switch color
// const color_container = document.querySelector('.color--container');
// const color1 = document.querySelector('.color-1');
// const maiin = document.querySelector('main');
// color_container.addEventListener('click', (e) => {
//   const newColor = e.target.classList[e.target.classList.length - 1];
//   if (newColor.includes('color-')) {
//     maiin.className = newColor;
//   }
// });

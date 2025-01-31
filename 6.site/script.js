// Получаем элементы по ID
const themeToggleBtn = document.getElementById('themeToggleBtn');
const loginBtn = document.getElementById('loginBtn');
const loginModalElement = document.getElementById('loginModal');
let loginModal;

// Инициализируем модальное окно, если оно существует
if (loginModalElement) {
  loginModal = new bootstrap.Modal(loginModalElement);
}

// Функция для обновления текста кнопки переключения темы
const updateButtonText = (isLight) => {
  if (isLight) {
    themeToggleBtn.textContent = 'Тёмная тема';
    themeToggleBtn.setAttribute('aria-label', 'Переключить на тёмную тему');
  } else {
    themeToggleBtn.textContent = 'Светлая тема';
    themeToggleBtn.setAttribute('aria-label', 'Переключить на светлую тему');
  }
};

// Получаем текущую тему из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light-theme') {
    document.body.classList.add('light-theme');
    updateButtonText(true);
    // Меняем класс Navbar для корректного отображения
    document.querySelector('.navbar').classList.remove('navbar-dark');
    document.querySelector('.navbar').classList.add('navbar-light');
  } else {
    updateButtonText(false);
    // Меняем класс Navbar для корректного отображения
    document.querySelector('.navbar').classList.remove('navbar-light');
    document.querySelector('.navbar').classList.add('navbar-dark');
  }
});

// Обработчик клика по кнопке переключения темы
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    updateButtonText(isLight);
    localStorage.setItem('theme', isLight ? 'light-theme' : 'dark-theme');
    // Меняем класс Navbar для корректного отображения
    if (isLight) {
      document.querySelector('.navbar').classList.remove('navbar-dark');
      document.querySelector('.navbar').classList.add('navbar-light');
    } else {
      document.querySelector('.navbar').classList.remove('navbar-light');
      document.querySelector('.navbar').classList.add('navbar-dark');
    }
  });
} else {
  console.error("Кнопка переключения темы с ID 'themeToggleBtn' не найдена.");
}

// Обработчик клика по кнопке "Вход"
if (loginBtn && loginModal) {
  loginBtn.addEventListener('click', () => {
    loginModal.show();
  });
} else {
  console.error("Кнопка 'Вход' с ID 'loginBtn' или модальное окно не найдены.");
}

// Обработчик формы входа (пример)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const phone = document.getElementById('loginPhone').value;

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Phone:', phone);

    loginModal.hide();
    loginForm.reset();
  });
} else {
  console.error("Форма входа с ID 'loginForm' не найдена.");
}

// Инициализируем карусель (если есть)
document.addEventListener('DOMContentLoaded', function () {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((carousel) => {
    new bootstrap.Carousel(carousel, {
      interval: 4000,
      ride: 'carousel'
    });
  });
});

// Анимация для карточек animate-card
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.animate-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  cards.forEach(card => observer.observe(card));
});


// script.js

// Получение элементов корзины
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const totalQuantityElement = document.getElementById('total-quantity');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout');
const emptyCartMessage = document.getElementById('empty-cart-message');

// Получение элементов хедера для отображения количества товаров
const cartLink = document.querySelector('.navbar .nav-link[href="cart.html"]');
const cartBadge = document.createElement('span');
cartBadge.classList.add('badge', 'bg-danger', 'ms-1');
cartBadge.id = 'cart-badge';
cartLink.appendChild(cartBadge);

// Функция для получения корзины из localStorage
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Функция для сохранения корзины в localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Функция для обновления количества товаров в хедере
function updateCartBadge() {
  const cart = getCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalQuantity > 0) {
    cartBadge.textContent = totalQuantity;
    cartBadge.style.display = 'inline-block';
  } else {
    cartBadge.style.display = 'none';
  }
}

// Функция для отображения корзины
function renderCart() {
  const cart = getCart();
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    emptyCartMessage.style.display = 'block';
    return;
  } else {
    emptyCartMessage.style.display = 'none';
  }

  let total = 0;
  let totalQuantity = 0;

  cart.forEach((item, index) => {
    const row = document.createElement('tr');

    // Товар (изображение)
    const productCell = document.createElement('td');
    productCell.setAttribute('data-label', 'Товар');
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.classList.add('cart-item-image');
    productCell.appendChild(img);
    row.appendChild(productCell);

    // Название товара
    const nameCell = document.createElement('td');
    nameCell.setAttribute('data-label', 'Название');
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    // Цена
    const priceCell = document.createElement('td');
    priceCell.setAttribute('data-label', 'Цена');
    priceCell.textContent = `${item.price} €`;
    row.appendChild(priceCell);

    // Количество
    const quantityCell = document.createElement('td');
    quantityCell.setAttribute('data-label', 'Количество');
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = '1';
    quantityInput.value = item.quantity;
    quantityInput.classList.add('form-control', 'cart-quantity-input');
    quantityInput.addEventListener('change', (e) => {
      const newQuantity = parseInt(e.target.value);
      if (isNaN(newQuantity) || newQuantity < 1) {
        e.target.value = item.quantity;
        return;
      }
      cart[index].quantity = newQuantity;
      saveCart(cart);
      renderCart();
      updateCartBadge();
    });
    quantityCell.appendChild(quantityInput);
    row.appendChild(quantityCell);

    // Сумма
    const sumCell = document.createElement('td');
    sumCell.setAttribute('data-label', 'Сумма');
    const sum = item.price * item.quantity;
    sumCell.textContent = `${sum} €`;
    row.appendChild(sumCell);
    total += sum;
    totalQuantity += item.quantity;

    // Действия
    const actionsCell = document.createElement('td');
    actionsCell.setAttribute('data-label', 'Действия');
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('cart-remove-btn');
    removeBtn.innerHTML = '&times;';
    removeBtn.addEventListener('click', () => {
      removeItem(index);
    });
    actionsCell.appendChild(removeBtn);
    row.appendChild(actionsCell);

    cartItemsContainer.appendChild(row);
  });

  totalPriceElement.textContent = `${total} €`;
  totalQuantityElement.textContent = totalQuantity;

  // Обновление количества в хедере
  updateCartBadge();
}

// Функция для удаления товара из корзины
function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
  updateCartBadge();
}

// Функция для очистки корзины
function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
  updateCartBadge();
}

// Функция для оформления заказа
function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    alert('Ваша корзина пуста.');
    return;
  }
  // Здесь можно добавить логику оформления заказа, например, отправку данных на сервер
  alert('Заказ оформлен!');
  clearCart();
}

// Функция для добавления товара в корзину
function addToCart(name, price, image) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.name === name);

  if (existingItemIndex !== -1) {
    // Если товар уже в корзине, увеличиваем его количество
    cart[existingItemIndex].quantity += 1;
  } else {
    // Иначе добавляем новый товар
    cart.push({
      name: name,
      price: parseFloat(price),
      image: image,
      quantity: 1
    });
  }

  saveCart(cart);
  renderCart();
  updateCartBadge();
}

// Обработчик формы добавления товара (если существует)
const addProductForm = document.getElementById('add-product-form');
if (addProductForm) {
  addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value.trim();
    const price = document.getElementById('productPrice').value.trim();
    const image = document.getElementById('productImage').value.trim();

    if (name === '' || price === '' || image === '') {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    if (isNaN(price) || parseFloat(price) < 1) {
      alert('Пожалуйста, введите корректную цену.');
      return;
    }

    addToCart(name, price, image);
    addProductForm.reset();
    alert(`${name} добавлен(а) в корзину.`);
  });
} else {
  console.error("Форма добавления товара с ID 'add-product-form' не найдена.");
}

// Обработчик кнопок "Добавить в корзину"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = button.getAttribute('data-price');
    const image = button.getAttribute('data-image');

    addToCart(name, price, image);
    alert(`${name} добавлен(а) в корзину.`);
  });
});

// Инициализация корзины и обновление количества в хедере при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateCartBadge();

  // Обработчики кнопок
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', checkout);
  }
});

/// Получаем кнопку переключения темы по ID
const themeToggleBtn = document.getElementById('themeToggleBtn');

// Если элемент найден, продолжаем
if (themeToggleBtn) {
  // Получаем текущую тему из localStorage, если она есть
  const currentTheme = localStorage.getItem('theme') || null;

  // Функция обновления текста кнопки в зависимости от темы
  const updateButtonText = (theme) => {
    if (theme === 'light-theme') {
      themeToggleBtn.textContent = 'Тёмная тема';  
      themeToggleBtn.setAttribute('aria-label', 'Переключить на тёмную тему');
    } else {
      themeToggleBtn.textContent = 'Светлая тема';  
      themeToggleBtn.setAttribute('aria-label', 'Переключить на светлую тему');
    }
  };

  // При загрузке страницы, если сохранена тема, добавляем соответствующий класс на <body>
  if (currentTheme) {
    document.body.classList.add(currentTheme);
    updateButtonText(currentTheme);
  } else {
    // Если темы не сохранены, по умолчанию оставляем текущую (например, тёмную)
    updateButtonText('dark-theme');
  }

  // При клике на кнопку переключаем тему
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');

    if (document.body.classList.contains('light-theme')) {
      updateButtonText('light-theme');
      localStorage.setItem('theme', 'light-theme');
    } else {
      updateButtonText('dark-theme');
      localStorage.setItem('theme', 'dark-theme');
    }
  });
} else {
  console.error("Кнопка переключения темы с ID 'themeToggleBtn' не найдена.");
}


// Проверяем, существует ли кнопка "Вход"
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    loginModal.show();
  });
} else {
  console.error("Кнопка 'Вход' с ID 'loginBtn' не найдена.");
}

// Получаем форму входа по ID
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

// Инициализируем карусель
document.addEventListener('DOMContentLoaded', function () {
  new bootstrap.Carousel('#autoCarousel', {
    interval: 4000,
    ride: 'carousel'
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

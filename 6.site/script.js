// Получаем кнопку переключения темы по ID
const themeToggleBtn = document.getElementById('themeToggleBtn');

// Получаем кнопку "Вход" по ID
const loginBtn = document.getElementById('loginBtn');

// Получаем модальное окно по ID и инициализируем его с помощью Bootstrap Modal API
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

// Проверяем, существует ли кнопка переключения темы
if (themeToggleBtn) {
  // Получаем текущее значение темы из localStorage, если оно есть
  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

  // Функция для обновления текста кнопки в зависимости от темы
  const updateButtonText = (theme) => {
    if (theme === 'light-theme') {
      themeToggleBtn.textContent = 'Тёмная тема'; // Устанавливаем текст кнопки для светлой темы
      themeToggleBtn.setAttribute('aria-label', 'Переключить на тёмную тему'); // Обновляем атрибут aria-label
    } else {
      themeToggleBtn.textContent = 'Светлая тема'; // Устанавливаем текст кнопки для тёмной темы
      themeToggleBtn.setAttribute('aria-label', 'Переключить на светлую тему'); // Обновляем атрибут aria-label
    }
  };

  // Применяем сохранённую тему при загрузке страницы
  if (currentTheme) {
    document.body.classList.add(currentTheme); // Добавляем класс темы к body
    updateButtonText(currentTheme); // Обновляем текст кнопки
  } else {
    // Если тема не сохранена, устанавливаем тёмную тему по умолчанию
    updateButtonText('dark-theme'); // Устанавливаем текст кнопки для тёмной темы
  }

  // Добавляем обработчик события для переключения темы при клике
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme'); // Переключаем класс темы

    if (document.body.classList.contains('light-theme')) {
      // Если сейчас светлая тема, переключаемся на тёмную
      updateButtonText('light-theme'); // Обновляем текст кнопки
      localStorage.setItem('theme', 'light-theme'); // Сохраняем выбранную тему в localStorage
    } else {
      // Если сейчас тёмная тема, переключаемся на светлую
      updateButtonText('dark-theme'); // Обновляем текст кнопки
      localStorage.setItem('theme', 'dark-theme'); // Сохраняем выбранную тему в localStorage
    }
  });
} else {
  // Выводим ошибку в консоль, если кнопка переключения темы не найдена
  console.error("Кнопка переключения темы с ID 'themeToggleBtn' не найдена.");
}

// Проверяем, существует ли кнопка "Вход"
if (loginBtn) {
  // Добавляем обработчик события для открытия модального окна при клике на кнопку "Вход"
  loginBtn.addEventListener('click', () => {
    loginModal.show(); // Показываем модальное окно
  });
} else {
  // Выводим ошибку в консоль, если кнопка "Вход" не найдена
  console.error("Кнопка 'Вход' с ID 'loginBtn' не найдена.");
}

// Получаем форму входа по ID
const loginForm = document.getElementById('loginForm');

// Проверяем, существует ли форма входа
if (loginForm) {
  // Добавляем обработчик события отправки формы
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузка страницы)
    
    // Получаем значения полей формы
    const email = document.getElementById('loginEmail').value; // Значение email
    const password = document.getElementById('loginPassword').value; // Значение пароля
    const phone = document.getElementById('loginPhone').value; // Значение номера телефона

    // Здесь можно добавить логику проверки логина, пароля и номера телефона
    // Например, отправка данных на сервер или валидация

    // Для демонстрации выводим данные в консоль
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Phone:', phone);

    // Закрываем модальное окно после отправки
    loginModal.hide();
    
    // Очищаем форму
    loginForm.reset();
  });
} else {
  // Выводим ошибку в консоль, если форма входа не найдена
  console.error("Форма входа с ID 'loginForm' не найдена.");
}

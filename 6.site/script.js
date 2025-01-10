document.addEventListener('DOMContentLoaded', () => {
  /**
   * Функция инициализирует слайдер.
   * @param {string} sliderSelector - селектор контейнера слайдов
   * @param {string} prevBtnSelector - селектор кнопки «Назад»
   * @param {string} nextBtnSelector - селектор кнопки «Вперёд»
   */
  function initSlider(sliderSelector, prevBtnSelector, nextBtnSelector) {
    const slider = document.querySelector(sliderSelector);
    if (!slider) return;

    // Все слайды внутри данного контейнера
    const slides = slider.querySelectorAll('.slide-item');
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);

    let currentSlide = 0;

    // Обновляем позицию контейнера в зависимости от currentSlide
    function updateSlider() {
      const slideWidth = slider.offsetWidth; 
      slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    // Клики по кнопкам
    nextBtn.addEventListener('click', () => {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateSlider();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
      }
    });

    // Если меняется размер окна — пересчитываем ширину
    window.addEventListener('resize', updateSlider);

    // Начальная позиция
    updateSlider();
  }

  // Инициализация каждого слайдера
  initSlider('#benefitsSlider', '.benefits__prevBtn', '.benefits__nextBtn');
  initSlider('#testimonialsSlider', '.testimonials__prevBtn', '.testimonials__nextBtn');
  initSlider('#featuresSlider', '.features__prevBtn', '.features__nextBtn');
});

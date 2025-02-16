document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    let index = 0;

    function nextSlide() {
        index++;
        if (index >= slider.children.length) {
            index = 0;
        }
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    setInterval(nextSlide, 3000); // Змінювати слайд кожні 3 секунди
});

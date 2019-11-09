/*

### ПЕРЕМЕННЫЕ ###

price - цена выбранного предмета за 1 шт
extraPrice - надбавки радиокнопками и чекбоксами
result - конечная цена с учетом количества и надбавок

calc - div со всем калькулятором
myNum - input количества
myNum.value - количество
resultSpan - место вывода цены
mySel - select список предметов
radiosDiv - div с радиокнопками
radios - все input радиокнопки
checkBoxDiv - div с чекбоксом
checkbox - сам чекбокс

### КОНСТАНТЫ ###

OPTION_PRICE_ONE - цена первого задания за шт.
OPTION_PRICE_TWO - цена второго задания за шт.
OPTION_PRICE_THREE - цена третьего задания за шт.
NOTHING_EXTRA_PRICE - надбавка первого задания.
RADIO_ONE - надбавка первой радиокнопки второго задания.
RADIO_TWO - надбавка второй радиокнопки второго задания.
RADIO_THREE - надбавка третьей радиокнопки второго задания.
CHECKBOX - надбавка чекбокса третьего задания.

### ПРОЧЕЕ ###

.d-none - специальный класс из bootstrap (display: none);
*/

// Запускаем код при загрузке HTML без картинок
window.addEventListener("DOMContentLoaded", function () {
    // Инициализируем константы
    const OPTION_PRICE_ONE = 17000;
    const OPTION_PRICE_TWO = 20000;
    const OPTION_PRICE_THREE = 15000;
    const NOTHING_EXTRA_PRICE = 0;
    const RADIO_ONE = 10;
    const RADIO_TWO = 30;
    const RADIO_THREE = 50;
    const CHECKBOX = 50;
    // Инициализируем переменные
    let price = OPTION_PRICE_TWO;
    let extraPrice = RADIO_ONE;
    let result;
    // Инициализируем html элементы
    let calc = document.getElementById("calcin");
    let myNum = document.getElementById("my-num");
    let resultSpan = document.getElementById("result");
    let mySel = document.getElementById("my-sel");
    let radiosDiv = document.getElementById("my-radio-div");
    let radios = document.querySelectorAll("#my-radio-div input[type=radio]");
    let checkboxDiv = document.getElementById("my-checkbox-div");
    let checkbox = document.getElementById("my-checkbox");
    // Создаем обработчик на изменение списка предметов
    mySel.addEventListener("change", function (event) {
        // Выбранная option в select (т.е. выбранный предмет)
        let option = event.target;
        // Обработка выбранного option по его значению value
        if (option.value === "1") {
            // Скрываем чекбокс и радиокнопки
            radiosDiv.classList.add("d-none");
            checkboxDiv.classList.add("d-none");
            // Ставим надбавку и цену за шт.
            extraPrice = NOTHING_EXTRA_PRICE;
            price = OPTION_PRICE_ONE;
        }
        if (option.value === "2") {
            // Показываем радиокнопки и скрываем чекбокс
            radiosDiv.classList.remove("d-none");
            checkboxDiv.classList.add("d-none");
            // Ставим надбавку и цену за шт.
            extraPrice = RADIO_ONE;
            price = OPTION_PRICE_TWO;
            // Сбрасываем радиокнопку на первую
            document.getElementById("my-radio1").checked = true;
        }
        if (option.value === "3") {
            // Показываем чекбокс и скрываем радиокнопки
            checkboxDiv.classList.remove("d-none");
            radiosDiv.classList.add("d-none");
            // Ставим надбавку и цену за шт.
            extraPrice = NOTHING_EXTRA_PRICE;
            price = OPTION_PRICE_THREE;
            // Сбрасываем отметку чекбокса
            checkbox.checked = false;
        }
    });
    // Для каждой радиокнопки создаем обработчик на изменение
    radios.forEach(function (currentRadio) {
        currentRadio.addEventListener("change", function (event) {
            // Выбранная радиокнопка
            let radio = event.target;
            // Устанавливаем надбавку в зависимости от радиокнопки
            if (radio.value === "r1") {
                extraPrice = RADIO_ONE;
            }
            if (radio.value === "r2") {
                extraPrice = RADIO_TWO;
            }
            if (radio.value === "r3") {
                extraPrice = RADIO_THREE;
            }
        });
    });
    // Обработчик изменения чекбокса
    checkbox.addEventListener("change", function () {
        // Если галочка стоит, то добавляем надбавку.
        // Иначе сбрасываем ее
        if (checkbox.checked) {
            extraPrice = CHECKBOX;
        } else {
            extraPrice = NOTHING_EXTRA_PRICE;
        }
    });
    // Обработчик ЛЮБЫХ изменений в блоке калькулятора
    // Работа: что бы мы не нажали в блоке калькулятора
    // будь то чекбокс, радиокнопка, количество заданий
    // или предмет, будет заново пересчитываться результат
    calc.addEventListener("change", function () {
        // Защита от дебила. Если количество отрицательное
        if (myNum.value < 1) {
            myNum.value = 1;
        }
        // Пересчет результата
        // результат = цена за шт * количество + надбавка
        result = (price + extraPrice) * myNum.value;
        // Изменение цены в HTML (span#result)
        resultSpan.innerHTML = result;
    });
});

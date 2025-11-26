const skillsContainer = document.getElementById("skills");

const themeToggle = document.getElementById("themeToggle");
let styleMode = localStorage.getItem("styleMode");
const imageElement = document.querySelector('.themeToggleImg');
const buttonMenuBurgerIMG = document.querySelector('.button-menu_img');


// Меню бургер
const screenWidth = window.screen.width;
const buttonMenuBurger = document.getElementById('menu_burger');
const menu_buttons_box = document.querySelector('.menu_box-navigation');

function renderMenuBurger () {
    if (screenWidth <= 654) {
        buttonMenuBurger.classList.remove('none');
        menu_buttons_box .classList.add('none');
    }
}
function clickMenuBurger (menu_open) {
    if (menu_open) {
        menu_container_burger.classList.remove('none');
    } else {
        menu_container_burger.classList.add('none');
    }
}
const button_close = document.getElementById('button-close');
buttonMenuBurger.addEventListener("click", () => {
    clickMenuBurger(true);
});
const menu_container_burger = document.querySelector(".menu_container_burger");
const menu_container_burger_list = menu_container_burger.querySelectorAll(".menu_burger_button_item");
button_close.addEventListener("click", () => {
    clickMenuBurger(false);
});
menu_container_burger_list.forEach(item => {
    item.addEventListener('click', () => {
        clickMenuBurger(false);
    });
});




let currentLang = localStorage.getItem("lang") || "ru";
// Рендер скиллов
let skillsData = [];
let servicesData = [];
let reviewsData = [];
let projectsData = [];

function renderSkills() {
    skillsContainer.innerHTML = "";

    skillsData.forEach(skill => {
    const card = document.createElement("div");
    card.className = "box-skills-item";

    card.innerHTML = `
        <div class="box-skills-item_box-img">
            <img class="box-skills-item_img" src="${skill.image}" alt="${skill.name[currentLang]}">
        </div>

        <div class="box-skills-item_box-text">
        <span class="skill-name">
        ${skill.name[currentLang]}
        <span class="tag ${"Продвинутый" === skill.level['ru'] ? 'lvl_3' : "Средний" === skill.level['ru'] ? 'lvl_2' : 'lvl_1'}">${skill.level[currentLang]}</span>
        </span>
        <span class="skill-description">
        ${skill.info[currentLang]}
        </span>
        </div>
    `;

    skillsContainer.appendChild(card);
    });
}

const projectsContainer = document.querySelector(".slider-projects");
function renderProjects() {
    projectsContainer.innerHTML = "";

    projectsData.forEach(zxc => {
    const card = document.createElement("a");
    card.className = "card-projects";

    card.innerHTML = `
        <div class="card-projects_box-img">
            <img class="card-projects_img" src="${zxc.image}" alt="${zxc.name[currentLang]}">
        </div>
        <div class="card-projects_box-text">
            <h3 class="h3">${zxc.name[currentLang]}</h3>
            <p class="p">${zxc.info[currentLang]}</p>
        </div>
    `;

    projectsContainer.appendChild(card);
    });
}


// Тема
function applyTheme() {
    styleMode = localStorage.getItem("styleMode");
    if (styleMode !== 'dark') {
        document.body.setAttribute('dark', '');
        localStorage.setItem('styleMode', 'dark');
        imageElement.src = 'images/light_theme.png';
        buttonMenuBurgerIMG.src = 'images/burger_menu_icon_light.png';
        button_close.src = 'images/close_menu_icon_darker.png';
    } else {
        document.body.removeAttribute('dark');
        localStorage.setItem('styleMode', null);
        imageElement.src = 'images/darker_theme.png';
        buttonMenuBurgerIMG.src = 'images/burger_menu_icon_darker.png';
        button_close.src = 'images/close_menu_icon_light.png';
    }
}
themeToggle.addEventListener("click", () => {
    applyTheme();
});


// Язык
function toggleLanguage(qwe = true) {
    if (qwe) {
        currentLang = currentLang === "ru" ? "en" : "ru";
    }
    localStorage.setItem("lang", currentLang);
    renderSkills();
    renderProjects();

    setLanguageText();
    initProjectsSlider();
}
langToggle.addEventListener("click", toggleLanguage);

function setLanguageText() {
    currentLang = localStorage.getItem("lang") || "ru";
    const titleTechnologies = document.getElementById("Technologies");
    const Technologies_name = titleTechnologies.querySelector(".container-name");

    const titleProjects = document.getElementById("Projects");
    const Projects_name = titleProjects.querySelector(".container-name");

    Technologies_name.textContent = currentLang === "ru" ? "Навыки" : "Skills";
    Projects_name.textContent = currentLang === "ru" ? "Проекты" : "Projects";

    const searchTechnologies = document.getElementById('search-input')
    searchTechnologies.placeholder = currentLang === "ru" ? "Поиск..." : "Search...";


    const menu_box = document.querySelector(".menu_box-navigation");
    const list_item_menu = menu_box.querySelectorAll(".button-menu")
    list_item_menu[0].textContent = currentLang === "ru" ? "Обо мне" : "About me"; 
    list_item_menu[1].textContent = currentLang === "ru" ? "Навыки" : "Skills";
    list_item_menu[2].textContent = currentLang === "ru" ? "Проекты" : "Projects";
    
    const buttonLang = document.getElementById("langToggle");
    buttonLang.textContent = currentLang === "ru" ? "EN" : "RU";

    const header_box = document.querySelector(".header-text-box");
    const list_item_text = header_box.querySelectorAll(".text");

    // console.log(list_item_text)
    list_item_text[0].textContent = currentLang === "ru" ? "Обо мне:" : "About me:";
    list_item_text[1].textContent = currentLang === "ru" ? "Программирую с настоящим кайфом — особенно когда получается создать что-то новое и полезное. К коду подхожу ответственно: тестирую, рефакторю, пока не станет идеально. Обожаю разбираться в незнакомых технологиях ради решения сложных задач. Мечтаю работать в команде, где люди поддерживают друг друга и вместе делают продукты, которыми можно гордиться." : "I truly enjoy programming, especially when I create something new and useful. I approach my code responsibly: I test and refactor until it's perfect. I love figuring out unfamiliar technologies to solve complex problems. I dream of working in a team where people support each other and together create products they can be proud of.";
}


// Загрузка JSON
fetch("data/skills.json")
    .then(response => response.json())
    .then(data => {
    skillsData = data;
    renderSkills();
    })
    .catch(err => console.error("Ошибка загрузки JSON:", err));

fetch("data/reviews.json")
    .then(response => response.json())
    .then(data => {
    reviewsData = data;
    renderSkills();
    })
    .catch(err => console.error("Ошибка загрузки JSON:", err));

fetch("data/projects.json")
    .then(response => response.json())
    .then(data => {
    projectsData = data;
    renderProjects();
    // initProjectsSlider();
    applyTheme(false);
    toggleLanguage(false);
    })
    .catch(err => console.error("Ошибка загрузки JSON:", err));

function initProjectsSlider() {
    const container = document.querySelector(".box-projects");
    const cards = Array.from(container.querySelectorAll(".card-projects"));
    const leftBtn = container.querySelector(".button-slider.left");
    const rightBtn = container.querySelector(".button-slider.right");

    let startIndex = 0; // индекс первого показываемого элемента
    // const screenWidth = window.screen.width;
    let visibleCount = 0;
    if (screenWidth <= 810){
        visibleCount = 1; // сколько элементов показываем одновременно
    } else if (screenWidth <= 1150) {
        visibleCount = 2; 
    } else {
        visibleCount = 3; 
    }

    const total = cards.length;

    // показывать/скрывать стрелки
    if (total <= visibleCount) {
        leftBtn.style.display = "none";
        rightBtn.style.display = "none";
    }

    function render() {
        const q1 = startIndex;
        const q2 = startIndex + 1 > total - 1 ? startIndex + 1 - total : startIndex + 1;
        const q3 = startIndex + 2 > total - 1 ? startIndex + 2 - total : startIndex + 2;
        
        
        cards.forEach((card, i) => {
            // вычисляем индекс "окна" с учетом зацикливания

            if (i === q1) {
                card.style.display = "block";
                card.style.order = '1';
            } else if (i === q2  && visibleCount >= 2) {
                card.style.display = "block";
                card.style.order = '2';
            } else if (i === q3 && visibleCount === 3) {
                card.style.display = "block";
                card.style.order = '3';
            } else {
                card.style.display = "none";
            }
        });
    }

    leftBtn.addEventListener("click", () => {
        startIndex = startIndex - 1

        if (startIndex < 0) {
            startIndex = total - 1
        }
        render();
    });

    rightBtn.addEventListener("click", () => {
        startIndex = startIndex + 1

        if (startIndex > total - 1) {
            startIndex = 0
        }
        render();
    });

    render(); // первый рендер
}


document.addEventListener("DOMContentLoaded", () => {
    renderMenuBurger();
    const searchInput = document.getElementById("search-input");
    const itemsBox = document.querySelector(".box-skills");
    document.querySelectorAll(".container").forEach(category => {
        const header = category.querySelector(".toggle-header");
        const indicator = header.querySelector(".indicator");
        const Box = category.querySelector(".box-items");

        // Сворачивание / разворачивание
        header.addEventListener("click", (e) => {
            // console.log(category, Box, indicator)
            if (e.target === searchInput) return; // чтобы клик в поиск не сворачивал

            Box.classList.toggle("hidden");
            indicator.textContent = Box.classList.contains("hidden") ? "▷" : "▽";
        });
    });

    // Поиск внутри категории
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        const items = itemsBox.querySelectorAll(".box-skills-item");

        items.forEach(item => {
            const name = item.querySelector(".skill-name").textContent.toLowerCase();
            if (name.includes(query)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});
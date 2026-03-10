
// скрол
const sections = document.querySelectorAll(".section");

let current = 0;
let isScrolling = false;

function scrollToSection(index) {

    // циклический переход
    if (index >= sections.length) {
        index = 0;
    }

    if (index < 0) {
        index = sections.length - 1;
    }

    isScrolling = true;

    sections[index].scrollIntoView({
        behavior: "smooth"
    });

    current = index;

    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}

window.addEventListener("wheel", (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0) {
        scrollToSection(current + 1);
    } else {
        scrollToSection(current - 1);
    }
});

let touchStartY = 0;

window.addEventListener("touchstart", e => {
    touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchend", e => {
    if (isScrolling) return;

    let touchEndY = e.changedTouches[0].clientY;

    if (touchStartY - touchEndY > 50) {
        scrollToSection(current + 1);
    }

    if (touchEndY - touchStartY > 50) {
        scrollToSection(current - 1);
    }
});



// скилы
const tracks = document.querySelectorAll(".track");

tracks.forEach(track => {
  const items = [...track.children];

  items.forEach(el => {
    const clone = el.cloneNode(true);
    track.appendChild(clone);
  });
});


// печатаем текст
const words = [
    "программист",
    "web developer",
    "backend developer",
    "python coder"
];

let i = 0;      // слово
let j = 0;      // буква
let isDeleting = false;

const typing = document.getElementById("typing");

function typeEffect(){

    const currentWord = words[i];

    if(!isDeleting){
        typing.textContent = currentWord.substring(0, j+1);
        j++;

        if(j === currentWord.length){
        isDeleting = true;
        setTimeout(typeEffect, 1500); // пауза
        return;
        }

    } else {

        typing.textContent = currentWord.substring(0, j-1);
        j--;

        if(j === 0){
        isDeleting = false;
        i++;

        if(i === words.length){
            i = 0;
        }
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();




// проекты

const prodjectBox = document.getElementById('prodject')
let projectsData = [];

function nextLastItem(itemID){
    if (itemID === 0) {
        return [projectsData.length-1, 1];
    } else if (itemID === projectsData.length-1) {
        return [projectsData.length-2, 0];
    } else {
        return [itemID-1, itemID+1];
    }

}

function renderProjects(itemID = 0) {
    const btn = nextLastItem(itemID)
    prodjectBox.innerHTML = `
    <div class="prodject-box-content">
        <div class="prodject-box-img">
            <img src="./images/${projectsData[itemID].image}" alt="">
        </div>
        <div class="prodject-box-title">
            ${projectsData[itemID].name}
        </div>
        <div class="prodject-box-text">
            ${projectsData[itemID].info}
        </div>
    </div>

    <div class="prodject-box-btn">
        <button class="prodject-btn" onclick="renderProjects(${btn[0]})">⭠</button>
        <button class="prodject-btn" onclick="renderProjects(${btn[1]})">⭢</button>
    </div>
    `;
}

function renderSkill(data) {
    const boxAll = document.querySelectorAll('.track');
    console.log(boxAll)

    boxAll.forEach(box => {
        box.innerHTML = '';
        data.forEach(item => {
            const skill = document.createElement('span');
            skill.className = "skill";
            skill.innerText = item;
            box.appendChild(skill);
        });
    });
}


fetch("data/projects.json")
    .then(response => response.json())
    .then(data => {
    projectsData = data;
    renderProjects();
    })
    .catch(err => console.error("Ошибка загрузки JSON:", err));

fetch("data/skills.json")
    .then(response => response.json())
    .then(data => {
    renderSkill(data);
    })
    .catch(err => console.error("Ошибка загрузки JSON:", err));

// поиск
document.addEventListener('input', function(e) {
    if (e.target.id === 'search-input') {
        const query = e.target.value.toLowerCase().trim();
        const items = document.querySelectorAll(".skill");

        items.forEach(item => {
            const name = item.textContent.toLowerCase();
            if (!query) {
                item.style.color = '';
                return;
            }
            item.style.color = name.includes(query) ? 'red' : '';
        });


    
    } else if (e.target.classList.contains('my-class')) {

    }
});
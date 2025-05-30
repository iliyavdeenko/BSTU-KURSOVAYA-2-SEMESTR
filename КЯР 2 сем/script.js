let newsData = [];
let currentFilter = 'all';

async function fetchNews() {
    try {
        const response = await fetch("news.json");
        newsData = await response.json();
        setupFilters();
        loadNewsList();
        loadNewsDetails();
        loadMagazineList();
    } catch (error) {
        console.error("Ошибка загрузки новостей:", error);
    }
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            currentFilter = filter;
            
            // Обновляем активную кнопку
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Обновляем заголовок
            const title = document.querySelector('h2');
            if (title) {
                title.textContent = filter === 'all' ? 'Все журналы' : `Журналы "${filter}"`;
            }
            
            // Применяем фильтр
            loadNewsList();
        });
    });
}

function loadNewsList(amount = newsData.length) {
    const newsContainer = document.getElementById("news");
    if (!newsContainer) return;

    newsContainer.innerHTML = "";
    let checked = 0;

    const filteredNews = currentFilter === 'all' 
        ? newsData 
        : newsData.filter(news => news.category === currentFilter);

    filteredNews.forEach(news => {
        if (checked >= amount) return;
        checked++;

        const article = document.createElement("article");
        article.classList.add("news-item");

        article.innerHTML = `
            <section class="news-card">
                <h3 id="id${news.id}">${news.title}</h3>
                <img class="thumbnail" src=${news.img}>
                <p>${news.description}</p>
                <section class="space-between"> 
                    <button class="read" onclick="location.href='journal_page.html?id=${news.id}'">Подробнее</button>
                    <p>${news.data}</p>
                </section>
            </section>
        `;
        newsContainer.appendChild(article);
    });

    // Если нет результатов, показываем сообщение
    if (filteredNews.length === 0) {
        newsContainer.innerHTML = '<p class="no-results">Журналы не найдены</p>';
    }
}

function loadMagazineList(amount = newsData.length) {
    const strip = document.getElementById("magazineStrip");
    if (!strip) return;

    strip.innerHTML = "";
    let loaded = 0;

    newsData.forEach(item => {
        if (loaded >= amount) return;
        loaded++;

        const magazineItem = document.createElement("div");
        magazineItem.classList.add("magazine-item");

        magazineItem.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <h4>${item.title}</h4>
            <button class="read-button" onclick="location.href='journal_page.html?id=${item.id}'">❯</button>
        `;

        strip.appendChild(magazineItem);
    });
}


function loadNewsDetails() {
    const params = new URLSearchParams(window.location.search);
    const newsId = params.get("id");
    if (!newsId) return;

    const news = newsData.find(n => n.id == newsId);
    document.getElementById("back-button").setAttribute("href", `news_page.html#id${newsId}`);

    if (!news) {
        document.getElementById("news-title").textContent = "Новость не найдена";
        document.getElementById("news-content").textContent = "";
        return;
    }

    document.getElementById("news-title").textContent = news.title;
    document.getElementById("news-content").innerHTML = news.content; 
    document.getElementById("author").textContent = "Автор: " + news.author;
}

document.addEventListener("DOMContentLoaded", fetchNews);

const strip = document.getElementById('magazineStrip');
try{
    loadMagazineList();
}
catch (error) {
    console.error("Ошибка загрузки ленты:", error);
}
function scrollToLeft() {
    strip.scrollLeft -= 300; 
}

function scrollToRight() {
    strip.scrollLeft += 300;
}

document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-menu");

    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});
document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    try {
        const response = await fetch("news.json");
        const posts = await response.json();

        const mainPost = posts.find(p => p.id == id); // Найти нужный пост по ID
        const otherPosts = posts.filter(p => p.id != id); // Остальные

        renderMainCard(mainPost);
        renderSmallCards(otherPosts);
    } catch (error) {
        console.error("Ошибка загрузки журнала:", error);
    }
});

function renderMainCard(post) {
    const container = document.getElementById("main-card-container");
    if (!container || !post) return;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="thumbnail" style="background-image: url('${post.img || ""}'); background-size: cover;"></div>
        <div class="content">
            <h2>${post.title}</h2>
            <p class="date">${post.data}</p>
            <p>${post.description}</p>
            <button class="read" onclick="location.href='news.html?id=${post.id}'">Читать</button>
        </div>
    `;
    container.appendChild(card);
}

function renderSmallCards(posts, limit = 5) {
    const container = document.getElementById("small-cards-container");
    if (!container) return;

    posts.slice(0, limit).forEach(post => {
        const card = document.createElement("div");
        card.className = "small-card";
        card.innerHTML = `
            <div class="thumbnail" style="background-image: url('${post.img || ""}'); background-size: cover;"></div>
            <div class="content">
                <h4>${post.title}</h4>
                <p>${post.sdescription}</p>
                <p class="time">&#8853; ${post.data}</p>
                <button class="read" onclick="location.href='journal_page.html?id=${post.id}'">Подробнее</button>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-menu");

    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});
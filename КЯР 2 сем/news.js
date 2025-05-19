document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const titleEl = document.getElementById("news-title");
    const contentEl = document.getElementById("news-content");
    const authorEl = document.getElementById("author");
    const imgEl = document.getElementById("news-image");
    const backBtn = document.getElementById("back-button");

    if (!id) {
        if (titleEl) titleEl.textContent = "ID не указан.";
        return;
    }

    try {
        const response = await fetch("news.json");
        if (!response.ok) throw new Error("Не удалось загрузить файл news.json");

        const posts = await response.json();
        const post = posts.find(p => p.id == id);

        if (!post) {
            if (titleEl) titleEl.textContent = "Новость не найдена.";
            return;
        }

        if (titleEl) titleEl.textContent = post.title;
        if (authorEl) authorEl.textContent = "Автор: " + post.author;

        // Загрузка содержимого из файла
        if (contentEl && post.content) {
            const contentResponse = await fetch(post.content);
            if (contentResponse.ok) {
                const contentText = await contentResponse.text();
                contentEl.innerHTML = "<p>"+contentText+"</p>";
            } else {
                contentEl.textContent = "Не удалось загрузить содержимое.";
            }
        }

        if (imgEl) {
            if (post.img) {
                imgEl.src = post.img;
                imgEl.alt = post.title || "Новость";
                imgEl.style.display = "block";
            } else {
                imgEl.style.display = "none";
            }
        }

        if (backBtn) {
            backBtn.setAttribute("href", "journal_page.html?id=" + post.id);
        }
    } catch (error) {
        console.error("Ошибка при загрузке новости:", error);
        if (titleEl) titleEl.textContent = "Ошибка при загрузке новости.";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-menu");

    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
    });
});

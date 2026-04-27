fetch("https://api.jikan.moe/v4/anime")
  .then(response => response.json())
  .then(result => {
    const list = document.getElementById("anime-list");

    result.data.slice(0, 12).forEach(anime => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${anime.images.jpg.image_url}">
        <h3>${anime.title}</h3>
        <button>View Details</button>
      `;

      card.querySelector("button").onclick = () => {
        localStorage.setItem("animeId", anime.mal_id);
        window.location.href = "detail.html";
      };

      list.appendChild(card);
    });
  })
  .catch(error => console.error("Fetch error:", error));

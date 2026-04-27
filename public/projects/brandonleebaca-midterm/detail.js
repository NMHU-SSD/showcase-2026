const id = localStorage.getItem("animeId");

fetch(`https://api.jikan.moe/v4/anime/${id}`)
  .then(res => res.json())
  .then(data => {
    const anime = data.data;

    document.getElementById("title").textContent = anime.title;
    document.getElementById("poster").src = anime.images.jpg.image_url;
    document.getElementById("synopsis").textContent = anime.synopsis;
    document.getElementById("episodes").textContent = anime.episodes ?? "N/A";
    document.getElementById("score").textContent = anime.score ?? "N/A";
  })
  .catch(err => console.error(err));

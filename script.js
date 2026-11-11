const answers = document.querySelectorAll("#answers button");
const feedback = document.querySelector("#feedback");
answers.forEach((button) => {
  button.addEventListener("click", () => {
    answers.forEach((item) => item.classList.remove("correct", "wrong"));
    if (button.dataset.answer === "B") {
      button.classList.add("correct");
      feedback.textContent = "Doğru cevap! x = 5. Harika, devam et!";
    } else {
      button.classList.add("wrong");
      feedback.textContent = "Bu kez olmadı. 3x = 20 - 5 = 15, buradan x = 5. Tekrar dene!";
    }
  });
});


/* TYT Matematik konu secimi ve filtreleri */
(() => {
  const grid = document.querySelector("#topic-grid");
  if (!grid) return;
  const cards = [...grid.querySelectorAll(".topic-card")];
  const search = document.querySelector("#topic-search");
  const filters = [...document.querySelectorAll(".filter-button")];
  const empty = document.querySelector("#topic-empty");
  const title = document.querySelector("#selected-topic");
  const description = document.querySelector("#selected-description");
  let activeFilter = "all";
  function updateTopics() {
    const term = (search.value || "").toLocaleLowerCase("tr").trim();
    let visible = 0;
    cards.forEach(card => {
      const show = (activeFilter === "all" || card.dataset.category === activeFilter) && card.dataset.name.includes(term);
      card.hidden = !show;
      if (show) visible++;
    });
    empty.hidden = visible !== 0;
  }
  filters.forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach(item => item.classList.toggle("active", item === button));
    updateTopics();
  }));
  search.addEventListener("input", updateTopics);
  grid.addEventListener("click", event => {
    const button = event.target.closest(".topic-select");
    if (!button) return;
    title.textContent = button.dataset.topic;
    description.textContent = button.dataset.topic + " için ders sıramız: önce sade konu anlatımı, sonra video ders, adım adım örnek çözümler ve konu testi. Bu içerikler sırayla hazırlanacak.";
    document.querySelector("#ogrenme-plani").scrollIntoView({behavior:"smooth",block:"center"});
  });
})();

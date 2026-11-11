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
    if (!button || button.tagName === "A") return;
    title.textContent = button.dataset.topic;
    description.textContent = button.dataset.topic + " için ders sıramız: önce sade konu anlatımı, sonra video ders, adım adım örnek çözümler ve konu testi. Bu içerikler sırayla hazırlanacak.";
    document.querySelector("#ogrenme-plani").scrollIntoView({behavior:"smooth",block:"center"});
  });
})();


/* Temel Kavramlar mini test */
(() => {
  const test = document.querySelector("#test-questions");
  if (!test) return;
  const questions = [...test.querySelectorAll(".test-question")];
  const progress = document.querySelector("#question-progress");
  const result = document.querySelector("#test-result");
  const selected = new Map();
  questions.forEach((question, index) => {
    const buttons = [...question.querySelectorAll("[data-option]")];
    buttons.forEach(button => button.addEventListener("click", () => {
      if (result.hidden === false) return;
      selected.set(index, button.dataset.option);
      buttons.forEach(item => item.classList.toggle("selected", item === button));
      progress.textContent = "İşaretlenen soru: " + selected.size + " / " + questions.length;
    }));
  });
  document.querySelector("#finish-test").addEventListener("click", () => {
    let correct = 0, wrong = 0, blank = 0;
    questions.forEach((question, index) => {
      const answer = question.dataset.answer;
      const choice = selected.get(index);
      const buttons = [...question.querySelectorAll("[data-option]")];
      buttons.forEach(button => {
        button.disabled = true;
        if (button.dataset.option === answer) button.classList.add("answer-correct");
        else if (button.dataset.option === choice) button.classList.add("answer-wrong");
      });
      if (!choice) blank++;
      else if (choice === answer) correct++;
      else wrong++;
      question.querySelector(".question-feedback").textContent =
        (choice === answer ? "Doğru! " : choice ? "Yanlış. " : "Boş bırakıldı. ") + question.dataset.explanation;
    });
    const net = correct - wrong / 4;
    document.querySelector("#correct-count").textContent = correct;
    document.querySelector("#wrong-count").textContent = wrong;
    document.querySelector("#blank-count").textContent = blank;
    document.querySelector("#net-count").textContent = Number.isInteger(net) ? net : net.toFixed(2);
    document.querySelector("#result-message").textContent =
      correct >= 8 ? "Çok iyi! Konunun temelini kavramış görünüyorsun." :
      correct >= 5 ? "Güzel başlangıç. Yanlış yaptığın açıklamaları tekrar incele." :
      "Konu anlatımını yeniden gözden geçirip testi tekrar çözmeni öneririz.";
    result.hidden = false;
    progress.textContent = "Test tamamlandı";
    result.scrollIntoView({behavior:"smooth",block:"center"});
  });
  document.querySelector("#reset-test").addEventListener("click", () => {
    selected.clear();
    questions.forEach(question => {
      question.querySelectorAll("button").forEach(button => {
        button.disabled = false;
        button.classList.remove("selected","answer-correct","answer-wrong");
      });
      question.querySelector(".question-feedback").textContent = "";
    });
    result.hidden = true;
    progress.textContent = "Soru 1 / " + questions.length;
  });
})();

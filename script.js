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

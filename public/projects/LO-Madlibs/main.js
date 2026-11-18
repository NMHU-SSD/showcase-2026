document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("form");
  const storyBox = document.getElementById("newstory");
  const resetBtn = document.getElementById("resetBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const noun = document.getElementById("noun").value;
    const adjective = document.getElementById("adjective").value;
    const verb = document.getElementById("verb").value;
    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);

    let tone =
      age < 10
        ? "with beautiful imagination"
        : age >= 10 && age <= 25
        ? "full of youthful exuberance"
        : age > 25 && age < 60
        ? "with a calm and thoughtful spirit"
        : "full of wisdom";

    
    const templates = [
      `${name}, ${tone}, decided to ${verb} the ${adjective} ${noun} after thinking for a while.`,
      `On a bright morning, ${name} found a ${adjective} ${noun} and started to ${verb} ${tone}.`,
      `${name} picked up the ${noun}, feeling ${adjective}, and began to ${verb} ${tone}.`,
      `While searching for answers, ${name} chose to ${verb} the ${adjective} ${noun} ${tone}.`,
      `At age ${age}, ${name} discovered a ${adjective} ${noun} and started ${verb} ${tone}.`,
      `At age ${age}, ${name} noticed a ${adjective} ${noun} and chose to ${verb} ${tone}, embracing the moment quietly.`,
      `At age ${age}, ${name} stumbled upon a ${adjective} ${noun} and began to ${verb} ${tone}, bursting with excitement.`,
      `At age ${age}, ${name} uncovered a ${adjective} ${noun} and decided to ${verb} ${tone}, as if destiny had called.`
    ];

    
    const randomStory = templates[Math.floor(Math.random() * templates.length)];

    storyBox.textContent = randomStory;
  });

  
  resetBtn.addEventListener("click", () => {
    form.reset();
    storyBox.textContent = "";
  });

});
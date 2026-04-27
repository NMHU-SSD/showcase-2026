const form = document.getElementById("madlibForm");
const resetBtn = document.getElementById("resetBtn");

const headlineEl = document.getElementById("headline");
const storyEl = document.getElementById("story");

const headlines = [
  "KINGDOM UPDATE",
  "BREAKING: QUEST CHAOS",
  "CASTLE REPORT",
  "WIZARD WEATHER ALERT",
  "TAVERN TALK"
];

const templates = [
  ({ name, celebrity, place, adjective, noun, verb, number }) =>
    `${name} arrived at ${place} and discovered a ${adjective} ${noun}. Then ${celebrity} showed up and demanded that everyone ${verb} it exactly ${number} times. Somehow… it worked.`,
  ({ name, celebrity, place, adjective, noun, verb, number }) =>
    `In ${place}, ${name} tried to start a heroic quest, but the only clue was a ${adjective} ${noun}. ${celebrity} claimed the solution was to ${verb} it ${number} times, and honestly… it was.`,
  ({ name, celebrity, place, adjective, noun, verb, number }) =>
    `${name} wandered into ${place} and found a ${noun} that looked very ${adjective}. ${celebrity} yelled “DO NOT TOUCH IT!” so obviously ${name} decided to ${verb} it ${number} times.`,
  ({ name, celebrity, place, adjective, noun, verb, number }) =>
    `A dramatic moment at ${place}: ${name} raised the ${adjective} ${noun} and began to ${verb}. ${celebrity} counted to ${number} like it was a ritual. The crowd cheered like it was a sport.`
];

const endings = [
  "A bard immediately wrote a song about it.",
  "The local wizard called it “concerning, but impressive.”",
  "Someone shouted “THIS IS WHY WE CAN’T HAVE NICE THINGS.”",
  "The kingdom agreed to never speak of this again.",
  "And that’s how the quest got… weirdly successful."
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function clean(value) {
  return value.trim();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: clean(document.getElementById("name").value),
    celebrity: clean(document.getElementById("celebrity").value),
    place: clean(document.getElementById("place").value),
    adjective: clean(document.getElementById("adjective").value),
    noun: clean(document.getElementById("noun").value),
    verb: clean(document.getElementById("verb").value),
    number: clean(document.getElementById("number").value)
  };

  const headline = pickRandom(headlines);
  const story = pickRandom(templates)(data);
  const end = pickRandom(endings);

  headlineEl.textContent = headline;
  storyEl.textContent = story + " " + end;
});

resetBtn.addEventListener("click", () => {
  form.reset();
  headlineEl.textContent = "HEADLINE";
  storyEl.textContent = "Fill out the form and hit submit.";
});
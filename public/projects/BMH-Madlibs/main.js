console.log("Mad Lib program started!");

const form = document.forms["madLibForm"];
const storySection = document.getElementById("story-section");
const storyOutput = document.getElementById("story");

let previousStory = -1;

form.addEventListener("submit", submitForm);
form.addEventListener("reset", resetForm);

function submitForm(event) {
    event.preventDefault();

    const name = form.elements["name"].value.trim();
    const age = Number(form.elements["age"].value);
    const noun = form.elements["noun"].value.trim();
    const verb = form.elements["verb"].value.trim();
    const place = form.elements["place"].value.trim();

    // Check for inputs that contain only spaces.
    if (
        name === "" ||
        noun === "" ||
        verb === "" ||
        place === ""
    ) {
        alert("Please fill in every field with more than spaces.");
        return;
    }

        const stories = [
        `${name} is ${age} years old and just started a new job
        at ${place}. On the first day, their boss asked them
        to bring a ${noun}. ${name} had no idea why, but
        brought one anyway. Then the boss asked them to
        ${verb}. This job was nothing like the description.`,

        `${name} went to ${place} for their birthday.
        They were turning ${age}, and their friends had
        planned a party. Everything was ready except
        the cake. Someone had put a ${noun} on the table
        instead. They decided to ${verb} while they
        waited for someone to pick up a real cake.`,

        `For a class assignment, ${name} had to explain
        how to ${verb}. Even at ${age} years old,
        speaking in front of the class made them nervous.
        They brought a ${noun} to help with the presentation.
        After practicing at ${place}, they felt ready.
        Then they got to class and realized they had
        left their notes at home.`,

        `${name}, age ${age}, was getting ready for a trip
        to ${place}. They packed clothes, snacks, and
        a ${noun}. Halfway there, their friend called
        and said the plans had changed. Now everyone
        wanted to ${verb}. ${name} wished someone
        had mentioned that before they left.`,

        `${name} was ${age} years old when they entered
        a talent show at ${place}. Their plan was to
        ${verb}, but they forgot to practice.
        When their name was called, they walked
        onstage carrying a ${noun}. Their friends
        cheered even though nobody understood
        what the performance was supposed to be.`,

        `At ${place}, ${name} lost a ${noun} and spent
        the whole afternoon looking for it.
        At ${age} years old, they thought they would
        be better at keeping track of their stuff.
        A friend offered to help, but stopped to
        ${verb} instead. ${name} eventually found
        it exactly where they had left it.`
    ];

    // Select a different story from the previous submission.
    let randomIndex = Math.floor(Math.random() * stories.length);

    while (randomIndex === previousStory) {
        randomIndex = Math.floor(Math.random() * stories.length);
    }

    const story = stories[randomIndex];

    storyOutput.textContent = story;
    storySection.hidden = false;

    previousStory = randomIndex;

    console.log("Story:", story);
}

function resetForm() {
    storyOutput.textContent = "";
    storySection.hidden = true;

    console.log("Form reset!");
}
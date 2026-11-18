const form = document.forms["madlibs"]; //find the html form  and stores it in <form name="madlibs">  in html

form["submit"].addEventListener("click", submitForm); //listen to submit button and call it form in javascript and finds submit input in html also (submitform) 

function submitForm(e){ //creates the funtion that runs when the submit button is clicked
    e.preventDefault(); //prevent the page from refreshing  e being the event which is the click of submit (let javascript handle the behavior)



    //gets the user input from what is typed in the HTML form with .value gives the value that is typed in the input

    let noun = form["noun"].value;
    let adjective = form["adjective"].value;
    let verb = form["verb"].value;
    let name = form["name"].value;
    let age = form["age"].value;

    //creates variable but does not give it a value   will depend on the users age

    let ageMessage;


    //check the users age
    //&& means AND
    //is age between 18 and 30
    //both have to be true
    if(age >= 18 && age <= 30){

        //if both yes then uses line below
        ageMessage = "was ready for an adventure and wanted to take a vacation";
    } else {
        //if over 30 >= meaning over 18 yes
        //if over 30 <=30 meaning no
        //then put line below
        ageMessage = "was looking for something fun to do at New Mexico Highlands";
    }


    //array of stores particularly 3
    //array starting at 0 first story
    //1 second story
    //2 third story
    let stories = [
        `${name} was ${age} years old and ${ageMessage}. One day, ${name} found a ${adjective} ${noun}. ${name} decided to ${verb} with the ${noun}. It turned out to be a very interesting day!`,

        `${name} was walking outside when a ${adjective} ${noun} appeared. At ${age} years old, ${name} ${ageMessage} and decided to ${verb}. It was a day to remember!`,

        `One day, ${name} saw a ${adjective} ${noun}. ${name} was ${age} years old and ${ageMessage}. Without thinking twice, ${name} decided to ${verb} with the ${noun}. What an adventure!`,

        `test, ${name} test ${adjective} ${noun}. ${name} test ${age} test ${ageMessage}. test, ${name} test ${verb} test ${noun}. test!`
    ];

        //generates the random number for a random story to be put out for the user.
        //math.random is asking to give a random number which in this case would be a random decimal from 0 to almost 1
        //stories.length which is 3
        //javascript multiplies 
        //example 0.53 *3 = 1.59 then math.floor takes off .59 so it would be 1

    let randomNumber = Math.floor(Math.random() * stories.length);

    //pick the story and show the story

    let story = stories[randomNumber];

    //put the story onto the webpage  which is on the html
    //display the story

    document.getElementById("output").innerHTML = story;
}
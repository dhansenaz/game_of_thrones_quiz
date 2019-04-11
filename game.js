const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById('progressBarFull')

let currentQuestion = {};
let acceptAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Where do most of the events in Game Of Thrones take place?",
    choice1: "Easteros",
    choice2: "Northeros",
    choice3: "Westeros",
    choice4: "Braavos",
    answer: 3
  },
  {
    question:
      "What does Varys usually say his goal is?",
    choice1: "To serve the realm",
    choice2: "To avenge the Targaryens",
    choice3: "To Survive",
    choice4: "Sit on the Iron Throne",
    answer: 1
  },
  {
    question: "Who founded house Stark?",
    choice1: "Torrhen Stark",
    choice2: "Brandon Stark",
    choice3: "Eddard Stark",
    choice4: "Ned Stark",
    answer: 2
  },
  {
    question: "The president is to vice president as king of the realm is to...",
    choice1: "Hand of the King",
    choice2: "Vice President",
    choice3: "Lord",
    choice4: "Meister",
    answer: 1
  },
  {
    question: "Who created the first White Walker?",
    choice1: "The Night's Watch",
    choice2: "The First Men",
    choice3: "The Children of the Forest",
    choice4: "The Knight King",
    answer: 3
  },
  {
    question: "What is the name of Jon Snow's direwolf?",
    choice1: "Snow",
    choice2: "Grey Wind",
    choice3: "Nymeria",
    choice4: "Ghost",
    answer: 4
  },
  {
    question: "How many great houses are there?",
    choice1: "10",
    choice2: "8",
    choice3: "7",
    choice4: "5",
    answer: 1
  },
  {
    question: "What is Jon Snow's real name?",
    choice1: "Brandon Baratheon",
    choice2: "Aegon Targaryen",
    choice3: "Gregor Clegane",
    choice4: "Jaime Lannister",
    answer: 2
  },
  {
    question: "Why was Jorah Mormont exiled from Westeros?",
    choice1: "For trading slaves",
    choice2: "For killing his wife",
    choice3: "For having Greyscale",
    choice4: "For buying slaves",
    answer: 1
  },
  {
    question: "What was the name of Ned Stark's Valyrian steel sword?",
    choice1: "Hearteater",
    choice2: "Needle",
    choice3: "Ice",
    choice4: "Longclaw",
    answer: 3
  },


];

// CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem('mostRecentScore', score)
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  //UPDATE PROGRESS BAR
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    console.log(e.target);
    if (!acceptAnswers) return;

    acceptAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    selectedChoice.parentElement.classList.add(classToApply);

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
startGame();

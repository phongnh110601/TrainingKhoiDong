var startButtonElement = document.getElementById("start-button");
var loadQuestionButton = document.getElementById("load-button");
var timerElement = document.getElementById("timer");
var questionElement = document.getElementById("question");
var answerElement = document.getElementById("answer");
var wInput = document.getElementById("input-w");
var mInput = document.getElementById("input-m");
var qInput = document.getElementById("input-q");
var yInput = document.getElementById("input-y");

var timeLeft = 240;
var isPlaying = false;
var timer = null;
var questionIndex = 1
var numberOfQuestion = 48
var questions = {}
var answers = {}
var score = 0

loadQuestionButton.onclick = () => {
    let w = wInput.value;
    let m = mInput.value;
    let q = qInput.value;
    let y = yInput.value;
    clearInterval(timer)
    timeLeft = 240
    startButtonElement.disabled = false;
    questionIndex = 1
    let questionFile = "questions/" + w + "_" + m + "_" + q + "_" + y + ".json";
    let answerFile = "answers/" + w + "_" + m + "_" + q + "_" + y + ".json";
    fetch(questionFile)
        .then(response => response.text())
        .then((text) => {
            questions = JSON.parse(text)
            console.log(questions)
            fetch(answerFile)
                .then(response => response.text())
                .then((text) => {
                    answers = JSON.parse(text)
                    console.log(answers)
                    alert("Load data thành công!")
                })
                .catch(error => {
                    console.log('Answer error')
                    alert("Load data thất bại!")
                })
        })
        .catch(error => {
            console.log('Question error')
            alert("Load data thất bại!")
        })
    
    
}

startButtonElement.onclick = () => {
    startButtonElement.disabled = true
    questionElement.innerHTML = questions[questionIndex]
    isPlaying = true;
    timer = setInterval(() => {
        if (isPlaying) {
            if (timeLeft <= 0) {
                isPlaying = false;
                clearInterval(timer);
                timerElement.innerHTML = 0;
            } else {
                timerElement.innerHTML = timeLeft;
            }
            timeLeft -= 1;
        }
    }, 1000);
}

document.onkeydown = (e) => {
    
    if (e.key == ' ') {

        isPlaying = !isPlaying;
        if (!isPlaying) {
            questionElement.innerHTML = ""
        } else {
            questionElement.innerHTML = questions[questionIndex]
        }
    }
    if (e.key == 'Enter') {
        answerElement.innerHTML = answers[questionIndex]
        if (isPlaying && questionIndex < numberOfQuestion) {
            questionIndex++;
            questionElement.innerHTML = questions[questionIndex]
        }
    }

}

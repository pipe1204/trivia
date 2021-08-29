let score = 0
let questionCounter = 0
let questions = []
let currentQuestion = []
let answersCheck = []

const generateButton = document.getElementById("generate")
const questionContainer = document.getElementById("questionContainer")
const choices = document.getElementsByClassName("answer")
const correctChoice = document.getElementById("correctAnswer")
const incorrectChoice = document.getElementById("incorrectAnswer")

const handleQuestions = (e) => {

    window.innerHTML = ""

    e.preventDefault()

    const numberQuestions = document.getElementById("numberQuestions").value
    const category = document.getElementById("category").value
    const difficulty = document.getElementById("difficulty").value
    const type = document.getElementById("type").value

    if (numberQuestions <= 0) {
        alert("Number of questions must be bigger than 0")
    } else {
        
        const triviaApi = "https://opentdb.com/api.php?amount"
        const api = `${triviaApi}=${numberQuestions}&category=${category}&difficulty=${difficulty}&type=${type}`
    
        fetch(api)
            .then(res => res.json())
            .then(data => startGame(data))
            .catch(e => e)
    }
    
    const startGame = (game) => {
        
        game.results.forEach(element => {
            questions.push({
                category: `${element.type}`,
                question: `${element.question}`,
                correctAnswer: `${element.correct_answer}`,
                incorrectAnswer: element.incorrect_answers,
                allAnswers: [...element.incorrect_answers,element.correct_answer].sort()
            })
        })
    
        getQuestion()
    }
    }

const getQuestion = () => {

    if (questions.length > 0) {

        questionCounter++

    questionIndex = Math.floor(Math.random() * questions.length)
    currentQuestion = questions[questionIndex]

    console.log(currentQuestion)
    console.log(questions.length)

    if (currentQuestion.category === "multiple") {
        
        const cardHtml = `
        <h4 id="correctAnswer">That's correct! Well done 🥳</h4>
        <h4 id="incorrectAnswer">That's incorrect 😟 Try again!</h4>
        <div class="card">
            <div class="header">
                <h4 class="questionTitle">${currentQuestion.question}</h4>
            </div>
            <div class="bodyQuestion">
                <button class="answer">${currentQuestion.allAnswers[0]}</button>
                <button class="answer">${currentQuestion.allAnswers[1]}</button>
                <button class="answer">${currentQuestion.allAnswers[2]}</button>
                <button class="answer">${currentQuestion.allAnswers[3]}</button>
            </div>
        </div>
        <h4 class="questionCounter">Question: ${questionCounter}</h4>
        <h4 class="questionLeft">Questions left: ${questions.length}</h4>
    `
    questionContainer.innerHTML = cardHtml

    } else if (currentQuestion.category === "boolean") {
        
        const cardHtml = `
        <h4 id="correctAnswer">That's correct! Well done 🥳</h4>
        <h4 id="incorrectAnswer">That's incorrect 😟 Try again!</h4>
        <div class="card">
            <div class="header">
                <h4 class="questionTitle">${currentQuestion.question}</h4>
            </div>
            <div class="bodyQuestion">
                <button class="answer">${currentQuestion.allAnswers[0]}</button>
                <button class="answer">${currentQuestion.allAnswers[1]}</button>
            </div>
        </div>
        <h4 class="questionCounter">Question: ${questionCounter}</h4>
        <h4 class="questionLeft">Questions left: ${questions.length}</h4>
    `
    questionContainer.innerHTML = cardHtml

    }

    questions.splice(questionIndex, 1)

    let newChoices = [...choices]

    newChoices.forEach(choice => {
    choice.addEventListener("click", e => {
        let userChoice = e.target.innerHTML
        handleAnswer(userChoice)
        })
    })
    } else {
        const noQuestions = `
            <h2 class="end">End of the trivia</h2>
            <h4 class="scoreTitle">You got ${score} correct out of ${questionCounter}</h4>
        `

        questionContainer.innerHTML = noQuestions

        questionCounter = 0
        score = 0
    }

    
}

const handleAnswer = (userChoice) => {
    
    if (userChoice === currentQuestion.correctAnswer) {

        score++

        console.log(userChoice)
        console.log(currentQuestion.correctAnswer)

        let correct = document.getElementById("correctAnswer")
        correct.style.display = "block"

        setTimeout(() => {
            correct.style.display = "none"
            getQuestion()
        }, 2000);
        
    } else {

        let incorrect = document.getElementById("incorrectAnswer")
        incorrect.style.display = "block"

        setTimeout(() => {
            incorrect.style.display = "none"
            getQuestion()
        }, 2000);
        
    }
}

generateButton.onclick = handleQuestions


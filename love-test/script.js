const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const resultScreen = document.getElementById('result-screen');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {
        question: "첫 만남에서 당신의 행동은?",
        answers: [
            { text: "먼저 말을 건다", score: 2 },
            { text: "상대가 먼저 말 걸 때까지 기다린다", score: 1 },
            { text: "눈치만 본다", score: 0 }
        ]
    },
    {
        question: "소개팅에서 어떤 스타일을 선호하나요?",
        answers: [
            { text: "유머러스한 사람", score: 2 },
            { text: "조용하고 배려심 있는 사람", score: 1 },
            { text: "잘 모르겠다", score: 0 }
        ]
    },
    {
        question: "연락 빈도는 어느 정도가 좋아요?",
        answers: [
            { text: "매일 여러 번", score: 2 },
            { text: "하루 한 번", score: 1 },
            { text: "가끔만", score: 0 }
        ]
    },
    {
        question: "데이트 코스를 고른다면?",
        answers: [
            { text: "야경 보기", score: 2 },
            { text: "카페에서 대화", score: 1 },
            { text: "집에서 영화", score: 0 }
        ]
    },
    {
        question: "연애할 준비가 얼마나 됐나요?",
        answers: [
            { text: "완전 준비됨!", score: 2 },
            { text: "절반 정도 준비됨", score: 1 },
            { text: "아직 잘 모르겠다", score: 0 }
        ]
    }
];

const results = [
    { min: 0, max: 3, title: "아직 시간이 필요한 사랑 (6개월 이상)", desc: "당신에게 찾아올 사랑은 천천히, 하지만 깊게 다가올 인연입니다. 지금은 새로운 관계를 시작하기보다, 스스로를 돌보고 삶을 더 단단하게 만드는 시간이 필요합니다. 당신이 충분히 행복하고 안정된 상태가 되었을 때, 사랑은 훨씬 더 건강하고 오래 지속될 수 있습니다. 이 시기에는 여행을 다니거나 새로운 경험을 해보며 자신의 세계를 넓혀보세요. 그러다 보면 생각지도 못한 시점에, 당신의 가치관과 잘 맞는 진중한 인연이 나타날 것입니다. 기다림 끝의 사랑은 더 특별할 테니까요." },
    { min: 4, max: 6, title: "조금만 기다리면 찾아올 사랑 (3~6개월 이내)", desc: "아직은 사랑이 한 발짝 떨어진 곳에서 당신을 지켜보고 있습니다. 하지만 인연은 생각보다 빠르게 다가올 거예요. 당신의 매력을 세상에 더 보여주기 위해 취미를 확장하거나 자기계발을 시작하는 것도 좋은 시기입니다. 주변 친구나 지인 중에서 자연스럽게 가까워지는 사람이 생길 수 있고, 예상치 못한 상황에서 대화가 이어질 수 있습니다. 조급해하지 말고, 편안한 마음으로 일상에 집중하세요. 사랑은 당신이 성장하는 그 순간, 가장 빛나는 모습으로 다가올 것입니다." },
    { min: 7, max: 10, title: "곧 다가오는 사랑 (1개월 이내)", desc: "당신의 주변 공기는 이미 설레임으로 가득 차 있습니다. 우연처럼 보이지만 필연적으로 연결되는 인연이 다가오고 있어요. 평소보다 조금 더 외출을 늘리고, 새로운 모임에도 적극적으로 참여해 보세요. 지금의 당신은 사람들의 시선을 끌기에 충분히 매력적입니다. 작은 대화 속에서도 마음을 주고받을 수 있는 상대가 나타날 것이고, 그 인연은 빠르게 사랑으로 발전할 가능성이 큽니다. 설레는 계절이 시작되려 하니, 마음을 열 준비를 하세요." }
];

startButton.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
});

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => {
            selectAnswer(button, answer.score);
        });
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(button, scoreValue) {
    Array.from(answerButtons.children).forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
    score += scoreValue;
    nextButton.classList.remove('hidden');
}

function showResult() {
    quizContainer.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const result = results.find(r => score >= r.min && score <= r.max);
    resultTitle.innerText = result.title;
    resultDescription.innerText = result.desc;
}

import { apiBase, toggleLoading } from './common.js';

export async function generateQuiz() {
  const topic = document.getElementById("topicInput").value || "상식";
  const quizList = document.getElementById("quizList");
  quizList.innerHTML = "";
  toggleLoading(true);
  try {
    const res = await fetch(`${apiBase}/quiz/gpt?topic=${encodeURIComponent(topic)}&count=3`);
    const data = await res.json();
    displayQuiz(data);
  } catch (error) {
    quizList.innerHTML = `<li class="bg-[#4a4a4a] p-4 rounded-lg shadow">퀴즈 생성 실패: ${error.message}</li>`;
  } finally {
    toggleLoading(false);
  }
}

export function displayQuiz(data) {
  const quizList = document.getElementById("quizList");
  quizList.innerHTML = "";

  if (!Array.isArray(data)) {
    quizList.innerHTML = `<li class="bg-[#4a4a4a] p-4 rounded-lg shadow">퀴즈 생성 실패: ${data.error || '알 수 없는 오류'}</li>`;
    return;
  }

  data.forEach((quiz, index) => {
    const quizId = `quiz-${index}`;
    const answerId = `answer-${index}`;
    const choiceId = `choices-${index}`;

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="bg-[#4a4a4a] p-6 rounded-xl shadow-md transition-all duration-300" id="${quizId}">
        <p class="font-semibold mb-4 text-lg text-[#7ee8c1]">${index + 1}. ${quiz.question}</p>
        <form id="${choiceId}" class="space-y-2 mb-4">
          ${quiz.choices.map((choice, i) => {
            const label = String.fromCharCode(65 + i);
            const hasPrefix = /^[a-dA-D]\./.test(choice.trim());
            const display = hasPrefix ? choice : `${label}. ${choice}`;
            return `
              <label class="block transition-all duration-200 border border-[#555555] rounded px-4 py-3 cursor-pointer bg-[#2e2e2e] hover:bg-[#444]">
                <input type="radio" name="quiz-${index}" value="${choice}" class="hidden" onchange="checkAnswer('${quizId}', this, '${quiz.answer}')"/>
                <span class="inline-block text-[#d6d6d6]">${display}</span>
              </label>
            `;
          }).join("")}
        </form>
        <div class="flex gap-3 items-center">
          <span id="${answerId}" class="text-sm text-[#999] cursor-pointer hover:text-[#7ee8c1] hover:underline select-none" onclick="toggleAnswer('${answerId}', '${quiz.answer}')">정답 보기</span>
          <button class="text-sm px-3 py-1 bg-[#3a3a3a] hover:bg-[#505050] border border-[#555555] rounded text-[#d6d6d6] transition select-none" onclick="resetQuiz('${quizId}', '${choiceId}', '${answerId}')">🔄 다시 풀기</button>
        </div>
      </div>
    `;
    quizList.appendChild(li);
  });
}

export function checkAnswer(quizId, inputEl, correctAnswer) {
  const quizBox = document.getElementById(quizId);
  const labels = quizBox.querySelectorAll("label");

  labels.forEach(label => {
    const input = label.querySelector("input");
    label.classList.remove("bg-red-800", "bg-green-800", "animate-bounce", "animate-shake", "shadow-md");
    const icon = label.querySelector(".result-icon");
    if (icon) icon.remove();

    if (input.checked) {
      const iconSpan = document.createElement("span");
      iconSpan.className = "ml-2 result-icon";

      if (input.value === correctAnswer) {
        label.classList.add("bg-green-800", "shadow-md", "animate-bounce");
        iconSpan.textContent = "✅";
        iconSpan.classList.add("text-green-400");
      } else {
        label.classList.add("bg-red-800", "animate-shake");
        iconSpan.textContent = "❌";
        iconSpan.classList.add("text-red-500");
      }
      label.appendChild(iconSpan);
    }
  });

  quizBox.querySelectorAll("input").forEach(i => i.disabled = true);
}

export function resetQuiz(quizId, formId, answerId) {
  const quizBox = document.getElementById(quizId);
  const form = document.getElementById(formId);

  form.querySelectorAll("input").forEach(input => {
    input.checked = false;
    input.disabled = false;
  });

  form.querySelectorAll("label").forEach(label => {
    label.classList.remove("bg-red-800", "bg-green-800", "animate-bounce", "animate-shake", "shadow-md");
    const icon = label.querySelector(".result-icon");
    if (icon) icon.remove();
  });

  const answerEl = document.getElementById(answerId);
  answerEl.textContent = "정답 보기";
  answerEl.classList.remove("revealed");
}

export function toggleAnswer(id, answer) {
  const el = document.getElementById(id);
  if (el.classList.contains('revealed')) {
    el.textContent = '정답 보기';
    el.classList.remove('revealed');
  } else {
    el.textContent = `정답: ${answer}`;
    el.classList.add('revealed');
  }
}

export async function generateBalanceGame() {
  const quizList = document.getElementById("quizList");
  quizList.innerHTML = "";
  toggleLoading(true);
  try {
    const res = await fetch(`${apiBase}/quiz/balance?count=1`);
    const data = await res.json();
    if (!Array.isArray(data) || typeof data[0] !== 'string' || !data[0].includes("VS")) {
      quizList.innerHTML = `<li class="bg-[#4a4a4a] p-4 rounded-lg shadow-md">밸런스 게임 데이터를 불러오지 못했습니다.</li>`;
      return;
    }
    let processedText = data[0];
    if (processedText.startsWith('"') && processedText.endsWith('"')) {
      processedText = processedText.slice(1, -1);
    }
    const [opt1, opt2] = processedText.split("VS").map(str => str.trim());
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="bg-[#4a4a4a] p-4 rounded-lg shadow-md text-center font-bold text-lg text-[#7ee8c1]">
        ${opt1} <span class="text-[#999999]">VS</span> ${opt2}
      </div>
    `;
    quizList.appendChild(li);
  } catch (err) {
    quizList.innerHTML = `<li class="bg-[#4a4a4a] p-4 rounded-lg shadow-md">오류 발생: ${err.message}</li>`;
  } finally {
    toggleLoading(false);
  }
}

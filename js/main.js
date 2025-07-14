const apiBase = "https://quizn2ews.onrender.com/api";
    
    // ID를 통해 보여주는 화면을 선택
    function showSection(section) {
      document.querySelectorAll('.quiz, .news').forEach(el => el.classList.add('hidden'));
      document.getElementById(section).classList.remove('hidden');
    }

    // 스피너  
    function toggleLoading(show) {
      document.getElementById("loading").classList.toggle("hidden", !show);
    }

    // 햄버거 메뉴
    function toggleMenu() {
      const menu = document.getElementById("mobileMenu");
      menu.classList.toggle("translate-x-full");
    }
    
    // JS 코드 (main.js 하단)
    document.addEventListener("DOMContentLoaded", () => {
      const menu = document.getElementById("mobileMenu");
      const button = document.getElementById("hamburgerBtn");
    
      button.addEventListener("click", () => {
        menu.classList.toggle("open");
      });
    
      // 메뉴 안 닫기 버튼도 연결
      document.querySelectorAll("#mobileMenu button").forEach(btn => {
        btn.addEventListener("click", () => menu.classList.remove("open"));
      });
    });

    // 퀴즈생성 함수
    async function generateQuiz() {
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

    // 생성된 퀴즈 조회 함수
    function displayQuiz(data) {
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

    // Quiz 정답 체크 함수
    function checkAnswer(quizId, inputEl, correctAnswer) {
      const quizBox = document.getElementById(quizId);
      const labels = quizBox.querySelectorAll("label");

      labels.forEach(label => {
        const input = label.querySelector("input");
        label.classList.remove("bg-red-800", "bg-green-800", "animate-bounce", "animate-shake", "shadow-md");

        const icon = label.querySelector(".result-icon");
        if (icon) icon.remove();

        if (input.checked) {
          if (input.value === correctAnswer) {
            label.classList.add("bg-green-800", "shadow-md", "animate-bounce");
            const iconSpan = document.createElement("span");
            iconSpan.textContent = "✅";
            iconSpan.className = "ml-2 result-icon text-green-400";
            label.appendChild(iconSpan);
          } else {
            label.classList.add("bg-red-800", "animate-shake");
            const iconSpan = document.createElement("span");
            iconSpan.textContent = "❌";
            iconSpan.className = "ml-2 result-icon text-red-500";
            label.appendChild(iconSpan);
          }
        }
      });

      quizBox.querySelectorAll("input").forEach(i => i.disabled = true);
    }

    // 정답보기 / 다시풀기 함수
    function resetQuiz(quizId, formId, answerId) {
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

    function toggleAnswer(id, answer) {
      const el = document.getElementById(id);
      if (el.classList.contains('revealed')) {
        el.textContent = '정답 보기';
        el.classList.remove('revealed');
      } else {
        el.textContent = `정답: ${answer}`;
        el.classList.add('revealed');
      }
    }

    // 랜덤밸런스게임조회 함수
    async function generateBalanceGame() {
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

    // 뉴스 생성 함수
    async function searchNews() {
      const query = document.getElementById("newsInput").value || "주요 뉴스";
      const newsList = document.getElementById("newsList");
      const newsSummary = document.getElementById("newsSummary");
      newsList.innerHTML = "";
      newsSummary.innerHTML = "";
      toggleLoading(true);
      try {
        const res = await fetch(`${apiBase}/news/search?q=${encodeURIComponent(query)}&display=5`);
        const data = await res.json();
        if (!Array.isArray(data.items)) {
          newsList.innerHTML = `<li class="bg-[#4a4a4a] p-4 rounded-lg shadow-md">뉴스 검색 실패: ${data.error || '알 수 없는 오류'}</li>`;
          return;
        }
        data.items.forEach((item, index) => {
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="bg-[#4a4a4a] p-4 rounded-lg shadow-md">
              <strong class="text-[#7ee8c1]">${index + 1}. <a href="${item.link}" target="_blank" class="hover:underline">${item.title}</a></strong>
              <p class="text-sm text-[#999999]">${item.pubDate}</p>
            </div>
          `;
          newsList.appendChild(li);
        });
      } catch (err) {
        newsList.innerHTML = `<li class="bg-[#4a4a4a] p-4 rounded-lg shadow-md">뉴스 요청 실패: ${err.message}</li>`;
      } finally {
        toggleLoading(false);
      }
    }

    // 뉴스 요약 함수
    async function summarizeNews() {
      const query = document.getElementById("newsInput").value || "주요 뉴스";
      const newsSummary = document.getElementById("newsSummary");
      newsSummary.innerHTML = "";
      toggleLoading(true);
      try {
        const res = await fetch(`${apiBase}/news/summary?q=${encodeURIComponent(query)}&display=5`);
        const data = await res.json();

        const sentences = data.summary.split(/(?<=[.!?])\s+/);
        let formatted = '';
        sentences.forEach((s, i) => {
          formatted += s + ((i + 1) % 2 === 0 ? "<br><br>" : " ");
        });

        if (data.summary) {
          newsSummary.innerHTML = `
            <div  class="bg-[#4a4a4a]/90 text-[#e0f2f1] p-4 rounded-lg shadow-md text-base leading-relaxed break-words">
              <strong class="block mb-2 text-[#7ee8c1]">뉴스 요약:</strong>
              <p class="text-base leading-relaxed">${formatted}</p>
            </div>
          `;
        } else {
          newsSummary.innerHTML = `<div class="bg-[#4a4a4a] p-4 rounded-lg shadow-md">뉴스 요약 실패</div>`;
        }
      } catch (err) {
        newsSummary.innerHTML = `<div class="bg-[#4a4a4a] p-4 rounded-lg shadow-md">오류: ${err.message}</div>`;
      } finally {
        toggleLoading(false);
      }
    }
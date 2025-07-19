// 📁 main.js
import { showSection } from './common.js';
import {
  generateQuiz,
  generateBalanceGame,
  checkAnswer,
  resetQuiz,
  toggleAnswer
} from './quiz.js';
import { searchNews, summarizeNews } from './news.js';
import { getFortune, setupFortuneStorage } from './fortune.js';

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("mobileMenu");
  const button = document.getElementById("hamburgerBtn");

  button.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  document.getElementById("hamburgerBtn").addEventListener("click", () => {
    menu.classList.toggle("translate-x-full");
  });

  document.getElementById("menuCloseBtn").addEventListener("click", () => {
    menu.classList.add("translate-x-full");
  });

  document.getElementById("menuQuizBtn").addEventListener("click", () => {
    showSection('quiz');
    menu.classList.add("translate-x-full");
  });

  document.getElementById("menuNewsBtn").addEventListener("click", () => {
    showSection('news');
    menu.classList.add("translate-x-full");
  });

  document.getElementById("menuFortuneBtn").addEventListener("click", () => {
    showSection("fortune");
    menu.classList.add("translate-x-full");
  });

  // 다크모드 기능으로 변경되어서 주석 처리함 2025.07.20
  // document.getElementById("logo").addEventListener("click", () => {
  //   showSection('quiz');
  // });

  document.getElementById("generateQuizBtn").addEventListener("click", generateQuiz);
  document.getElementById("generateBalanceBtn").addEventListener("click", generateBalanceGame);
  document.getElementById("searchNewsBtn").addEventListener("click", searchNews);
  document.getElementById("summarizeNewsBtn").addEventListener("click", summarizeNews);
  document.getElementById("getFortuneBtn").addEventListener("click", getFortune);

  document.querySelectorAll("#mobileMenu button").forEach(btn => {
    btn.addEventListener("click", () => menu.classList.remove("open"));
  });

  document.addEventListener("click", (event) => {
    if(menu.classList.contains("open")){
      if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.remove("open");
      }
    }
  });

  // 사주 로컬스토리지 세팅
  setupFortuneStorage();

  const logo = document.getElementById('logo');
  const body = document.body;

  function setTheme(theme) {
    body.classList.remove('light', 'dark');
    body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }

  // 초기 테마 설정
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  // 로고 클릭 시 테마 전환
  logo.addEventListener('click', () => {
    const current = body.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

});

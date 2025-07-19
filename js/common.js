// api 주소
export const apiBase = "https://quizn2ews.onrender.com/api";

// 공통 섹션 보여주기
export function showSection(section) {
  document.querySelectorAll('.quiz, .news, .fortune').forEach(el => el.classList.add('hidden'));
  document.getElementById(section).classList.remove('hidden');
}

// 로딩 스피너
export function toggleLoading(show) {
  document.getElementById("loading").classList.toggle("hidden", !show);
}

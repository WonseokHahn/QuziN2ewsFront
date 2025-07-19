import { apiBase, toggleLoading } from './common.js';

export async function searchNews() {
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

export async function summarizeNews() {
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

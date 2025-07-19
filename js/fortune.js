// 📁 fortune.js
import { apiBase, toggleLoading } from './common.js';

export function setupFortuneStorage() {
  const etcCheckbox = document.getElementById("fortuneEtc");
  const customInput = document.getElementById("fortuneCustom");

  etcCheckbox.addEventListener("change", () => {
    customInput.classList.toggle("hidden", !etcCheckbox.checked);
  });

  const fortuneNameInput = document.getElementById("fortuneName");
  const fortuneBirthInput = document.getElementById("fortuneBirth");
  const birthHourSelect = document.getElementById("birthHour");
  const birthMinuteSelect = document.getElementById("birthMinute");

  const saveFortuneInputs = () => {
    localStorage.setItem('fortuneName', fortuneNameInput.value);
    localStorage.setItem('fortuneBirth', fortuneBirthInput.value);
    localStorage.setItem('birthHour', birthHourSelect.value);
    localStorage.setItem('birthMinute', birthMinuteSelect.value);
  };

  const loadFortuneInputs = () => {
    fortuneNameInput.value = localStorage.getItem('fortuneName') || '';
    fortuneBirthInput.value = localStorage.getItem('fortuneBirth') || '';
    birthHourSelect.value = localStorage.getItem('birthHour') || '00';
    birthMinuteSelect.value = localStorage.getItem('birthMinute') || '00';
  };

  fortuneNameInput.addEventListener('input', saveFortuneInputs);
  fortuneBirthInput.addEventListener('change', saveFortuneInputs);
  birthHourSelect.addEventListener('change', saveFortuneInputs);
  birthMinuteSelect.addEventListener('change', saveFortuneInputs);

  loadFortuneInputs();
}

export async function getFortune() {
  const name = document.getElementById("fortuneName").value.trim();
  const birth = document.getElementById("fortuneBirth").value;
  const hour = document.getElementById("birthHour").value;
  const minute = document.getElementById("birthMinute").value;

  const checkedTypes = [...document.querySelectorAll(".fortuneType:checked")].map(el => el.value);
  let topics = checkedTypes.filter(t => t !== "기타");
  if (checkedTypes.includes("기타")) {
    const custom = document.getElementById("fortuneCustom").value.trim();
    if (custom) topics.push(custom);
  }

  const resultBox = document.getElementById("fortuneResultText");

  if (!name || !birth || !hour || topics.length === 0) {
    resultBox.innerHTML = `<div class='text-red-400'>모든 항목을 입력해주세요.</div>`;
    return;
  }

  const topicStr = topics.join(", ");
  const prompt = `${name}의 생년월일 및 태어난 시간은 ${birth}, ${hour}:${minute}입니다. 오늘날짜와 알려준 내용을 기준으로 ${name}의 ${topicStr}에 대한 오늘의 운세를 상세하게 분석해서 알려주세요. 생년월일을 기준으로 하는 별자리를 틀리는건 절대 안되니까 꼼꼼하게 확인해주세요.`;

  toggleLoading(true);

  try {
    const res = await fetch(`${apiBase}/fortune`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();

    document.getElementById("fortuneResultText").innerText = data.result;

    const card = document.getElementById("fortuneCard");
    const blurOverlay = document.getElementById("blurOverlay");

    blurOverlay.classList.remove("hidden");
    setTimeout(() => {
      blurOverlay.classList.add('backdrop-blur');
      card.classList.remove("hidden");
      setTimeout(() => {
        card.classList.remove("translate-y-full");
      }, 10);
    }, 10);

  } catch (error) {
    console.error("운세 요청 실패:", error);
    resultBox.innerHTML = `<div class='text-red-400'>운세 분석에 실패했습니다. 잠시 후 다시 시도해주세요.</div>`;
  } finally {
    toggleLoading(false);
  }

  document.getElementById("closeFortuneCard").addEventListener("click", () => {
    const card = document.getElementById("fortuneCard");
    const blurOverlay = document.getElementById("blurOverlay");

    card.classList.add("translate-y-full");
    blurOverlay.classList.remove('backdrop-blur');
    setTimeout(() => {
      card.classList.add("hidden");
      blurOverlay.classList.add("hidden");
    }, 500);
  });
}

const apiBase = 'https://quizn2ews.onrender.com/api';
function showSection(_0x17742e) {
    document['querySelectorAll']('.quiz,\x20.news,\x20.fortune')['forEach'](_0x2223df => _0x2223df['classList']['add']('hidden'));
    document['getElementById'](_0x17742e)['classList']['remove']('hidden');
}
function toggleLoading(_0x3418c1) {
    document['getElementById']('loading')['classList']['toggle']('hidden', !_0x3418c1);
}
function toggleMenu() {
    const _0x1b359f = document['getElementById']('mobileMenu');
    _0x1b359f['classList']['toggle']('translate-x-full');
}
document['addEventListener']('DOMContentLoaded', () => {
    const _0x5ce944 = document['getElementById']('mobileMenu');
    const _0x2b616b = document['getElementById']('hamburgerBtn');
    _0x2b616b['addEventListener']('click', () => {
        _0x5ce944['classList']['toggle']('open');
    });
    const _0x8e3e28 = document['getElementById']('mobileMenu');
    document['getElementById']('hamburgerBtn')['addEventListener']('click', () => {
        _0x8e3e28['classList']['toggle']('translate-x-full');
    });
    document['getElementById']('menuCloseBtn')['addEventListener']('click', () => {
        _0x8e3e28['classList']['add']('translate-x-full');
    });
    document['getElementById']('menuQuizBtn')['addEventListener']('click', () => {
        showSection('quiz');
        _0x8e3e28['classList']['add']('translate-x-full');
    });
    document['getElementById']('menuNewsBtn')['addEventListener']('click', () => {
        showSection('news');
        _0x8e3e28['classList']['add']('translate-x-full');
    });
    document['getElementById']('menuFortuneBtn')['addEventListener']('click', () => {
        showSection('fortune');
        _0x8e3e28['classList']['add']('translate-x-full');
    });
    document['getElementById']('logo')['addEventListener']('click', () => {
        showSection('quiz');
    });
    document['getElementById']('generateQuizBtn')['addEventListener']('click', generateQuiz);
    document['getElementById']('generateBalanceBtn')['addEventListener']('click', generateBalanceGame);
    document['getElementById']('searchNewsBtn')['addEventListener']('click', searchNews);
    document['getElementById']('summarizeNewsBtn')['addEventListener']('click', summarizeNews);
    document['getElementById']('getFortuneBtn')['addEventListener']('click', getFortune);
    document['querySelectorAll']('#mobileMenu\x20button')['forEach'](_0x2e2471 => {
        _0x2e2471['addEventListener']('click', () => _0x5ce944['classList']['remove']('open'));
    });
    document['addEventListener']('click', _0x576c37 => {
        if (_0x5ce944['classList']['contains']('open')) {
            if (!_0x8e3e28['contains'](_0x576c37['target']) && !hamburgerBtn['contains'](_0x576c37['target'])) {
                _0x5ce944['classList']['remove']('open');
            }
        }
    });
});
document['addEventListener']('DOMContentLoaded', () => {
    const _0x562e7c = document['getElementById']('fortuneEtc');
    const _0x1cbc93 = document['getElementById']('fortuneCustom');
    _0x562e7c['addEventListener']('change', () => {
        _0x1cbc93['classList']['toggle']('hidden', !_0x562e7c['checked']);
    });
    const _0x255133 = document['getElementById']('fortuneName');
    const _0x4eb795 = document['getElementById']('fortuneBirth');
    const _0x578696 = document['getElementById']('birthHour');
    const _0x4ebc7e = document['getElementById']('birthMinute');
    const _0x1ed06b = () => {
        localStorage['setItem']('fortuneName', _0x255133['value']);
        localStorage['setItem']('fortuneBirth', _0x4eb795['value']);
        localStorage['setItem']('birthHour', _0x578696['value']);
        localStorage['setItem']('birthMinute', _0x4ebc7e['value']);
    };
    const _0x5956ed = () => {
        _0x255133['value'] = localStorage['getItem']('fortuneName') || '';
        _0x4eb795['value'] = localStorage['getItem']('fortuneBirth') || '';
        _0x578696['value'] = localStorage['getItem']('birthHour') || '00';
        _0x4ebc7e['value'] = localStorage['getItem']('birthMinute') || '00';
    };
    _0x255133['addEventListener']('input', _0x1ed06b);
    _0x4eb795['addEventListener']('change', _0x1ed06b);
    _0x578696['addEventListener']('change', _0x1ed06b);
    _0x4ebc7e['addEventListener']('change', _0x1ed06b);
    _0x5956ed();
});
async function generateQuiz() {
    const _0x54680e = document['getElementById']('topicInput')['value'] || '상식';
    const _0x7a354e = document['getElementById']('quizList');
    _0x7a354e['innerHTML'] = '';
    toggleLoading(!![]);
    try {
        const _0x126700 = await fetch(apiBase + '/quiz/gpt?topic=' + encodeURIComponent(_0x54680e) + '&count=3');
        const _0x3662fb = await _0x126700['json']();
        displayQuiz(_0x3662fb);
    } catch (_0x1f1228) {
        _0x7a354e['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow\x22>퀴즈\x20생성\x20실패:\x20' + _0x1f1228['message'] + '</li>';
    } finally {
        toggleLoading(![]);
    }
}
function displayQuiz(_0xdb82c3) {
    const _0x832c51 = document['getElementById']('quizList');
    _0x832c51['innerHTML'] = '';
    if (!Array['isArray'](_0xdb82c3)) {
        _0x832c51['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow\x22>퀴즈\x20생성\x20실패:\x20' + (_0xdb82c3['error'] || '알\x20수\x20없는\x20오류') + '</li>';
        return;
    }
    _0xdb82c3['forEach']((_0x1a8904, _0x5b9032) => {
        const _0x2bab85 = 'quiz-' + _0x5b9032;
        const _0x322633 = 'answer-' + _0x5b9032;
        const _0x4bb9e1 = 'choices-' + _0x5b9032;
        const _0x2ecbe0 = document['createElement']('li');
        _0x2ecbe0['innerHTML'] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bg-[#4a4a4a]\x20p-6\x20rounded-xl\x20shadow-md\x20transition-all\x20duration-300\x22\x20id=\x22' + _0x2bab85 + '\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22font-semibold\x20mb-4\x20text-lg\x20text-[#7ee8c1]\x22>' + (_0x5b9032 + 0x1) + '.\x20' + _0x1a8904['question'] + '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<form\x20id=\x22' + _0x4bb9e1 + '\x22\x20class=\x22space-y-2\x20mb-4\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x1a8904['choices']['map']((_0x58ffaf, _0x4cdb47) => {
            const _0x535b52 = String['fromCharCode'](0x41 + _0x4cdb47);
            const _0x2cd517 = /^[a-dA-D]\./['test'](_0x58ffaf['trim']());
            const _0x32b2b6 = _0x2cd517 ? _0x58ffaf : _0x535b52 + '.\x20' + _0x58ffaf;
            return '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<label\x20class=\x22block\x20transition-all\x20duration-200\x20border\x20border-[#555555]\x20rounded\x20px-4\x20py-3\x20cursor-pointer\x20bg-[#2e2e2e]\x20hover:bg-[#444]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22radio\x22\x20name=\x22quiz-' + _0x5b9032 + '\x22\x20value=\x22' + _0x58ffaf + '\x22\x20class=\x22hidden\x22\x20onchange=\x22checkAnswer(\x27' + _0x2bab85 + '\x27,\x20this,\x20\x27' + _0x1a8904['answer'] + '\x27)\x22/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22inline-block\x20text-[#d6d6d6]\x22>' + _0x32b2b6 + '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</label>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20';
        })['join']('') + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</form>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20gap-3\x20items-center\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20id=\x22' + _0x322633 + '\x22\x20class=\x22text-sm\x20text-[#999]\x20cursor-pointer\x20hover:text-[#7ee8c1]\x20hover:underline\x20select-none\x22\x20onclick=\x22toggleAnswer(\x27' + _0x322633 + '\x27,\x20\x27' + _0x1a8904['answer'] + '\x27)\x22>정답\x20보기</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22text-sm\x20px-3\x20py-1\x20bg-[#3a3a3a]\x20hover:bg-[#505050]\x20border\x20border-[#555555]\x20rounded\x20text-[#d6d6d6]\x20transition\x20select-none\x22\x20onclick=\x22resetQuiz(\x27' + _0x2bab85 + '\x27,\x20\x27' + _0x4bb9e1 + '\x27,\x20\x27' + _0x322633 + '\x27)\x22>🔄\x20다시\x20풀기</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20';
        _0x832c51['appendChild'](_0x2ecbe0);
    });
}
function checkAnswer(_0x56f537, _0x4b05cc, _0x3fd5aa) {
    const _0x1e70b7 = document['getElementById'](_0x56f537);
    const _0x35d279 = _0x1e70b7['querySelectorAll']('label');
    _0x35d279['forEach'](_0x40cb9a => {
        const _0x242b35 = _0x40cb9a['querySelector']('input');
        _0x40cb9a['classList']['remove']('bg-red-800', 'bg-green-800', 'animate-bounce', 'animate-shake', 'shadow-md');
        const _0x1045ee = _0x40cb9a['querySelector']('.result-icon');
        if (_0x1045ee)
            _0x1045ee['remove']();
        if (_0x242b35['checked']) {
            if (_0x242b35['value'] === _0x3fd5aa) {
                _0x40cb9a['classList']['add']('bg-green-800', 'shadow-md', 'animate-bounce');
                const _0x21a1d6 = document['createElement']('span');
                _0x21a1d6['textContent'] = '✅';
                _0x21a1d6['className'] = 'ml-2\x20result-icon\x20text-green-400';
                _0x40cb9a['appendChild'](_0x21a1d6);
            } else {
                _0x40cb9a['classList']['add']('bg-red-800', 'animate-shake');
                const _0x5cb77b = document['createElement']('span');
                _0x5cb77b['textContent'] = '❌';
                _0x5cb77b['className'] = 'ml-2\x20result-icon\x20text-red-500';
                _0x40cb9a['appendChild'](_0x5cb77b);
            }
        }
    });
    _0x1e70b7['querySelectorAll']('input')['forEach'](_0x32be0e => _0x32be0e['disabled'] = !![]);
}
function resetQuiz(_0x2f3030, _0x29a242, _0x1d198d) {
    const _0x3f48e7 = document['getElementById'](_0x2f3030);
    const _0x1bc8d8 = document['getElementById'](_0x29a242);
    _0x1bc8d8['querySelectorAll']('input')['forEach'](_0x20d05c => {
        _0x20d05c['checked'] = ![];
        _0x20d05c['disabled'] = ![];
    });
    _0x1bc8d8['querySelectorAll']('label')['forEach'](_0x10225d => {
        _0x10225d['classList']['remove']('bg-red-800', 'bg-green-800', 'animate-bounce', 'animate-shake', 'shadow-md');
        const _0x178cc0 = _0x10225d['querySelector']('.result-icon');
        if (_0x178cc0)
            _0x178cc0['remove']();
    });
    const _0x14263c = document['getElementById'](_0x1d198d);
    _0x14263c['textContent'] = '정답\x20보기';
    _0x14263c['classList']['remove']('revealed');
}
function toggleAnswer(_0x2d1661, _0x127be0) {
    const _0xfb68aa = document['getElementById'](_0x2d1661);
    if (_0xfb68aa['classList']['contains']('revealed')) {
        _0xfb68aa['textContent'] = '정답\x20보기';
        _0xfb68aa['classList']['remove']('revealed');
    } else {
        _0xfb68aa['textContent'] = '정답:\x20' + _0x127be0;
        _0xfb68aa['classList']['add']('revealed');
    }
}
async function generateBalanceGame() {
    const _0x4feb8a = document['getElementById']('quizList');
    _0x4feb8a['innerHTML'] = '';
    toggleLoading(!![]);
    try {
        const _0x5137d9 = await fetch(apiBase + '/quiz/balance?count=1');
        const _0x22e66a = await _0x5137d9['json']();
        if (!Array['isArray'](_0x22e66a) || typeof _0x22e66a[0x0] !== 'string' || !_0x22e66a[0x0]['includes']('VS')) {
            _0x4feb8a['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>밸런스\x20게임\x20데이터를\x20불러오지\x20못했습니다.</li>';
            return;
        }
        let _0x4505f8 = _0x22e66a[0x0];
        if (_0x4505f8['startsWith']('\x22') && _0x4505f8['endsWith']('\x22')) {
            _0x4505f8 = _0x4505f8['slice'](0x1, -0x1);
        }
        const [_0x539842, _0x468074] = _0x4505f8['split']('VS')['map'](_0xff6d94 => _0xff6d94['trim']());
        const _0x290176 = document['createElement']('li');
        _0x290176['innerHTML'] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x20text-center\x20font-bold\x20text-lg\x20text-[#7ee8c1]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x539842 + '\x20<span\x20class=\x22text-[#999999]\x22>VS</span>\x20' + _0x468074 + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20';
        _0x4feb8a['appendChild'](_0x290176);
    } catch (_0x441ac0) {
        _0x4feb8a['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>오류\x20발생:\x20' + _0x441ac0['message'] + '</li>';
    } finally {
        toggleLoading(![]);
    }
}
async function searchNews() {
    const _0x534b7c = document['getElementById']('newsInput')['value'] || '주요\x20뉴스';
    const _0x21350c = document['getElementById']('newsList');
    const _0x23a3cf = document['getElementById']('newsSummary');
    _0x21350c['innerHTML'] = '';
    _0x23a3cf['innerHTML'] = '';
    toggleLoading(!![]);
    try {
        const _0x3b347a = await fetch(apiBase + '/news/search?q=' + encodeURIComponent(_0x534b7c) + '&display=5');
        const _0x22eb29 = await _0x3b347a['json']();
        if (!Array['isArray'](_0x22eb29['items'])) {
            _0x21350c['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>뉴스\x20검색\x20실패:\x20' + (_0x22eb29['error'] || '알\x20수\x20없는\x20오류') + '</li>';
            return;
        }
        _0x22eb29['items']['forEach']((_0x4cadf8, _0xc4ad8e) => {
            const _0x3581df = document['createElement']('li');
            _0x3581df['innerHTML'] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong\x20class=\x22text-[#7ee8c1]\x22>' + (_0xc4ad8e + 0x1) + '.\x20<a\x20href=\x22' + _0x4cadf8['link'] + '\x22\x20target=\x22_blank\x22\x20class=\x22hover:underline\x22>' + _0x4cadf8['title'] + '</a></strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-sm\x20text-[#999999]\x22>' + _0x4cadf8['pubDate'] + '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20';
            _0x21350c['appendChild'](_0x3581df);
        });
    } catch (_0xa8662d) {
        _0x21350c['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>뉴스\x20요청\x20실패:\x20' + _0xa8662d['message'] + '</li>';
    } finally {
        toggleLoading(![]);
    }
}
async function summarizeNews() {
    const _0x3340ed = document['getElementById']('newsInput')['value'] || '주요\x20뉴스';
    const _0x974a82 = document['getElementById']('newsSummary');
    _0x974a82['innerHTML'] = '';
    toggleLoading(!![]);
    try {
        const _0x433167 = await fetch(apiBase + '/news/summary?q=' + encodeURIComponent(_0x3340ed) + '&display=5');
        const _0x430bb0 = await _0x433167['json']();
        const _0x2970da = _0x430bb0['summary']['split'](/(?<=[.!?])\s+/);
        let _0x27b245 = '';
        _0x2970da['forEach']((_0x4c4bc6, _0x133d3b) => {
            _0x27b245 += _0x4c4bc6 + ((_0x133d3b + 0x1) % 0x2 === 0x0 ? '<br><br>' : '\x20');
        });
        if (_0x430bb0['summary']) {
            _0x974a82['innerHTML'] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20\x20class=\x22bg-[#4a4a4a]/90\x20text-[#e0f2f1]\x20p-4\x20rounded-lg\x20shadow-md\x20text-base\x20leading-relaxed\x20break-words\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong\x20class=\x22block\x20mb-2\x20text-[#7ee8c1]\x22>뉴스\x20요약:</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-base\x20leading-relaxed\x22>' + _0x27b245 + '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20';
        } else {
            _0x974a82['innerHTML'] = '<div\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>뉴스\x20요약\x20실패</div>';
        }
    } catch (_0x2d807a) {
        _0x974a82['innerHTML'] = '<div\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>오류:\x20' + _0x2d807a['message'] + '</div>';
    } finally {
        toggleLoading(![]);
    }
}
async function getFortune() {
    const _0x465eb3 = document['getElementById']('fortuneName')['value']['trim']();
    const _0x4447c1 = document['getElementById']('fortuneBirth')['value'];
    const _0x4ebc16 = document['getElementById']('birthHour')['value'];
    const _0x1e37dd = document['getElementById']('birthMinute')['value'];
    const _0x40ca73 = Array['from'](document['querySelectorAll']('.fortuneType:checked'))['map'](_0x1396eb => _0x1396eb['value']);
    const _0xc91994 = document['getElementById']('fortuneCustom')['value']['trim']();
    if (_0xc91994)
        _0x40ca73['push'](_0xc91994);
    const _0x43a712 = [...document['querySelectorAll']('.fortuneType:checked')]['map'](_0x4fd293 => _0x4fd293['value']);
    let _0x1e028c = _0x43a712['filter'](_0x1ba1bb => _0x1ba1bb !== '기타');
    if (_0x43a712['includes']('기타')) {
        const _0x3d2a10 = document['getElementById']('fortuneCustom')['value']['trim']();
        if (_0x3d2a10)
            _0x1e028c['push'](_0x3d2a10);
    }
    if (!_0x465eb3 || !_0x4447c1 || !_0x4ebc16 || _0x1e028c['length'] === 0x0) {
        resultBox['innerHTML'] = '<div\x20class=\x27text-red-400\x27>모든\x20항목을\x20입력해주세요.</div>';
        return;
    }
    const _0x335d6f = _0x1e028c['join'](',\x20');
    const _0x3ddf59 = _0x465eb3 + '의\x20생년월일\x20및\x20태어난\x20시간은\x20' + _0x4447c1 + ',\x20' + _0x4ebc16 + ':' + _0x1e37dd + '입니다.\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20오늘날짜와\x20알려준\x20내용을\x20기준으로\x20' + _0x465eb3 + '의\x20' + _0x335d6f + '에\x20대한\x20오늘의\x20운세를\x20상세하게\x20분석해서\x20알려주세요.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20생년월일을\x20기준으로\x20하는\x20별자리를\x20틀리는건\x20절대\x20안되니까\x20꼼꼼하게\x20확인해주세요.';
    toggleLoading(!![]);
    try {
        const _0x533271 = await fetch(apiBase + '/fortune', {
            'method': 'POST',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON['stringify']({ 'prompt': _0x3ddf59 })
        });
        const _0x3a39e7 = await _0x533271['json']();
        document['getElementById']('fortuneResultText')['innerText'] = _0x3a39e7['result'];
        const _0x2ddfb8 = document['getElementById']('fortuneCard');
        const _0x210dca = document['getElementById']('blurOverlay');
        _0x210dca['classList']['remove']('hidden');
        setTimeout(() => {
            _0x210dca['classList']['add']('backdrop-blur');
            _0x2ddfb8['classList']['remove']('hidden');
            setTimeout(() => {
                _0x2ddfb8['classList']['remove']('translate-y-full');
            }, 0xa);
        }, 0xa);
    } catch (_0x260dbb) {
        console['error']('운세\x20요청\x20실패:', _0x260dbb);
        resultBox['innerHTML'] = '<div\x20class=\x27text-red-400\x27>운세\x20분석에\x20실패했습니다.\x20잠시\x20후\x20다시\x20시도해주세요.</div>';
    } finally {
        toggleLoading(![]);
    }
    document['getElementById']('closeFortuneCard')['addEventListener']('click', () => {
        const _0xfe71cd = document['getElementById']('fortuneCard');
        const _0x82e601 = document['getElementById']('blurOverlay');
        _0xfe71cd['classList']['add']('translate-y-full');
        _0x82e601['classList']['remove']('backdrop-blur');
        setTimeout(() => {
            _0xfe71cd['classList']['add']('hidden');
            _0x82e601['classList']['add']('hidden');
        }, 0x1f4);
    });
}
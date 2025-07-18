const apiBase = 'https://quizn2ews.onrender.com/api';
function showSection(_0xc93521) {
    document['querySelectorAll']('.quiz,\x20.news,\x20.fortune')['forEach'](_0x511a63 => _0x511a63['classList']['add']('hidden'));
    document['getElementById'](_0xc93521)['classList']['remove']('hidden');
}
function toggleLoading(_0xae072f) {
    document['getElementById']('loading')['classList']['toggle']('hidden', !_0xae072f);
}
function toggleMenu() {
    const _0x2760b4 = document['getElementById']('mobileMenu');
    _0x2760b4['classList']['toggle']('translate-x-full');
}
document['addEventListener']('DOMContentLoaded', () => {
    const _0x413f21 = document['getElementById']('mobileMenu');
    const _0x2015ca = document['getElementById']('hamburgerBtn');
    _0x2015ca['addEventListener']('click', () => {
        _0x413f21['classList']['toggle']('open');
    });
    const _0xc707f5 = document['getElementById']('mobileMenu');
    document['getElementById']('hamburgerBtn')['addEventListener']('click', () => {
        _0xc707f5['classList']['toggle']('translate-x-full');
    });
    document['getElementById']('menuCloseBtn')['addEventListener']('click', () => {
        _0xc707f5['classList']['add']('translate-x-full');
    });
    document['getElementById']('menuQuizBtn')['addEventListener']('click', () => {
        showSection('quiz');
        _0xc707f5['classList']['add']('translate-x-full');
    });
    document['getElementById']('menuNewsBtn')['addEventListener']('click', () => {
        showSection('news');
        _0xc707f5['classList']['add']('translate-x-full');
    });
    document['getElementById']('menuFortuneBtn')['addEventListener']('click', () => {
        showSection('fortune');
        _0xc707f5['classList']['add']('translate-x-full');
    });
    document['getElementById']('logo')['addEventListener']('click', () => {
        showSection('quiz');
    });
    document['getElementById']('generateQuizBtn')['addEventListener']('click', generateQuiz);
    document['getElementById']('generateBalanceBtn')['addEventListener']('click', generateBalanceGame);
    document['getElementById']('searchNewsBtn')['addEventListener']('click', searchNews);
    document['getElementById']('summarizeNewsBtn')['addEventListener']('click', summarizeNews);
    document['getElementById']('getFortuneBtn')['addEventListener']('click', getFortune);
    document['querySelectorAll']('#mobileMenu\x20button')['forEach'](_0x2de975 => {
        _0x2de975['addEventListener']('click', () => _0x413f21['classList']['remove']('open'));
    });
    document['addEventListener']('click', _0x38c279 => {
        if (_0x413f21['classList']['contains']('open')) {
            if (!_0xc707f5['contains'](_0x38c279['target']) && !hamburgerBtn['contains'](_0x38c279['target'])) {
                _0x413f21['classList']['remove']('open');
            }
        }
    });
});
document['addEventListener']('DOMContentLoaded', () => {
    const _0x575b7c = document['getElementById']('fortuneEtc');
    const _0x2f836c = document['getElementById']('fortuneCustom');
    _0x575b7c['addEventListener']('change', () => {
        _0x2f836c['classList']['toggle']('hidden', !_0x575b7c['checked']);
    });
    const _0x317508 = document['getElementById']('fortuneName');
    const _0x5e5da8 = document['getElementById']('fortuneBirth');
    const _0x2c4cf4 = document['getElementById']('birthHour');
    const _0x420fa1 = document['getElementById']('birthMinute');
    const _0x2df856 = () => {
        localStorage['setItem']('fortuneName', _0x317508['value']);
        localStorage['setItem']('fortuneBirth', _0x5e5da8['value']);
        localStorage['setItem']('birthHour', _0x2c4cf4['value']);
        localStorage['setItem']('birthMinute', _0x420fa1['value']);
    };
    const _0x43efc6 = () => {
        _0x317508['value'] = localStorage['getItem']('fortuneName') || '';
        _0x5e5da8['value'] = localStorage['getItem']('fortuneBirth') || '';
        _0x2c4cf4['value'] = localStorage['getItem']('birthHour') || '00';
        _0x420fa1['value'] = localStorage['getItem']('birthMinute') || '00';
    };
    _0x317508['addEventListener']('input', _0x2df856);
    _0x5e5da8['addEventListener']('change', _0x2df856);
    _0x2c4cf4['addEventListener']('change', _0x2df856);
    _0x420fa1['addEventListener']('change', _0x2df856);
    _0x43efc6();
});
async function generateQuiz() {
    const _0x2cbf2b = document['getElementById']('topicInput')['value'] || '상식';
    const _0xd0d38d = document['getElementById']('quizList');
    _0xd0d38d['innerHTML'] = '';
    toggleLoading(!![]);
    try {
        const _0x10b573 = await fetch(apiBase + '/quiz/gpt?topic=' + encodeURIComponent(_0x2cbf2b) + '&count=3');
        const _0x1f9138 = await _0x10b573['json']();
        displayQuiz(_0x1f9138);
    } catch (_0x112d70) {
        _0xd0d38d['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow\x22>퀴즈\x20생성\x20실패:\x20' + _0x112d70['message'] + '</li>';
    } finally {
        toggleLoading(![]);
    }
}
function displayQuiz(_0x5d752a) {
    const _0x474ca3 = document['getElementById']('quizList');
    _0x474ca3['innerHTML'] = '';
    if (!Array['isArray'](_0x5d752a)) {
        _0x474ca3['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow\x22>퀴즈\x20생성\x20실패:\x20' + (_0x5d752a['error'] || '알\x20수\x20없는\x20오류') + '</li>';
        return;
    }
    _0x5d752a['forEach']((_0x54a475, _0xd00652) => {
        const _0x44df4d = 'quiz-' + _0xd00652;
        const _0x3fe536 = 'answer-' + _0xd00652;
        const _0xcdd378 = 'choices-' + _0xd00652;
        const _0xa42bc7 = document['createElement']('li');
        _0xa42bc7['innerHTML'] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bg-[#4a4a4a]\x20p-6\x20rounded-xl\x20shadow-md\x20transition-all\x20duration-300\x22\x20id=\x22' + _0x44df4d + '\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22font-semibold\x20mb-4\x20text-lg\x20text-[#7ee8c1]\x22>' + (_0xd00652 + 0x1) + '.\x20' + _0x54a475['question'] + '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<form\x20id=\x22' + _0xcdd378 + '\x22\x20class=\x22space-y-2\x20mb-4\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x54a475['choices']['map']((_0x24938e, _0xdb8392) => {
            const _0x360f65 = String['fromCharCode'](0x41 + _0xdb8392);
            const _0x53122f = /^[a-dA-D]\./['test'](_0x24938e['trim']());
            const _0x4f856e = _0x53122f ? _0x24938e : _0x360f65 + '.\x20' + _0x24938e;
            return '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<label\x20class=\x22block\x20transition-all\x20duration-200\x20border\x20border-[#555555]\x20rounded\x20px-4\x20py-3\x20cursor-pointer\x20bg-[#2e2e2e]\x20hover:bg-[#444]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22radio\x22\x20name=\x22quiz-' + _0xd00652 + '\x22\x20value=\x22' + _0x24938e + '\x22\x20class=\x22hidden\x22\x20onchange=\x22checkAnswer(\x27' + _0x44df4d + '\x27,\x20this,\x20\x27' + _0x54a475['answer'] + '\x27)\x22/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22inline-block\x20text-[#d6d6d6]\x22>' + _0x4f856e + '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</label>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20';
        })['join']('') + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</form>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20gap-3\x20items-center\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20id=\x22' + _0x3fe536 + '\x22\x20class=\x22text-sm\x20text-[#999]\x20cursor-pointer\x20hover:text-[#7ee8c1]\x20hover:underline\x20select-none\x22\x20onclick=\x22toggleAnswer(\x27' + _0x3fe536 + '\x27,\x20\x27' + _0x54a475['answer'] + '\x27)\x22>정답\x20보기</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22text-sm\x20px-3\x20py-1\x20bg-[#3a3a3a]\x20hover:bg-[#505050]\x20border\x20border-[#555555]\x20rounded\x20text-[#d6d6d6]\x20transition\x20select-none\x22\x20onclick=\x22resetQuiz(\x27' + _0x44df4d + '\x27,\x20\x27' + _0xcdd378 + '\x27,\x20\x27' + _0x3fe536 + '\x27)\x22>🔄\x20다시\x20풀기</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20';
        _0x474ca3['appendChild'](_0xa42bc7);
    });
}
function checkAnswer(_0x2c6cc0, _0x2c55b0, _0x139171) {
    const _0x131b35 = document['getElementById'](_0x2c6cc0);
    const _0x16d47b = _0x131b35['querySelectorAll']('label');
    _0x16d47b['forEach'](_0x131b3d => {
        const _0x9aae98 = _0x131b3d['querySelector']('input');
        _0x131b3d['classList']['remove']('bg-red-800', 'bg-green-800', 'animate-bounce', 'animate-shake', 'shadow-md');
        const _0x184bac = _0x131b3d['querySelector']('.result-icon');
        if (_0x184bac)
            _0x184bac['remove']();
        if (_0x9aae98['checked']) {
            if (_0x9aae98['value'] === _0x139171) {
                _0x131b3d['classList']['add']('bg-green-800', 'shadow-md', 'animate-bounce');
                const _0x25cef7 = document['createElement']('span');
                _0x25cef7['textContent'] = '✅';
                _0x25cef7['className'] = 'ml-2\x20result-icon\x20text-green-400';
                _0x131b3d['appendChild'](_0x25cef7);
            } else {
                _0x131b3d['classList']['add']('bg-red-800', 'animate-shake');
                const _0x5f186c = document['createElement']('span');
                _0x5f186c['textContent'] = '❌';
                _0x5f186c['className'] = 'ml-2\x20result-icon\x20text-red-500';
                _0x131b3d['appendChild'](_0x5f186c);
            }
        }
    });
    _0x131b35['querySelectorAll']('input')['forEach'](_0x4e9f13 => _0x4e9f13['disabled'] = !![]);
}
function resetQuiz(_0x3b4294, _0x470ec3, _0x43b023) {
    const _0x1154ce = document['getElementById'](_0x3b4294);
    const _0x534ea4 = document['getElementById'](_0x470ec3);
    _0x534ea4['querySelectorAll']('input')['forEach'](_0x11df92 => {
        _0x11df92['checked'] = ![];
        _0x11df92['disabled'] = ![];
    });
    _0x534ea4['querySelectorAll']('label')['forEach'](_0x2fca3d => {
        _0x2fca3d['classList']['remove']('bg-red-800', 'bg-green-800', 'animate-bounce', 'animate-shake', 'shadow-md');
        const _0x1d687b = _0x2fca3d['querySelector']('.result-icon');
        if (_0x1d687b)
            _0x1d687b['remove']();
    });
    const _0x51e37c = document['getElementById'](_0x43b023);
    _0x51e37c['textContent'] = '정답\x20보기';
    _0x51e37c['classList']['remove']('revealed');
}
function toggleAnswer(_0x694569, _0x3dfe61) {
    const _0x1d4508 = document['getElementById'](_0x694569);
    if (_0x1d4508['classList']['contains']('revealed')) {
        _0x1d4508['textContent'] = '정답\x20보기';
        _0x1d4508['classList']['remove']('revealed');
    } else {
        _0x1d4508['textContent'] = '정답:\x20' + _0x3dfe61;
        _0x1d4508['classList']['add']('revealed');
    }
}
async function generateBalanceGame() {
    const _0x6d0c70 = document['getElementById']('quizList');
    _0x6d0c70['innerHTML'] = '';
    toggleLoading(!![]);
    try {
        const _0x519314 = await fetch(apiBase + '/quiz/balance?count=1');
        const _0x248e60 = await _0x519314['json']();
        if (!Array['isArray'](_0x248e60) || typeof _0x248e60[0x0] !== 'string' || !_0x248e60[0x0]['includes']('VS')) {
            _0x6d0c70['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>밸런스\x20게임\x20데이터를\x20불러오지\x20못했습니다.</li>';
            return;
        }
        let _0x3f83bc = _0x248e60[0x0];
        if (_0x3f83bc['startsWith']('\x22') && _0x3f83bc['endsWith']('\x22')) {
            _0x3f83bc = _0x3f83bc['slice'](0x1, -0x1);
        }
        const [_0xa8e10a, _0x4efe55] = _0x3f83bc['split']('VS')['map'](_0xff22a3 => _0xff22a3['trim']());
        const _0x5545f2 = document['createElement']('li');
        _0x5545f2['innerHTML'] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x20text-center\x20font-bold\x20text-lg\x20text-[#7ee8c1]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0xa8e10a + '\x20<span\x20class=\x22text-[#999999]\x22>VS</span>\x20' + _0x4efe55 + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20';
        _0x6d0c70['appendChild'](_0x5545f2);
    } catch (_0x1063af) {
        _0x6d0c70['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>오류\x20발생:\x20' + _0x1063af['message'] + '</li>';
    } finally {
        toggleLoading(![]);
    }
}
async function searchNews() {
    const _0x2ac31b = document['getElementById']('newsInput')['value'] || '주요\x20뉴스';
    const _0xa63222 = document['getElementById']('newsList');
    const _0x56b770 = document['getElementById']('newsSummary');
    _0xa63222['innerHTML'] = '';
    _0x56b770['innerHTML'] = '';
    toggleLoading(!![]);
    try {
        const _0x32bfa3 = await fetch(apiBase + '/news/search?q=' + encodeURIComponent(_0x2ac31b) + '&display=5');
        const _0x31cd2e = await _0x32bfa3['json']();
        if (!Array['isArray'](_0x31cd2e['items'])) {
            _0xa63222['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>뉴스\x20검색\x20실패:\x20' + (_0x31cd2e['error'] || '알\x20수\x20없는\x20오류') + '</li>';
            return;
        }
        _0x31cd2e['items']['forEach']((_0x3769fd, _0x5d24fc) => {
            const _0x191a23 = document['createElement']('li');
            _0x191a23['innerHTML'] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong\x20class=\x22text-[#7ee8c1]\x22>' + (_0x5d24fc + 0x1) + '.\x20<a\x20href=\x22' + _0x3769fd['link'] + '\x22\x20target=\x22_blank\x22\x20class=\x22hover:underline\x22>' + _0x3769fd['title'] + '</a></strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-sm\x20text-[#999999]\x22>' + _0x3769fd['pubDate'] + '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20';
            _0xa63222['appendChild'](_0x191a23);
        });
    } catch (_0x1f5942) {
        _0xa63222['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>뉴스\x20요청\x20실패:\x20' + _0x1f5942['message'] + '</li>';
    } finally {
        toggleLoading(![]);
    }
}
async function summarizeNews() {
    const _0x4c4a9d = document['getElementById']('newsInput')['value'] || '주요\x20뉴스';
    const _0x299687 = document['getElementById']('newsSummary');
    _0x299687['innerHTML'] = '';
    toggleLoading(!![]);
    try {
        const _0x4609f2 = await fetch(apiBase + '/news/summary?q=' + encodeURIComponent(_0x4c4a9d) + '&display=5');
        const _0x2afcd9 = await _0x4609f2['json']();
        const _0x1fb6e2 = _0x2afcd9['summary']['split'](/(?<=[.!?])\s+/);
        let _0x1b23a3 = '';
        _0x1fb6e2['forEach']((_0x421905, _0x49e2a7) => {
            _0x1b23a3 += _0x421905 + ((_0x49e2a7 + 0x1) % 0x2 === 0x0 ? '<br><br>' : '\x20');
        });
        if (_0x2afcd9['summary']) {
            _0x299687['innerHTML'] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20\x20class=\x22bg-[#4a4a4a]/90\x20text-[#e0f2f1]\x20p-4\x20rounded-lg\x20shadow-md\x20text-base\x20leading-relaxed\x20break-words\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong\x20class=\x22block\x20mb-2\x20text-[#7ee8c1]\x22>뉴스\x20요약:</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-base\x20leading-relaxed\x22>' + _0x1b23a3 + '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20';
        } else {
            _0x299687['innerHTML'] = '<div\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>뉴스\x20요약\x20실패</div>';
        }
    } catch (_0x12ff59) {
        _0x299687['innerHTML'] = '<div\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>오류:\x20' + _0x12ff59['message'] + '</div>';
    } finally {
        toggleLoading(![]);
    }
}
async function getFortune() {
    const _0x41fe77 = document['getElementById']('fortuneName')['value']['trim']();
    const _0x5f439c = document['getElementById']('fortuneBirth')['value'];
    const _0x58599a = document['getElementById']('birthHour')['value'];
    const _0x20d651 = document['getElementById']('birthMinute')['value'];
    const _0x2607af = Array['from'](document['querySelectorAll']('.fortuneType:checked'))['map'](_0x4f57f6 => _0x4f57f6['value']);
    const _0x31e7fc = document['getElementById']('fortuneCustom')['value']['trim']();
    if (_0x31e7fc)
        _0x2607af['push'](_0x31e7fc);
    const _0x4f4dd4 = [...document['querySelectorAll']('.fortuneType:checked')]['map'](_0x2691e9 => _0x2691e9['value']);
    let _0x455916 = _0x4f4dd4['filter'](_0xce05d2 => _0xce05d2 !== '기타');
    if (_0x4f4dd4['includes']('기타')) {
        const _0x46b6bf = document['getElementById']('fortuneCustom')['value']['trim']();
        if (_0x46b6bf)
            _0x455916['push'](_0x46b6bf);
    }
    if (!_0x41fe77 || !_0x5f439c || !_0x58599a || _0x455916['length'] === 0x0) {
        resultBox['innerHTML'] = '<div\x20class=\x27text-red-400\x27>모든\x20항목을\x20입력해주세요.</div>';
        return;
    }
    const _0x2b4f38 = _0x455916['join'](',\x20');
    const _0x4444ab = _0x41fe77 + '의\x20생년월일\x20및\x20태어난\x20시간은\x20' + _0x5f439c + ',\x20' + _0x58599a + ':' + _0x20d651 + '입니다.\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20오늘날짜와\x20알려준\x20내용을\x20기준으로\x20' + _0x41fe77 + '의\x20' + _0x2b4f38 + '에\x20대한\x20오늘의\x20운세를\x20상세하게\x20분석해서\x20알려주세요.\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20생년월일을\x20기준으로\x20하는\x20별자리를\x20틀리는건\x20절대\x20안되니까\x20꼼꼼하게\x20확인해주세요.';
    toggleLoading(!![]);
    try {
        const _0x2f7c7b = await fetch(apiBase + '/fortune', {
            'method': 'POST',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON['stringify']({ 'prompt': _0x4444ab })
        });
        const _0x6febe2 = await _0x2f7c7b['json']();
        document['getElementById']('fortuneResultText')['innerText'] = _0x6febe2['result'];
        const _0x184b41 = document['getElementById']('fortuneCard');
        const _0x1f8492 = document['getElementById']('blurOverlay');
        _0x1f8492['classList']['remove']('hidden');
        setTimeout(() => {
            _0x1f8492['classList']['add']('backdrop-blur');
            _0x184b41['classList']['remove']('hidden');
            setTimeout(() => {
                _0x184b41['classList']['remove']('translate-y-full');
            }, 0xa);
        }, 0xa);
    } catch (_0x35beaf) {
        console['error']('운세\x20요청\x20실패:', _0x35beaf);
        resultBox['innerHTML'] = '<div\x20class=\x27text-red-400\x27>운세\x20분석에\x20실패했습니다.\x20잠시\x20후\x20다시\x20시도해주세요.</div>';
    } finally {
        toggleLoading(![]);
    }
    document['getElementById']('closeFortuneCard')['addEventListener']('click', () => {
        const _0x21bb49 = document['getElementById']('fortuneCard');
        const _0x2fb88a = document['getElementById']('blurOverlay');
        _0x21bb49['classList']['add']('translate-y-full');
        _0x2fb88a['classList']['remove']('backdrop-blur');
        setTimeout(() => {
            _0x21bb49['classList']['add']('hidden');
            _0x2fb88a['classList']['add']('hidden');
        }, 0x1f4);
    });
}
const apiBase = 'https://quizn2ews.onrender.com/api';

function showSection(_0x328e07) {
    document['querySelectorAll']('.quiz,\x20.news,\x20.fortune')['forEach'](_0x11a57a => _0x11a57a['classList']['add']('hidden')), document['getElementById'](_0x328e07)['classList']['remove']('hidden');
}
function toggleLoading(_0x148267) {
    document['getElementById']('loading')['classList']['toggle']('hidden', !_0x148267);
}
function toggleMenu() {
    const _0x396d4d = document['getElementById']('mobileMenu');
    _0x396d4d['classList']['toggle']('translate-x-full');
}
document['addEventListener']('DOMContentLoaded', () => {
    const _0x1349e2 = document['getElementById']('mobileMenu'), _0x464fbe = document['getElementById']('hamburgerBtn');
    _0x464fbe['addEventListener']('click', () => {
        _0x1349e2['classList']['toggle']('open');
    });
    const _0x48db8c = document['getElementById']('mobileMenu');
    document['getElementById']('hamburgerBtn')['addEventListener']('click', () => {
        _0x48db8c['classList']['toggle']('translate-x-full');
    }), document['getElementById']('menuCloseBtn')['addEventListener']('click', () => {
        _0x48db8c['classList']['add']('translate-x-full');
    }), document['getElementById']('menuQuizBtn')['addEventListener']('click', () => {
        showSection('quiz'), _0x48db8c['classList']['add']('translate-x-full');
    }), document['getElementById']('menuNewsBtn')['addEventListener']('click', () => {
        showSection('news'), _0x48db8c['classList']['add']('translate-x-full');
    }), document['getElementById']('menuFortuneBtn')['addEventListener']('click', () => {
        showSection('fortune'), _0x48db8c['classList']['add']('translate-x-full');
    }), document['getElementById']('logo')['addEventListener']('click', () => {
        showSection('quiz');
    }), document['getElementById']('generateQuizBtn')['addEventListener']('click', generateQuiz), document['getElementById']('generateBalanceBtn')['addEventListener']('click', generateBalanceGame), document['getElementById']('searchNewsBtn')['addEventListener']('click', searchNews), document['getElementById']('summarizeNewsBtn')['addEventListener']('click', summarizeNews), document['getElementById']('getFortuneBtn')['addEventListener']('click', getFortune), document['querySelectorAll']('#mobileMenu\x20button')['forEach'](_0x2f327a => {
        _0x2f327a['addEventListener']('click', () => _0x1349e2['classList']['remove']('open'));
    }), document['addEventListener']('click', _0x21bc5e => {
        _0x1349e2['classList']['contains']('open') && (!_0x48db8c['contains'](_0x21bc5e['target']) && !hamburgerBtn['contains'](_0x21bc5e['target']) && _0x1349e2['classList']['remove']('open'));
    });
}), document['addEventListener']('DOMContentLoaded', () => {
    const _0x1cf563 = document['getElementById']('fortuneEtc'), _0x3f57b8 = document['getElementById']('fortuneCustom');
    _0x1cf563['addEventListener']('change', () => {
        _0x3f57b8['classList']['toggle']('hidden', !_0x1cf563['checked']);
    });
    const _0x2ca2ea = document['getElementById']('fortuneName'), _0x5c7911 = document['getElementById']('fortuneBirth'), _0x4d5c65 = document['getElementById']('birthHour'), _0x2c449a = document['getElementById']('birthMinute'), _0x4aaa08 = () => {
            localStorage['setItem']('fortuneName', _0x2ca2ea['value']), localStorage['setItem']('fortuneBirth', _0x5c7911['value']), localStorage['setItem']('birthHour', _0x4d5c65['value']), localStorage['setItem']('birthMinute', _0x2c449a['value']);
        }, _0xbdee42 = () => {
            _0x2ca2ea['value'] = localStorage['getItem']('fortuneName') || '', _0x5c7911['value'] = localStorage['getItem']('fortuneBirth') || '', _0x4d5c65['value'] = localStorage['getItem']('birthHour') || '00', _0x2c449a['value'] = localStorage['getItem']('birthMinute') || '00';
        };
    _0x2ca2ea['addEventListener']('input', _0x4aaa08), _0x5c7911['addEventListener']('change', _0x4aaa08), _0x4d5c65['addEventListener']('change', _0x4aaa08), _0x2c449a['addEventListener']('change', _0x4aaa08), _0xbdee42();
});
async function generateQuiz() {
    const _0x29e2a6 = document['getElementById']('topicInput')['value'] || '상식', _0x3c4d50 = document['getElementById']('quizList');
    _0x3c4d50['innerHTML'] = '', toggleLoading(!![]);
    try {
        const _0x467a99 = await fetch(apiBase + '/quiz/gpt?topic=' + encodeURIComponent(_0x29e2a6) + '&count=3'), _0x4f7820 = await _0x467a99['json']();
        displayQuiz(_0x4f7820);
    } catch (_0x28bede) {
        _0x3c4d50['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow\x22>퀴즈\x20생성\x20실패:\x20' + _0x28bede['message'] + '</li>';
    } finally {
        toggleLoading(![]);
    }
}
function displayQuiz(_0xe72be) {
    const _0x5f0f6a = document['getElementById']('quizList');
    _0x5f0f6a['innerHTML'] = '';
    if (!Array['isArray'](_0xe72be)) {
        _0x5f0f6a['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow\x22>퀴즈\x20생성\x20실패:\x20' + (_0xe72be['error'] || '알\x20수\x20없는\x20오류') + '</li>';
        return;
    }
    _0xe72be['forEach']((_0x135344, _0x3ec57c) => {
        const _0x5528a6 = 'quiz-' + _0x3ec57c, _0x227083 = 'answer-' + _0x3ec57c, _0x32b783 = 'choices-' + _0x3ec57c, _0x25b4b5 = document['createElement']('li');
        _0x25b4b5['innerHTML'] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bg-[#4a4a4a]\x20p-6\x20rounded-xl\x20shadow-md\x20transition-all\x20duration-300\x22\x20id=\x22' + _0x5528a6 + '\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22font-semibold\x20mb-4\x20text-lg\x20text-[#7ee8c1]\x22>' + (_0x3ec57c + 0x1) + '.\x20' + _0x135344['question'] + '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<form\x20id=\x22' + _0x32b783 + '\x22\x20class=\x22space-y-2\x20mb-4\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x135344['choices']['map']((_0x59140a, _0x57a40e) => {
            const _0x55f245 = String['fromCharCode'](0x41 + _0x57a40e), _0x214ef6 = /^[a-dA-D]\./['test'](_0x59140a['trim']()), _0x336ac2 = _0x214ef6 ? _0x59140a : _0x55f245 + '.\x20' + _0x59140a;
            return '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<label\x20class=\x22block\x20transition-all\x20duration-200\x20border\x20border-[#555555]\x20rounded\x20px-4\x20py-3\x20cursor-pointer\x20bg-[#2e2e2e]\x20hover:bg-[#444]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<input\x20type=\x22radio\x22\x20name=\x22quiz-' + _0x3ec57c + '\x22\x20value=\x22' + _0x59140a + '\x22\x20class=\x22hidden\x22\x20onchange=\x22checkAnswer(\x27' + _0x5528a6 + '\x27,\x20this,\x20\x27' + _0x135344['answer'] + '\x27)\x22/>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20class=\x22inline-block\x20text-[#d6d6d6]\x22>' + _0x336ac2 + '</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</label>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20';
        })['join']('') + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</form>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22flex\x20gap-3\x20items-center\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<span\x20id=\x22' + _0x227083 + '\x22\x20class=\x22text-sm\x20text-[#999]\x20cursor-pointer\x20hover:text-[#7ee8c1]\x20hover:underline\x20select-none\x22\x20onclick=\x22toggleAnswer(\x27' + _0x227083 + '\x27,\x20\x27' + _0x135344['answer'] + '\x27)\x22>정답\x20보기</span>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22text-sm\x20px-3\x20py-1\x20bg-[#3a3a3a]\x20hover:bg-[#505050]\x20border\x20border-[#555555]\x20rounded\x20text-[#d6d6d6]\x20transition\x20select-none\x22\x20onclick=\x22resetQuiz(\x27' + _0x5528a6 + '\x27,\x20\x27' + _0x32b783 + '\x27,\x20\x27' + _0x227083 + '\x27)\x22>🔄\x20다시\x20풀기</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20', _0x5f0f6a['appendChild'](_0x25b4b5);
    });
}
function checkAnswer(_0x43652d, _0x403a23, _0x2ad402) {
    const _0x317898 = document['getElementById'](_0x43652d), _0x3c4ae3 = _0x317898['querySelectorAll']('label');
    _0x3c4ae3['forEach'](_0x5081e1 => {
        const _0x4bcf29 = _0x5081e1['querySelector']('input');
        _0x5081e1['classList']['remove']('bg-red-800', 'bg-green-800', 'animate-bounce', 'animate-shake', 'shadow-md');
        const _0x48efde = _0x5081e1['querySelector']('.result-icon');
        if (_0x48efde)
            _0x48efde['remove']();
        if (_0x4bcf29['checked']) {
            if (_0x4bcf29['value'] === _0x2ad402) {
                _0x5081e1['classList']['add']('bg-green-800', 'shadow-md', 'animate-bounce');
                const _0x39f08b = document['createElement']('span');
                _0x39f08b['textContent'] = '✅', _0x39f08b['className'] = 'ml-2\x20result-icon\x20text-green-400', _0x5081e1['appendChild'](_0x39f08b);
            } else {
                _0x5081e1['classList']['add']('bg-red-800', 'animate-shake');
                const _0xf1f1b7 = document['createElement']('span');
                _0xf1f1b7['textContent'] = '❌', _0xf1f1b7['className'] = 'ml-2\x20result-icon\x20text-red-500', _0x5081e1['appendChild'](_0xf1f1b7);
            }
        }
    }), _0x317898['querySelectorAll']('input')['forEach'](_0x37ceba => _0x37ceba['disabled'] = !![]);
}
function resetQuiz(_0x1133f5, _0x3981a8, _0x562e6b) {
    const _0xac7a6b = document['getElementById'](_0x1133f5), _0x12ddbf = document['getElementById'](_0x3981a8);
    _0x12ddbf['querySelectorAll']('input')['forEach'](_0x2457cb => {
        _0x2457cb['checked'] = ![], _0x2457cb['disabled'] = ![];
    }), _0x12ddbf['querySelectorAll']('label')['forEach'](_0x5dad4b => {
        _0x5dad4b['classList']['remove']('bg-red-800', 'bg-green-800', 'animate-bounce', 'animate-shake', 'shadow-md');
        const _0x2c8246 = _0x5dad4b['querySelector']('.result-icon');
        if (_0x2c8246)
            _0x2c8246['remove']();
    });
    const _0x3a6ef9 = document['getElementById'](_0x562e6b);
    _0x3a6ef9['textContent'] = '정답\x20보기', _0x3a6ef9['classList']['remove']('revealed');
}
function toggleAnswer(_0x226f1e, _0x2838b1) {
    const _0xa14f03 = document['getElementById'](_0x226f1e);
    _0xa14f03['classList']['contains']('revealed') ? (_0xa14f03['textContent'] = '정답\x20보기', _0xa14f03['classList']['remove']('revealed')) : (_0xa14f03['textContent'] = '정답:\x20' + _0x2838b1, _0xa14f03['classList']['add']('revealed'));
}
async function generateBalanceGame() {
    const _0x1e2b7a = document['getElementById']('quizList');
    _0x1e2b7a['innerHTML'] = '', toggleLoading(!![]);
    try {
        const _0x55167c = await fetch(apiBase + '/quiz/balance?count=1'), _0x492fc0 = await _0x55167c['json']();
        if (!Array['isArray'](_0x492fc0) || typeof _0x492fc0[0x0] !== 'string' || !_0x492fc0[0x0]['includes']('VS')) {
            _0x1e2b7a['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>밸런스\x20게임\x20데이터를\x20불러오지\x20못했습니다.</li>';
            return;
        }
        let _0x424f10 = _0x492fc0[0x0];
        _0x424f10['startsWith']('\x22') && _0x424f10['endsWith']('\x22') && (_0x424f10 = _0x424f10['slice'](0x1, -0x1));
        const [_0x440b12, _0x13bdc3] = _0x424f10['split']('VS')['map'](_0x5c3bd0 => _0x5c3bd0['trim']()), _0xfd493a = document['createElement']('li');
        _0xfd493a['innerHTML'] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x20text-center\x20font-bold\x20text-lg\x20text-[#7ee8c1]\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' + _0x440b12 + '\x20<span\x20class=\x22text-[#999999]\x22>VS</span>\x20' + _0x13bdc3 + '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20', _0x1e2b7a['appendChild'](_0xfd493a);
    } catch (_0x2c879a) {
        _0x1e2b7a['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>오류\x20발생:\x20' + _0x2c879a['message'] + '</li>';
    } finally {
        toggleLoading(![]);
    }
}
async function searchNews() {
    const _0x571b46 = document['getElementById']('newsInput')['value'] || '주요\x20뉴스', _0x2614eb = document['getElementById']('newsList'), _0x1b4f5c = document['getElementById']('newsSummary');
    _0x2614eb['innerHTML'] = '', _0x1b4f5c['innerHTML'] = '', toggleLoading(!![]);
    try {
        const _0x49b798 = await fetch(apiBase + '/news/search?q=' + encodeURIComponent(_0x571b46) + '&display=5'), _0x90dc82 = await _0x49b798['json']();
        if (!Array['isArray'](_0x90dc82['items'])) {
            _0x2614eb['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>뉴스\x20검색\x20실패:\x20' + (_0x90dc82['error'] || '알\x20수\x20없는\x20오류') + '</li>';
            return;
        }
        _0x90dc82['items']['forEach']((_0x266bd0, _0x39f9c5) => {
            const _0x1a37d4 = document['createElement']('li');
            _0x1a37d4['innerHTML'] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong\x20class=\x22text-[#7ee8c1]\x22>' + (_0x39f9c5 + 0x1) + '.\x20<a\x20href=\x22' + _0x266bd0['link'] + '\x22\x20target=\x22_blank\x22\x20class=\x22hover:underline\x22>' + _0x266bd0['title'] + '</a></strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-sm\x20text-[#999999]\x22>' + _0x266bd0['pubDate'] + '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20', _0x2614eb['appendChild'](_0x1a37d4);
        });
    } catch (_0x5a71e4) {
        _0x2614eb['innerHTML'] = '<li\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>뉴스\x20요청\x20실패:\x20' + _0x5a71e4['message'] + '</li>';
    } finally {
        toggleLoading(![]);
    }
}
async function summarizeNews() {
    const _0x536f6f = document['getElementById']('newsInput')['value'] || '주요\x20뉴스', _0x545aad = document['getElementById']('newsSummary');
    _0x545aad['innerHTML'] = '', toggleLoading(!![]);
    try {
        const _0x44bb27 = await fetch(apiBase + '/news/summary?q=' + encodeURIComponent(_0x536f6f) + '&display=5'), _0x17326e = await _0x44bb27['json'](), _0x5c0e43 = _0x17326e['summary']['split'](/(?<=[.!?])\s+/);
        let _0x2bef38 = '';
        _0x5c0e43['forEach']((_0x1c9e3b, _0x143d36) => {
            _0x2bef38 += _0x1c9e3b + ((_0x143d36 + 0x1) % 0x2 === 0x0 ? '<br><br>' : '\x20');
        }), _0x17326e['summary'] ? _0x545aad['innerHTML'] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<div\x20\x20class=\x22bg-[#4a4a4a]/90\x20text-[#e0f2f1]\x20p-4\x20rounded-lg\x20shadow-md\x20text-base\x20leading-relaxed\x20break-words\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong\x20class=\x22block\x20mb-2\x20text-[#7ee8c1]\x22>뉴스\x20요약:</strong>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<p\x20class=\x22text-base\x20leading-relaxed\x22>' + _0x2bef38 + '</p>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</div>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20' : _0x545aad['innerHTML'] = '<div\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>뉴스\x20요약\x20실패</div>';
    } catch (_0x131d72) {
        _0x545aad['innerHTML'] = '<div\x20class=\x22bg-[#4a4a4a]\x20p-4\x20rounded-lg\x20shadow-md\x22>오류:\x20' + _0x131d72['message'] + '</div>';
    } finally {
        toggleLoading(![]);
    }
}
async function getFortune() {
    const _0x2cc3c4 = document['getElementById']('fortuneName')['value']['trim'](), _0x8170bf = document['getElementById']('fortuneBirth')['value'], _0x1a26b8 = document['getElementById']('birthHour')['value'], _0x4930d7 = document['getElementById']('birthMinute')['value'], _0x48d280 = Array['from'](document['querySelectorAll']('.fortuneType:checked'))['map'](_0x1a29d6 => _0x1a29d6['value']), _0x42fcce = document['getElementById']('fortuneCustom')['value']['trim']();
    if (_0x42fcce)
        _0x48d280['push'](_0x42fcce);
    const _0x5a1951 = document['getElementById']('fortuneResult');
    _0x5a1951['innerHTML'] = '';
    const _0x42b8da = [...document['querySelectorAll']('.fortuneType:checked')]['map'](_0x37a78a => _0x37a78a['value']);
    let _0xbf22ae = _0x42b8da['filter'](_0x8d307f => _0x8d307f !== '기타');
    if (_0x42b8da['includes']('기타')) {
        const _0xf02ecc = document['getElementById']('fortuneCustom')['value']['trim']();
        if (_0xf02ecc)
            _0xbf22ae['push'](_0xf02ecc);
    }
    const _0x387d6c = document['getElementById']('fortuneResult');
    _0x387d6c['innerHTML'] = '';
    if (!_0x2cc3c4 || !_0x8170bf || !_0x1a26b8 || _0xbf22ae['length'] === 0x0) {
        _0x387d6c['innerHTML'] = '<div\x20class=\x27text-red-400\x27>모든\x20항목을\x20입력해주세요.</div>';
        return;
    }
    const _0x537a3d = _0xbf22ae['join'](',\x20'), _0x4ce763 = _0x2cc3c4 + '의\x20생년월일\x20및\x20태어난\x20시간은\x20' + _0x8170bf + ',\x20' + _0x1a26b8 + ':' + _0x4930d7 + '입니다.\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20알려준\x20내용을\x20기준으로\x20' + _0x2cc3c4 + '의\x20' + _0x537a3d + '에\x20대한\x20오늘의\x20사주를\x20분석해서\x20상세하게\x20알려줘.';
    toggleLoading(!![]);
    try {
        const _0xc4760a = await fetch(apiBase + '/fortune', {
                'method': 'POST',
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON['stringify']({ 'prompt': _0x4ce763 })
            }), _0x14f9fa = await _0xc4760a['json']();
        _0x14f9fa['result'] ? _0x5a1951['innerHTML'] = '<div\x20class=\x27bg-[#4a4a4a]\x20p-4\x20rounded\x20shadow\x20text-[#d6d6d6]\x20whitespace-pre-line\x27>' + _0x14f9fa['result'] + '</div>' : _0x5a1951['innerHTML'] = '<div\x20class=\x27bg-[#4a4a4a]\x20p-4\x20rounded\x27>사주\x20분석\x20실패</div>';
    } catch (_0x497104) {
        _0x5a1951['innerHTML'] = '<div\x20class=\x27bg-[#4a4a4a]\x20p-4\x20rounded\x27>오류:\x20' + _0x497104['message'] + '</div>';
    } finally {
        toggleLoading(![]);
    }
}
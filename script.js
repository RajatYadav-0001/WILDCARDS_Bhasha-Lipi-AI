 (function() {
            // ---- language grid data -----
            const bhashaList = [
                { name:"हिन्दी", icon:"fa-solid fa-om", script:"Devanagari" },
                { name:"বাংলা", icon:"fa-solid fa-b", script:"Bengali" },
                { name:"ਪੰਜਾਬੀ", icon:"fa-solid fa-p", script:"Gurmukhi" },
                { name:"ગુજરાતી", icon:"fa-solid fa-ga", script:"Gujarati" },
                { name:"தமிழ்", icon:"fa-solid fa-t", script:"Tamil" },
                { name:"తెలుగు", icon:"fa-solid fa-te", script:"Telugu" },
                { name:"ಕನ್ನಡ", icon:"fa-solid fa-ka", script:"Kannada" },
                { name:"മലയാളം", icon:"fa-solid fa-ma", script:"Malayalam" },
                { name:"ଓଡ଼ିଆ", icon:"fa-solid fa-o", script:"Odia" },
                { name:"اردو", icon:"fa-solid fa-u", script:"Urdu" },
                { name:"ဗမာ", icon:"fa-solid fa-ba", script:"Myanmar" },
                { name:"ភាសាខ្មែរ", icon:"fa-solid fa-kh", script:"Khmer" },
            ];

            const lipiList = [
                { name:"ब्राह्मी", icon:"fa-regular fa-gem", script:"Brahmi" },
                { name:"खरोष्ठी", icon:"fa-regular fa-star", script:"Kharosthi" },
                { name:"गुप्त", icon:"fa-regular fa-crown", script:"Gupta" },
                { name:"सिद्धम", icon:"fa-solid fa-s", script:"Siddham" },
                { name:"तिब्बती", icon:"fa-regular fa-snowflake", script:"Tibetan" },
                { name:"शारदा", icon:"fa-regular fa-sun", script:"Sharada" },
                { name:"लैटिन", icon:"fa-solid fa-l", script:"Latin" },
                { name:"सिरिलिक", icon:"fa-solid fa-c", script:"Cyrillic" },
                { name:"कन्नड", icon:"fa-regular fa-pen-to-square", script:"Kannada" },
                { name:"ग्रन्थ", icon:"fa-solid fa-scroll", script:"Grantha" },
                { name:"कोरियाई", icon:"fa-solid fa-hangul", script:"Hangul" },
                { name:"चीनी", icon:"fa-solid fa-cn", script:"Han" },
            ];

            let currentMode = 'bhasha'; // bhasha / lipi
            const grid = document.getElementById('langGrid');
            const toggleBtns = document.querySelectorAll('.pill');
            const modeToggle = document.getElementById('scriptToggle');

            function renderGrid() {
                const data = currentMode === 'bhasha' ? bhashaList : lipiList;
                grid.innerHTML = '';
                data.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'lang-card';
                    // random active for demo (just first one active)
                    if (item.name === 'हिन्दी' || item.name === 'ब्राह्मी') {
                        card.setAttribute('data-active', 'true');
                    } else {
                        card.setAttribute('data-active', 'false');
                    }
                    card.innerHTML = `<i class="fas ${item.icon}"></i><span>${item.name}</span><small style="font-size:0.7rem; opacity:0.7;">${item.script}</small>`;
                    card.addEventListener('click', () => {
                        // just simulate update on translator
                        document.getElementById('targetScript').value = item.script.toLowerCase().replace(/ /g,'');
                        document.getElementById('outputArea').innerHTML = `<i class="fas fa-quote-right"></i> <span>🙏🏽 ${item.name} · ${item.script}</span>`;
                    });
                    grid.appendChild(card);
                });
            }

            toggleBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    toggleBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const mode = btn.dataset.mode; // 'bhasha' or 'lipi'
                    currentMode = mode;
                    renderGrid();
                });
            });

            // initial render
            renderGrid();

            // ----- translator simulation (overcome barrier) -------
            const inputPhrase = document.getElementById('inputPhrase');
            const targetScript = document.getElementById('targetScript');
            const outputSpan = document.getElementById('translatedText');
            const outputArea = document.getElementById('outputArea');
            const translateBtn = document.getElementById('magicTranslateBtn');
            const swapBtn = document.getElementById('swapLangBtn');

            // extremely simple fake transliteration mapping (just for creative demonstration)
            const scriptMap = {
                devanagari: { 'Namaste': 'नमस्ते', 'duniya': 'दुनिया', 'hello': 'नमस्कार', 'world': 'विश्व', '!': '!' },
                bengali: { 'Namaste': 'নমস্তে', 'duniya': 'দুনিয়া', 'hello': 'হ্যালো', 'world': 'বিশ্ব' },
                tamil: { 'Namaste': 'நமஸ்தே', 'duniya': 'துனியா', 'hello': 'வணக்கம்', 'world': 'உலகம்' },
                gurmukhi: { 'Namaste': 'ਨਮਸਤੇ', 'duniya': 'ਦੁਨੀਆ', 'hello': 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', 'world': 'ਦੁਨੀਆ' },
                gujarati: { 'Namaste': 'નમસ્તે', 'duniya': 'દુનિયા', 'hello': 'નમસ્કાર', 'world': 'વિશ્વ' },
                odia: { 'Namaste': 'ନମସ୍ତେ', 'duniya': 'ଦୁନିଆ', 'hello': 'ନମସ୍କାର', 'world': 'ବିଶ୍ୱ' },
                kannada: { 'Namaste': 'ನಮಸ್ತೆ', 'duniya': 'ದುನಿಯಾ', 'hello': 'ನಮಸ್ಕಾರ', 'world': 'ವಿಶ್ವ' },
                malayalam: { 'Namaste': 'നമസ്തേ', 'duniya': 'ദുനിയ', 'hello': 'നമസ്കാരം', 'world': 'ലോകം' },
                telugu: { 'Namaste': 'నమస్తే', 'duniya': 'దునియా', 'hello': 'నమస్కారం', 'world': 'ప్రపంచం' },
            };

            function simpleFakeTransliterate(text, target) {
                const mapping = scriptMap[target] || scriptMap.devanagari;
                let result = text;
                Object.keys(mapping).forEach(word => {
                    const regex = new RegExp(word, 'gi');
                    result = result.replace(regex, mapping[word]);
                });
                // fallback: add some random diacritics to convey script change
                if (result === text) {
                    if (target === 'devanagari') result = text + ' 𑌨𑌮𑌸𑍍𑌤𑍇'; 
                    else if (target === 'bengali') result = text + ' বাংলা';
                    else result = '✨ ' + text + ' → in ' + target;
                }
                return result;
            }

            function updateTranslation() {
                let text = inputPhrase.value.trim();
                if (text === '') text = 'Jagat';
                const target = targetScript.value;
                const translated = simpleFakeTransliterate(text, target);
                outputSpan.innerText = translated;
            }

            translateBtn.addEventListener('click', () => {
                updateTranslation();
                // also show an alert-like message in output styling
                outputArea.style.background = '#e2cbb0';
                setTimeout(() => outputArea.style.background = '#e7cfb6', 200);
            });

            swapBtn.addEventListener('click', () => {
                // just swap target to a random one (creative)
                const options = Array.from(targetScript.options);
                const randomIdx = Math.floor(Math.random() * options.length);
                targetScript.selectedIndex = randomIdx;
                updateTranslation();
            });

            // input on typing -> reflect (real time preview)
            inputPhrase.addEventListener('input', updateTranslation);
            targetScript.addEventListener('change', updateTranslation);

            // set initial translation
            updateTranslation();

            // extra demo: when you click on any language card it also changes the output.
            // already included above.

            // small info: update output to show 'overcoming informational exclusion'
            const style = document.createElement('style');
            style.innerHTML = `
                .lang-card[data-active="true"] {
                    background: #c47c4d;
                    border-color: #b14f16;
                }
            `;
            document.head.appendChild(style);
        })();
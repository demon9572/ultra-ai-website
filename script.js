const analytics = {
    track: (eventName) => {

    }
};

// Add this function to your existing script.js file
function promptDownload() {
    const fileName = 'UltraAI_Info.txt';
    const fileContent = 'Thank you for your interest in UltraAI! Visit our website for more information.';
    
    try {
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const element = document.createElement('a');
        element.href = url;
        element.download = fileName;
        element.style.display = 'none';
        
        document.body.appendChild(element);
        element.click();
        
        document.body.removeChild(element);
        URL.revokeObjectURL(url);
        
        analytics.track('download');
        showNotification(getLocalizedString('downloadStarted'), 'success');
    } catch (error) {
        console.error('Download failed:', error);
        showNotification(getLocalizedString('downloadFailed'), 'error');
    }
}

function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = document.documentElement.lang || 'en-US';
        window.speechSynthesis.speak(utterance);
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.setAttribute('role', 'alert');
    document.body.appendChild(notification);
    speak(message);
    
    // Trigger reflow
    notification.offsetHeight;
    
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
}

function getLocalizedString(key) {
    const strings = {
        'en': {
            'downloadStarted': 'Download started!',
            'downloadFailed': 'Download failed. Please try again.',
            'downloading': 'Downloading...',
            'download': 'Download UltraAI Info',
            'speak': 'Speak to download',
            'listening': 'Listening...',
            'notUnderstood': 'Sorry, I didn\'t understand that. Please try again.',
            'copy': 'Copy',
            'copied': 'Copied to clipboard!',
            'copyFailed': 'Failed to copy.',
            'joke': 'Why don\'t scientists trust atoms? Because they make up everything!',
            'typeMessage': 'Type a message...',
            'chatbotGreeting': 'Hello there! How can I help you today?',
            'chatbotFeeling': 'I am just a bot, but I am feeling great! Thanks for asking.',
            'chatbotHelp': 'I can help you with a few things. Try asking me for the time, a joke, or to download the info file.',
            'chatbotNotUnderstood': 'I am not sure I understand. Please try again.',
            'formName': 'Name',
            'formNamePlaceholder': 'Enter your name',
            'formEmail': 'Email',
            'formEmailPlaceholder': 'Enter your email',
            'formMessage': 'Message',
            'formMessagePlaceholder': 'Enter your message',
            'formSubmit': 'Submit',
            'formSubmitted': 'Thank you for your message!',
            'faqTitle': 'Frequently Asked Questions',
            'faqQ1': 'What is UltraAI?',
            'faqA1': 'UltraAI is a revolutionary new artificial intelligence platform designed to help you with a variety of tasks.',
            'faqQ2': 'How can I use UltraAI?',
            'faqA2': 'You can interact with UltraAI through voice commands or the built-in chatbot.',
            'faqQ3': 'Is UltraAI free?',
            'faqA3': 'Yes, the basic features of UltraAI are completely free to use.'
        },
        'es': {
            'downloadStarted': '¡Descarga iniciada!',
            'downloadFailed': 'La descarga falló. Por favor, inténtelo de nuevo.',
            'downloading': 'Descargando...',
            'download': 'Descargar información de UltraAI',
            'speak': 'Habla para descargar',
            'listening': 'Escuchando...',
            'notUnderstood': 'Lo siento, no entendí eso. Por favor, inténtelo de nuevo.',
            'copy': 'Copiar',
            'copied': '¡Copiado al portapapeles!',
            'copyFailed': 'Error al copiar.',
            'joke': '¿Por qué los científicos no confían en los átomos? ¡Porque ellos lo inventan todo!',
            'chatbotGreeting': '¡Hola! ¿Cómo puedo ayudarte hoy?',
            'chatbotFeeling': 'Soy solo un bot, ¡pero me siento genial! Gracias por preguntar.',
            'chatbotHelp': 'Puedo ayudarte con algunas cosas. Intenta preguntarme la hora, un chiste o que descargue el archivo de información.',
            'chatbotNotUnderstood': 'No estoy seguro de entender. Por favor, inténtalo de nuevo.'
        },
        'fr': {
            'downloadStarted': 'Téléchargement commencé !',
            'downloadFailed': 'Le téléchargement a échoué. Veuillez réessayer.',
            'downloading': 'Téléchargement en cours...',
            'download': 'Télécharger les infos UltraAI',
            'speak': 'Parlez pour télécharger',
            'listening': 'Écoute...',
            'notUnderstood': 'Désolé, je n\'ai pas compris. Veuillez réessayer.',
            'copy': 'Copier',
            'copied': 'Copié dans le presse-papiers !',
            'copyFailed': 'Échec de la copie.',
            'joke': 'Pourquoi les scientifiques ne font-ils pas confiance aux atomes ? Parce qu\'ils inventent tout !',
            'chatbotGreeting': 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?',
            'chatbotFeeling': 'Je ne suis qu\'un bot, mais je me sens bien ! Merci de demander.',
            'chatbotHelp': 'Je peux vous aider avec plusieurs choses. Essayez de me demander l\'heure, une blague ou de télécharger le fichier d\'information.',
            'chatbotNotUnderstood': 'Je ne suis pas sûr de comprendre. Veuillez réessayer.'
        },
        'de': {
            'downloadStarted': 'Download gestartet!',
            'downloadFailed': 'Download fehlgeschlagen. Bitte versuchen Sie es erneut.',
            'downloading': 'Wird heruntergeladen...',
            'download': 'UltraAI-Infos herunterladen',
            'speak': 'Sprechen Sie zum Herunterladen',
            'listening': 'Höre...',
            'notUnderstood': 'Entschuldigung, ich habe das nicht verstanden. Bitte versuchen Sie es erneut.',
            'copy': 'Kopieren',
            'copied': 'In die Zwischenablage kopiert!',
            'copyFailed': 'Kopieren fehlgeschlagen.',
            'joke': 'Warum vertrauen Wissenschaftler Atomen nicht? Weil sie alles erfinden!',
            'chatbotGreeting': 'Hallo! Wie kann ich Ihnen heute helfen?',
            'chatbotFeeling': 'Ich bin nur ein Bot, aber mir geht es großartig! Danke der Nachfrage.',
            'chatbotHelp': 'Ich kann Ihnen bei einigen Dingen helfen. Fragen Sie mich nach der Uhrzeit, einem Witz oder laden Sie die Infodatei herunter.',
            'chatbotNotUnderstood': 'Ich bin mir nicht sicher, ob ich das verstehe. Bitte versuchen Sie es erneut.'
        },
        'it': {
            'downloadStarted': 'Download avviato!',
            'downloadFailed': 'Download fallito. Si prega di riprovare.',
            'downloading': 'Scaricamento in corso...',
            'download': 'Scarica le informazioni di UltraAI',
            'speak': 'Parla per scaricare',
            'listening': 'In ascolto...',
            'notUnderstood': 'Mi dispiace, non ho capito. Si prega di riprovare.',
            'copy': 'Copia',
            'copied': 'Copiato negli appunti!',
            'copyFailed': 'Copia non riuscita.',
            'joke': 'Perché gli scienziati non si fidano degli atomi? Perché inventano tutto!',
            'chatbotGreeting': 'Ciao! Come posso aiutarti oggi?',
            'chatbotFeeling': 'Sono solo un bot, ma mi sento benissimo! Grazie per aver chiesto.',
            'chatbotHelp': 'Posso aiutarti con alcune cose. Prova a chiedermi l\'ora, una barzelletta o di scaricare il file informativo.',
            'chatbotNotUnderstood': 'Non sono sicuro di aver capito. Per favore, riprova.'
        },
        'ja': {
            'downloadStarted': 'ダウンロードが開始されました！',
            'downloadFailed': 'ダウンロードに失敗しました。もう一度お試しください。',
            'downloading': 'ダウンロード中...',
            'download': 'UltraAI情報をダウンロード',
            'speak': '話すとダウンロードします',
            'listening': 'リスニング中...',
            'notUnderstood': 'すみません、理解できませんでした。もう一度お試しください。',
            'copy': 'コピー',
            'copied': 'クリップボードにコピーしました！',
            'copyFailed': 'コピーに失敗しました。',
            'joke': 'なぜ科学者は原子を信用しないのですか？彼らはすべてを構成しているからです！',
            'chatbotGreeting': 'こんにちは！今日はどうなさいましたか？',
            'chatbotFeeling': '私はただのボットですが、気分は最高です！お尋ねいただきありがとうございます。',
            'chatbotHelp': 'いくつかお手伝いできます。時間や冗談を尋ねるか、情報ファイルをダウンロードしてみてください。',
            'chatbotNotUnderstood': 'よくわかりません。もう一度お試しください。'
        },
        'zh': {
            'downloadStarted': '下载已开始！',
            'downloadFailed': '下载失败。请重试。',
            'downloading': '正在下载...',
            'download': '下载UltraAI信息',
            'speak': '说话以下载',
            'listening': '正在监听...',
            'notUnderstood': '抱歉，没有听懂。请重试。',
            'copy': '复制',
            'copied': '已复制到剪贴板！',
            'copyFailed': '复制失败。',
            'joke': '科学家为什么不相信原子？因为它们构成了一切！',
            'chatbotGreeting': '你好！我今天能帮你什么？',
            'chatbotFeeling': '我只是一个机器人，但我感觉很棒！谢谢你的慰问。',
            'chatbotHelp': '我可以帮你做一些事情。试着问我时间、一个笑话，或者下载信息文件。',
'chatbotNotUnderstood': '我不确定我是否理解。请再试一次。'
        },
        'ru': {
            'downloadStarted': 'Загрузка началась!',
            'downloadFailed': 'Загрузка не удалась. Пожалуйста, попробуйте еще раз.',
            'downloading': 'Загрузка...',
            'download': 'Скачать информацию об UltraAI',
            'speak': 'Говорите для загрузки',
            'listening': 'Прослушивание...',
            'notUnderstood': 'Извините, я не понял. Пожалуйста, попробуйте еще раз.',
            'copy': 'копировать',
            'copied': 'Скопировано в буфер обмена!',
            'copyFailed': 'Не удалось скопировать.',
            'joke': 'Почему ученые не доверяют атомам? Потому что они все выдумывают!',
            'chatbotGreeting': 'Привет! Чем я могу вам помочь сегодня?',
            'chatbotFeeling': 'Я просто бот, но я чувствую себя отлично! Спасибо, что спросили.',
            'chatbotHelp': 'Я могу помочь вам с несколькими вещами. Попробуйте спросить у меня время, шутку или загрузить информационный файл.',
            'chatbotNotUnderstood': 'Я не уверен, что понимаю. Пожалуйста, попробуйте еще раз.'
        }
    };
    const lang = document.documentElement.lang || 'en';
    return strings[lang]?.[key] || strings['en'][key];
}
// Voice recognition feature
function setupVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = document.documentElement.lang || 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        const speakButton = document.createElement('button');
        speakButton.textContent = getLocalizedString('speak');
        speakButton.className = 'speak-btn';
        document.body.appendChild(speakButton);

        const commands = {
            'download': promptDownload,
            'joke': () => showNotification(getLocalizedString('joke')),
            'time': () => showNotification(new Date().toLocaleTimeString()),
        };

        speakButton.addEventListener('click', () => {
            speakButton.disabled = true;
            speakButton.textContent = getLocalizedString('listening');
            recognition.start();
        });

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.toLowerCase();
            const command = Object.keys(commands).find(key => transcript.includes(key));

            if (command) {
                commands[command]();
            } else {
                showNotification(getLocalizedString('notUnderstood'), 'error');
            }

            speakButton.disabled = false;
            speakButton.textContent = getLocalizedString('speak');
        };

        recognition.onerror = () => {
            showNotification(getLocalizedString('notUnderstood'), 'error');
            speakButton.disabled = false;
            speakButton.textContent = getLocalizedString('speak');
        };
    }
}

// Translation feature
function translateContent() {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = getLocalizedString(key);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadButton');
    if (downloadButton) {
        downloadButton.setAttribute('aria-label', getLocalizedString('download'));
        downloadButton.setAttribute('data-translate', 'download');
        
        downloadButton.addEventListener('click', () => {
            downloadButton.disabled = true;
            const spinner = document.createElement('span');
            spinner.className = 'spinner';
            spinner.setAttribute('aria-hidden', 'true');

            const downloadingText = document.createElement('span');
            downloadingText.setAttribute('data-translate', 'downloading');
            downloadingText.textContent = getLocalizedString('downloading');

            downloadButton.textContent = '';
            downloadButton.appendChild(spinner);
            downloadButton.appendChild(downloadingText);

            promptDownload();
            setTimeout(() => {
                downloadButton.disabled = false;
                const downloadText = document.createElement('span');
                downloadText.setAttribute('data-translate', 'download');
                downloadText.textContent = getLocalizedString('download');
                downloadButton.textContent = '';
                downloadButton.appendChild(downloadText);
            }, 2000);
        });
        
        downloadButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                downloadButton.click();
            }
        });
    } else {
        console.error('Download button not found in the DOM');
    }

    setupVoiceRecognition();
    translateContent();
    setupDarkModeToggle();
    setupLanguageSelector();
    setupCopyToClipboardButton();
    setupChatbot();
    setupContactForm();
    setupFAQ();
    setupSocialMediaButtons();
});

function setupLanguageSelector() {
    const languageSelector = document.createElement('select');
    languageSelector.className = 'language-selector';

    const languages = {
        'en': 'English',
        'es': 'Español',
        'fr': 'Français',
        'de': 'Deutsch',
        'it': 'Italiano',
        'ja': '日本語',
        'zh': '中文',
        'ru': 'Русский'
    };

    for (const langCode in languages) {
        const option = document.createElement('option');
        option.value = langCode;
        option.textContent = languages[langCode];
        languageSelector.appendChild(option);
    }

    const savedLang = localStorage.getItem('language') || document.documentElement.lang || 'en';
    languageSelector.value = savedLang;
    document.documentElement.lang = savedLang;

    languageSelector.addEventListener('change', () => {
        const selectedLang = languageSelector.value;
        document.documentElement.lang = selectedLang;
        localStorage.setItem('language', selectedLang);
        translateContent();
    });

    document.body.appendChild(languageSelector);
}

function setupCopyToClipboardButton() {
    const copyButton = document.createElement('button');
    copyButton.textContent = getLocalizedString('copy');
    copyButton.className = 'btn copy-btn';
    copyButton.setAttribute('data-translate', 'copy');
    document.body.appendChild(copyButton);

    copyButton.addEventListener('click', () => {
        const fileContent = 'Thank you for your interest in UltraAI! Visit our website for more information.';
        navigator.clipboard.writeText(fileContent).then(() => {
            showNotification(getLocalizedString('copied'), 'success');
        }, () => {
            showNotification(getLocalizedString('copyFailed'), 'error');
        });
    });
}

function handleChatMessage(message, chatMessages) {
    const userMessage = document.createElement('div');
    userMessage.textContent = `You: ${message}`;
    chatMessages.appendChild(userMessage);

    const lowerCaseMessage = message.toLowerCase();
    let response = getLocalizedString('chatbotNotUnderstood');

    if (lowerCaseMessage.includes('hello')) {
        response = getLocalizedString('chatbotGreeting');
    } else if (lowerCaseMessage.includes('how are you')) {
        response = getLocalizedString('chatbotFeeling');
    } else if (lowerCaseMessage.includes('help')) {
        response = getLocalizedString('chatbotHelp');
    }

    const botMessage = document.createElement('div');
    botMessage.textContent = `Bot: ${response}`;
    chatMessages.appendChild(botMessage);

    speak(response);
}

function setupSocialMediaButtons() {
    const socialMediaContainer = document.createElement('div');
    socialMediaContainer.className = 'social-media-container';

    const socialLinks = {
        'Facebook': 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href,
        'Twitter': 'https://twitter.com/intent/tweet?url=' + window.location.href,
        'LinkedIn': 'https://www.linkedin.com/shareArticle?mini=true&url=' + window.location.href
    };

    for (const platform in socialLinks) {
        const link = document.createElement('a');
        link.href = socialLinks[platform];
        link.target = '_blank';
        link.textContent = platform;
        link.className = 'social-media-btn';
        socialMediaContainer.appendChild(link);
    }

    document.body.appendChild(socialMediaContainer);
}

function setupFAQ() {
    const faqContainer = document.createElement('div');
    faqContainer.className = 'faq-container';

    const faqTitle = document.createElement('h2');
    faqTitle.textContent = getLocalizedString('faqTitle');
    faqTitle.setAttribute('data-translate', 'faqTitle');
    faqContainer.appendChild(faqTitle);

    const faqs = [
        { q: 'faqQ1', a: 'faqA1' },
        { q: 'faqQ2', a: 'faqA2' },
        { q: 'faqQ3', a: 'faqA3' },
    ];

    faqs.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';

        const question = document.createElement('div');
        question.className = 'faq-question';
        question.textContent = getLocalizedString(faq.q);
        question.setAttribute('data-translate', faq.q);

        const answer = document.createElement('div');
        answer.className = 'faq-answer';
        answer.textContent = getLocalizedString(faq.a);
        answer.setAttribute('data-translate', faq.a);

        faqItem.appendChild(question);
        faqItem.appendChild(answer);
        faqContainer.appendChild(faqItem);

        question.addEventListener('click', () => {
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        });
    });

    document.body.appendChild(faqContainer);
}

function setupContactForm() {
    const contactFormContainer = document.createElement('div');
    contactFormContainer.className = 'contact-form-container';

    const form = document.createElement('form');

    const nameLabel = document.createElement('label');
    nameLabel.textContent = getLocalizedString('formName');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.setAttribute('data-translate-placeholder', 'formNamePlaceholder');
    nameInput.placeholder = getLocalizedString('formNamePlaceholder');

    const emailLabel = document.createElement('label');
    emailLabel.textContent = getLocalizedString('formEmail');
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.setAttribute('data-translate-placeholder', 'formEmailPlaceholder');
    emailInput.placeholder = getLocalizedString('formEmailPlaceholder');

    const messageLabel = document.createElement('label');
    messageLabel.textContent = getLocalizedString('formMessage');
    const messageTextarea = document.createElement('textarea');
    messageTextarea.setAttribute('data-translate-placeholder', 'formMessagePlaceholder');
    messageTextarea.placeholder = getLocalizedString('formMessagePlaceholder');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = getLocalizedString('formSubmit');
    submitButton.setAttribute('data-translate', 'formSubmit');

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(messageLabel);
    form.appendChild(messageTextarea);
    form.appendChild(submitButton);

    contactFormContainer.appendChild(form);
    document.body.appendChild(contactFormContainer);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageTextarea.value
        };

        showNotification(getLocalizedString('formSubmitted'), 'success');
        form.reset();
    });
}

function setupChatbot() {
    const chatbotContainer = document.createElement('div');
    chatbotContainer.className = 'chatbot-container';

    const chatMessages = document.createElement('div');
    chatMessages.className = 'chat-messages';

    const chatInput = document.createElement('input');
    chatInput.type = 'text';
    chatInput.className = 'chat-input';
    chatInput.placeholder = getLocalizedString('typeMessage');

    chatbotContainer.appendChild(chatMessages);
    chatbotContainer.appendChild(chatInput);
    document.body.appendChild(chatbotContainer);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value;
            chatInput.value = '';
            handleChatMessage(message, chatMessages);
        }
    });
}

function setupDarkModeToggle() {
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'dark-mode-toggle';

    const toggleSwitch = document.createElement('label');
    toggleSwitch.className = 'switch';

    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';

    const slider = document.createElement('span');
    slider.className = 'slider';

    toggleSwitch.appendChild(toggleInput);
    toggleSwitch.appendChild(slider);
    toggleContainer.appendChild(toggleSwitch);
    document.body.appendChild(toggleContainer);

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        toggleInput.checked = true;
    }

    toggleInput.addEventListener('change', () => {
        if (toggleInput.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Add CSS for the spinner
const style = document.createElement('style');
style.textContent = `
    .spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255,255,255,.3);
        border-radius: 50%;
        border-top-color: #fff;
        animation: spin 1s ease-in-out infinite;
        margin-right: 10px;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);


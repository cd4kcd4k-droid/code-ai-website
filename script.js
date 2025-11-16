// ============ نظام المساعد الذكي ============
// الذاكرة المؤقتة للردود السريعة
const responseCache = new Map();

const getCachedResponse = (question) => {
    return responseCache.get(question.toLowerCase());
};

const cacheResponse = (question, answer) => {
    responseCache.set(question.toLowerCase(), {
        answer,
        timestamp: Date.now()
    });
};

// قاعدة المعرفة الذكية
const knowledgeBase = {
    'السلام عليكم': 'وعليكم السلام ورحمة الله! كيف يمكنني مساعدتك؟',
    'كيف حالك': 'الحمد لله، أنا هنا لخدمتك!',
    'شكراً': 'العفو! دائماً سعيد بالمساعدة 🎯',
    'ماذا تعرف': 'أستطيع الإجابة على أسئلتك بسرعة فائقة وتقديم حلول ذكية',
    'من أنت': 'أنا مساعد ذكي مُحسن للسرعة والأداء!'
};

// نظام التحليل الذكي
class SmartAssistant {
    constructor() {
        this.patterns = {
            greeting: /(مرحبا|سلام|اهلا|hello|hi)/i,
            question: /(كيف|لماذا|متى|أين|ماذا|من)/i,
            technical: /(كود|برمجة|تطوير|javascript|js|html|css)/i
        };
    }

    analyzeQuestion(question) {
        question = question.toLowerCase().trim();
        
        // البحث في الذاكرة المؤقتة أولاً
        const cached = getCachedResponse(question);
        if (cached) return cached.answer;

        // البحث في قاعدة المعرفة
        for (const [key, value] of Object.entries(knowledgeBase)) {
            if (question.includes(key.toLowerCase())) {
                cacheResponse(question, value);
                return value;
            }
        }

        // التحليل الذكي للنمط
        if (this.patterns.greeting.test(question)) {
            return this.generateGreetingResponse();
        } else if (this.patterns.technical.test(question)) {
            return this.generateTechnicalResponse(question);
        } else {
            return this.generateSmartResponse(question);
        }
    }

    generateGreetingResponse() {
        const greetings = [
            'أهلاً وسهلاً! كيف يمكنني مساعدتك اليوم؟ 🌟',
            'مرحباً بك! أنا هنا للإجابة على استفساراتك ⚡',
            'أهلاً بك! اسألني عن أي شيء 🚀'
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    generateSmartResponse(question) {
        const responses = [
            `هذا سؤال مثير للاهتمام! بالنسبة لـ "${question}"، أعتقد أن...`,
            `رائع! دعني أفكر في "${question}"...`,
            `بناءً على سؤالك "${question}"، إليك ما يمكنني تقديمه:`,
            `سؤال جميل! دعني أساعدك في "${question}"`
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        cacheResponse(question, randomResponse);
        return randomResponse;
    }

    generateTechnicalResponse(question) {
        const techAnswers = {
            'javascript': '🎯 جافاسكريبت هي لغة برمجة رائعة لتطوير الويب!',
            'html': '📝 HTML هي هيكل الصفحة الأساسي',
            'css': '🎨 CSS تجعل التصميم جميلاً وسلساً',
            'default': '💻 يمكنني مساعدتك في مواضيع البرمجة والتطوير!'
        };

        for (const [tech, answer] of Object.entries(techAnswers)) {
            if (question.includes(tech)) {
                return answer;
            }
        }
        return techAnswers.default;
    }
}

// ============ التكامل مع الواجهة ============
const assistant = new SmartAssistant();

function handleQuestion(question) {
    const startTime = performance.now();
    
    const answer = assistant.analyzeQuestion(question);
    
    const endTime = performance.now();
    const responseTime = (endTime - startTime).toFixed(2);
    
    return {
        answer: answer,
        responseTime: responseTime,
        smart: true
    };
}

function displayResponse(answer, responseTime) {
    const responseDiv = document.createElement('div');
    responseDiv.className = 'smart-response';
    responseDiv.innerHTML = `
        <div class="answer">${answer}</div>
        <div class="response-info">
            ⚡ تمت الإجابة في <strong>${responseTime}ms</strong> 
            🧠 <strong>الذكاء الاصطناعي</strong>
        </div>
    `;
    
    // تأكد من وجود عنصر chatContainer في HTML
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer) {
        chatContainer.appendChild(responseDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

// ============ التهيئة عند تحميل الصفحة ============
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ المساعد الذكي جاهز!');
    
    // ابحث عن عناصر الواجهة - عدل هذه الأسماء حسب HTML الخاص بك
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', () => {
            const question = chatInput.value.trim();
            if (question) {
                const result = handleQuestion(question);
                displayResponse(result.answer, result.responseTime);
                chatInput.value = '';
            }
        });
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendBtn.click();
            }
        });
    }
});

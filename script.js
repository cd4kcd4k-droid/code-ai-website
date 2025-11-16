// الدوال الأساسية للتطبيق
async function explainCode() {
    const code = document.getElementById('codeInput').value;
    const language = document.getElementById('languageSelect').value;
    
    if (!code.trim()) {
        showResult('⚠️ الرجاء كتابة بعض الكود أولاً');
        return;
    }
    
    showResult('🔄 جاري تحليل الكود وشرحه...');
    
    try {
        const response = await simulateAIResponse('explain', code, language);
        showResult(response);
    } catch (error) {
        showResult('❌ حدث خطأ: ' + error.message);
    }
}

async function debugCode() {
    const code = document.getElementById('codeInput').value;
    const language = document.getElementById('languageSelect').value;
    
    if (!code.trim()) {
        showResult('⚠️ الرجاء كتابة بعض الكود أولاً');
        return;
    }
    
    showResult('🔍 جاري فحص الكود لاكتشاف الأخطاء...');
    
    try {
        const response = await simulateAIResponse('debug', code, language);
        showResult(response);
    } catch (error) {
        showResult('❌ حدث خطأ: ' + error.message);
    }
}

async function completeCode() {
    const code = document.getElementById('codeInput').value;
    const language = document.getElementById('languageSelect').value;
    
    if (!code.trim()) {
        showResult('⚠️ الرجاء كتابة بعض الكود أولاً');
        return;
    }
    
    showResult('✨ جاري تحليل الكود وإكماله...');
    
    try {
        const response = await simulateAIResponse('complete', code, language);
        showResult(response);
    } catch (error) {
        showResult('❌ حدث خطأ: ' + error.message);
    }
}

function clearAll() {
    document.getElementById('codeInput').value = '';
    showResult('🗑️ تم مسح الكل... ابدأ من جديد!');
}

function showResult(message) {
    document.getElementById('aiResult').textContent = message;
}

// محاكاة الذكاء الاصطناعي
async function simulateAIResponse(action, code, language) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses = {
        explain: `📖 شرح الكود (${language}):
        
الكود الذي كتبته:
${code}

الشرح:
هذا الكود يبدو أنه ${getLanguageDescription(language)}.
أرى أنك ${getCodeAnalysis(code)}.

نصائح للتحسين:
1. تأكد من تسمية المتغيرات بأسماء واضحة
2. أضِف تعليقات لتوضيح الغرض من الكود
3. اختبر الكود بمدخلات مختلفة`,

        debug: `🔧 تحليل الأخطاء (${language}):
        
الكود المفحوص:
${code}

النتيجة:
${getDebugResult(code, language)}`,

        complete: `🚀 إكمال الكود (${language}):
        
الكود الأصلي:
${code}

الإكمال المقترح:
${getCompletion(code, language)}`
    };
    
    return responses[action] || '❌ إجراء غير معروف';
}

// دوال مساعدة
function getLanguageDescription(lang) {
    const descriptions = {
        python: 'كود بايثون يقوم بتنفيذ مهمة برمجية',
        javascript: 'كود جافاسكريبت للتعامل مع صفحات الويب',
        java: 'كود جافا للتطبيقات الكبيرة',
        html: 'كود HTML لبناء هيكل الصفحة'
    };
    return descriptions[lang] || 'كود برمجي';
}

function getCodeAnalysis(code) {
    if (code.includes('function') || code.includes('def')) {
        return 'تعرف دوال أو دوال لتنفيذ مهام محددة';
    }
    if (code.includes('if') || code.includes('for') || code.includes('while')) {
        return 'تستخدم شروط أو حلقات تكرار';
    }
    return 'تبدأ بمقدمة بسيطة للبرمجة';
}

function getDebugResult(code, language) {
    const issues = [];
    
    if (code.includes('console.log') && language !== 'javascript') {
        issues.push('⚠️ console.log يستخدم عادة في JavaScript فقط');
    }
    
    if (code.includes('print') && language !== 'python') {
        issues.push('⚠️ print يستخدم عادة في Python فقط');
    }
    
    if (issues.length === 0) {
        return '✅ الكود يبدو سليماً من الناحية الهيكلية';
    }
    
    return issues.join('\n');
}

function getCompletion(code, language) {
    const baseCode = code.trim();
    
    if (language === 'python') {
        if (baseCode.includes('def') && !baseCode.includes('return')) {
            return baseCode + '\n    return result  # إرجاع النتيجة';
        }
    }
    
    if (language === 'javascript') {
        if (baseCode.includes('function') && !baseCode.includes('{')) {
            return baseCode + ' {\n    // تنفيذ الدالة هنا\n}';
        }
    }
    
    return baseCode + '\n// ... أكمل بناءً على منطق برمجتك';
}

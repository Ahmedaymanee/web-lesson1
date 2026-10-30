/**
 * منصة درس: السكان في وطننا العربي - الصف السادس الابتدائي
 * كود JavaScript نقي، متوافق، ويحتوي على كافة العمليات الحسابية والمنطقية.
 */

// ==========================================
// 1. إدارة التنقل بين الأقسام وشريط التقدم
// ==========================================

const navButtons = document.querySelectorAll('.nav-btn');
const pageSections = document.querySelectorAll('.page-section');
const progressBar = document.getElementById('progress-bar');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

// ترتيب تسلسلي للأقسام لحساب نسبة التقدم بدقة
const sectionProgressWeight = {
    'home': 10,
    'objectives': 25,
    'content': 50,
    'activities': 75,
    'summary': 90,
    'quiz': 100
};

// التنقل العام
function navigateTo(targetId) {
    pageSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetId) {
            section.classList.add('active');
        }
    });

    navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.target === targetId);
    });

    // تحديث شريط التقدم
    if (progressBar && sectionProgressWeight[targetId]) {
        progressBar.style.width = `${sectionProgressWeight[targetId]}%`;
    }

    // إغلاق قائمة الموبايل عند الاختيار
    if (mainNav.classList.contains('show')) {
        mainNav.classList.remove('show');
    }

    // حفظ آخر قسم تمت زيارته في LocalStorage
    localStorage.setItem('arab_population_last_section', targetId);

    // التمرير لأعلى الصفحة بنعومة
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// تفعيل أحداث الأزرار في الهيدر
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        navigateTo(btn.dataset.target);
    });
});

// قائمة الهاتف
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });
}

// ==========================================
// 2. تبويبات أهداف الدرس
// ==========================================
function switchObjTab(tabKey) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.obj-content-tab').forEach(tab => tab.classList.remove('active'));

    const activeTab = document.getElementById(`obj-${tabKey}`);
    if (activeTab) activeTab.classList.add('active');

    // تفعيل زر التبويب المضغوط
    const targetBtn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.getAttribute('onclick').includes(tabKey));
    if (targetBtn) targetBtn.classList.add('active');
}

// ==========================================
// 3. وحدات المحتوى التعليمي والتنقل بينها
// ==========================================
let currentUnitIndex = 1;
const totalUnits = 5;

function showUnit(unitNumber) {
    currentUnitIndex = unitNumber;
    document.querySelectorAll('.unit-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', (idx + 1) === unitNumber);
    });

    document.querySelectorAll('.unit-panel').forEach((panel, idx) => {
        panel.classList.toggle('active', (idx + 1) === unitNumber);
    });

    // ضبط حالة أزرار التالي والسابق
    const prevBtn = document.getElementById('prevUnitBtn');
    const nextBtn = document.getElementById('nextUnitBtn');

    if (prevBtn) prevBtn.style.visibility = unitNumber === 1 ? 'hidden' : 'visible';
    if (nextBtn) {
        if (unitNumber === totalUnits) {
            nextBtn.textContent = 'الانتقال إلى الأنشطة التفاعلية 🎮';
        } else {
            nextBtn.textContent = 'الوحدة التالية ➡️';
        }
    }
}

function navigateUnit(direction) {
    const target = currentUnitIndex + direction;
    if (target >= 1 && target <= totalUnits) {
        showUnit(target);
    } else if (target > totalUnits) {
        navigateTo('activities');
    }
}

// ==========================================
// 4. النشاط 1: الخريطة التفاعلية
// ==========================================
const regionData = {
    'nile': {
        title: 'وادي النيل ودلتاه (مصر والسودان) 🌊',
        density: 'كثافة سكانية مرتفعة جداً 🟢',
        reasons: 'توافر مياه نهر النيل العذبة، وجود التربة الطينية الخصبة المناسبة للزراعة واستقرار الحضارة منذ آلاف السنين، وسهولة النقل والمواصلات.'
    },
    'mesopotamia': {
        title: 'سهول دجلة والفرات (بلاد الرافدين - العراق) 🌾',
        density: 'كثافة سكانية مرتفعة 🟢',
        reasons: 'وفرة المياه السطحية الصالحة للشرب والري، انبساط الأرض الزراعية، وتوافر الإنتاج الزراعي والحيواني.'
    },
    'coasts': {
        title: 'السواحل الشمالية (بلاد الشام وشمال إفريقيا) 🏖️',
        density: 'كثافة سكانية معتدلة إلى مرتفعة 🟢',
        reasons: 'اعتدال المناخ وسقوط الأمطار الشتوية، سهولة الحركة والاتصال الخارجي عبر الموانئ وصيد الأسماك والأنشطة السياحية والتجارية.'
    },
    'gulf': {
        title: 'المناطق الحضرية ودول الخليج العربي 🛢️',
        density: 'كثافة مرتفعة في المدن الكبرى ومراكز البترول 🟡',
        reasons: 'رغم قسوة المناخ، إلا أن توافر الثروة النفطية والصناعات المرتبطة بها والخدمات الطبية والتعليمية الراقية ساهمت في جذب الملايين للعمل والعيش.'
    },
    'sahara': {
        title: 'الصحراء الكبرى والربع الخالي 🏜️',
        density: 'كثافة نادرة وشبه خالية 🔴',
        reasons: 'شدة الجفاف، ندرة الأمطار والمياه العذبة، قسوة التضاريس والحرارة الشديدة صيفاً؛ حيث يقتصر وجود السكان على الواحات المائية فقط.'
    }
};

const mapRegions = document.querySelectorAll('.map-region');
const regionInfoCard = document.getElementById('regionInfoCard');

mapRegions.forEach(region => {
    region.addEventListener('click', () => {
        const key = region.dataset.region;
        const info = regionData[key];
        if (info && regionInfoCard) {
            regionInfoCard.innerHTML = `
                <div style="animation: fadeIn 0.3s ease;">
                    <span class="badge">${info.density}</span>
                    <h4 style="color: var(--primary); font-size: 1.3rem; margin: 10px 0;">${info.title}</h4>
                    <p style="font-size: 1.05rem; line-height: 1.6; color: var(--text-dark);">
                        <strong>💡 لماذا يختلف السكان هنا؟</strong><br>${info.reasons}
                    </p>
                </div>
            `;
        }
    });
});

// ==========================================
// 5. النشاط 2: لعبة السحب والإسقاط (Drag & Drop)
// ==========================================
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function allowDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('dragleave', (e) => {
        e.currentTarget.classList.remove('drag-over');
    });
});

function handleDrop(e, targetCategory) {
    e.preventDefault();
    const zone = e.currentTarget;
    zone.classList.remove('drag-over');

    const itemId = e.dataTransfer.getData('text/plain');
    const draggedItem = document.getElementById(itemId);
    const feedback = document.getElementById('dragFeedback');

    if (!draggedItem) return;

    const itemCategory = draggedItem.dataset.type;

    if (itemCategory === targetCategory) {
        // إجابة صحيحة
        draggedItem.classList.remove('wrong');
        draggedItem.classList.add('correct');
        draggedItem.draggable = false;
        
        const container = zone.querySelector('.zone-items');
        container.appendChild(draggedItem);

        feedback.innerHTML = `<span style="color: var(--success);">✔️ أحسنت! إجابة صحيحة؛ عنصر مصنف بدقة.</span>`;
        checkDragGameCompletion();
    } else {
        // إجابة غير صحيحة
        draggedItem.classList.add('wrong');
        feedback.innerHTML = `<span style="color: var(--danger);">❌ انتبه يا بطل! فكر جيداً هل هذا العامل من صنع الطبيعة أم نشاط بشري؟</span>`;
        setTimeout(() => {
            draggedItem.classList.remove('wrong');
        }, 1200);
    }
}

// دعم النقر المباشر للأجهزة التي تعمل باللمس (Touch Screens)
let selectedTouchItem = null;
document.querySelectorAll('.drag-item').forEach(item => {
    item.addEventListener('click', () => {
        if (!item.draggable) return;
        selectedTouchItem = item;
        document.querySelectorAll('.drag-item').forEach(i => i.style.outline = 'none');
        item.style.outline = '3px solid var(--accent)';
        const feedback = document.getElementById('dragFeedback');
        feedback.innerHTML = `<span style="color: var(--secondary);">👉 تم اختيار: (${item.innerText})، انقر الآن على الصندوق المناسب لإيداعه!</span>`;
    });
});

['zoneNatural', 'zoneHuman'].forEach(zoneId => {
    const zoneElement = document.getElementById(zoneId);
    if (!zoneElement) return;

    zoneElement.addEventListener('click', () => {
        if (selectedTouchItem) {
            const expectedCategory = zoneId === 'zoneNatural' ? 'natural' : 'human';
            if (selectedTouchItem.dataset.type === expectedCategory) {
                selectedTouchItem.classList.add('correct');
                selectedTouchItem.draggable = false;
                selectedTouchItem.style.outline = 'none';
                zoneElement.querySelector('.zone-items').appendChild(selectedTouchItem);
                document.getElementById('dragFeedback').innerHTML = `<span style="color: var(--success);">✔️ تصنيف ذكي وصحيح!</span>`;
                selectedTouchItem = null;
                checkDragGameCompletion();
            } else {
                document.getElementById('dragFeedback').innerHTML = `<span style="color: var(--danger);">❌ تصنيف غير مطابق، حاول مجدداً!</span>`;
            }
        }
    });
});

function checkDragGameCompletion() {
    const remaining = document.getElementById('itemsSource').children.length;
    if (remaining === 0) {
        const feedback = document.getElementById('dragFeedback');
        feedback.innerHTML = `<span style="color: var(--primary); font-size: 1.15rem;">🎉 مبارك! صنفت جميع العوامل الطبيعية والبشرية بنجاح 100%!</span>`;
    }
}

function resetDragGame() {
    const source = document.getElementById('itemsSource');
    const naturalItems = document.getElementById('naturalItems');
    const humanItems = document.getElementById('humanItems');
    const feedback = document.getElementById('dragFeedback');

    const moveBack = (container) => {
        while (container.firstChild) {
            const el = container.firstChild;
            el.classList.remove('correct', 'wrong');
            el.draggable = true;
            el.style.outline = 'none';
            source.appendChild(el);
        }
    };

    moveBack(naturalItems);
    moveBack(humanItems);
    feedback.innerHTML = '';
    selectedTouchItem = null;
}

// ==========================================
// 6. النشاط 3: أسئلة التقويم التكويني السريع
// ==========================================
const quickQuestions = [
    {
        q: "1. من المناطق ذات الكثافة السكانية المرتفعة جداً في وطننا العربي:",
        options: ["وادي النيل ودلتاه في مصر", "صحراء الربع الخالي", "الصحراء الكبرى الإفريقية"],
        correct: 0,
        explanation: "يرتكز السكان في وادي النيل لخصوبة التربة ووفرة المياه العذبة اللازمة للزراعة."
    },
    {
        q: "2. ما نوع العامل المسؤول عن جذب السكان نحو حقول استخراج البترول؟",
        options: ["عامل مناخي", "عامل بشري واقتصادي (فرص عمل)", "عامل تضاريسي"],
        correct: 1,
        explanation: "البحث عن العمل والرواتب المجزية من العوامل البشرية والاقتصادية الهامة."
    },
    {
        q: "3. ندرة السكان في المناطق الصحراوية يرجع في المقام الأول إلى:",
        options: ["كثرة الموانئ والبحار", "ندرة المياه وقسوة المناخ", "وفرة الغابات والأمطار"],
        correct: 1,
        explanation: "تعتبر ندرة المياه العذبة وارتفاع درجات الحرارة السبب الرئيسي لخلو الصحاري من السكان."
    }
];

let currentQQIndex = 0;

function renderQuickQuestion() {
    const item = quickQuestions[currentQQIndex];
    const textEl = document.getElementById('qqText');
    const optsEl = document.getElementById('qqOptions');
    const fbEl = document.getElementById('qqFeedback');
    const nextBtn = document.getElementById('qqNextBtn');

    if (!textEl || !optsEl) return;

    textEl.textContent = item.q;
    optsEl.innerHTML = '';
    fbEl.style.display = 'none';
    fbEl.className = 'qq-feedback';
    nextBtn.style.display = 'none';

    item.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'qq-opt-btn';
        btn.textContent = opt;
        btn.onclick = () => handleQQAnswer(idx);
        optsEl.appendChild(btn);
    });
}

function handleQQAnswer(selectedIdx) {
    const item = quickQuestions[currentQQIndex];
    const fbEl = document.getElementById('qqFeedback');
    const nextBtn = document.getElementById('qqNextBtn');
    const buttons = document.querySelectorAll('.qq-opt-btn');

    buttons.forEach(b => b.disabled = true);

    if (selectedIdx === item.correct) {
        fbEl.className = 'qq-feedback correct';
        fbEl.innerHTML = `✔️ إجابة ممتازة! ${item.explanation}`;
    } else {
        fbEl.className = 'qq-feedback wrong';
        fbEl.innerHTML = `❌ إجابة غير دقيقة! الصواب: (${item.options[item.correct]}). ${item.explanation}`;
    }
    fbEl.style.display = 'block';

    if (currentQQIndex < quickQuestions.length - 1) {
        nextBtn.style.display = 'inline-block';
    }
}

function nextQuickQuestion() {
    if (currentQQIndex < quickQuestions.length - 1) {
        currentQQIndex++;
        renderQuickQuestion();
    }
}

// ==========================================
// 7. بنك أسئلة الاختبار النهائي الشامل (15 سؤالاً)
// ==========================================
const finalQuizQuestions = [
    // 7 أسئلة اختيار من متعدد
    {
        type: 'mcq',
        category: 'distribution',
        question: 'أيّ من المناطق الآتية يُعد من السهول الفيضية مرتفعة الكثافة السكانية في الجناح الآسيوي؟',
        options: ['سهول دجلة والفرات في العراق', 'صحراء النفود', 'هضبة حضرموت', 'سلسلة جبال الحجاز'],
        correct: 0,
        explanation: 'سهول دجلة والفرات في العراق سهول فيضية خصبة جاذبة للسكان لوفرة المياه والزراعة.'
    },
    {
        type: 'mcq',
        category: 'concept',
        question: 'المقصود بـ "النسبة بين عدد السكان والمساحة الكلية التي يعيشون عليها" هو:',
        options: ['النمو الطبيعي', 'الكثافة السكانية', 'التركيب العمري', 'الهجرة الداخلية'],
        correct: 1,
        explanation: 'الكثافة السكانية = إجمالي عدد السكان مقسوماً على المساحة الكلية بالكيلومتر المربع.'
    },
    {
        type: 'mcq',
        category: 'factors',
        question: 'تعد السهول الساحلية في بلاد الشام وشمال إفريقيا مناطق تركز سكاني بفضل:',
        options: ['شديدة الجفاف والحرارة', 'اعتدال المناخ وسقوط الأمطار الشتوية', 'وعورة التضاريس وصعوبة الحركة', 'ندرة الأنشطة الاقتصادية'],
        correct: 1,
        explanation: 'يتميز مناخ البحر المتوسط باعتداله وسقوط أمطاره شتاءً، مما يجذب التجمعات الحضرية والزراعية.'
    },
    {
        type: 'mcq',
        category: 'factors',
        question: 'أي العوامل التالية يصنف ضمن "العوامل الطبيعية" المؤثرة في توزيع السكان؟',
        options: ['وسائل النقل والمواصلات', 'توافر الخدمات الطبية', 'تنوع التضاريس والتربة الخصبة', 'إقامة المصانع والشركات'],
        correct: 2,
        explanation: 'التضاريس والتربة والمناخ والمياه هبات طبيعية خلقها الله تعالى دون تدخل بشري.'
    },
    {
        type: 'mcq',
        category: 'problems',
        question: 'من أبرز المشكلات الناتجة عن زيادة تركز السكان في المدن والعواصم الكبرى:',
        options: ['انخفاض الطلب على السكن', 'الازدحام الشديد والضغط على الخدمات', 'زيادة مساحات الأراضي الزراعية', 'اختفاء التلوث والضوضاء'],
        correct: 1,
        explanation: 'تكدس السكان في المدن يؤدي إلى الاختناق المروري، وتزاحم المستشفيات والمدارس.'
    },
    {
        type: 'mcq',
        category: 'calculation',
        question: 'دولة مساحتها 50,000 كم² ويعيش بها 500,000 نسمة؛ تكون كثافتها السكانية العامة:',
        options: ['10 نسمة لكل كم²', '100 نسمة لكل كم²', '50 نسمة لكل كم²', '5 نسمة لكل كم²'],
        correct: 0,
        explanation: 'نقسم 500,000 ÷ 50,000 = 10 نسمات لكل كيلومتر مربع واحد.'
    },
    {
        type: 'mcq',
        category: 'distribution',
        question: 'تنخفض الكثافة السكانية بدرجة حادة في الوطن العربي في مناطق:',
        options: ['السهول الساحلية', 'الصحاري مثل الصحراء الكبرى والربع الخالي', 'أودية الأنهار الدائمة', 'المدن والعواصم الصناعية'],
        correct: 1,
        explanation: 'تتميز الصحاري بندرة الموارد المائية ووعورة البيئة المناخية مما يجعلها شبه خالية من السكان.'
    },

    // 4 أسئلة صح أم خطأ
    {
        type: 'boolean',
        category: 'distribution',
        question: 'يتوزع السكان بالتساوي التام بين جميع أقطار ومناطق الوطن العربي.',
        options: ['صواب', 'خطأ'],
        correct: 1,
        explanation: 'خطأ؛ يتسم توزيع السكان في وطننا العربي بالتفاوت الشديد وعدم التجانس.'
    },
    {
        type: 'boolean',
        category: 'factors',
        question: 'يساعد توافر شبكات الطرق والمواصلات الحديثة على استقرار السكان ونشأة المدن الجديدة.',
        options: ['صواب', 'خطأ'],
        correct: 0,
        explanation: 'صواب؛ سهولة النقل والمواصلات من أهم العوامل البشرية التي تجذب السكان للتوطن والعمل.'
    },
    {
        type: 'boolean',
        category: 'factors',
        question: 'يفضل السكان عموماً الإقامة في المناطق الجبلية الوعرة والشديدة الانحدار بدلاً من السهول المستوية.',
        options: ['صواب', 'خطأ'],
        correct: 1,
        explanation: 'خطأ؛ يفضل الإنسان السهول لسهولة بناء المنازل ومد شبكات الطرق وممارسة الزراعة.'
    },
    {
        type: 'boolean',
        category: 'problems',
        question: 'يعد إنشاء المدن الجديدة واستصلاح الأراضي الصحراوية من الحلول الناجحة للتغلب على الازدحام السكاني.',
        options: ['صواب', 'خطأ'],
        correct: 0,
        explanation: 'صواب؛ التوسع خارج المدن القديمة يقلل الضغط عن العواصم ويحمي الرقعة الزراعية الخضراء.'
    },

    // سؤالان أكمل العبارة
    {
        type: 'fill',
        category: 'distribution',
        question: 'يتركز السكان في مصر بصورة رئيسية في منطقة وادي ..... ودلتاه.',
        acceptable: ['النيل', 'نهر النيل', 'نيل'],
        explanation: 'يمثل وادي النيل ودلتاه بؤرة التركز الزراعي والسكاني الأساسية في جمهورية مصر العربية.'
    },
    {
        type: 'fill',
        category: 'factors',
        question: 'يعد اكتشاف حقول واستخراج ..... العامل البشري الأكبر في جذب السكان إلى مناطق الخليج العربي.',
        acceptable: ['البترول', 'النفط', 'النفط والبترول', 'الغاز'],
        explanation: 'أحدث تدفق البترول والنفط نهضة صناعية واقتصادية جلبت الأيدي العاملة من مختلف الدول.'
    },

    // سؤالان تطبيق خريطة وتحليل موقف جغرافي
    {
        type: 'mcq',
        category: 'map_thinking',
        question: 'تحليل موقف: قررت إحدى الدول إقامة مجتمع عمراني جديد، ما هو العامل الطبيعي الذي يجب التأكد من توفره أولاً قبل البدء؟',
        options: ['وجود شبكة مطارات دولية', 'توافر مصدر دائم وموثوق للمياه العذبة', 'وجود ناطحات سحاب مجهزة', 'وجود شواطئ سياحية ترفيهية'],
        correct: 1,
        explanation: 'المياه هي شريان الحياة الأول؛ وبدون توفر مياه الشرب العذبة لا يمكن للإنسان الاستقرار إطلاقاً.'
    },
    {
        type: 'mcq',
        category: 'map_thinking',
        question: 'من خلال فهمك لخريطة الوطن العربي؛ لماذا يظهر اللون الأخضر المكتظ بالسكان كشريط رفيع وسط مساحات صفراء واسعة في مصر؟',
        options: ['لأن السكان محبون للسفر فقط', 'بسبب ارتباط الحياة بمجرى نهر النيل والتربة المحيطة به وسط الصحراء', 'لعدم وجود سيارات لنقل السكان للصحراء', 'بسبب كثرة الجبال الجليدية'],
        correct: 1,
        explanation: 'يمثل شريط النيل واحة الحياة الخصبة المحاطة بالصحراء الشرقية والغربية من الجانبين.'
    }
];

// ==========================================
// 8. محرك تشغيل الاختبار النهائي وحساب النتيجة
// ==========================================
let quizCurrentIndex = 0;
let studentScore = 0;
let studentName = "";
let studentAnswersLog = [];

function startFinalQuiz() {
    const nameInput = document.getElementById('studentNameInput');
    studentName = nameInput.value.trim();

    if (studentName === "") {
        alert("من فضلك اكتب اسمك يا بطل قبل بدء الاختبار!");
        nameInput.focus();
        return;
    }

    quizCurrentIndex = 0;
    studentScore = 0;
    studentAnswersLog = [];

    document.getElementById('quiz-start-screen').style.display = 'none';
    document.getElementById('quiz-result-screen').style.display = 'none';
    document.getElementById('quiz-question-screen').style.display = 'block';

    renderQuizQuestion();
}

function renderQuizQuestion() {
    const q = finalQuizQuestions[quizCurrentIndex];
    const totalQ = finalQuizQuestions.length;

    // شريط العدادات
    document.getElementById('questionCounter').textContent = `السؤال ${quizCurrentIndex + 1} من ${totalQ}`;
    document.getElementById('currentScoreBadge').textContent = `الدرجة: ${studentScore}`;
    const percentTrack = ((quizCurrentIndex) / totalQ) * 100;
    document.getElementById('quizProgressFill').style.width = `${percentTrack}%`;

    // وسم وتسمية السؤال
    const typeTag = document.getElementById('qTypeTag');
    if (q.type === 'mcq') typeTag.textContent = 'اختيار من متعدد';
    else if (q.type === 'boolean') typeTag.textContent = 'صواب أم خطأ';
    else if (q.type === 'fill') typeTag.textContent = 'أكمل الفراغ بالكلمة المناسبة';

    document.getElementById('qText').textContent = q.question;

    const optsContainer = document.getElementById('qOptionsContainer');
    const fillContainer = document.getElementById('qFillContainer');
    const fbBox = document.getElementById('qFeedback');
    const nextBtn = document.getElementById('nextQuestionBtn');

    optsContainer.innerHTML = '';
    optsContainer.style.display = 'none';
    fillContainer.style.display = 'none';
    fbBox.style.display = 'none';
    nextBtn.style.display = 'none';

    if (q.type === 'mcq' || q.type === 'boolean') {
        optsContainer.style.display = 'flex';
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-opt-btn';
            btn.textContent = opt;
            btn.onclick = () => handleQuizOptionClick(idx, btn);
            optsContainer.appendChild(btn);
        });
    } else if (q.type === 'fill') {
        fillContainer.style.display = 'flex';
        const fillInput = document.getElementById('fillAnswerInput');
        fillInput.value = '';
        fillInput.disabled = false;
        fillInput.focus();
    }
}

function handleQuizOptionClick(selectedIdx, clickedBtn) {
    const q = finalQuizQuestions[quizCurrentIndex];
    const buttons = document.querySelectorAll('.quiz-opt-btn');
    buttons.forEach(b => b.disabled = true);

    const isCorrect = (selectedIdx === q.correct);
    if (isCorrect) {
        studentScore++;
        clickedBtn.classList.add('selected-correct');
    } else {
        clickedBtn.classList.add('selected-wrong');
        if (buttons[q.correct]) {
            buttons[q.correct].classList.add('show-truth');
        }
    }

    studentAnswersLog.push({
        question: q.question,
        userAnswer: q.options[selectedIdx],
        correctAnswer: q.options[q.correct],
        isCorrect: isCorrect,
        explanation: q.explanation,
        category: q.category
    });

    showQuestionFeedback(isCorrect, q.explanation);
}

function submitFillAnswer() {
    const q = finalQuizQuestions[quizCurrentIndex];
    const fillInput = document.getElementById('fillAnswerInput');
    const userVal = fillInput.value.trim().toLowerCase();

    if (userVal === "") {
        alert("يرجى كتابة كلمة الإجابة قبل التأكيد!");
        fillInput.focus();
        return;
    }

    fillInput.disabled = true;

    // مطابقة الإجابة المرنة
    const isCorrect = q.acceptable.some(ans => userVal.includes(ans.toLowerCase()) || ans.toLowerCase().includes(userVal));

    if (isCorrect) {
        studentScore++;
    }

    studentAnswersLog.push({
        question: q.question,
        userAnswer: userVal,
        correctAnswer: q.acceptable[0],
        isCorrect: isCorrect,
        explanation: q.explanation,
        category: q.category
    });

    showQuestionFeedback(isCorrect, q.explanation);
}

function showQuestionFeedback(isCorrect, explanation) {
    const fbBox = document.getElementById('qFeedback');
    const nextBtn = document.getElementById('nextQuestionBtn');

    fbBox.style.display = 'block';
    if (isCorrect) {
        fbBox.className = 'question-feedback correct';
        fbBox.style.backgroundColor = 'var(--success-light)';
        fbBox.style.color = '#166534';
        fbBox.innerHTML = `✔️ <strong>ممتاز يا بطل!</strong> إجابة صحيحة. (${explanation})`;
    } else {
        fbBox.className = 'question-feedback wrong';
        fbBox.style.backgroundColor = 'var(--danger-light)';
        fbBox.style.color = '#991b1b';
        fbBox.innerHTML = `❌ <strong>إجابة خاطئة!</strong> ${explanation}`;
    }

    document.getElementById('currentScoreBadge').textContent = `الدرجة: ${studentScore}`;

    if (quizCurrentIndex < finalQuizQuestions.length - 1) {
        nextBtn.textContent = 'الانتقال للسؤال التالي ⬅️';
    } else {
        nextBtn.textContent = 'عرض تقرير النتيجة النهائي 🏆';
    }
    nextBtn.style.display = 'inline-block';
}

function nextQuizQuestion() {
    quizCurrentIndex++;
    if (quizCurrentIndex < finalQuizQuestions.length) {
        renderQuizQuestion();
    } else {
        finishQuizAndShowReport();
    }
}

// ==========================================
// 9. تقرير الأداء النهائي وحفظ السجل
// ==========================================
function finishQuizAndShowReport() {
    document.getElementById('quiz-question-screen').style.display = 'none';
    document.getElementById('quiz-result-screen').style.display = 'block';

    const totalQ = finalQuizQuestions.length;
    const percentage = Math.round((studentScore / totalQ) * 100);

    // تخزين محلي لآخر نتيجة
    const quizRecord = {
        name: studentName,
        score: studentScore,
        percent: percentage,
        date: new Date().toLocaleDateString('ar-EG')
    };
    localStorage.setItem('arab_population_quiz_score', JSON.stringify(quizRecord));

    // تعبئة البيانات في الشاشة
    document.getElementById('studentGreeting').innerHTML = `تهانينا للطالب البطل: <strong>${studentName}</strong>`;
    document.getElementById('finalScoreVal').textContent = `${studentScore} / ${totalQ}`;
    document.getElementById('finalPercentVal').textContent = `${percentage}%`;

    const trophy = document.getElementById('resultTrophy');
    const resultTitle = document.getElementById('resultTitle');
    const finalGradeVal = document.getElementById('finalGradeVal');

    if (percentage >= 85) {
        trophy.textContent = '🌟🥇';
        resultTitle.textContent = 'مستوى عبقري ومتميز جداً!';
        finalGradeVal.textContent = 'ممتاز 🎖️';
        finalGradeVal.style.color = 'var(--primary)';
    } else if (percentage >= 65) {
        trophy.textContent = '🥈👏';
        resultTitle.textContent = 'أداء رائع ومحاولة قوية!';
        finalGradeVal.textContent = 'جيد جداً 👍';
        finalGradeVal.style.color = 'var(--secondary)';
    } else {
        trophy.textContent = '📚💪';
        resultTitle.textContent = 'بداية جيدة.. تحتاج لمراجعة سريعة!';
        finalGradeVal.textContent = 'يحتاج لمراجعة 📖';
        finalGradeVal.style.color = 'var(--accent)';
    }

    // تحليل نقاط القوة والضعف
    analyzePerformance();

    // تفقيط الأسئلة ومراجعتها
    renderAnswersReview();
}

function analyzePerformance() {
    const strengthsList = document.getElementById('strengthsList');
    const weaknessesList = document.getElementById('weaknessesList');

    strengthsList.innerHTML = '';
    weaknessesList.innerHTML = '';

    const mistakes = studentAnswersLog.filter(a => !a.isCorrect);

    if (mistakes.length === 0) {
        strengthsList.innerHTML = `
            <li>إتقان كامل بنسبة 100% لجميع مفاهيم الكثافة والتوزيع السكاني.</li>
            <li>قدرة ممتازة على التمييز الدقيق بين العوامل الطبيعية والبشرية.</li>
            <li>مهارة جغرافية متفوقة في قراءة وتحليل خريطة الوطن العربي.</li>
        `;
        weaknessesList.innerHTML = `<li>لا توجد أي نقاط ضعف! درجتك نهائية وذكاؤك الجغرافي باهر.</li>`;
    } else {
        const errorCategories = mistakes.map(m => m.category);

        if (errorCategories.includes('distribution')) {
            weaknessesList.innerHTML += `<li>مراجعة مناطق التركز والندرة في خريطة الوطن العربي (الوحدة 2).</li>`;
        } else {
            strengthsList.innerHTML += `<li>فهم قوي لتوزيع مناطق السهول والصحاري على الخريطة.</li>`;
        }

        if (errorCategories.includes('factors')) {
            weaknessesList.innerHTML += `<li>التفريق بين دور المناخ والمياه (طبيعية) وبين المصانع والخدمات (بشرية).</li>`;
        } else {
            strengthsList.innerHTML += `<li>تمييز ذكي جداً بين العوامل الطبيعية والبشرية المؤثرة في السكان.</li>`;
        }

        if (errorCategories.includes('concept') || errorCategories.includes('calculation')) {
            weaknessesList.innerHTML += `<li>مراجعة قانون الكثافة السكانية البسيط (قسمة السكان على المساحة).</li>`;
        } else {
            strengthsList.innerHTML += `<li>إتقان معادلة ومفهوم الكثافة السكانية الحسابية.</li>`;
        }

        if (errorCategories.includes('problems')) {
            weaknessesList.innerHTML += `<li>الاطلاع على المشكلات السكانية الناتجة عن الازدحام وحلولها.</li>`;
        }
    }
}

function renderAnswersReview() {
    const container = document.getElementById('answersAccordion');
    container.innerHTML = '';

    studentAnswersLog.forEach((item, idx) => {
        const reviewBox = document.createElement('div');
        reviewBox.className = `review-item ${item.isCorrect ? 'is-correct' : 'is-wrong'}`;
        reviewBox.innerHTML = `
            <div class="review-q-text">س ${idx + 1}: ${item.question}</div>
            <div>
                <span>إجابتك: <strong>${item.userAnswer}</strong> ${item.isCorrect ? '✅' : '❌'}</span>
                ${!item.isCorrect ? `<span style="margin-right: 15px; color: var(--primary);">الإجابة النموذجية: <strong>${item.correctAnswer}</strong></span>` : ''}
            </div>
            <div class="review-explanation">💡 <strong>الشرح والتفسير:</strong> ${item.explanation}</div>
        `;
        container.appendChild(reviewBox);
    });
}

function restartQuiz() {
    document.getElementById('quiz-result-screen').style.display = 'none';
    document.getElementById('quiz-start-screen').style.display = 'block';
    checkSavedScore();
}

// ==========================================
// 10. الفحص الأولي واسترجاع الجلسة
// ==========================================
function checkSavedScore() {
    const saved = localStorage.getItem('arab_population_quiz_score');
    const alertBox = document.getElementById('lastScoreAlert');
    if (saved && alertBox) {
        const data = JSON.parse(saved);
        alertBox.style.display = 'block';
        alertBox.innerHTML = `📌 مرحباً مجدداً <strong>${data.name}</strong>! آخر نتيجة حققتها كانت <strong>${data.score} من 15</strong> (${data.percent}%) بتاريخ ${data.date}. هل ترغب بتحسين درجتك؟`;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // استعادة آخر قسم أو فتح الرئيسية
    const lastSection = localStorage.getItem('arab_population_last_section') || 'home';
    navigateTo(lastSection);

    // تفعيل أول نشاط سريع
    renderQuickQuestion();

    // فحص النتيجة السابقة إن وجدت
    checkSavedScore();
});
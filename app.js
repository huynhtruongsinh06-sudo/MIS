// MIS SAP S/4HANA Master Study App Logic
document.addEventListener('DOMContentLoaded', () => {
  // App State
  const state = {
    currentTab: 'roadmap',
    studentNumber: localStorage.getItem('sap_student_num') || '180',
    darkMode: localStorage.getItem('sap_dark_mode') === 'true',
    soundEnabled: localStorage.getItem('sap_sound_enabled') !== 'false',
    
    // Learning path
    activeLevel: 1,
    activeLessonId: 'mis-definitions',
    completedLessons: JSON.parse(localStorage.getItem('sap_completed_lessons') || '[]'),
    
    // Case studies
    currentSdStep: 1,
    currentMmStep: 1,
    
    // Flashcards
    flashcardDeck: 'all',
    flashcardIndex: 0,
    isCardFlipped: false,
    masteredCards: JSON.parse(localStorage.getItem('sap_mastered_cards') || '[]'),
    
    // Step Ordering
    activeChallengeId: 'challenge-o2c-core',
    challengeCurrentItems: [],
    challengeChecked: false,
    
    // Mock Exam
    examFilter: 'all',
    examTimerActive: false,
    examTimeRemaining: 45 * 60, // 45 min
    examTimerInterval: null,
    examCurrentIndex: 0,
    userAnswers: {}, // { questionId: selectedIndex }
    flaggedQuestions: {}, // { questionId: boolean }
    examSubmitted: false
  };

  // Sound Synthesizer (Web Audio API - 100% self-contained, no external audio files needed)
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playSound(type) {
    if (!state.soundEnabled) return;
    try {
      const now = audioCtx.currentTime;
      if (type === 'click') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'success') {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.12, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.25);
        });
      } else if (type === 'error') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(180, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'flip') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {
      // AudioContext policy fallback
    }
  }

  // Personalization string replacer (replaces ### with state.studentNumber)
  function applyPersonalization(text) {
    if (!text || typeof text !== 'string') return text;
    return text.replace(/###/g, state.studentNumber || '180');
  }

  // Dark Mode init
  if (state.darkMode) {
    document.documentElement.classList.add('dark');
  }

  // DOM Elements
  const tabButtons = document.querySelectorAll('.nav-tab-btn');
  const viewSections = document.querySelectorAll('.view-section');
  const studentNumInput = document.getElementById('studentNumberInput');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const soundToggle = document.getElementById('soundToggle');
  const globalSearchInput = document.getElementById('globalSearchInput');

  // Initialize Student Input
  if (studentNumInput) {
    studentNumInput.value = state.studentNumber;
    studentNumInput.addEventListener('input', (e) => {
      const val = e.target.value.replace(/[^0-9]/g, '').slice(0, 3);
      e.target.value = val;
      state.studentNumber = val || '180';
      localStorage.setItem('sap_student_num', state.studentNumber);
      // Re-render current view with personalized values
      renderCurrentView();
    });
  }

  // Dark Mode Toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('sap_dark_mode', state.darkMode);
      document.documentElement.classList.toggle('dark', state.darkMode);
      playSound('click');
    });
  }

  // Sound Toggle
  if (soundToggle) {
    const updateSoundIcon = () => {
      soundToggle.innerHTML = state.soundEnabled 
        ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>`
        : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg>`;
    };
    updateSoundIcon();
    soundToggle.addEventListener('click', () => {
      state.soundEnabled = !state.soundEnabled;
      localStorage.setItem('sap_sound_enabled', state.soundEnabled);
      updateSoundIcon();
      playSound('click');
    });
  }

  // Tab Navigation
  window.switchTab = switchTab;
  function switchTab(tabId) {
    state.currentTab = tabId;
    if (window.location.hash.replace('#', '') !== tabId) {
      history.replaceState(null, '', '#' + tabId);
    }
    tabButtons.forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
        btn.classList.remove('text-slate-600', 'dark:text-slate-300', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        btn.classList.add('text-slate-600', 'dark:text-slate-300', 'hover:bg-slate-100', 'dark:hover:bg-slate-800');
      }
    });

    viewSections.forEach(sec => {
      if (sec.id === `view-${tabId}`) {
        sec.classList.remove('hidden');
      } else {
        sec.classList.add('hidden');
      }
    });

    playSound('click');
    renderCurrentView();
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Modal Image Lightbox
  const imageModal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  window.openImageModal = function(src, caption) {
    if (!imageModal || !modalImg) return;
    modalImg.src = src;
    if (modalCaption) modalCaption.textContent = caption || 'SAP S/4HANA System Screenshot';
    imageModal.classList.remove('hidden');
    imageModal.classList.add('flex');
    playSound('click');
  };

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      imageModal.classList.add('hidden');
      imageModal.classList.remove('flex');
    });
  }
  if (imageModal) {
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        imageModal.classList.add('hidden');
        imageModal.classList.remove('flex');
      }
    });
  }

  // ==========================================
  // VIEW 1: ZERO-TO-A+ LEARNING PATH
  // ==========================================
  function renderRoadmap() {
    const levelsNav = document.getElementById('roadmapLevelsNav');
    const lessonContent = document.getElementById('roadmapLessonContent');
    if (!levelsNav || !lessonContent) return;

    // Render Level Tabs
    levelsNav.innerHTML = window.ROADMAP_DATA.map(lvl => {
      const isActive = lvl.level === state.activeLevel;
      return `
        <button class="level-tab-btn flex-1 min-w-[140px] p-3 text-left rounded-xl transition-all border ${
          isActive 
            ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-102 font-semibold' 
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300'
        }" data-level="${lvl.level}">
          <div class="flex items-center justify-between text-xs mb-1 opacity-90">
            <span>Level ${lvl.level}</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
              isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }">${lvl.badge}</span>
          </div>
          <div class="text-sm truncate font-medium">${lvl.title.split(':')[1] || lvl.title}</div>
        </button>
      `;
    }).join('');

    levelsNav.querySelectorAll('.level-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeLevel = parseInt(btn.dataset.level);
        const lvlObj = window.ROADMAP_DATA.find(l => l.level === state.activeLevel);
        if (lvlObj && lvlObj.lessons.length > 0) {
          state.activeLessonId = lvlObj.lessons[0].id;
        }
        playSound('click');
        renderRoadmap();
      });
    });

    // Current Level & Lessons
    const currentLevelObj = window.ROADMAP_DATA.find(l => l.level === state.activeLevel) || window.ROADMAP_DATA[0];
    const currentLesson = currentLevelObj.lessons.find(ls => ls.id === state.activeLessonId) || currentLevelObj.lessons[0];

    lessonContent.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Lessons Sidebar -->
        <div class="lg:col-span-1 space-y-2">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Lessons in this Level</div>
          ${currentLevelObj.lessons.map(ls => {
            const isLessonActive = ls.id === currentLesson.id;
            const isCompleted = state.completedLessons.includes(ls.id);
            return `
              <button class="lesson-nav-btn w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 ${
                isLessonActive 
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-900 dark:text-blue-300 font-semibold' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300'
              }" data-lesson-id="${ls.id}">
                <span class="mt-0.5 text-sm ${isCompleted ? 'text-emerald-500' : 'text-slate-300'}">
                  ${isCompleted ? '✓' : '○'}
                </span>
                <div>
                  <div class="text-sm font-medium leading-snug">${ls.title}</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">${ls.summary}</div>
                </div>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Main Lesson Content Area -->
        <div class="lg:col-span-3 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Level ${currentLevelObj.level} &bull; ${currentLevelObj.badge}</span>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-1">${currentLesson.title}</h2>
            </div>
            <button id="toggleLessonCompleteBtn" class="px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              state.completedLessons.includes(currentLesson.id)
                ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-emerald-500 hover:text-white'
            }">
              <span>${state.completedLessons.includes(currentLesson.id) ? '✓ Mastered' : 'Mark as Mastered'}</span>
            </button>
          </div>

          <div class="prose dark:prose-invert max-w-none mt-6 text-slate-700 dark:text-slate-200">
            ${applyPersonalization(currentLesson.content)}
          </div>
        </div>
      </div>
    `;

    // Lesson sidebar click
    lessonContent.querySelectorAll('.lesson-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeLessonId = btn.dataset.lessonId;
        playSound('click');
        renderRoadmap();
      });
    });

    // Toggle complete
    const toggleBtn = document.getElementById('toggleLessonCompleteBtn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (state.completedLessons.includes(currentLesson.id)) {
          state.completedLessons = state.completedLessons.filter(id => id !== currentLesson.id);
        } else {
          state.completedLessons.push(currentLesson.id);
          playSound('success');
        }
        localStorage.setItem('sap_completed_lessons', JSON.stringify(state.completedLessons));
        renderRoadmap();
        updateGlobalProgress();
      });
    }
  }

  // ==========================================
  // VIEW 2: SD CASE STUDY (14 STEPS)
  // ==========================================
  function renderSdCaseStudy() {
    const stepList = document.getElementById('sdStepsList');
    const stepDetail = document.getElementById('sdStepDetail');
    if (!stepList || !stepDetail) return;

    // Render Steps Sidebar
    stepList.innerHTML = window.SD_CASE_STUDY_STEPS.map(s => {
      const isActive = s.step === state.currentSdStep;
      return `
        <button class="sd-step-btn w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
          isActive 
            ? 'bg-blue-600 text-white border-blue-600 shadow-md font-semibold' 
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
        }" data-step="${s.step}">
          <div class="flex items-center gap-3">
            <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isActive ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
            }">${s.step}</span>
            <div class="text-xs truncate max-w-[170px]">${s.title}</div>
          </div>
          <span class="text-[10px] font-mono px-1.5 py-0.5 rounded ${
            isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
          }">${s.tcode}</span>
        </button>
      `;
    }).join('');

    stepList.querySelectorAll('.sd-step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentSdStep = parseInt(btn.dataset.step);
        playSound('click');
        renderSdCaseStudy();
      });
    });

    // Render Step Details
    const step = window.SD_CASE_STUDY_STEPS.find(s => s.step === state.currentSdStep) || window.SD_CASE_STUDY_STEPS[0];
    stepDetail.innerHTML = `
      <div class="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">Step ${step.step} of 14</span>
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">${step.module}</span>
              <span class="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">T-Code: ${step.tcode}</span>
            </div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-2">${applyPersonalization(step.title)}</h2>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              <strong>Role / PIC:</strong> ${step.role} &bull; <strong>SAP Fiori App:</strong> ${step.app} &bull; <strong>Est. Time:</strong> ${step.time}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button id="sdPrevBtn" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700" ${step.step === 1 ? 'disabled style="opacity:0.4"' : ''}>&larr; Prev</button>
            <button id="sdNextBtn" class="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700" ${step.step === 14 ? 'disabled style="opacity:0.4"' : ''}>Next &rarr;</button>
          </div>
        </div>

        <!-- 2-Column: Purpose & Business Logic vs System Impact -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50">
            <h4 class="font-bold text-blue-950 dark:text-blue-200 text-sm flex items-center gap-2 mb-2">
              <span>🎯</span> Purpose & Business Rationale
            </h4>
            <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">${applyPersonalization(step.purpose)}</p>
            <div class="mt-3 pt-2 border-t border-blue-200 dark:border-blue-900 text-xs text-slate-600 dark:text-slate-400">
              ${applyPersonalization(step.businessLogic)}
            </div>
          </div>

          <div class="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50">
            <h4 class="font-bold text-purple-950 dark:text-purple-200 text-sm flex items-center gap-2 mb-2">
              <span>⚡</span> System & Integration Impact
            </h4>
            <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">${applyPersonalization(step.systemImpact)}</p>
            <div class="mt-3 pt-2 border-t border-purple-200 dark:border-purple-900 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Expected Output: ${applyPersonalization(step.expectedOutput)}
            </div>
          </div>
        </div>

        <!-- Key Input Fields Table -->
        <div>
          <h4 class="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2 flex items-center gap-2">
            <span>⌨️</span> Key Input Fields (Student Number ### = <span class="text-blue-600 dark:text-blue-400 font-mono">${state.studentNumber}</span>)
          </h4>
          <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table class="min-w-full text-xs">
              <thead class="bg-slate-100 dark:bg-slate-750 text-slate-700 dark:text-slate-300">
                <tr>
                  <th class="p-2.5 text-left w-1/3">Field Name</th>
                  <th class="p-2.5 text-left w-2/3">Value to Enter / Configure</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                ${step.inputs.map(inp => `
                  <tr>
                    <td class="p-2.5 font-semibold bg-slate-50 dark:bg-slate-800/50">${inp.field}</td>
                    <td class="p-2.5 font-mono text-blue-600 dark:text-blue-400">${applyPersonalization(inp.value)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- T-Account Ledger (if applicable) -->
        ${step.tAccount ? `
          <div class="p-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-850">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
              <span>⚖️ Double-Entry Accounting Impact (General Ledger)</span>
              <span class="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded font-mono">${step.tAccount.title}</span>
            </div>
            <table class="t-account-table bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 text-xs">
              <thead>
                <tr class="bg-slate-100 dark:bg-slate-700 font-bold">
                  <th class="t-account-dr text-emerald-700 dark:text-emerald-400">DEBIT (Dr)</th>
                  <th class="t-account-cr text-rose-700 dark:text-rose-400">CREDIT (Cr)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="t-account-dr font-mono whitespace-pre-line text-slate-800 dark:text-slate-200">${step.tAccount.debit.account}<br><strong class="text-emerald-600">${step.tAccount.debit.amount}</strong></td>
                  <td class="t-account-cr font-mono whitespace-pre-line text-slate-800 dark:text-slate-200">${step.tAccount.credit.account}<br><strong class="text-rose-600">${step.tAccount.credit.amount}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        ` : ''}

        <!-- SAP Screenshots -->
        ${step.images && step.images.length > 0 ? `
          <div>
            <h4 class="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2 flex items-center gap-2">
              <span>📸</span> Verified SAP Fiori Interface Screenshot(s) (Click to enlarge)
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${step.images.map(img => `
                <div class="relative group cursor-pointer overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-900" onclick="openImageModal('${img}', 'Step ${step.step}: ${step.title}')">
                  <img src="${img}" alt="Step ${step.step} screenshot" class="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300 opacity-95 group-hover:opacity-100">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 text-white text-xs font-medium">
                    🔍 Click to Inspect SAP Screen
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Lab Report Question & Answer -->
        ${step.qa ? `
          <div class="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-xs space-y-1.5">
            <div class="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <span>💡</span> Official Lab Assignment Question:
            </div>
            <p class="font-semibold text-slate-800 dark:text-slate-200">${step.qa.question}</p>
            <div class="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-800/70 p-3 rounded-lg border border-amber-100 dark:border-amber-900">
              <strong>Model A+ Answer:</strong> ${step.qa.answer}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Next/Prev buttons
    const prevBtn = document.getElementById('sdPrevBtn');
    const nextBtn = document.getElementById('sdNextBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (state.currentSdStep > 1) {
        state.currentSdStep--;
        playSound('click');
        renderSdCaseStudy();
      }
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      if (state.currentSdStep < 14) {
        state.currentSdStep++;
        playSound('click');
        renderSdCaseStudy();
      }
    });
  }

  // ==========================================
  // VIEW 3: MM CASE STUDY (24 STEPS)
  // ==========================================
  function renderMmCaseStudy() {
    const stepList = document.getElementById('mmStepsList');
    const stepDetail = document.getElementById('mmStepDetail');
    if (!stepList || !stepDetail) return;

    // Render Steps Sidebar
    stepList.innerHTML = window.MM_CASE_STUDY_STEPS.map(s => {
      const isActive = s.step === state.currentMmStep;
      return `
        <button class="mm-step-btn w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
          isActive 
            ? 'bg-amber-600 text-white border-amber-600 shadow-md font-semibold' 
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
        }" data-step="${s.step}">
          <div class="flex items-center gap-2.5">
            <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              isActive ? 'bg-white text-amber-600' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
            }">${s.step}</span>
            <div class="text-xs truncate max-w-[160px]">${s.title}</div>
          </div>
          <span class="text-[10px] font-mono px-1 py-0.5 rounded ${
            isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
          }">${s.tcode.split('/')[0]}</span>
        </button>
      `;
    }).join('');

    stepList.querySelectorAll('.mm-step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.currentMmStep = parseInt(btn.dataset.step);
        playSound('click');
        renderMmCaseStudy();
      });
    });

    // Render Step Details
    const step = window.MM_CASE_STUDY_STEPS.find(s => s.step === state.currentMmStep) || window.MM_CASE_STUDY_STEPS[0];
    stepDetail.innerHTML = `
      <div class="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <!-- Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">Step ${step.step} of 24</span>
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">${step.module}</span>
              <span class="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">T-Code: ${step.tcode}</span>
            </div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-2">${applyPersonalization(step.title)}</h2>
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              <strong>Role / PIC:</strong> ${step.role} &bull; <strong>SAP Fiori App:</strong> ${step.app} &bull; <strong>Est. Time:</strong> ${step.time}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button id="mmPrevBtn" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700" ${step.step === 1 ? 'disabled style="opacity:0.4"' : ''}>&larr; Prev</button>
            <button id="mmNextBtn" class="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700" ${step.step === 24 ? 'disabled style="opacity:0.4"' : ''}>Next &rarr;</button>
          </div>
        </div>

        <!-- 2-Column: Purpose vs Impact -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
            <h4 class="font-bold text-amber-950 dark:text-amber-200 text-sm flex items-center gap-2 mb-2">
              <span>🎯</span> Purpose & Business Logic
            </h4>
            <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">${applyPersonalization(step.purpose)}</p>
            <div class="mt-3 pt-2 border-t border-amber-200 dark:border-amber-900 text-xs text-slate-600 dark:text-slate-400">
              ${applyPersonalization(step.businessLogic)}
            </div>
          </div>

          <div class="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50">
            <h4 class="font-bold text-emerald-950 dark:text-emerald-200 text-sm flex items-center gap-2 mb-2">
              <span>⚡</span> System & Accounting Impact
            </h4>
            <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">${applyPersonalization(step.systemImpact)}</p>
            <div class="mt-3 pt-2 border-t border-emerald-200 dark:border-emerald-900 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
              Expected Output: ${applyPersonalization(step.expectedOutput)}
            </div>
          </div>
        </div>

        <!-- Key Input Fields Table -->
        <div>
          <h4 class="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2 flex items-center gap-2">
            <span>⌨️</span> Key Input Fields (Student Number ### = <span class="text-amber-600 dark:text-amber-400 font-mono">${state.studentNumber}</span>)
          </h4>
          <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table class="min-w-full text-xs">
              <thead class="bg-slate-100 dark:bg-slate-750 text-slate-700 dark:text-slate-300">
                <tr>
                  <th class="p-2.5 text-left w-1/3">Field Name</th>
                  <th class="p-2.5 text-left w-2/3">Value to Enter / Configure</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                ${step.inputs.map(inp => `
                  <tr>
                    <td class="p-2.5 font-semibold bg-slate-50 dark:bg-slate-800/50">${inp.field}</td>
                    <td class="p-2.5 font-mono text-amber-600 dark:text-amber-400">${applyPersonalization(inp.value)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- T-Account Ledger (if applicable) -->
        ${step.tAccount ? `
          <div class="p-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-850">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-between">
              <span>⚖️ Double-Entry Accounting Impact (General Ledger)</span>
              <span class="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded font-mono">${step.tAccount.title}</span>
            </div>
            <table class="t-account-table bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 text-xs">
              <thead>
                <tr class="bg-slate-100 dark:bg-slate-700 font-bold">
                  <th class="t-account-dr text-emerald-700 dark:text-emerald-400">DEBIT (Dr)</th>
                  <th class="t-account-cr text-rose-700 dark:text-rose-400">CREDIT (Cr)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="t-account-dr font-mono whitespace-pre-line text-slate-800 dark:text-slate-200">${step.tAccount.debit.account}<br><strong class="text-emerald-600">${step.tAccount.debit.amount}</strong></td>
                  <td class="t-account-cr font-mono whitespace-pre-line text-slate-800 dark:text-slate-200">${step.tAccount.credit.account}<br><strong class="text-rose-600">${step.tAccount.credit.amount}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        ` : ''}

        <!-- SAP Screenshots -->
        ${step.images && step.images.length > 0 ? `
          <div>
            <h4 class="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2 flex items-center gap-2">
              <span>📸</span> Verified SAP Fiori Interface Screenshot(s) (Click to enlarge)
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${step.images.map(img => `
                <div class="relative group cursor-pointer overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-900" onclick="openImageModal('${img}', 'Step ${step.step}: ${step.title}')">
                  <img src="${img}" alt="Step ${step.step} screenshot" class="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300 opacity-95 group-hover:opacity-100">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3 text-white text-xs font-medium">
                    🔍 Click to Inspect SAP Screen
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Lab Report Question & Answer -->
        ${step.qa ? `
          <div class="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-xs space-y-1.5">
            <div class="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <span>💡</span> Official Lab Assignment Question:
            </div>
            <p class="font-semibold text-slate-800 dark:text-slate-200">${step.qa.question}</p>
            <div class="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-800/70 p-3 rounded-lg border border-amber-100 dark:border-amber-900">
              <strong>Model A+ Answer:</strong> ${step.qa.answer}
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // Next/Prev buttons
    const prevBtn = document.getElementById('mmPrevBtn');
    const nextBtn = document.getElementById('mmNextBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (state.currentMmStep > 1) {
        state.currentMmStep--;
        playSound('click');
        renderMmCaseStudy();
      }
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      if (state.currentMmStep < 24) {
        state.currentMmStep++;
        playSound('click');
        renderMmCaseStudy();
      }
    });
  }

  // ==========================================
    // ==========================================
  // VIEW 4: FI MODULE & FINANCIAL STATEMENTS
  // ==========================================
  state.fiSubFilter = state.fiSubFilter || 'all';
  state.fiQuizAnswers = state.fiQuizAnswers || {};
  state.fiQuizSubmitted = state.fiQuizSubmitted || false;

  const FI_PRACTICE_ACCOUNTS = [
    { id: 1, name: "Accumulated Depreciation — Equipment", correctCat: "contra-asset", statement: "Balance Sheet", explanation: "Contra-Asset account subtracted from Equipment cost to show Net Book Value on the Balance Sheet." },
    { id: 2, name: "Cost of Goods Sold (COGS)", correctCat: "expense", statement: "Income Statement", explanation: "Expense directly incurred from delivering goods (posted during SD Goods Issue VL02N). Subtracted from Net Sales to determine Gross Profit." },
    { id: 3, name: "Owner's Drawings (Account 306)", correctCat: "contra-equity", statement: "Statement of Owner's Equity / Balance Sheet", explanation: "Contra-Equity account representing withdrawals by the owner, reducing total ending Owner's Equity." },
    { id: 4, name: "Reconciliation Account 3300000 (Trade Payables)", correctCat: "liability", statement: "Balance Sheet", explanation: "Liability account in the General Ledger that summarizes all subsidiary vendor balances in Accounts Payable (AP)." },
    { id: 5, name: "Reconciliation Account 1200000 (Trade Receivables)", correctCat: "asset", statement: "Balance Sheet", explanation: "Current Asset account in the General Ledger summarizing all customer debit balances from Sales and Distribution (SD)." },
    { id: 6, name: "GR/IR Clearing Account (9100000)", correctCat: "liability", statement: "Balance Sheet", explanation: "Temporary suspense liability account credited upon Goods Receipt (MIGO) and debited upon Invoice Receipt (MIRO) to clear to $0.00." },
    { id: 7, name: "Sales Returns and Allowances", correctCat: "contra-revenue", statement: "Income Statement", explanation: "Contra-Revenue account deducted from Gross Sales Revenue to calculate Net Sales on the Income Statement." },
    { id: 8, name: "Prepaid Insurance", correctCat: "asset", statement: "Balance Sheet", explanation: "Current Asset representing cash paid in advance for insurance coverage to be used in future operating periods." },
    { id: 9, name: "Salaries and Wages Payable", correctCat: "liability", statement: "Balance Sheet", explanation: "Current Liability representing compensation earned by employees but not yet disbursed at period-end close." },
    { id: 10, name: "Service Revenue", correctCat: "revenue", statement: "Income Statement", explanation: "Revenue earned from performing business operations, shown at the top of the Income Statement." }
  ];

  function renderFiModule() {
    const container = document.getElementById('fiModuleContent');
    if (!container) return;
    const fi = window.FI_MODULE_DATA;

    // Filter helper
    const showAll = state.fiSubFilter === 'all';
    const showGbiBs = showAll || state.fiSubFilter === 'gbi-bs';
    const showGbiIs = showAll || state.fiSubFilter === 'gbi-is';
    const showThao = showAll || state.fiSubFilter === 'thao-company';
    const showApAr = showAll || state.fiSubFilter === 'ap-ar';
    const showSteps = showAll || state.fiSubFilter === 'steps';
    const showQuiz = showAll || state.fiSubFilter === 'quiz';

    container.innerHTML = `
      <div class="space-y-8">
        
        <!-- Header & Golden Equation Banner -->
        <div class="bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-800 text-white p-6 md:p-8 rounded-3xl shadow-lg border border-emerald-500/30">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <span class="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-3 py-1 rounded-full text-emerald-100">
              SAP S/4HANA &bull; FINANCIAL REPORTING & STATEMENTS &bull; SLIDES 13-23
            </span>
            <span class="text-xs font-mono text-emerald-200">US GAAP / IFRS Standard</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">Balance Sheet & Income Statement Mastery</h2>
          <p class="text-sm text-emerald-100 mt-2 max-w-3xl leading-relaxed">
            Enterprise Financial Accounting (FI) records business transactions to generate regulatory financial reports. Master the classified Balance Sheet, multi-step Income Statement, and verified exam solutions for Global Bike Inc. and Thao Company.
          </p>
          
          <div class="mt-6 flex flex-wrap items-center gap-3">
            <div class="px-5 py-2.5 bg-slate-950/60 backdrop-blur rounded-2xl border border-emerald-400/40 font-mono font-extrabold text-lg md:text-xl text-emerald-300 shadow-inner">
              ASSETS = LIABILITIES + OWNER'S EQUITY
            </div>
            <div class="text-xs text-emerald-200 font-medium">
              Verified: <strong class="text-white">$35,000 = $35,000</strong> (GBI) &bull; <strong class="text-white">$41,000 = $41,000</strong> (Thao Co.)
            </div>
          </div>
        </div>

        <!-- Filter Sub-Navigation Bar -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
          <span class="text-slate-400 uppercase text-[11px] mr-1 hidden sm:inline">Jump To:</span>
          ${[
            { id: 'all', label: '📊 Show All Statements & Tools' },
            { id: 'gbi-bs', label: '🏛️ GBI Balance Sheet (Slide 18)' },
            { id: 'gbi-is', label: '📈 GBI Income Statement (Slide 20)' },
            { id: 'thao-company', label: '📝 Thao Company Solver (Slide 23)' },
            { id: 'quiz', label: '🎯 Account Classification Practice' },
            { id: 'ap-ar', label: '⚖️ AP vs AR Matrix' },
            { id: 'steps', label: '📋 12 FI-AP Steps' }
          ].map(f => `
            <button class="fi-filter-btn px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              state.fiSubFilter === f.id 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
            }" data-filter="${f.id}">
              ${f.label}
            </button>
          `).join('')}
        </div>

        <!-- 4 Pillars Architecture Summary -->
        ${showAll ? `
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            ${fi.overview.pillars.map(p => `
              <div class="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-emerald-300 transition-all">
                <div class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold text-xs mb-2">
                  FI
                </div>
                <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-1">${p.title}</h4>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${p.desc}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- ======================================================== -->
        <!-- STATEMENT 1: GLOBAL BIKE INC. CLASSIFIED BALANCE SHEET   -->
        <!-- ======================================================== -->
        ${showGbiBs ? `
          <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
            <!-- Header Bar -->
            <div class="p-6 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Point-in-Time Snapshot</span>
                  <span class="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 font-bold">Slide 17 & 18</span>
                </div>
                <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Global Bike Inc. — Classified Balance Sheet
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Financial position at the close of the accounting period. Assets on left (debit normal), Liabilities & Equity on right (credit normal).
                </p>
              </div>

              <!-- Button to view slide screenshot -->
              <button onclick="window.openImageModal('assets/img/page_18_img_1.png', 'Global Bike Inc. Balance Sheet (Slide 18)')" class="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition-all flex items-center gap-2 cursor-pointer">
                <span>📷</span> View Slide 18 Screenshot
              </button>
            </div>

            <!-- Two-Column Classified Balance Sheet Table -->
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:divide-x md:divide-slate-200 md:dark:divide-slate-700">
                
                <!-- LEFT COLUMN: ASSETS -->
                <div class="space-y-4 md:pr-4">
                  <div class="flex items-center justify-between border-b-2 border-blue-600 pb-2">
                    <h4 class="text-base font-extrabold text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                      Assets (Debit Side)
                    </h4>
                    <span class="text-xs text-slate-400 font-mono">Normal: Dr.</span>
                  </div>

                  <div class="space-y-2 text-sm">
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Assets</div>
                    <div class="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-750">
                      <span class="font-medium text-slate-800 dark:text-slate-200">Cash</span>
                      <span class="font-mono font-bold text-slate-900 dark:text-white">$10,000</span>
                    </div>
                    <div class="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-750">
                      <div>
                        <span class="font-medium text-slate-800 dark:text-slate-200">Accounts Receivable</span>
                        <div class="text-[10px] text-slate-500">From SD Customer Invoices (FLCU00/1200000)</div>
                      </div>
                      <span class="font-mono font-bold text-slate-900 dark:text-white">$5,000</span>
                    </div>
                    <div class="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-750">
                      <div>
                        <span class="font-medium text-slate-800 dark:text-slate-200">Inventory</span>
                        <div class="text-[10px] text-slate-500">From MM Goods Receipts (MIGO/Inventory G/L)</div>
                      </div>
                      <span class="font-mono font-bold text-slate-900 dark:text-white">$8,000</span>
                    </div>
                    <div class="flex items-center justify-between py-1 px-3 text-xs font-semibold text-slate-600 dark:text-slate-400 border-t border-dashed border-slate-200 dark:border-slate-700">
                      <span>Total Current Assets</span>
                      <span class="font-mono">$23,000</span>
                    </div>

                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider pt-2">Non-Current (Fixed) Assets</div>
                    <div class="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-750">
                      <span class="font-medium text-slate-800 dark:text-slate-200">Equipment</span>
                      <span class="font-mono font-bold text-slate-900 dark:text-white">$12,000</span>
                    </div>
                  </div>

                  <!-- Total Assets Box -->
                  <div class="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-between shadow-sm">
                    <span class="font-extrabold uppercase text-sm tracking-wider">Total Assets</span>
                    <span class="text-2xl font-black font-mono underline decoration-double">$35,000</span>
                  </div>
                </div>

                <!-- RIGHT COLUMN: LIABILITIES & OWNER'S EQUITY -->
                <div class="space-y-4 md:pl-4">
                  <div class="flex items-center justify-between border-b-2 border-emerald-600 pb-2">
                    <h4 class="text-base font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                      Liabilities & Equity (Credit Side)
                    </h4>
                    <span class="text-xs text-slate-400 font-mono">Normal: Cr.</span>
                  </div>

                  <div class="space-y-2 text-sm">
                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider">Liabilities (External Claims)</div>
                    <div class="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-750">
                      <div>
                        <span class="font-medium text-slate-800 dark:text-slate-200">Accounts Payable</span>
                        <div class="text-[10px] text-slate-500">From MM Supplier Invoices (MIRO/3300000)</div>
                      </div>
                      <span class="font-mono font-bold text-slate-900 dark:text-white">$7,000</span>
                    </div>
                    <div class="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-750">
                      <span class="font-medium text-slate-800 dark:text-slate-200">Bank Loan (Notes Payable)</span>
                      <span class="font-mono font-bold text-slate-900 dark:text-white">$10,000</span>
                    </div>
                    <div class="flex items-center justify-between py-1 px-3 text-xs font-semibold text-slate-600 dark:text-slate-400 border-t border-dashed border-slate-200 dark:border-slate-700">
                      <span>Total Liabilities</span>
                      <span class="font-mono">$17,000</span>
                    </div>

                    <div class="text-xs font-bold text-slate-400 uppercase tracking-wider pt-2">Owner's Equity (Residual Claim)</div>
                    <div class="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-50 dark:bg-slate-750">
                      <span class="font-medium text-slate-800 dark:text-slate-200">Owner's Capital</span>
                      <span class="font-mono font-bold text-slate-900 dark:text-white">$18,000</span>
                    </div>
                    <div class="flex items-center justify-between py-1 px-3 text-xs font-semibold text-slate-600 dark:text-slate-400 border-t border-dashed border-slate-200 dark:border-slate-700">
                      <span>Total Equity</span>
                      <span class="font-mono">$18,000</span>
                    </div>
                  </div>

                  <!-- Total Liabilities & Equity Box -->
                  <div class="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between shadow-sm">
                    <span class="font-extrabold uppercase text-sm tracking-wider">Total Liabilities & Equity</span>
                    <span class="text-2xl font-black font-mono underline decoration-double">$35,000</span>
                  </div>
                </div>

              </div>

              <!-- Equation Verification Footer Callout -->
              <div class="mt-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg">
                    ✓
                  </div>
                  <div>
                    <div class="font-extrabold text-sm text-emerald-950 dark:text-emerald-200">Accounting Equation Balance Verification</div>
                    <div class="text-emerald-800 dark:text-emerald-300 font-mono text-xs mt-0.5">
                      $35,000 (Assets) = $17,000 (Liabilities) + $18,000 (Owner's Equity) &bull; Net Difference: $0.00
                    </div>
                  </div>
                </div>
                <span class="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold text-xs uppercase tracking-wider">
                  Perfect Equilibrium
                </span>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- ======================================================== -->
        <!-- STATEMENT 2: GLOBAL BIKE INC. MULTI-STEP INCOME STATEMENT-->
        <!-- ======================================================== -->
        ${showGbiIs ? `
          <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
            <!-- Header Bar -->
            <div class="p-6 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Period-of-Time Performance</span>
                  <span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 font-bold">Slide 19 & 20</span>
                </div>
                <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Global Bike Inc. — Multi-Step Income Statement
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Operating revenues and expenses during the subsequent duration, determining Gross Profit, Operating Income, and Net Income.
                </p>
              </div>

              <!-- Button to view slide screenshot -->
              <button onclick="window.openImageModal('assets/img/page_20_img_1.png', 'Global Bike Inc. Income Statement (Slide 20)')" class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-all flex items-center gap-2 cursor-pointer">
                <span>📷</span> View Slide 20 Screenshot
              </button>
            </div>

            <!-- Multi-Step Income Statement Breakdown Table -->
            <div class="p-6">
              <div class="max-w-3xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden text-sm">
                
                <!-- Section 1: Revenue -->
                <div class="bg-blue-50/50 dark:bg-blue-950/20 p-4 border-b border-slate-200 dark:border-slate-700">
                  <div class="text-xs font-extrabold uppercase text-blue-700 dark:text-blue-400 tracking-wider mb-2">I. Operating Revenues</div>
                  <div class="space-y-1.5">
                    <div class="flex items-center justify-between text-slate-800 dark:text-slate-200">
                      <span>Sales Revenue (Gross)</span>
                      <span class="font-mono font-medium">$15,000</span>
                    </div>
                    <div class="flex items-center justify-between text-slate-500 dark:text-slate-400 pl-4 text-xs">
                      <span>Less: Sales Returns and Allowances (Contra-Revenue)</span>
                      <span class="font-mono text-rose-500">($1,000)</span>
                    </div>
                    <div class="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-600 font-bold text-blue-900 dark:text-blue-200">
                      <span>Total Net Revenue (Net Sales)</span>
                      <span class="font-mono text-base">$14,000</span>
                    </div>
                  </div>
                </div>

                <!-- Section 2: COGS & Gross Profit -->
                <div class="bg-white dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                  <div class="text-xs font-extrabold uppercase text-amber-700 dark:text-amber-400 tracking-wider mb-2">II. Cost of Goods Sold</div>
                  <div class="space-y-1.5">
                    <div class="flex items-center justify-between text-slate-800 dark:text-slate-200">
                      <span>Cost of Goods Sold (COGS — Direct Production/Inventory Cost)</span>
                      <span class="font-mono text-rose-600 font-medium">($6,000)</span>
                    </div>
                    <div class="flex items-center justify-between pt-2 border-t-2 border-slate-200 dark:border-slate-700 font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 px-3 py-2 rounded-xl">
                      <div>
                        <span>Gross Profit</span>
                        <span class="text-xs text-slate-500 font-normal ml-2">($14,000 - $6,000)</span>
                      </div>
                      <div class="text-right">
                        <span class="font-mono text-lg font-black text-emerald-600 dark:text-emerald-400">$8,000</span>
                        <div class="text-[10px] text-slate-400">Gross Margin: 57.1%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Section 3: Operating Expenses -->
                <div class="bg-slate-50/50 dark:bg-slate-850 p-4 border-b border-slate-200 dark:border-slate-700">
                  <div class="text-xs font-extrabold uppercase text-slate-500 tracking-wider mb-2">III. Operating Expenses</div>
                  <div class="space-y-1.5 pl-2">
                    <div class="flex items-center justify-between text-slate-700 dark:text-slate-300 text-xs">
                      <span>Salaries Expense</span>
                      <span class="font-mono">$2,500</span>
                    </div>
                    <div class="flex items-center justify-between text-slate-700 dark:text-slate-300 text-xs">
                      <span>Rent Expense (Facility Lease)</span>
                      <span class="font-mono">$1,500</span>
                    </div>
                    <div class="flex items-center justify-between text-slate-700 dark:text-slate-300 text-xs">
                      <span>Utilities Expense (Power/Water)</span>
                      <span class="font-mono">$500</span>
                    </div>
                    <div class="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200 text-xs">
                      <span>Total Operating Expenses</span>
                      <span class="font-mono">$4,500</span>
                    </div>
                    <div class="flex items-center justify-between text-slate-400 text-[11px] italic">
                      <span>Total Combined Expenses (COGS $6,000 + Opex $4,500)</span>
                      <span class="font-mono">$10,500</span>
                    </div>
                  </div>
                </div>

                <!-- Section 4: Operating Income & Taxes -->
                <div class="bg-white dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                      <span>Net Income Before Taxes (Operating Income)</span>
                      <span class="font-mono text-base">$3,500</span>
                    </div>
                    <div class="flex items-center justify-between text-xs text-rose-600 dark:text-rose-400 pl-4">
                      <span>Less: Income Tax Expense</span>
                      <span class="font-mono">($700)</span>
                    </div>
                  </div>
                </div>

                <!-- Section 5: Net Income Final Bottom Line -->
                <div class="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
                  <div>
                    <div class="text-xs uppercase font-extrabold tracking-wider text-emerald-200">The Bottom Line</div>
                    <div class="text-2xl font-black tracking-tight">NET INCOME (Profit After Tax)</div>
                  </div>
                  <div class="text-right">
                    <div class="text-3xl font-black font-mono underline decoration-double">$2,800</div>
                    <div class="text-xs text-emerald-200 font-semibold mt-0.5">Net Profit Margin: 20.0%</div>
                  </div>
                </div>

              </div>

              <!-- Integration Takeaway Note -->
              <div class="mt-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 text-xs text-blue-950 dark:text-blue-300 leading-relaxed flex items-start gap-3">
                <span class="text-lg">💡</span>
                <div>
                  <strong>How the Statements Connect in ERP:</strong> The <strong>Net Income of $2,800</strong> does not vanish at year-end; in SAP S/4HANA, it automatically closes into the Balance Sheet under <strong>Owner's Equity (Retained Earnings)</strong>, increasing the net wealth of the firm!
                </div>
              </div>
            </div>
          </div>
        ` : ''}

        <!-- ======================================================== -->
        <!-- STATEMENT 3: THAO COMPANY EXAM WORKSHEET SOLVER (SLIDE 23)-->
        <!-- ======================================================== -->
        ${showThao ? `
          <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
            <!-- Header Bar -->
            <div class="p-6 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Midterm Review Classic Problem</span>
                  <span class="text-xs px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 font-bold">Slide 23</span>
                </div>
                <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Thao Company — Complete Exam Worksheet & Statement Solver
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Adjusted Trial Balance for Year Ended Dec 31, 2017: <strong>Dr. 103,700 | Cr. 103,700</strong>. Required: Prepare the Balance Sheet and verify the accounting equation.
                </p>
              </div>

              <!-- Button to view slide screenshot -->
              <button onclick="window.openImageModal('assets/img/page_23_img_1.png', 'Thao Company Worksheet (Slide 23)')" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow transition-all flex items-center gap-2 cursor-pointer">
                <span>📷</span> View Slide 23 Screenshot
              </button>
            </div>

            <div class="p-6 space-y-6">
              
              <!-- 3-Step Guided Solver Carousel / Cards -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <!-- Step 1: Income Statement -->
                <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">1</span>
                    <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300">Income Statement</span>
                  </div>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">Calculate Net Income</h4>
                  
                  <div class="text-xs space-y-1 font-mono text-slate-700 dark:text-slate-300">
                    <div class="flex justify-between font-bold text-blue-600">
                      <span>Service Revenue (Cr)</span>
                      <span>$61,000</span>
                    </div>
                    <div class="text-slate-500 text-[11px] pt-1 border-t border-slate-200 dark:border-slate-600">Operating Expenses (Dr):</div>
                    <div class="flex justify-between text-slate-600 dark:text-slate-400 pl-2"><span>&bull; Advertising</span><span>$8,400</span></div>
                    <div class="flex justify-between text-slate-600 dark:text-slate-400 pl-2"><span>&bull; Supplies Exp</span><span>$4,000</span></div>
                    <div class="flex justify-between text-slate-600 dark:text-slate-400 pl-2"><span>&bull; Depreciation</span><span>$5,600</span></div>
                    <div class="flex justify-between text-slate-600 dark:text-slate-400 pl-2"><span>&bull; Insurance Exp</span><span>$3,500</span></div>
                    <div class="flex justify-between text-slate-600 dark:text-slate-400 pl-2"><span>&bull; Salaries & Wages</span><span>$28,000</span></div>
                    <div class="flex justify-between text-slate-600 dark:text-slate-400 pl-2"><span>&bull; Interest Exp</span><span>$600</span></div>
                    <div class="flex justify-between font-semibold pt-1 border-t border-dashed border-slate-300 dark:border-slate-600 text-rose-600">
                      <span>Total Expenses</span>
                      <span>($50,100)</span>
                    </div>
                    <div class="flex justify-between font-extrabold pt-1.5 border-t-2 border-slate-300 dark:border-slate-600 text-emerald-600 dark:text-emerald-400 text-sm">
                      <span>Net Income</span>
                      <span>$10,900</span>
                    </div>
                  </div>
                </div>

                <!-- Step 2: Owner's Equity -->
                <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">2</span>
                    <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300">Equity Statement</span>
                  </div>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">Determine Ending Capital</h4>

                  <div class="text-xs space-y-2 font-mono text-slate-700 dark:text-slate-300">
                    <div class="flex justify-between">
                      <span class="text-slate-600 dark:text-slate-400">Beginning Owner's Capital (301)</span>
                      <span class="font-bold">$13,000</span>
                    </div>
                    <div class="flex justify-between text-emerald-600">
                      <span>Add: Net Income (Step 1)</span>
                      <span>+$10,900</span>
                    </div>
                    <div class="flex justify-between text-slate-400 text-[11px] pl-2 border-t border-slate-200 dark:border-slate-600">
                      <span>Subtotal Capital</span>
                      <span>$23,900</span>
                    </div>
                    <div class="flex justify-between text-rose-600">
                      <span>Less: Owner's Drawings (306)</span>
                      <span>-$7,000</span>
                    </div>
                    <div class="flex justify-between font-extrabold pt-2 border-t-2 border-slate-300 dark:border-slate-600 text-purple-600 dark:text-purple-400 text-sm">
                      <span>Ending Owner's Capital</span>
                      <span>$16,900</span>
                    </div>
                    <div class="text-[10px] text-slate-400 italic pt-1">
                      *Drawings reduce equity, but are NOT an expense on the Income Statement!
                    </div>
                  </div>
                </div>

                <!-- Step 3: Classified Balance Sheet -->
                <div class="p-5 rounded-2xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">3</span>
                    <span class="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">Balance Sheet</span>
                  </div>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm">Verify Accounting Equation</h4>

                  <div class="text-xs space-y-2 font-mono text-slate-700 dark:text-slate-300">
                    <div class="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div class="font-bold text-blue-600 mb-0.5">Total Assets: $41,000</div>
                      <div class="text-[10px] text-slate-500">
                        Cash $5.3k + AR $10.8k + Supplies $1.5k + Ins $2k + Net Equip ($27k - $5.6k Accum Depr = $21.4k)
                      </div>
                    </div>

                    <div class="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div class="font-bold text-amber-600 mb-0.5">Total Liabilities: $24,100</div>
                      <div class="text-[10px] text-slate-500">
                        Notes Pay $15k + AP $6.1k + Salaries Pay $2.4k + Int Pay $600
                      </div>
                    </div>

                    <div class="p-2 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div class="font-bold text-purple-600 mb-0.5">Owner's Equity: $16,900</div>
                      <div class="text-[10px] text-slate-500">
                        Ending Owner's Capital (from Step 2)
                      </div>
                    </div>

                    <div class="p-2.5 rounded-xl bg-emerald-600 text-white font-extrabold text-xs text-center shadow-sm">
                      $41,000 Assets = $24,100 + $16,900 ($41k) ✅
                    </div>
                  </div>
                </div>

              </div>

              <!-- Raw Trial Balance Dropdown / Accordion -->
              <details class="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 p-4">
                <summary class="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 cursor-pointer hover:text-indigo-600">
                  📑 Click to View Full 18-Account Adjusted Trial Balance Table (Slide 23)
                </summary>
                <div class="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                  <table class="min-w-full text-xs bg-white dark:bg-slate-800">
                    <thead class="bg-slate-100 dark:bg-slate-750 font-bold text-slate-700 dark:text-slate-300">
                      <tr>
                        <th class="p-2 text-left">No.</th>
                        <th class="p-2 text-left">Account Title</th>
                        <th class="p-2 text-right">Debit (Dr)</th>
                        <th class="p-2 text-right">Credit (Cr)</th>
                        <th class="p-2 text-left">Classification</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 dark:divide-slate-700 font-mono">
                      <tr><td class="p-2">101</td><td class="p-2 font-sans font-medium">Cash</td><td class="p-2 text-right">$5,300</td><td class="p-2 text-right">-</td><td class="p-2 font-sans text-[10px] text-blue-600">Current Asset</td></tr>
                      <tr><td class="p-2">112</td><td class="p-2 font-sans font-medium">Accounts Receivable</td><td class="p-2 text-right">$10,800</td><td class="p-2 text-right">-</td><td class="p-2 font-sans text-[10px] text-blue-600">Current Asset</td></tr>
                      <tr><td class="p-2">126</td><td class="p-2 font-sans font-medium">Supplies</td><td class="p-2 text-right">$1,500</td><td class="p-2 text-right">-</td><td class="p-2 font-sans text-[10px] text-blue-600">Current Asset</td></tr>
                      <tr><td class="p-2">130</td><td class="p-2 font-sans font-medium">Prepaid Insurance</td><td class="p-2 text-right">$2,000</td><td class="p-2 text-right">-</td><td class="p-2 font-sans text-[10px] text-blue-600">Current Asset</td></tr>
                      <tr><td class="p-2">157</td><td class="p-2 font-sans font-medium">Equipment</td><td class="p-2 text-right">$27,000</td><td class="p-2 text-right">-</td><td class="p-2 font-sans text-[10px] text-blue-600">Fixed Asset</td></tr>
                      <tr><td class="p-2">158</td><td class="p-2 font-sans font-medium text-amber-600">Accumulated Depreciation — Equipment</td><td class="p-2 text-right">-</td><td class="p-2 text-right text-amber-600">$5,600</td><td class="p-2 font-sans text-[10px] text-amber-600">Contra-Asset</td></tr>
                      <tr><td class="p-2">200</td><td class="p-2 font-sans font-medium">Notes Payable</td><td class="p-2 text-right">-</td><td class="p-2 text-right">$15,000</td><td class="p-2 font-sans text-[10px] text-rose-600">Liability</td></tr>
                      <tr><td class="p-2">201</td><td class="p-2 font-sans font-medium">Accounts Payable</td><td class="p-2 text-right">-</td><td class="p-2 text-right">$6,100</td><td class="p-2 font-sans text-[10px] text-rose-600">Liability</td></tr>
                      <tr><td class="p-2">212</td><td class="p-2 font-sans font-medium">Salaries and Wages Payable</td><td class="p-2 text-right">-</td><td class="p-2 text-right">$2,400</td><td class="p-2 font-sans text-[10px] text-rose-600">Liability</td></tr>
                      <tr><td class="p-2">230</td><td class="p-2 font-sans font-medium">Interest Payable</td><td class="p-2 text-right">-</td><td class="p-2 text-right">$600</td><td class="p-2 font-sans text-[10px] text-rose-600">Liability</td></tr>
                      <tr><td class="p-2">301</td><td class="p-2 font-sans font-medium">Owner's Capital</td><td class="p-2 text-right">-</td><td class="p-2 text-right">$13,000</td><td class="p-2 font-sans text-[10px] text-purple-600">Owner's Equity</td></tr>
                      <tr><td class="p-2">306</td><td class="p-2 font-sans font-medium text-purple-600">Owner's Drawings</td><td class="p-2 text-right text-purple-600">$7,000</td><td class="p-2 text-right">-</td><td class="p-2 font-sans text-[10px] text-purple-600">Contra-Equity</td></tr>
                      <tr><td class="p-2">400</td><td class="p-2 font-sans font-medium">Service Revenue</td><td class="p-2 text-right">-</td><td class="p-2 text-right text-emerald-600">$61,000</td><td class="p-2 font-sans text-[10px] text-emerald-600">Revenue</td></tr>
                      <tr><td class="p-2">610</td><td class="p-2 font-sans font-medium">Advertising Expense</td><td class="p-2 text-right">$8,400</td><td class="p-2 text-right">-</td><td class="p-2 font-sans text-[10px] text-orange-600">Expense</td></tr>
                      <tr><td class="p-2">631</td><td class="p-2 font-sans font-medium">Supplies Expense</td><td class="p-2 text-right">$4,000</td><td class="p-2 text-right">-</td><td class="p-2 font-sans text-[10px] text-orange-600">Expense</td></tr>
                      <tr><td class="p-2">711</td><td class="p-2 font-sans font-medium">Depreciation Expense</td><td class="p-2 text-right">$5,600</td><td class="p-2 text-right">-</td><td class="p-2 font-sans text-[10px] text-orange-600">Expense</td></tr>
                      <tr><td class="p-2">722</td><td class="p-2 font-sans font-medium">Insurance Expense</td><td class="p-2 text-right">$3,500</td><td class="p-2 text-right">-</td><td class="p-2 font-sans text-[10px] text-orange-600">Expense</td></tr>
                      <tr><td class="p-2">726</td><td class="p-2 font-sans font-medium">Salaries and Wages Expense</td><td class="p-2 text-right">$28,000</td><td class="p-2 text-right">-</td><td class="p-2 font-sans text-[10px] text-orange-600">Expense</td></tr>
                      <tr><td class="p-2">905</td><td class="p-2 font-sans font-medium">Interest Expense</td><td class="p-2 text-right">$600</td><td class="p-2 text-right">-</td><td class="p-2 font-sans text-[10px] text-orange-600">Expense</td></tr>
                      <tr class="font-extrabold bg-slate-100 dark:bg-slate-750 text-slate-900 dark:text-white border-t-2 border-slate-300">
                        <td class="p-2.5 font-sans" colspan="2">Adjusted Trial Balance Totals</td>
                        <td class="p-2.5 text-right font-mono underline decoration-double">$103,700</td>
                        <td class="p-2.5 text-right font-mono underline decoration-double">$103,700</td>
                        <td class="p-2.5 font-sans text-emerald-600">Balanced (Dr = Cr)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </details>

            </div>
          </div>
        ` : ''}

        <!-- ======================================================== -->
        <!-- TOOL 4: INTERACTIVE ACCOUNT CLASSIFICATION QUIZ          -->
        <!-- ======================================================== -->
        ${showQuiz ? `
          <div class="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md p-6 space-y-6">
            <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Interactive Active Recall</span>
                <h3 class="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Financial Statement Account Classification Practice
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Select the proper accounting classification for each key account tested on the midterm exam.
                </p>
              </div>

              <div class="flex items-center gap-2">
                <button id="resetFiQuizBtn" class="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-750 transition-all cursor-pointer">
                  Reset Practice
                </button>
              </div>
            </div>

            <!-- Quiz Questions Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${FI_PRACTICE_ACCOUNTS.map((q, idx) => {
                const userChoice = state.fiQuizAnswers[q.id];
                const isAnswered = !!userChoice;
                const isCorrect = userChoice === q.correctCat;
                return `
                  <div class="p-4 rounded-2xl border transition-all ${
                    isAnswered 
                      ? (isCorrect ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800' : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800')
                      : 'bg-slate-50 dark:bg-slate-750 border-slate-200 dark:border-slate-700'
                  } space-y-3">
                    <div class="flex items-start justify-between gap-2">
                      <div class="font-bold text-sm text-slate-900 dark:text-white">
                        <span class="text-slate-400 mr-1">${idx + 1}.</span> ${q.name}
                      </div>
                      ${isAnswered ? `
                        <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          isCorrect ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200'
                        }">
                          ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                        </span>
                      ` : ''}
                    </div>

                    <!-- Options -->
                    <div class="flex flex-wrap gap-1.5">
                      ${[
                        { val: 'asset', label: 'Asset' },
                        { val: 'contra-asset', label: 'Contra-Asset' },
                        { val: 'liability', label: 'Liability' },
                        { val: 'equity', label: 'Equity' },
                        { val: 'contra-equity', label: 'Contra-Equity' },
                        { val: 'revenue', label: 'Revenue' },
                        { val: 'contra-revenue', label: 'Contra-Revenue' },
                        { val: 'expense', label: 'Expense' }
                      ].map(opt => `
                        <button class="fi-quiz-choice-btn px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          userChoice === opt.val
                            ? (opt.val === q.correctCat ? 'bg-emerald-600 text-white font-bold' : 'bg-rose-600 text-white font-bold')
                            : (isAnswered && opt.val === q.correctCat ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-bold border border-emerald-400' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700')
                        }" data-qid="${q.id}" data-val="${opt.val}">
                          ${opt.label}
                        </button>
                      `).join('')}
                    </div>

                    <!-- Feedback note if answered -->
                    ${isAnswered ? `
                      <div class="text-[11px] leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-700 ${
                        isCorrect ? 'text-emerald-900 dark:text-emerald-300' : 'text-rose-900 dark:text-rose-300'
                      }">
                        <strong>Statement:</strong> ${q.statement} &bull; ${q.explanation}
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <!-- ======================================================== -->
        <!-- TOOL 5: AP VS. AR COMPARISON MATRIX                      -->
        <!-- ======================================================== -->
        ${showApAr ? `
          <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Core Architecture Matrix</span>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-2">
                  <span>⚖️</span> Accounts Payable (FI-AP) vs. Accounts Receivable (FI-AR)
                </h3>
              </div>
            </div>
            
            <div class="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table class="min-w-full text-xs">
                <thead class="bg-slate-100 dark:bg-slate-750 text-slate-700 dark:text-slate-300 font-bold">
                  <tr>
                    <th class="p-3 text-left w-1/4">Comparison Dimension</th>
                    <th class="p-3 text-left w-3/8 text-rose-700 dark:text-rose-400">Accounts Payable (AP - Money Out)</th>
                    <th class="p-3 text-left w-3/8 text-emerald-700 dark:text-emerald-400">Accounts Receivable (AR - Money In)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 dark:divide-slate-700 text-slate-700 dark:text-slate-300">
                  ${fi.apVsArComparison.map(row => `
                    <tr>
                      <td class="p-3 font-semibold bg-slate-50 dark:bg-slate-800/50">${row.dimension}</td>
                      <td class="p-3 bg-rose-50/20 dark:bg-rose-950/10 font-medium">${row.ap}</td>
                      <td class="p-3 bg-emerald-50/20 dark:bg-emerald-950/10 font-medium">${row.ar}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

        <!-- ======================================================== -->
        <!-- TOOL 6: 12 SEQUENTIAL STEPS OF FI-AP CASE STUDY          -->
        <!-- ======================================================== -->
        ${showSteps ? `
          <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Cardinal Properties Case Workflow</span>
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-2">
                  <span>📋</span> 12 Sequential Steps of the FI-AP Case Study
                </h3>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              ${fi.fiApSteps.map(st => `
                <div class="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-xs hover:border-emerald-400 transition-all">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">${st.step}</span>
                    <span class="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">${st.code}</span>
                  </div>
                  <div class="font-bold text-slate-900 dark:text-white mt-1">${st.title}</div>
                  <div class="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">${st.app}</div>
                  <div class="text-slate-500 dark:text-slate-400 text-[11px] mt-1 leading-relaxed">${st.purpose}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    `;

    // Attach Event Listeners for FI Filter Buttons
    container.querySelectorAll('.fi-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.fiSubFilter = btn.dataset.filter;
        playSound('click');
        renderFiModule();
      });
    });

    // Attach Event Listeners for Quiz Choices
    container.querySelectorAll('.fi-quiz-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = parseInt(btn.dataset.qid);
        const val = btn.dataset.val;
        state.fiQuizAnswers[qid] = val;
        
        const q = FI_PRACTICE_ACCOUNTS.find(item => item.id === qid);
        if (q && q.correctCat === val) {
          playSound('success');
        } else {
          playSound('error');
        }
        renderFiModule();
      });
    });

    // Reset Quiz button
    const resetBtn = container.querySelector('#resetFiQuizBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.fiQuizAnswers = {};
        playSound('click');
        renderFiModule();
      });
    }
  }

  // VIEW 5: ACTIVE RECALL FLASHCARDS
  // ==========================================
  function renderFlashcards() {
    const cardEl = document.getElementById('flashcardCard');
    const deckTabs = document.getElementById('flashcardDeckTabs');
    const progressEl = document.getElementById('flashcardProgress');
    const countEl = document.getElementById('flashcardCount');
    if (!cardEl || !deckTabs) return;

    // Filter deck
    const allCards = window.FLASHCARDS_DATA;
    const filtered = state.flashcardDeck === 'all' 
      ? allCards 
      : allCards.filter(c => c.deck === state.flashcardDeck);

    if (state.flashcardIndex >= filtered.length) state.flashcardIndex = 0;
    const card = filtered[state.flashcardIndex] || filtered[0];

    // Render deck selector tabs
    const decks = [
      { id: 'all', name: 'All Topics (66)' },
      { id: 'mis-theory', name: 'MIS & Strategy (12)' },
      { id: 'mm-procurement', name: 'MM & P2P (15)' },
      { id: 'sd-fulfillment', name: 'SD & O2C (15)' },
      { id: 'fi-accounting', name: 'FI & Accounting (12)' },
      { id: 'tcodes-fiori', name: 'T-Codes & Fiori (12)' }
    ];

    deckTabs.innerHTML = decks.map(d => `
      <button class="flash-deck-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
        state.flashcardDeck === d.id
          ? 'bg-blue-600 text-white shadow-sm'
          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
      }" data-deck="${d.id}">${d.name}</button>
    `).join('');

    deckTabs.querySelectorAll('.flash-deck-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.flashcardDeck = btn.dataset.deck;
        state.flashcardIndex = 0;
        state.isCardFlipped = false;
        playSound('click');
        renderFlashcards();
      });
    });

    if (countEl) {
      countEl.textContent = `Card ${state.flashcardIndex + 1} of ${filtered.length}`;
    }
    if (progressEl) {
      const pct = Math.round(((state.flashcardIndex + 1) / filtered.length) * 100);
      progressEl.style.width = `${pct}%`;
    }

    // Render Card Container
    cardEl.innerHTML = `
      <div class="flashcard-inner w-full h-[320px] md:h-[340px] relative transform-style-preserve-3d cursor-pointer ${
        state.isCardFlipped ? 'is-flipped' : ''
      }">
        <!-- FRONT -->
        <div class="absolute inset-0 backface-hidden p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-850 border-2 border-slate-200 dark:border-slate-700 shadow-lg flex flex-col justify-between">
          <div class="flex items-center justify-between text-xs">
            <span class="px-2.5 py-1 rounded-full font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">${card.deckName}</span>
            <span class="text-slate-400 font-mono text-[11px]">${card.tag}</span>
          </div>
          <div class="text-center px-4">
            <h3 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
              ${card.front}
            </h3>
          </div>
          <div class="text-center text-xs text-slate-400 font-medium">
            🔄 Click anywhere or press Space to reveal answer
          </div>
        </div>

        <!-- BACK -->
        <div class="absolute inset-0 backface-hidden rotate-y-180 p-8 rounded-2xl bg-gradient-to-br from-blue-950 to-slate-900 text-white border-2 border-blue-500 shadow-xl flex flex-col justify-between overflow-y-auto">
          <div class="flex items-center justify-between text-xs border-b border-white/10 pb-2">
            <span class="font-bold text-blue-300">A+ Answer & Explanation</span>
            <span class="text-slate-400 font-mono">${card.tag}</span>
          </div>
          <div class="text-sm md:text-base text-slate-100 leading-relaxed my-auto whitespace-pre-line">
            ${applyPersonalization(card.back)}
          </div>
          <div class="text-center text-xs text-blue-400 pt-2 border-t border-white/10">
            🔄 Click to flip back
          </div>
        </div>
      </div>
    `;

    // Click to flip
    cardEl.onclick = () => {
      state.isCardFlipped = !state.isCardFlipped;
      playSound('flip');
      renderFlashcards();
    };

    // Nav controls
    const prevBtn = document.getElementById('flashcardPrev');
    const nextBtn = document.getElementById('flashcardNext');
    const shuffleBtn = document.getElementById('flashcardShuffle');
    const masteryBtn = document.getElementById('flashcardMasteryToggle');

    if (prevBtn) {
      prevBtn.onclick = () => {
        if (state.flashcardIndex > 0) {
          state.flashcardIndex--;
          state.isCardFlipped = false;
          playSound('click');
          renderFlashcards();
        }
      };
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (state.flashcardIndex < filtered.length - 1) {
          state.flashcardIndex++;
          state.isCardFlipped = false;
          playSound('click');
          renderFlashcards();
        }
      };
    }
    if (shuffleBtn) {
      shuffleBtn.onclick = () => {
        state.flashcardIndex = Math.floor(Math.random() * filtered.length);
        state.isCardFlipped = false;
        playSound('flip');
        renderFlashcards();
      };
    }
  }

  // ==========================================
  // VIEW 6: STEP ORDERING EXERCISES
  // ==========================================
  function renderStepOrdering() {
    const selector = document.getElementById('stepOrderingSelector');
    const container = document.getElementById('stepOrderingContainer');
    if (!selector || !container) return;

    // Challenge Tab Selector
    selector.innerHTML = window.STEP_ORDERING_DATA.map(c => `
      <button class="step-challenge-btn px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
        state.activeChallengeId === c.id
          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
      }" data-challenge-id="${c.id}">${c.title.split(':')[0]}: ${c.category}</button>
    `).join('');

    selector.querySelectorAll('.step-challenge-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeChallengeId = btn.dataset.challengeId;
        initCurrentChallenge();
        playSound('click');
        renderStepOrdering();
      });
    });

    const challenge = window.STEP_ORDERING_DATA.find(c => c.id === state.activeChallengeId) || window.STEP_ORDERING_DATA[0];

    // If items not initialized, shuffle them
    if (!state.challengeCurrentItems || state.challengeCurrentItems.length !== challenge.correctOrder.length) {
      initCurrentChallenge();
    }

    container.innerHTML = `
      <div class="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">${challenge.category}</span>
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">${challenge.difficulty}</span>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-2">${challenge.title}</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${challenge.subtitle}</p>
        </div>

        <div class="p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl text-xs text-blue-900 dark:text-blue-300 flex items-center justify-between">
          <span>💡 <strong>How to play:</strong> Click the Up/Down buttons to reorder items into their correct chronological sequence, then click "Validate My Order".</span>
          <button id="resetOrderBtn" class="text-xs underline font-semibold text-blue-700 dark:text-blue-400 hover:text-blue-900">Shuffle Again</button>
        </div>

        <!-- Draggable / Reorderable List -->
        <div id="reorderableList" class="space-y-2.5">
          ${state.challengeCurrentItems.map((item, idx) => {
            const isCorrect = state.challengeChecked && item.stepNum === (idx + 1);
            const isWrong = state.challengeChecked && item.stepNum !== (idx + 1);
            return `
              <div class="reorder-item p-3 rounded-xl border flex items-center justify-between transition-all ${
                isCorrect 
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-900 dark:text-emerald-200' 
                  : isWrong 
                    ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-900 dark:text-rose-200' 
                    : 'bg-white dark:bg-slate-750 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm'
              }" data-index="${idx}">
                <div class="flex items-center gap-3">
                  <span class="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    isCorrect 
                      ? 'bg-emerald-500 text-white' 
                      : isWrong 
                        ? 'bg-rose-500 text-white' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }">
                    ${idx + 1}
                  </span>
                  <span class="text-sm font-medium">${applyPersonalization(item.text)}</span>
                </div>
                <div class="flex items-center gap-1">
                  <button class="move-up-btn p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" data-index="${idx}" ${idx === 0 ? 'disabled style="opacity:0.2"' : ''}>▲</button>
                  <button class="move-down-btn p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" data-index="${idx}" ${idx === state.challengeCurrentItems.length - 1 ? 'disabled style="opacity:0.2"' : ''}>▼</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Action / Result Controls -->
        <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <button id="validateOrderBtn" class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2">
            <span>✓</span> Validate My Order
          </button>
          <div id="challengeFeedback" class="text-xs font-semibold"></div>
        </div>

        ${state.challengeChecked ? `
          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <div class="font-bold text-slate-900 dark:text-white">Business Logic Explanation:</div>
            <p class="leading-relaxed">${challenge.explanation}</p>
          </div>
        ` : ''}
      </div>
    `;

    // Hook Reorder clicks
    container.querySelectorAll('.move-up-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.index);
        if (idx > 0) {
          const temp = state.challengeCurrentItems[idx];
          state.challengeCurrentItems[idx] = state.challengeCurrentItems[idx - 1];
          state.challengeCurrentItems[idx - 1] = temp;
          state.challengeChecked = false;
          playSound('click');
          renderStepOrdering();
        }
      };
    });

    container.querySelectorAll('.move-down-btn').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.index);
        if (idx < state.challengeCurrentItems.length - 1) {
          const temp = state.challengeCurrentItems[idx];
          state.challengeCurrentItems[idx] = state.challengeCurrentItems[idx + 1];
          state.challengeCurrentItems[idx + 1] = temp;
          state.challengeChecked = false;
          playSound('click');
          renderStepOrdering();
        }
      };
    });

    // Reset / Shuffle
    const resetBtn = document.getElementById('resetOrderBtn');
    if (resetBtn) {
      resetBtn.onclick = () => {
        initCurrentChallenge();
        state.challengeChecked = false;
        playSound('flip');
        renderStepOrdering();
      };
    }

    // Validate
    const validateBtn = document.getElementById('validateOrderBtn');
    if (validateBtn) {
      validateBtn.onclick = () => {
        state.challengeChecked = true;
        let allCorrect = true;
        state.challengeCurrentItems.forEach((item, idx) => {
          if (item.stepNum !== (idx + 1)) allCorrect = false;
        });

        if (allCorrect) {
          playSound('success');
          alert('🎉 Flawless Execution! All steps are ordered in 100% correct business sequence.');
        } else {
          playSound('error');
        }
        renderStepOrdering();
      };
    }
  }

  function initCurrentChallenge() {
    const challenge = window.STEP_ORDERING_DATA.find(c => c.id === state.activeChallengeId) || window.STEP_ORDERING_DATA[0];
    // Copy and shuffle
    const shuffled = [...challenge.correctOrder].sort(() => Math.random() - 0.5);
    state.challengeCurrentItems = shuffled;
    state.challengeChecked = false;
  }

  // ==========================================
  // VIEW 7: MOCK EXAM ENGINE
  // ==========================================
  function renderMockExam() {
    const container = document.getElementById('mockExamContainer');
    if (!container) return;

    const allQuestions = window.MOCK_EXAM_DATA;
    const filteredQuestions = state.examFilter === 'all'
      ? allQuestions
      : allQuestions.filter(q => q.category.toLowerCase().includes(state.examFilter.toLowerCase()));

    if (state.examCurrentIndex >= filteredQuestions.length) state.examCurrentIndex = 0;
    const currentQ = filteredQuestions[state.examCurrentIndex] || filteredQuestions[0];

    // Calculate score if submitted
    let correctCount = 0;
    filteredQuestions.forEach(q => {
      if (state.userAnswers[q.id] === q.correctIndex) correctCount++;
    });
    const scorePct = Math.round((correctCount / filteredQuestions.length) * 100);

    // Letter grade
    let letterGrade = 'F';
    if (scorePct >= 90) letterGrade = 'A+';
    else if (scorePct >= 85) letterGrade = 'A';
    else if (scorePct >= 80) letterGrade = 'B+';
    else if (scorePct >= 70) letterGrade = 'B';
    else if (scorePct >= 60) letterGrade = 'C';

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Exam Top Stats Bar -->
        <div class="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <div class="text-xs uppercase font-bold tracking-wider text-slate-400">IS091IU Midterm Examination Simulation</div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white mt-0.5">Comprehensive Question Bank (${filteredQuestions.length} Questions)</h2>
          </div>
          
          <div class="flex items-center gap-4">
            <!-- Timer Display -->
            <div class="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 font-mono font-bold text-sm flex items-center gap-2">
              <span>⏱️</span>
              <span id="examTimerDisplay">${formatTime(state.examTimeRemaining)}</span>
            </div>

            <!-- Submit Exam Button -->
            ${!state.examSubmitted ? `
              <button id="submitExamBtn" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all">
                Submit & Grade Exam
              </button>
            ` : `
              <button id="retakeExamBtn" class="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow-md transition-all">
                Retake Exam
              </button>
            `}
          </div>
        </div>

        ${state.examSubmitted ? `
          <!-- Score Summary Banner -->
          <div class="p-6 rounded-2xl bg-gradient-to-r ${scorePct >= 85 ? 'from-emerald-600 to-teal-700' : 'from-blue-600 to-indigo-700'} text-white shadow-lg flex flex-wrap items-center justify-between gap-6">
            <div>
              <div class="text-xs uppercase font-bold tracking-wider text-white/80">Exam Results Certified</div>
              <div class="text-4xl font-extrabold mt-1">Score: ${correctCount} / ${filteredQuestions.length} (${scorePct}%)</div>
              <div class="text-sm text-white/90 mt-1">${scorePct >= 85 ? '🏆 Outstanding Mastery! You are performing at an A+ honor grade.' : 'Good effort! Review the missed questions below to achieve an A+.'}</div>
            </div>
            <div class="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur flex flex-col items-center justify-center font-extrabold text-4xl border border-white/30">
              ${letterGrade}
              <span class="text-[10px] uppercase font-bold tracking-wider opacity-80">Grade</span>
            </div>
          </div>
        ` : ''}

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Question Palette (1..45 grid) -->
          <div class="lg:col-span-1 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div class="text-xs font-bold uppercase tracking-wider text-slate-400">Question Navigator</div>
            <div class="grid grid-cols-5 gap-1.5 max-h-[360px] overflow-y-auto p-1">
              ${filteredQuestions.map((q, idx) => {
                const isAnswered = state.userAnswers[q.id] !== undefined;
                const isCurrent = idx === state.examCurrentIndex;
                const isCorrect = state.examSubmitted && state.userAnswers[q.id] === q.correctIndex;
                const isWrong = state.examSubmitted && state.userAnswers[q.id] !== q.correctIndex && isAnswered;

                return `
                  <button class="exam-palette-btn w-full aspect-square rounded-lg text-xs font-bold transition-all border ${
                    isCurrent 
                      ? 'ring-2 ring-blue-500 scale-105 z-10' 
                      : ''
                  } ${
                    state.examSubmitted 
                      ? isCorrect 
                        ? 'bg-emerald-500 text-white border-emerald-600' 
                        : isWrong 
                          ? 'bg-rose-500 text-white border-rose-600' 
                          : 'bg-slate-200 text-slate-500 border-slate-300'
                      : isAnswered 
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border-blue-300' 
                        : 'bg-slate-50 dark:bg-slate-750 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }" data-index="${idx}">
                    ${idx + 1}
                  </button>
                `;
              }).join('')}
            </div>
            <div class="pt-2 border-t border-slate-100 dark:border-slate-700 text-[11px] text-slate-500 space-y-1">
              <div>Answered: <strong>${Object.keys(state.userAnswers).length}</strong> / ${filteredQuestions.length}</div>
            </div>
          </div>

          <!-- Main Question Card Area -->
          <div class="lg:col-span-3 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 text-xs">
              <span class="px-2.5 py-1 rounded-full font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">Question ${state.examCurrentIndex + 1} of ${filteredQuestions.length}</span>
              <span class="text-slate-400 font-semibold">${currentQ.category}</span>
            </div>

            <h3 class="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
              ${applyPersonalization(currentQ.question)}
            </h3>

            <!-- 4 Options -->
            <div class="space-y-3">
              ${currentQ.options.map((opt, optIdx) => {
                const isSelected = state.userAnswers[currentQ.id] === optIdx;
                const isCorrectOption = optIdx === currentQ.correctIndex;
                let optionClasses = 'bg-slate-50 dark:bg-slate-750 border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-800 dark:text-slate-200';

                if (state.examSubmitted) {
                  if (isCorrectOption) {
                    optionClasses = 'bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                  } else if (isSelected && !isCorrectOption) {
                    optionClasses = 'bg-rose-50 dark:bg-rose-950/30 border-2 border-rose-500 text-rose-900 dark:text-rose-200 line-through';
                  } else {
                    optionClasses = 'opacity-40 border-slate-200 text-slate-400';
                  }
                } else if (isSelected) {
                  optionClasses = 'bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-600 text-blue-900 dark:text-blue-200 font-bold';
                }

                return `
                  <button class="exam-option-btn w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${optionClasses}" data-q-id="${currentQ.id}" data-opt-idx="${optIdx}" ${state.examSubmitted ? 'disabled' : ''}>
                    <span class="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold mt-0.5 ${
                      isSelected ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-400 text-slate-600 dark:text-slate-400'
                    }">
                      ${['A', 'B', 'C', 'D'][optIdx]}
                    </span>
                    <span class="text-sm leading-relaxed">${applyPersonalization(opt)}</span>
                  </button>
                `;
              }).join('')}
            </div>

            <!-- Explanation Box (Appears after submission) -->
            ${state.examSubmitted ? `
              <div class="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <div class="font-bold text-blue-900 dark:text-blue-300">Comprehensive Rationale & Explanation:</div>
                <p class="leading-relaxed">${applyPersonalization(currentQ.explanation)}</p>
              </div>
            ` : ''}

            <!-- Prev / Next Question Nav -->
            <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
              <button id="examPrevQ" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700" ${state.examCurrentIndex === 0 ? 'disabled style="opacity:0.3"' : ''}>&larr; Previous Question</button>
              <button id="examNextQ" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold" ${state.examCurrentIndex === filteredQuestions.length - 1 ? 'disabled style="opacity:0.3"' : ''}>Next Question &rarr;</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Palette click
    container.querySelectorAll('.exam-palette-btn').forEach(btn => {
      btn.onclick = () => {
        state.examCurrentIndex = parseInt(btn.dataset.index);
        playSound('click');
        renderMockExam();
      };
    });

    // Option click
    container.querySelectorAll('.exam-option-btn').forEach(btn => {
      btn.onclick = () => {
        if (state.examSubmitted) return;
        const qId = parseInt(btn.dataset.qId);
        const optIdx = parseInt(btn.dataset.optIdx);
        state.userAnswers[qId] = optIdx;
        playSound('click');
        renderMockExam();
      };
    });

    // Nav buttons
    const prevQ = document.getElementById('examPrevQ');
    const nextQ = document.getElementById('examNextQ');
    if (prevQ) prevQ.onclick = () => {
      if (state.examCurrentIndex > 0) {
        state.examCurrentIndex--;
        playSound('click');
        renderMockExam();
      }
    };
    if (nextQ) nextQ.onclick = () => {
      if (state.examCurrentIndex < filteredQuestions.length - 1) {
        state.examCurrentIndex++;
        playSound('click');
        renderMockExam();
      }
    };

    // Submit Exam
    const submitBtn = document.getElementById('submitExamBtn');
    if (submitBtn) {
      submitBtn.onclick = () => {
        const answeredCount = Object.keys(state.userAnswers).length;
        if (answeredCount < filteredQuestions.length) {
          if (!confirm(`You have answered ${answeredCount} of ${filteredQuestions.length} questions. Are you sure you want to submit and grade now?`)) {
            return;
          }
        }
        state.examSubmitted = true;
        if (state.examTimerInterval) clearInterval(state.examTimerInterval);
        playSound('success');
        renderMockExam();
      };
    }

    // Retake Exam
    const retakeBtn = document.getElementById('retakeExamBtn');
    if (retakeBtn) {
      retakeBtn.onclick = () => {
        state.examSubmitted = false;
        state.userAnswers = {};
        state.examCurrentIndex = 0;
        state.examTimeRemaining = 45 * 60;
        startExamTimer();
        playSound('flip');
        renderMockExam();
      };
    }
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function startExamTimer() {
    if (state.examTimerInterval) clearInterval(state.examTimerInterval);
    state.examTimerInterval = setInterval(() => {
      if (state.examSubmitted) {
        clearInterval(state.examTimerInterval);
        return;
      }
      if (state.examTimeRemaining > 0) {
        state.examTimeRemaining--;
        const el = document.getElementById('examTimerDisplay');
        if (el) el.textContent = formatTime(state.examTimeRemaining);
      } else {
        clearInterval(state.examTimerInterval);
        state.examSubmitted = true;
        playSound('error');
        alert('⏱️ Time is up! Your exam has been automatically submitted for grading.');
        renderMockExam();
      }
    }, 1000);
  }
  startExamTimer();

  // ==========================================
  // GLOBAL SEARCH & ROUTING DISPATCHER
  // ==========================================
  function renderCurrentView() {
    if (state.currentTab === 'roadmap') renderRoadmap();
    else if (state.currentTab === 'sd-case-study') renderSdCaseStudy();
    else if (state.currentTab === 'mm-case-study') renderMmCaseStudy();
    else if (state.currentTab === 'fi-module') renderFiModule();
    else if (state.currentTab === 'flashcards') renderFlashcards();
    else if (state.currentTab === 'step-ordering') renderStepOrdering();
    else if (state.currentTab === 'mock-exam') renderMockExam();

    updateGlobalProgress();
  }

  function updateGlobalProgress() {
    const pill = document.getElementById('globalProgressPill');
    if (!pill) return;
    const totalLessons = window.ROADMAP_DATA.reduce((acc, lvl) => acc + lvl.lessons.length, 0);
    const completed = state.completedLessons.length;
    const pct = Math.round((completed / totalLessons) * 100);
    pill.textContent = `Progress: ${pct}% (${completed}/${totalLessons} Lessons)`;
  }

  // Global Search functionality
  if (globalSearchInput) {
    globalSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.toLowerCase().trim();
        if (!query) return;
        
        // Search across T-codes, SD steps, MM steps, and questions
        const matchedSd = window.SD_CASE_STUDY_STEPS.find(s => 
          s.title.toLowerCase().includes(query) || s.tcode.toLowerCase().includes(query) || s.purpose.toLowerCase().includes(query)
        );
        const matchedMm = window.MM_CASE_STUDY_STEPS.find(s => 
          s.title.toLowerCase().includes(query) || s.tcode.toLowerCase().includes(query) || s.purpose.toLowerCase().includes(query)
        );

        if (matchedSd) {
          state.currentSdStep = matchedSd.step;
          switchTab('sd-case-study');
        } else if (matchedMm) {
          state.currentMmStep = matchedMm.step;
          switchTab('mm-case-study');
        } else {
          switchTab('mock-exam');
        }
      }
    });
  }

  // Initial load with hash routing support
  const validTabs = ['roadmap', 'sd-case-study', 'mm-case-study', 'fi-module', 'fi-accounting', 'financial-statements', 'balance-sheet', 'income-statement', 'flashcards', 'step-ordering', 'mock-exam'];
  function normalizeTab(t) {
    if (['fi-accounting', 'financial-statements', 'balance-sheet', 'income-statement'].includes(t)) {
      return 'fi-module';
    }
    return t;
  }
  const hash = window.location.hash.replace('#', '');
  if (hash && validTabs.includes(hash)) {
    switchTab(normalizeTab(hash));
  } else {
    renderCurrentView();
  }

  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '');
    if (newHash && validTabs.includes(newHash) && state.currentTab !== newHash) {
      switchTab(normalizeTab(newHash));
    }
  });
});

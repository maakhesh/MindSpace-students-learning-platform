document.addEventListener('DOMContentLoaded', () => {
    
    // --- STATE INITIALIZATION ---
    let currentUser = Storage.getUser();
    
    // --- DOM ELEMENTS ---
    const authScreen = document.getElementById('auth-screen');
    const mainLayout = document.getElementById('main-layout');
    
    // Auth Views
    const viewLogin = document.getElementById('view-login');
    const viewRegister = document.getElementById('view-register');
    const viewFirstLogin = document.getElementById('view-first-login');
    
    // App Init
    function initApp() {
        if (!currentUser) {
            showAuthScreen('login');
        } else if (!currentUser.roadmapAssigned) {
            showAuthScreen('first-login');
        } else {
            showMainPlatform();
        }
    }

    // --- AUTHENTICATION LOGIC ---
    function showAuthScreen(viewId) {
        authScreen.style.display = 'flex';
        mainLayout.style.display = 'none';
        
        document.querySelectorAll('.auth-view').forEach(el => el.classList.remove('active'));
        document.getElementById(`view-${viewId}`).classList.add('active');
    }

    function showMainPlatform() {
        authScreen.style.display = 'none';
        mainLayout.style.display = 'flex';
        
        // Init UI Data
        document.getElementById('nav-profile-name').innerText = currentUser.name || "Student";
        document.getElementById('nav-profile-role').innerText = currentUser.careerGoal || "Learner";
        document.getElementById('nav-profile-avatar').innerText = (currentUser.name || "S").charAt(0).toUpperCase();
        
        Storage.updateStreak();
        updateTopStats();
        
        // Render initial view
        switchView('dashboard');
        
        // Render dynamic content
        renderCourses();
        renderRoadmap();
        renderDSA();
        renderTodos();
    }

    // Auth Forms
    document.getElementById('form-login').addEventListener('submit', (e) => {
        e.preventDefault();
        // Mock Login
        currentUser = { email: document.getElementById('login-email').value, name: "Alex" };
        Storage.setUser(currentUser);
        initApp();
    });

    document.getElementById('form-register').addEventListener('submit', (e) => {
        e.preventDefault();
        // Mock Register
        currentUser = { email: document.getElementById('reg-email').value, name: document.getElementById('reg-name').value };
        Storage.setUser(currentUser);
        initApp(); // Should go to first login
    });

    document.getElementById('form-first-login').addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser.college = document.getElementById('fl-college').value;
        currentUser.branch = document.getElementById('fl-branch').value;
        currentUser.year = document.getElementById('fl-year').value;
        currentUser.careerGoal = document.getElementById('fl-goal').value; // e.g. "Software Engineer"
        currentUser.roadmapAssigned = true;
        
        Storage.setUser(currentUser);
        initApp();
    });

    document.getElementById('btn-to-register').addEventListener('click', () => showAuthScreen('register'));
    document.getElementById('btn-to-login').addEventListener('click', () => showAuthScreen('login'));
    document.getElementById('btn-logout').addEventListener('click', () => {
        Storage.clearUser();
        currentUser = null;
        initApp();
    });

    // --- NAVIGATION LOGIC ---
    const navLinks = document.querySelectorAll('.nav-link');
    const viewSections = document.querySelectorAll('.view-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetView = link.getAttribute('data-view');
            switchView(targetView);
        });
    });

    function switchView(viewId) {
        navLinks.forEach(l => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-view="${viewId}"]`);
        if(activeLink) activeLink.classList.add('active');

        viewSections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(`view-${viewId}`);
        if(targetSection) targetSection.classList.add('active');

        if(viewId === 'profile') renderProfilePage();
        if(viewId === 'analytics') renderAnalyticsPage();
    }

    // --- DASHBOARD UPDATES ---
    function updateTopStats() {
        const stats = Storage.getStats();
        
        // Update all stat badges
        document.querySelectorAll('.stat-xp').forEach(el => el.innerText = stats.xp);
        document.querySelectorAll('.stat-level').forEach(el => el.innerText = stats.level);
        document.querySelectorAll('.stat-streak').forEach(el => el.innerText = `${stats.streak} Days`);
        
        const xpProgress = (stats.xp % 500) / 500 * 100; // 500 xp per level
        const pb = document.getElementById('dash-xp-progress');
        if(pb) pb.style.width = `${xpProgress}%`;
    }

    // --- RENDER COURSES ---
    function renderCourses() {
        const grid = document.getElementById('course-grid');
        if(!grid) return;
        
        grid.innerHTML = '';
        const stats = Storage.getStats();
        const unlocked = Storage.getUnlockedCourses();

        CourseData.catalog.forEach(course => {
            const isUnlocked = unlocked.includes(course.id) || (course.price === 0 && course.streakReq === 0);
            
            let actionBtn = '';
            let tag = '';
            
            if (isUnlocked) {
                actionBtn = `<button class="btn-primary w-100 mt-4" onclick="openCourse('${course.id}')">Start Learning</button>`;
                tag = `<span class="tag free">Unlocked</span>`;
            } else if (stats.streak >= course.streakReq && course.streakReq > 0) {
                actionBtn = `<button class="btn-primary w-100 mt-4" onclick="unlockCourseAction('${course.id}')">Unlock with Streak</button>`;
                tag = `<span class="tag free">Streak Achieved</span>`;
            } else {
                actionBtn = `<button class="btn-secondary w-100 mt-4" onclick="buyCourseAction('${course.id}', ${course.price})">Buy ₹${course.price}</button>`;
                tag = `<span class="tag premium">Req: ${course.streakReq} Day Streak</span>`;
            }

            grid.innerHTML += `
                <div class="card course-card">
                    <div class="flex-between">
                        <div class="course-icon">${course.icon}</div>
                        <div class="course-tags">${tag}</div>
                    </div>
                    <h3>${course.title}</h3>
                    <p style="flex: 1;">${course.desc}</p>
                    <div class="flex-between mt-4">
                        <span class="tag">${course.difficulty}</span>
                        <span class="tag">${course.category}</span>
                    </div>
                    ${actionBtn}
                </div>
            `;
        });
    }

    window.openCourse = (id) => {
        const course = CourseData.catalog.find(c => c.id === id);
        if(!course) return;

        document.getElementById('video-course-title').innerText = course.title;
        document.getElementById('video-course-category').innerText = course.category;
        
        // Inject modules
        const modContainer = document.getElementById('video-modules-container');
        modContainer.innerHTML = '';
        course.modules.forEach(mod => {
            modContainer.innerHTML += `<div class="module-item">${mod}</div>`;
        });

        // Set youtube iframe if it exists
        const iframe = document.getElementById('youtube-iframe');
        if(course.youtubeId) {
            iframe.src = `https://www.youtube.com/embed/${course.youtubeId}?autoplay=1`;
        } else {
            iframe.src = "";
        }

        document.getElementById('video-modal').classList.add('active');
    };

    document.getElementById('close-video-modal').addEventListener('click', () => {
        document.getElementById('video-modal').classList.remove('active');
        document.getElementById('youtube-iframe').src = ""; // Stop video
    });

    window.unlockCourseAction = (id) => {
        Storage.unlockCourse(id);
        renderCourses();
        alert("Course Unlocked Successfully using Streak!");
    };

    window.buyCourseAction = (id, price) => {
        const confirmed = confirm(`Proceed to pay ₹${price} for this course?`);
        if (confirmed) {
            Storage.unlockCourse(id);
            renderCourses();
            alert("Payment successful! Course Unlocked.");
        }
    };

    // --- RENDER ROADMAP ---
    function renderRoadmap() {
        const container = document.getElementById('roadmap-timeline-container');
        if(!container) return;
        
        const goal = currentUser.careerGoal; // e.g. 'Software Engineer'
        const roadmapData = CourseData.roadmaps[goal] || CourseData.roadmaps['Software Engineer'];
        
        document.getElementById('active-roadmap-title').innerText = goal + " Roadmap";
        
        const progress = Storage.getRoadmapProgress();
        container.innerHTML = '';
        
        roadmapData.forEach(step => {
            const isDone = progress.includes(step.id);
            container.innerHTML += `
                <div class="roadmap-item ${isDone ? 'completed' : ''}">
                    <h3>${step.title}</h3>
                    <p>${step.desc}</p>
                    ${!isDone ? `<button class="btn-secondary mt-4" onclick="completeRoadmapStep('${step.id}')">Mark Complete (+50 XP)</button>` : '<p class="color-green mt-4">✓ Completed</p>'}
                </div>
            `;
        });
    }

    window.completeRoadmapStep = (id) => {
        Storage.markRoadmapStepComplete(id);
        renderRoadmap();
        updateTopStats();
    };

    // --- RENDER DSA ---
    function renderDSA() {
        const grid = document.getElementById('dsa-grid');
        if(!grid) return;
        
        const completed = Storage.getCompletedDSA();
        grid.innerHTML = '';
        
        CourseData.dsaTopics.forEach(topic => {
            const isDone = completed.includes(topic.id);
            
            grid.innerHTML += `
                <div class="card ${isDone ? 'border-green' : ''}">
                    <h3>${topic.title}</h3>
                    <p class="mt-4">${topic.notes}</p>
                    <div class="mt-4">
                        <strong style="color: var(--text-secondary); font-size: 0.9rem;">Practice Problems:</strong>
                        <ul style="margin-left: 20px; color: var(--text-secondary); font-size: 0.9rem;">
                            ${topic.problems.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                    ${!isDone 
                        ? `<button class="btn-secondary mt-4 w-100" onclick="startDSA('${topic.id}')">Let's Practice</button>`
                        : `<button class="btn-primary mt-4 w-100" disabled>✓ Completed</button>`
                    }
                </div>
            `;
        });
    }

    window.startDSA = (topicId) => {
        // Switch to compiler view and set topic
        document.getElementById('compiler-topic-focus').innerText = `Focus: ${topicId}`;
        window.currentCompilerTopic = topicId;
        switchView('compiler');
    };

    // --- COMPILER MOCK ---
    const compilerRunBtn = document.getElementById('btn-run-code');
    if(compilerRunBtn) {
        compilerRunBtn.addEventListener('click', () => {
            const output = document.getElementById('compiler-output');
            output.innerText = "Running tests...\n";
            setTimeout(() => {
                output.innerText += "Test Case 1: PASS\nTest Case 2: PASS\nTest Case 3: PASS\n\nAll test cases passed! +100 XP";
                if(window.currentCompilerTopic) {
                    Storage.completeDSA(window.currentCompilerTopic);
                    renderDSA();
                } else {
                    Storage.addXP(100);
                    Storage.updateStreak();
                }
                updateTopStats();
            }, 1000);
        });
    }

    // --- AI HELPER MOCK ---
    const aiForm = document.getElementById('ai-chat-form');
    if (aiForm) {
        aiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = document.getElementById('ai-chat-input');
            const val = input.value;
            if(!val.trim()) return;

            const chatBox = document.getElementById('ai-messages');
            chatBox.innerHTML += `<div class="chat-msg user">${val}</div>`;
            input.value = '';

            setTimeout(() => {
                chatBox.innerHTML += `<div class="chat-msg bot">Based on your query regarding "${val}", I highly recommend reviewing our ${currentUser.careerGoal} roadmap and practicing the DSA Array modules. Let me know if you need code snippets!</div>`;
                chatBox.scrollTop = chatBox.scrollHeight;
            }, 800);
        });
    }

    // --- TODO LIST ---
    const todoForm = document.getElementById('todo-form');
    if (todoForm) {
        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = document.getElementById('todo-input').value;
            if(!val.trim()) return;

            const todos = Storage.getTodos();
            todos.push({ id: Date.now(), text: val, done: false });
            Storage.setTodos(todos);
            document.getElementById('todo-input').value = '';
            renderTodos();
        });
    }

    function renderTodos() {
        const list = document.getElementById('todo-list');
        if(!list) return;

        const todos = Storage.getTodos();
        list.innerHTML = '';
        todos.forEach(todo => {
            list.innerHTML += `
                <div class="card flex-between mb-4" style="padding: 16px;">
                    <div style="display: flex; gap: 12px; align-items: center;">
                        <input type="checkbox" ${todo.done ? 'checked' : ''} onchange="toggleTodo(${todo.id})" style="width: 18px; height: 18px; accent-color: var(--accent-green);">
                        <span style="text-decoration: ${todo.done ? 'line-through' : 'none'}; color: ${todo.done ? 'var(--text-secondary)' : 'var(--text-primary)'}">${todo.text}</span>
                    </div>
                    <button class="btn-secondary" style="padding: 6px 12px; border-color: #ef4444; color: #ef4444;" onclick="deleteTodo(${todo.id})">Delete</button>
                </div>
            `;
        });
    }

    window.toggleTodo = (id) => {
        const todos = Storage.getTodos();
        const t = todos.find(x => x.id === id);
        if(t) { t.done = !t.done; Storage.setTodos(todos); renderTodos(); }
    };
    
    window.deleteTodo = (id) => {
        let todos = Storage.getTodos();
        todos = todos.filter(x => x.id !== id);
        Storage.setTodos(todos);
        renderTodos();
    };

    // --- POMODORO TIMER ---
    let pomoInterval;
    let pomoTime = 25 * 60;
    const pomoDisplay = document.getElementById('pomo-display');
    
    function updatePomoDisplay() {
        const m = Math.floor(pomoTime / 60).toString().padStart(2, '0');
        const s = (pomoTime % 60).toString().padStart(2, '0');
        if(pomoDisplay) pomoDisplay.innerText = `${m}:${s}`;
    }

    const btnPomoStart = document.getElementById('btn-pomo-start');
    if (btnPomoStart) {
        btnPomoStart.addEventListener('click', () => {
            if (pomoInterval) {
                clearInterval(pomoInterval);
                pomoInterval = null;
                btnPomoStart.innerText = "Start";
            } else {
                btnPomoStart.innerText = "Pause";
                pomoInterval = setInterval(() => {
                    if (pomoTime > 0) {
                        pomoTime--;
                        updatePomoDisplay();
                    } else {
                        clearInterval(pomoInterval);
                        alert("Pomodoro session complete! +20 XP");
                        Storage.addXP(20);
                        updateTopStats();
                        btnPomoStart.innerText = "Start";
                    }
                }, 1000);
            }
        });
    }
    
    const btnPomoReset = document.getElementById('btn-pomo-reset');
    if (btnPomoReset) {
        btnPomoReset.addEventListener('click', () => {
            clearInterval(pomoInterval);
            pomoInterval = null;
            if(btnPomoStart) btnPomoStart.innerText = "Start";
            pomoTime = parseInt(document.getElementById('pomo-custom-time').value) * 60;
            updatePomoDisplay();
        });
    }

    // --- EXPERT GUIDANCE ---
    const expertForm = document.getElementById('form-expert');
    if(expertForm) {
        expertForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Booking confirmed for ₹99! We will email you the meeting link shortly.");
            expertForm.reset();
        });
    }

    // --- PROFILE & ANALYTICS ---
    function renderProfilePage() {
        const stats = Storage.getStats();
        document.getElementById('prof-name').innerText = currentUser.name;
        document.getElementById('prof-goal').innerText = currentUser.careerGoal;
        document.getElementById('prof-college').innerText = currentUser.college;
        
        document.getElementById('prof-level').innerText = stats.level;
        document.getElementById('prof-xp').innerText = stats.xp;
        document.getElementById('prof-streak').innerText = stats.streak;
        document.getElementById('prof-long-streak').innerText = stats.longestStreak;
    }
    
    function renderAnalyticsPage() {
        const stats = Storage.getStats();
        const unlocked = Storage.getUnlockedCourses().length;
        const completedDsa = Storage.getCompletedDSA().length;
        
        document.getElementById('stat-total-xp').innerText = stats.xp;
        document.getElementById('stat-courses-unlocked').innerText = unlocked;
        document.getElementById('stat-dsa-solved').innerText = completedDsa;
        
        // Mock Chart height adjustments
        document.getElementById('bar-mon').style.height = '40%';
        document.getElementById('bar-tue').style.height = '70%';
        document.getElementById('bar-wed').style.height = '100%';
        document.getElementById('bar-thu').style.height = '60%';
        document.getElementById('bar-fri').style.height = '80%';
    }

    // BOOT
    initApp();
});

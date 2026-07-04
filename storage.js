const Storage = {
    getUser: () => JSON.parse(localStorage.getItem('mindspace_user')) || null,
    setUser: (user) => localStorage.setItem('mindspace_user', JSON.stringify(user)),
    clearUser: () => localStorage.removeItem('mindspace_user'),

    getStats: () => {
        const defaultStats = { xp: 0, level: 1, streak: 0, longestStreak: 0, lastActiveDate: null };
        return JSON.parse(localStorage.getItem('mindspace_stats')) || defaultStats;
    },
    setStats: (stats) => localStorage.setItem('mindspace_stats', JSON.stringify(stats)),

    updateStreak: () => {
        const stats = Storage.getStats();
        const today = new Date().toISOString().split('T')[0];
        
        if (stats.lastActiveDate === today) return; // Already updated today

        if (stats.lastActiveDate) {
            const lastDate = new Date(stats.lastActiveDate);
            const currentDate = new Date(today);
            const diffTime = Math.abs(currentDate - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (diffDays === 1) {
                stats.streak += 1;
            } else {
                stats.streak = 1; // Reset streak
            }
        } else {
            stats.streak = 1;
        }

        stats.lastActiveDate = today;
        if (stats.streak > stats.longestStreak) {
            stats.longestStreak = stats.streak;
        }
        Storage.setStats(stats);
    },

    addXP: (amount) => {
        const stats = Storage.getStats();
        stats.xp += amount;
        
        // Calculate level (e.g., Level = 1 + floor(XP / 500))
        let newLevel = 1 + Math.floor(stats.xp / 500);
        if (newLevel > 100) newLevel = 100; // Max level 100
        
        if (newLevel > stats.level) {
            // Level up event
            stats.level = newLevel;
            setTimeout(() => alert(`🎉 Congratulations! You reached Level ${newLevel}!`), 100);
        }
        
        Storage.setStats(stats);
    },

    getTodos: () => JSON.parse(localStorage.getItem('mindspace_todos')) || [],
    setTodos: (todos) => localStorage.setItem('mindspace_todos', JSON.stringify(todos)),

    getUnlockedCourses: () => JSON.parse(localStorage.getItem('mindspace_unlocked_courses')) || [],
    unlockCourse: (courseId) => {
        const unlocked = Storage.getUnlockedCourses();
        if (!unlocked.includes(courseId)) {
            unlocked.push(courseId);
            localStorage.setItem('mindspace_unlocked_courses', JSON.stringify(unlocked));
        }
    },

    getCompletedDSA: () => JSON.parse(localStorage.getItem('mindspace_completed_dsa')) || [],
    completeDSA: (topicId) => {
        const completed = Storage.getCompletedDSA();
        if (!completed.includes(topicId)) {
            completed.push(topicId);
            localStorage.setItem('mindspace_completed_dsa', JSON.stringify(completed));
            Storage.addXP(100);
            Storage.updateStreak();
        }
    },
    
    getRoadmapProgress: () => JSON.parse(localStorage.getItem('mindspace_roadmap_progress')) || [],
    markRoadmapStepComplete: (stepId) => {
        const progress = Storage.getRoadmapProgress();
        if (!progress.includes(stepId)) {
            progress.push(stepId);
            localStorage.setItem('mindspace_roadmap_progress', JSON.stringify(progress));
            Storage.addXP(50);
        }
    }
};

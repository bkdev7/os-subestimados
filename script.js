// Os Subestimados Gaming Studio - Debate Strategy Dashboard

// Dados estratégicos para o debate
const debateData = {
    preparation_status: 100,
    arguments_count: 15,
    replies_count: 50,
    confidence_level: "∞",
    evidence_bank: {
        platform_users: {
            steam: 132000000,
            playstation: 108000000,
            xbox: 120000000,
            total: 360000000
        },
        our_downloads: 2847392,
        market_percentage: 0.78,
        roi_data: {
            steam: { investment: 200000, return: 3400000, roi: 1700 },
            playstation: { investment: 150000, return: 2400000, roi: 1600 },
            xbox: { investment: 100000, return: 1800000, roi: 1800 },
            average_roi: 1700
        },
        competitor_games: [
            { name: "Phasmophobia", downloads: "10M", timeframe: "3 meses" },
            { name: "Among Us", downloads: "500M", timeframe: "4 meses" },
            { name: "Fall Guys", downloads: "100M", timeframe: "2 meses" },
            { name: "Nosso jogo", downloads: "2.8M", timeframe: "2 meses", highlight: true }
        ]
    },
    battle_quotes: [
        "🎯 Preparação é a chave da vitória!",
        "⚔️ Argumentos afiados, evidências sólidas!",
        "🛡️ Defesa impenetrável, ataque preciso!",
        "🏆 Os Subestimados sempre entregam!",
        "🎮 Gaming digital, realidade diferente!",
        "📊 Dados não mentem, números não falham!"
    ]
};

// Estratégias por fase do debate
const debateStrategies = {
    opening: {
        duration: "5 minutos",
        key_points: [
            "Apresentação respeitosa da equipe",
            "Esclarecimento: não somos concorrentes",
            "Dados de alcance multiplataforma",
            "Timing estratégico (Halloween)",
            "Comparação com mercado indie"
        ]
    },
    replies: {
        duration: "2-5 minutos",
        quick_responses: {
            "números_irreais": "Matemática simples: 0.78% de 360M usuários",
            "somos_concorrentes": "Setores diferentes: entretenimento vs alimentício",
            "roi_impossível": "Economia digital: 70% margem, escala global"
        }
    },
    closing: {
        duration: "2-5 minutos",
        strategy: "Reconhecimento + Parceria + Vitória respeitosa"
    }
};

// Variáveis globais
let debateTimer = null;
let currentPhase = 'preparation';
let battleMode = false;

// Inicialização do Dashboard
function initializeDebateDashboard() {
    console.log('⚔️ Inicializando Dashboard de Estratégia de Debate...');
    
    // Inicializar animações
    initializeScrollAnimations();
    
    // Inicializar cronômetro de debate
    initializeDebateTimer();
    
    // Inicializar efeitos visuais
    initializeBattleEffects();
    
    // Event listeners
    initializeEventListeners();
    
    // Sistema de conquistas
    initializeAchievementSystem();
    
    console.log('✅ Dashboard de batalha pronto para o combate!');
    showBattleToast('⚔️ Sistema de combate online! Os Subestimados prontos para a batalha!', 'battle');
}

// Cronômetro para fases do debate
function initializeDebateTimer() {
    // Criar cronômetro visual se não existir
    const timerContainer = document.createElement('div');
    timerContainer.id = 'debate-timer';
    timerContainer.innerHTML = `
        <div class="timer-display">
            <div class="timer-phase">Preparação</div>
            <div class="timer-time">00:00</div>
            <div class="timer-controls">
                <button onclick="startDebatePhase('opening')" class="timer-btn">🎯 Iniciar (5min)</button>
                <button onclick="startDebatePhase('reply')" class="timer-btn">🛡️ Réplica (3min)</button>
                <button onclick="startDebatePhase('closing')" class="timer-btn">🏆 Fechamento (3min)</button>
                <button onclick="stopDebateTimer()" class="timer-btn stop">⏹️ Parar</button>
            </div>
        </div>
    `;
    
    // Adicionar estilos do cronômetro
    timerContainer.style.cssText = `
        position: fixed;
        top: 80px;
        left: 20px;
        background: rgba(0,0,0,0.9);
        padding: 1rem;
        border-radius: 10px;
        border: 2px solid #b71c1c;
        z-index: 9999;
        font-family: 'Orbitron', monospace;
        color: white;
        min-width: 250px;
        display: none;
    `;
    
    document.body.appendChild(timerContainer);
}

function startDebatePhase(phase) {
    const durations = {
        'opening': 5 * 60, // 5 minutos
        'reply': 3 * 60,   // 3 minutos  
        'closing': 3 * 60  // 3 minutos
    };
    
    const phaseNames = {
        'opening': 'Argumentos Iniciais',
        'reply': 'Réplica',
        'closing': 'Fechamento'
    };
    
    let timeLeft = durations[phase];
    currentPhase = phase;
    
    const timerDisplay = document.querySelector('.timer-time');
    const phaseDisplay = document.querySelector('.timer-phase');
    
    if (!timerDisplay || !phaseDisplay) return;
    
    phaseDisplay.textContent = phaseNames[phase];
    
    // Parar cronômetro anterior
    if (debateTimer) {
        clearInterval(debateTimer);
    }
    
    // Iniciar novo cronômetro
    debateTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Alertas de tempo
        if (timeLeft === 60) {
            showBattleToast('⚠️ 1 MINUTO RESTANTE!', 'warning');
        } else if (timeLeft === 30) {
            showBattleToast('🚨 30 SEGUNDOS RESTANTES!', 'error');
        } else if (timeLeft === 0) {
            showBattleToast('⏰ TEMPO ESGOTADO!', 'error');
            stopDebateTimer();
            return;
        }
        
        timeLeft--;
    }, 1000);
    
    showBattleToast(`🎯 ${phaseNames[phase]} iniciado! Tempo: ${Math.floor(timeLeft/60)} minutos`, 'battle');
}

function stopDebateTimer() {
    if (debateTimer) {
        clearInterval(debateTimer);
        debateTimer = null;
    }
    
    const timerDisplay = document.querySelector('.timer-time');
    const phaseDisplay = document.querySelector('.timer-phase');
    
    if (timerDisplay && phaseDisplay) {
        timerDisplay.textContent = '00:00';
        phaseDisplay.textContent = 'Parado';
    }
    
    showBattleToast('⏹️ Cronômetro parado', 'info');
}

function toggleDebateTimer() {
    const timer = document.getElementById('debate-timer');
    if (timer) {
        timer.style.display = timer.style.display === 'none' ? 'block' : 'none';
    }
}

// Efeitos visuais de batalha
function initializeBattleEffects() {
    // Efeito de typing nos textos importantes
    const importantTexts = document.querySelectorAll('.final-line, .closing-speech p:first-child');
    importantTexts.forEach(text => {
        if (text.textContent.length > 50) { // Só para textos longos
            const originalText = text.textContent;
            text.textContent = '';
            let i = 0;
            const typingEffect = setInterval(() => {
                text.textContent += originalText[i];
                i++;
                if (i >= originalText.length) {
                    clearInterval(typingEffect);
                }
            }, 30);
        }
    });
    
    // Efeito de contadores nos stats
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(stat => {
        if (stat.textContent === '∞') return;
        
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        if (numericValue && numericValue < 1000) {
            let current = 0;
            const increment = numericValue / 50;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current) + (finalValue.includes('%') ? '%' : '+');
                }
            }, 30);
        }
    });
}

// Sistema de conquistas para debate
function initializeAchievementSystem() {
    const achievements = {
        'first_argument': {
            name: '🎯 PRIMEIRO ARGUMENTO',
            description: 'Estruturou o primeiro argumento estratégico',
            unlocked: false
        },
        'quick_reply': {
            name: '⚡ RÉPLICA RELÂMPAGO',
            description: 'Preparou uma réplica em menos de 30 segundos',
            unlocked: false
        },
        'evidence_master': {
            name: '📊 MESTRE DAS EVIDÊNCIAS',
            description: 'Consultou todas as evidências disponíveis',
            unlocked: false
        },
        'debate_warrior': {
            name: '⚔️ GUERREIRO DO DEBATE',
            description: 'Completou toda a preparação estratégica',
            unlocked: false
        }
    };
    
    // Verificar conquistas baseado em interações
    let argumentsViewed = 0;
    let evidencesViewed = 0;
    let repliesViewed = 0;
    
    // Observar interações
    document.addEventListener('click', (e) => {
        if (e.target.closest('.argument-card')) {
            argumentsViewed++;
            if (argumentsViewed >= 3 && !achievements.first_argument.unlocked) {
                unlockAchievement('first_argument', achievements);
            }
        }
        
        if (e.target.closest('.reply-card')) {
            repliesViewed++;
            if (repliesViewed >= 5 && !achievements.quick_reply.unlocked) {
                unlockAchievement('quick_reply', achievements);
            }
        }
        
        if (e.target.closest('.evidence-card')) {
            evidencesViewed++;
            if (evidencesViewed >= 4 && !achievements.evidence_master.unlocked) {
                unlockAchievement('evidence_master', achievements);
            }
        }
    });
    
    // Conquista final após tempo navegando
    setTimeout(() => {
        if (!achievements.debate_warrior.unlocked) {
            unlockAchievement('debate_warrior', achievements);
        }
    }, 120000); // 2 minutos
}

function unlockAchievement(id, achievements) {
    achievements[id].unlocked = true;
    const achievement = achievements[id];
    
    showBattleToast(`${achievement.name} DESBLOQUEADO! ${achievement.description}`, 'success', 6000);
    
    // Efeito visual especial
    document.body.style.animation = 'battleGlow 1s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 1000);
}

// Animações de scroll avançadas
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animações específicas por tipo
                if (entry.target.classList.contains('argument-card')) {
                    const isOdd = Array.from(entry.target.parentNode.children).indexOf(entry.target) % 2 === 0;
                    entry.target.classList.add(isOdd ? 'slide-in-left' : 'slide-in-right');
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(
        '.strategy-card, .argument-card, .reply-category, .evidence-card, .closing-card'
    );
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Parallax suave no hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Event Listeners especializados
function initializeEventListeners() {
    // Smooth scroll melhorado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Feedback visual
                target.style.animation = 'battleGlow 2s ease-in-out';
                setTimeout(() => {
                    target.style.animation = '';
                }, 2000);
            }
        });
    });
    
    // Atalhos de teclado para debate
    document.addEventListener('keydown', (e) => {
        // Alt + T = Toggle Timer
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            toggleDebateTimer();
            showBattleToast('⏱️ Cronômetro alternado', 'info');
        }
        
        // Alt + B = Battle Mode
        if (e.altKey && e.key === 'b') {
            e.preventDefault();
            toggleBattleMode();
        }
        
        // Alt + 1,2,3 = Fases rápidas
        if (e.altKey && ['1', '2', '3'].includes(e.key)) {
            e.preventDefault();
            const phases = ['opening', 'reply', 'closing'];
            startDebatePhase(phases[parseInt(e.key) - 1]);
        }
    });
    
    // Click duplo em cards para destacar
    document.querySelectorAll('.strategy-card, .argument-card, .reply-card').forEach(card => {
        card.addEventListener('dblclick', () => {
            card.classList.toggle('highlighted');
            card.style.border = card.classList.contains('highlighted') 
                ? '3px solid #ffd700' 
                : '';
            
            if (card.classList.contains('highlighted')) {
                showBattleToast('⭐ Card destacado para referência rápida!', 'info');
            }
        });
    });
    
    // Scroll effects no header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('scrolled', window.pageYOffset > 100);
        }
    });
}

function toggleBattleMode() {
    battleMode = !battleMode;
    document.body.classList.toggle('battle-mode', battleMode);
    
    if (battleMode) {
        showBattleToast('⚔️ MODO BATALHA ATIVADO! Preparados para dominar!', 'battle');
        // Adicionar efeitos especiais
        document.body.style.filter = 'contrast(1.1) saturate(1.2)';
    } else {
        showBattleToast('🕊️ Modo normal restaurado', 'info');
        document.body.style.filter = '';
    }
}

// Exportar guia completo de debate
function exportDebateGuide() {
    try {
        const guideData = {
            timestamp: new Date().toISOString(),
            title: "Os Subestimados - Guia Completo de Debate",
            estrategia_principal: "Setores diferentes, realidades diferentes",
            
            argumentos_iniciais: {
                tempo: "5 minutos",
                estrutura: [
                    "0-1min: Apresentação respeitosa",
                    "1-2min: Esclarecimento sobre setores",
                    "2-3min: Dados de alcance multiplataforma", 
                    "3-4min: Timing estratégico (Halloween)",
                    "4-5min: Comparação com mercado indie"
                ]
            },
            
            arsenal_de_replicas: {
                numeros_irreais: {
                    rapida: "Matemática simples: 0.78% de 360M usuários",
                    detalhada: "Distribuição digital permite alcance instantâneo global. Produtos físicos precisam logística, estoque, distribuição. No digital, um servidor atende o mundo inteiro."
                },
                concorrencia: {
                    rapida: "Setores diferentes: entretenimento vs alimentício",
                    detalhada: "Vemos oportunidades de parceria. Gamers consomem snacks. Imagine doce temático de Halloween para jogadores de horror."
                },
                roi_impossivel: {
                    rapida: "ROI 1.700% no digital: margem 70% + escala global",
                    detalhada: "Uma vez desenvolvido, cada cópia é 70% lucro. Produtos físicos têm custos recorrentes em cada unidade."
                }
            },
            
            reconhecimento_pontos_fortes: {
                laiza: "Admiramos conhecimento técnico sobre segmento alimentício",
                gean_henrique: "Rima criativa foi brilhante, mostra criatividade universal",
                equipe: "Produto bem conceituado, apenas operamos em universos diferentes"
            },
            
            evidencias: debateData.evidence_bank,
            
            fechamento_vitorioso: "Reconhecimento + Esclarecimento de setores + Proposta de parceria = Vitória respeitosa",
            
            atalhos_teclado: {
                "Alt + T": "Toggle cronômetro",
                "Alt + B": "Modo batalha",
                "Alt + 1/2/3": "Iniciar fases do debate"
            }
        };
        
        // Criar e baixar arquivo
        const blob = new Blob([JSON.stringify(guideData, null, 2)], { 
            type: 'application/json' 
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `os-subestimados-guia-debate-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showBattleToast('📋 Guia completo exportado! Preparação total para a batalha!', 'success');
        
    } catch (error) {
        console.error('Erro ao exportar guia:', error);
        showBattleToast('❌ Erro na exportação. Tente novamente.', 'error');
    }
}

// Sistema de notificações de batalha
function showBattleToast(message, type = 'battle', duration = 4000) {
    // Remove toast existente
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.2rem;">${getToastIcon(type)}</span>
            <span>${message}</span>
        </div>
    `;
    
    // Estilos específicos para o tipo
    const styles = {
        battle: 'background: linear-gradient(45deg, #b71c1c, #ff6600); color: white;',
        success: 'background: #4caf50; color: white;',
        error: 'background: #f44336; color: white;',
        warning: 'background: #ff9800; color: white;',
        info: 'background: #2196f3; color: white;'
    };
    
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        ${styles[type]}
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        box-shadow: 0 5px 20px rgba(0,0,0,0.4);
        font-weight: 500;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        border: 2px solid rgba(255,255,255,0.2);
        font-family: 'Orbitron', monospace;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, duration);
}

function getToastIcon(type) {
    const icons = {
        battle: '⚔️',
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || '📢';
}

// Frases motivacionais aleatórias
function showRandomBattleQuote() {
    const quote = debateData.battle_quotes[Math.floor(Math.random() * debateData.battle_quotes.length)];
    showBattleToast(quote, 'battle', 3000);
}

// Quick Access Functions
function quickReply(type) {
    const replies = debateStrategies.replies.quick_responses;
    if (replies[type]) {
        showBattleToast(`💬 Réplica: ${replies[type]}`, 'info', 6000);
    }
}

// Adicionar estilos de animação programaticamente
function addBattleStyles() {
    if (document.getElementById('battle-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'battle-animations';
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes battleGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(183, 28, 28, 0.4); }
            50% { box-shadow: 0 0 40px rgba(183, 28, 28, 0.8); }
        }
        
        .battle-mode {
            filter: contrast(1.1) saturate(1.2) !important;
        }
        
        .highlighted {
            position: relative;
            z-index: 10;
        }
        
        .highlighted::after {
            content: '⭐';
            position: absolute;
            top: -10px;
            right: -10px;
            font-size: 1.5rem;
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);
}

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('⚔️ DOM carregado, iniciando preparação para batalha...');
    
    addBattleStyles();
    
    setTimeout(() => {
        initializeDebateDashboard();
        
        // Mensagens iniciais motivacionais
        setTimeout(() => {
            showBattleToast('🎯 Os Subestimados prontos para dominar o debate!', 'battle');
        }, 1000);
        
        setTimeout(() => {
            showBattleToast('💡 Dica: Alt+T para cronômetro, Alt+B para modo batalha', 'info');
        }, 3000);
        
        setTimeout(() => {
            showRandomBattleQuote();
        }, 6000);
        
    }, 500);
});

// Frases motivacionais a cada 2 minutos
setInterval(showRandomBattleQuote, 120000);

// Funções globais para debugging e demonstração
window.debateDebug = {
    data: debateData,
    strategies: debateStrategies,
    startTimer: startDebatePhase,
    stopTimer: stopDebateTimer,
    toggleBattle: toggleBattleMode,
    quickReply: quickReply,
    export: exportDebateGuide,
    showToast: showBattleToast
};

// Console styling épico
console.log('%c⚔️ OS SUBESTIMADOS BATTLE SYSTEM', 'color: #b71c1c; font-size: 18px; font-weight: bold;');
console.log('%c🎯 Dashboard de estratégia carregado!', 'color: #4caf50; font-size: 14px;');
console.log('%c🛡️ Sistema de defesa ativado!', 'color: #2196f3; font-size: 12px;');
console.log('%c🏆 Preparados para a vitória!', 'color: #ffd700; font-size: 14px;');
console.log('%c⌨️ Atalhos: Alt+T (timer), Alt+B (battle), Alt+1/2/3 (fases)', 'color: #ff9800; font-size: 11px;');
console.log('%c🔧 Debug: window.debateDebug', 'color: #9c27b0; font-size: 11px;');

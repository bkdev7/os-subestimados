// Os Subestimados Gaming Studio - Analytics Dashboard JavaScript

// Dados simulados em tempo real
const analyticsData = {
    downloads: {
        total: 2847392,
        platforms: {
            steam: 1200000,
            playstation: 847000,
            xbox: 625000,
            playstore: 175392
        }
    },
    revenue: 8200000,
    partnerships: 5,
    roi: 164,
    timeline: [
        { week: 'Semana 1', downloads: 180000, revenue: 520000 },
        { week: 'Semana 2', downloads: 340000, revenue: 980000 },
        { week: 'Semana 3', downloads: 520000, revenue: 1500000 },
        { week: 'Semana 4', downloads: 680000, revenue: 1960000 },
        { week: 'Semana 5', downloads: 820000, revenue: 2360000 },
        { week: 'Semana 6', downloads: 1100000, revenue: 3170000 },
        { week: 'Semana 7', downloads: 1850000, revenue: 5330000 },
        { week: 'Semana 8', downloads: 2847392, revenue: 8200000 }
    ],
    partnerships_data: {
        steam: { investment: 200000, revenue: 3400000, roi: 1700 },
        playstation: { investment: 150000, revenue: 2400000, roi: 1600 },
        xbox: { investment: 100000, revenue: 1800000, roi: 1800 },
        youtube: { investment: 80000, views: 12300000, conversion: 8.2 }
    }
};

// Variáveis globais dos gráficos
let platformChart, timelineChart, partnershipsChart;

// Função de inicialização
function initializeDashboard() {
    console.log('🎮 Inicializando Os Subestimados Analytics Dashboard...');
    
    // Verificar se Chart.js foi carregado
    if (typeof Chart === 'undefined') {
        console.error('Chart.js não foi carregado!');
        showToast('Erro: Chart.js não carregado. Verifique a conexão com internet.', 'error');
        return;
    }
    
    // Inicializar gráficos
    initializePlatformChart();
    initializeTimelineChart();
    initializePartnershipsChart();
    
    // Inicializar contadores animados
    initializeCounters();
    
    // Inicializar atualizações em tempo real
    initializeRealTimeUpdates();
    
    // Event listeners
    initializeEventListeners();
    
    // Inicializar animações de scroll
    initializeScrollAnimations();
    
    console.log('✅ Dashboard inicializado com sucesso!');
    showToast('🎮 Os Subestimados Dashboard Online! Dados atualizados em tempo real.', 'success');
}

// Gráfico de Pizza - Plataformas
function initializePlatformChart() {
    const ctx = document.getElementById('platformChart');
    if (!ctx) {
        console.error('Canvas platformChart não encontrado!');
        return;
    }
    
    const data = analyticsData.downloads.platforms;
    
    platformChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Steam', 'PlayStation', 'Xbox', 'Play Store'],
            datasets: [{
                data: [data.steam, data.playstation, data.xbox, data.playstore],
                backgroundColor: [
                    '#1e88e5',
                    '#0070d1', 
                    '#107c10',
                    '#ff6f00'
                ],
                borderColor: '#0a0a0a',
                borderWidth: 3,
                hoverBorderWidth: 5,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    titleColor: '#b71c1c',
                    bodyColor: '#e0e0e0',
                    borderColor: '#b71c1c',
                    borderWidth: 2,
                    cornerRadius: 10,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return context.label + ': ' + context.parsed.toLocaleString('pt-BR') + ' (' + percentage + '%)';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });
}

// Gráfico de Linha - Timeline
function initializeTimelineChart() {
    const ctx = document.getElementById('timelineChart');
    if (!ctx) {
        console.error('Canvas timelineChart não encontrado!');
        return;
    }
    
    const data = analyticsData.timeline;
    
    timelineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => item.week),
            datasets: [
                {
                    label: 'Downloads',
                    data: data.map(item => item.downloads),
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 4,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#4caf50',
                    pointBorderColor: '#0a0a0a',
                    pointBorderWidth: 3,
                    pointRadius: 8,
                    pointHoverRadius: 12
                },
                {
                    label: 'Receita (R$)',
                    data: data.map(item => item.revenue),
                    borderColor: '#b71c1c',
                    backgroundColor: 'rgba(183, 28, 28, 0.1)',
                    borderWidth: 4,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#b71c1c',
                    pointBorderColor: '#0a0a0a',
                    pointBorderWidth: 3,
                    pointRadius: 8,
                    pointHoverRadius: 12,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#e0e0e0',
                        font: {
                            family: 'Orbitron',
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    titleColor: '#b71c1c',
                    bodyColor: '#e0e0e0',
                    borderColor: '#b71c1c',
                    borderWidth: 2,
                    cornerRadius: 10
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ccc',
                        font: {
                            family: 'Orbitron'
                        }
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: '#4caf50',
                        font: {
                            family: 'Orbitron'
                        },
                        callback: function(value) {
                            return (value / 1000000).toFixed(1) + 'M';
                        }
                    },
                    grid: {
                        color: 'rgba(76, 175, 80, 0.1)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: '#b71c1c',
                        font: {
                            family: 'Orbitron'
                        },
                        callback: function(value) {
                            return 'R$ ' + (value / 1000000).toFixed(1) + 'M';
                        }
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(183, 28, 28, 0.1)'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Novo gráfico - ROI das Parcerias
function initializePartnershipsChart() {
    // Criar um canvas dinamicamente se não existir
    let ctx = document.getElementById('partnershipsChart');
    if (!ctx) {
        // Criar seção de gráfico de parcerias se não existir
        const partnershipsSection = document.querySelector('.partnerships-section .container');
        if (partnershipsSection) {
            const chartContainer = document.createElement('div');
            chartContainer.className = 'chart-card';
            chartContainer.style.marginTop = '2rem';
            chartContainer.innerHTML = `
                <h3>ROI das Parcerias</h3>
                <canvas id="partnershipsChart" width="400" height="200"></canvas>
            `;
            partnershipsSection.appendChild(chartContainer);
            ctx = document.getElementById('partnershipsChart');
        } else {
            return;
        }
    }
    
    const partnerships = analyticsData.partnerships_data;
    
    partnershipsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Steam', 'PlayStation', 'Xbox', 'YouTube'],
            datasets: [{
                label: 'ROI (%)',
                data: [
                    partnerships.steam.roi,
                    partnerships.playstation.roi,
                    partnerships.xbox.roi,
                    partnerships.youtube.conversion * 100
                ],
                backgroundColor: [
                    'rgba(30, 136, 229, 0.8)',
                    'rgba(0, 112, 209, 0.8)',
                    'rgba(16, 124, 16, 0.8)',
                    'rgba(255, 0, 0, 0.8)'
                ],
                borderColor: [
                    '#1e88e5',
                    '#0070d1',
                    '#107c10',
                    '#ff0000'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    titleColor: '#b71c1c',
                    bodyColor: '#e0e0e0',
                    borderColor: '#b71c1c',
                    borderWidth: 2,
                    cornerRadius: 10,
                    callbacks: {
                        label: function(context) {
                            if (context.label === 'YouTube') {
                                return 'Conversão: ' + context.parsed.y.toFixed(1) + '%';
                            }
                            return 'ROI: ' + context.parsed.y.toFixed(0) + '%';
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ccc',
                        font: {
                            family: 'Orbitron'
                        }
                    },
                    grid: {
                        color: 'rgba(255,255,255,0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ff6600',
                        font: {
                            family: 'Orbitron'
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 102, 0, 0.1)'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutBounce'
            }
        }
    });
}

// Contadores animados
function initializeCounters() {
    const counters = [
        { element: 'totalDownloads', target: analyticsData.downloads.total, format: 'number' },
        { element: 'totalRevenue', target: analyticsData.revenue, format: 'currency' }
    ];
    
    counters.forEach(counter => {
        animateCounter(counter.element, counter.target, counter.format);
    });
    
    // Animar stats das parcerias se existirem
    animatePartnershipStats();
}

function animateCounter(elementId, target, format) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Elemento ${elementId} não encontrado para animação de contador`);
        return;
    }
    
    const startValue = 0;
    const duration = 3000;
    const increment = target / (duration / 16);
    let current = startValue;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (format === 'currency') {
            element.textContent = 'R$ ' + (current / 1000000).toFixed(1) + 'M';
        } else if (format === 'number') {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        }
    }, 16);
}

function animatePartnershipStats() {
    // Animar valores das parcerias
    const partnerships = analyticsData.partnerships_data;
    
    Object.keys(partnerships).forEach(platform => {
        const data = partnerships[platform];
        
        // Animar investimento
        const investmentEl = document.querySelector(`[data-partnership="${platform}"] .investment-value`);
        if (investmentEl) {
            animateValue(investmentEl, 0, data.investment, 2000, value => 
                'R$ ' + (value / 1000).toFixed(0) + 'K'
            );
        }
        
        // Animar receita
        const revenueEl = document.querySelector(`[data-partnership="${platform}"] .revenue-value`);
        if (revenueEl) {
            animateValue(revenueEl, 0, data.revenue, 2500, value => 
                'R$ ' + (value / 1000000).toFixed(1) + 'M'
            );
        }
        
        // Animar ROI
        const roiEl = document.querySelector(`[data-partnership="${platform}"] .roi-value`);
        if (roiEl) {
            animateValue(roiEl, 0, data.roi, 3000, value => 
                value.toFixed(0) + '%'
            );
        }
    });
}

function animateValue(element, start, end, duration, formatter) {
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        element.textContent = formatter(current);
    }, 16);
}

// Atualizações em tempo real (simuladas)
function initializeRealTimeUpdates() {
    // Simular novos downloads a cada 45 segundos
    setInterval(() => {
        const newDownloads = Math.floor(Math.random() * 800) + 200;
        analyticsData.downloads.total += newDownloads;
        
        // Distribuir entre plataformas (Steam lidera)
        const steamInc = Math.floor(newDownloads * 0.42);
        const psInc = Math.floor(newDownloads * 0.30);
        const xboxInc = Math.floor(newDownloads * 0.22);
        const playStoreInc = newDownloads - steamInc - psInc - xboxInc;
        
        analyticsData.downloads.platforms.steam += steamInc;
        analyticsData.downloads.platforms.playstation += psInc;
        analyticsData.downloads.platforms.xbox += xboxInc;
        analyticsData.downloads.platforms.playstore += playStoreInc;
        
        // Atualizar receita (R$ 2.88 por download em média)
        const newRevenue = newDownloads * 2.88;
        analyticsData.revenue += newRevenue;
        
        // Atualizar contadores na tela
        updateCounters();
        
        // Atualizar gráficos
        updateCharts();
        
        // Mostrar notificação ocasional
        if (Math.random() > 0.6) {
            const notifications = [
                `🚀 +${newDownloads} novos downloads! Os Subestimados dominando!`,
                `🎮 Trending #1 na categoria Horror em ${Math.floor(Math.random() * 5) + 3} países!`,
                `🏆 Steam Feature: "Exorcismo" destaque da semana!`,
                `💎 ROI atual: ${analyticsData.roi}% - superando todas as projeções!`,
                `🌟 PlayStation: Novo trailer exclusivo gerou +${Math.floor(Math.random() * 50000) + 10000} wishlists!`,
                `🎯 Xbox Game Pass: Inclusão confirmada para próximo mês!`
            ];
            const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
            showToast(randomNotification, 'success', 6000);
        }
    }, 45000);
    
    // Simular flutuação do ROI
    setInterval(() => {
        const change = Math.floor(Math.random() * 8) - 4; // -4 a +4
        analyticsData.roi = Math.max(150, Math.min(220, analyticsData.roi + change));
        
        const roiElements = document.querySelectorAll('.hero-stats .stat:last-child .stat-value');
        roiElements.forEach(el => {
            if (el) el.textContent = analyticsData.roi + '%';
        });
    }, 60000);
    
    // Simular eventos especiais
    setInterval(() => {
        if (Math.random() > 0.92) { // 8% de chance
            simulateSpecialEvent();
        }
    }, 120000);
}

function simulateSpecialEvent() {
    const events = [
        {
            title: "VIRAL MOMENT!",
            description: "Influencer com 2M seguidores jogou Exorcismo ao vivo!",
            impact: Math.floor(Math.random() * 80000) + 30000
        },
        {
            title: "HALLOWEEN BOOST!",
            description: "Pico sazonal: +300% downloads na última hora!",
            impact: Math.floor(Math.random() * 120000) + 50000
        },
        {
            title: "STEAM FEATURE!",
            description: "Destacado na página principal da Steam!",
            impact: Math.floor(Math.random() * 100000) + 40000
        },
        {
            title: "PRESS COVERAGE!",
            description: "Matéria no IGN: 'Indie Horror Revolucionário'",
            impact: Math.floor(Math.random() * 60000) + 25000
        }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    
    analyticsData.downloads.total += event.impact;
    analyticsData.revenue += event.impact * 2.88;
    
    updateCounters();
    updateCharts();
    
    showToast(`🔥 ${event.title} ${event.description} +${event.impact.toLocaleString('pt-BR')} downloads!`, 'success', 10000);
}

function updateCounters() {
    const totalDownloadsEl = document.getElementById('totalDownloads');
    const totalRevenueEl = document.getElementById('totalRevenue');
    
    if (totalDownloadsEl) {
        totalDownloadsEl.textContent = analyticsData.downloads.total.toLocaleString('pt-BR');
    }
    
    if (totalRevenueEl) {
        totalRevenueEl.textContent = 'R$ ' + (analyticsData.revenue / 1000000).toFixed(1) + 'M';
    }
}

function updateCharts() {
    // Atualizar gráfico de plataformas
    if (platformChart && platformChart.data && platformChart.data.datasets[0]) {
        const data = analyticsData.downloads.platforms;
        platformChart.data.datasets[0].data = [data.steam, data.playstation, data.xbox, data.playstore];
        platformChart.update('none');
    }
}

// Animações de scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(
        '.chart-card, .partnership-card, .analysis-card, .metric, .advantage, .disadvantage'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

// Event Listeners
function initializeEventListeners() {
    // Smooth scroll para navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Efeitos de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Responsividade dos gráficos
    window.addEventListener('resize', () => {
        if (platformChart) platformChart.resize();
        if (timelineChart) timelineChart.resize();
        if (partnershipsChart) partnershipsChart.resize();
    });
    
    // Easter eggs para os desenvolvedores
    addEasterEggs();
}

function addEasterEggs() {
    // Konami Code para efeitos especiais
    let konamiCode = [];
    const sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > sequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === sequence.join(',')) {
            activateGodMode();
        }
    });
    
    // Click secreto no logo
    document.querySelector('.logo')?.addEventListener('dblclick', () => {
        simulateSpecialEvent();
    });
}

function activateGodMode() {
    showToast('🎮 MODO DESENVOLVEDOR ATIVADO! Os Subestimados não são mais subestimados!', 'success', 8000);
    
    // Boost massivo nos números
    analyticsData.downloads.total += 1000000;
    analyticsData.revenue += 2880000;
    analyticsData.roi += 50;
    
    updateCounters();
    updateCharts();
    
    // Efeito visual especial
    document.body.style.animation = 'pulse 2s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);
}

// Efeitos de scroll
function handleScroll() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (header) {
        header.classList.toggle('scrolled', scrolled > 100);
    }
    
    // Parallax suave no hero
    const hero = document.querySelector('.hero');
    if (hero) {
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
    }
}

// Exportar relatório
function exportReport() {
    try {
        const reportData = {
            timestamp: new Date().toISOString(),
            empresa: 'Os Subestimados Gaming Studio',
            produto: 'Exorcismo: Ritual Final',
            periodo: '2 meses pós-lançamento',
            summary: {
                totalDownloads: analyticsData.downloads.total,
                totalRevenue: analyticsData.revenue,
                roi: analyticsData.roi + '%',
                partnerships: analyticsData.partnerships,
                platforms: analyticsData.downloads.platforms
            },
            partnerships: analyticsData.partnerships_data,
            analysis: {
                marketPosition: 'Líder em Horror Indie Multiplataforma',
                competitiveAdvantage: 'Parcerias estratégicas + Timing de Halloween + Demo viral',
                keySuccess: 'ROI médio de 1.650% nas parcerias principais',
                marketDifference: 'Gaming digital vs Produtos físicos - setores não competitivos'
            },
            competitive_analysis: {
                concorrente_pontos_positivos: [
                    'Laiza: Excelente domínio técnico do segmento alimentício',
                    'Gean e Henrique: Criatividade excepcional na rima do produto',
                    'Boa dinâmica de equipe e distribuição de responsabilidades',
                    'Produto bem conceituado no segmento alimentício'
                ],
                areas_melhoria: [
                    'Research de mercado: Confusão entre setores gaming/alimentício',
                    'Preparação de apresentação: Dependência de anotações',
                    'Postura profissional durante pitch executivo'
                ],
                recomendacoes: [
                    'Implementar análise rigorosa do landscape competitivo',
                    'Treinamento para apresentações executivas sem consultas',
                    'Explorar oportunidades de parceria (setores complementares)'
                ]
            }
        };
        
        // Criar blob e download
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { 
            type: 'application/json' 
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `os-subestimados-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast('📊 Relatório completo exportado! Os Subestimados sempre entregam!', 'success');
    } catch (error) {
        console.error('Erro ao exportar relatório:', error);
        showToast('❌ Erro ao exportar relatório. Tente novamente.', 'error');
    }
}

// Sistema de notificações
function showToast(message, type = 'info', duration = 4000) {
    // Remove toast existente
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Aplicar estilos inline como fallback
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        font-weight: 500;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        border: 1px solid rgba(255,255,255,0.2);
        font-family: 'Orbitron', monospace;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, duration);
}

// Adicionar estilos de animação programaticamente
function addAnimationStyles() {
    if (document.getElementById('gaming-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'gaming-animations';
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(183, 28, 28, 0.3); }
            50% { box-shadow: 0 0 30px rgba(183, 28, 28, 0.6); }
        }
        .animate-in {
            animation: fadeInUp 0.6s ease-out both;
        }
        .header.scrolled {
            background: rgba(0,0,0,0.98) !important;
            backdrop-filter: blur(30px);
        }
    `;
    document.head.appendChild(style);
}

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 DOM carregado, iniciando Os Subestimados Dashboard...');
    
    addAnimationStyles();
    
    // Aguardar um pouco para garantir que Chart.js carregou
    setTimeout(() => {
        initializeDashboard();
        
        // Eventos iniciais com tema gaming
        setTimeout(() => {
            showToast('🚀 Os Subestimados Dashboard Online! Sistemas operacionais.', 'success');
        }, 1000);
        
        setTimeout(() => {
            showToast('🎯 Parcerias ativas: Steam, PlayStation, Xbox, YouTube', 'info');
        }, 3000);
        
        setTimeout(() => {
            showToast('🏆 Status: Dominando o mercado indie horror!', 'success');
        }, 5000);
    }, 500);
});

// Funções de demonstração e debug
function simulateViralMoment() {
    const viralBoost = Math.floor(Math.random() * 100000) + 50000;
    analyticsData.downloads.total += viralBoost;
    analyticsData.revenue += viralBoost * 2.88;
    
    updateCounters();
    updateCharts();
    
    showToast(`🔥 MOMENTO VIRAL! +${viralBoost.toLocaleString('pt-BR')} downloads! Os Subestimados viralizaram globalmente!`, 'success', 10000);
}

// Simular conquistas
function unlockAchievement(achievement) {
    const achievements = {
        'first_million': {
            title: '🏆 PRIMEIRO MILHÃO',
            description: 'Parabéns! 1 milhão de downloads alcançados!'
        },
        'partnership_master': {
            title: '🤝 MESTRE DAS PARCERIAS', 
            description: 'ROI médio acima de 1000% em todas as parcerias!'
        },
        'viral_hit': {
            title: '🌟 HIT VIRAL',
            description: 'Trending mundial em múltiplas plataformas!'
        },
        'halloween_king': {
            title: '🎃 REI DO HALLOWEEN',
            description: 'Jogo #1 na categoria horror durante outubro!'
        }
    };
    
    const ach = achievements[achievement];
    if (ach) {
        showToast(`${ach.title} - ${ach.description}`, 'success', 8000);
    }
}

// Verificar conquistas automaticamente
setInterval(() => {
    if (analyticsData.downloads.total >= 1000000 && !window.achievements?.first_million) {
        unlockAchievement('first_million');
        window.achievements = window.achievements || {};
        window.achievements.first_million = true;
    }
    
    if (analyticsData.roi >= 170 && !window.achievements?.partnership_master) {
        unlockAchievement('partnership_master');
        window.achievements = window.achievements || {};
        window.achievements.partnership_master = true;
    }
}, 30000);

// Funções globais para debugging e demonstração
window.gamingDebug = {
    data: analyticsData,
    charts: () => ({ platformChart, timelineChart, partnershipsChart }),
    simulateViral: simulateViralMoment,
    unlockAchievement: unlockAchievement,
    activateGodMode: activateGodMode,
    showToast: showToast,
    export: exportReport
};

// Console styling para desenvolvedores
const consoleStyle = {
    title: 'color: #b71c1c; font-size: 16px; font-weight: bold;',
    success: 'color: #4caf50; font-size: 12px;',
    info: 'color: #2196f3; font-size: 12px;',
    warning: 'color: #ff9800; font-size: 12px;'
};

console.log('%c🎮 OS SUBESTIMADOS GAMING STUDIO', consoleStyle.title);
console.log('%c📊 Analytics Dashboard carregado com sucesso!', consoleStyle.success);
console.log('%c🎯 Sistema de monitoramento em tempo real ativo.', consoleStyle.info);
console.log('%c🔥 Pronto para dominar a competição!', consoleStyle.success);
console.log('%c🛠️ Use window.gamingDebug para debugging e demos', consoleStyle.info);
console.log('%c⌨️ Easter egg: Tente o código Konami (↑↑↓↓←→←→BA)', consoleStyle.warning);
console.log('%c🖱️ Double-click no logo para eventos especiais', consoleStyle.warning);

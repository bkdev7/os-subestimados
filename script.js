// Analytics Dashboard JavaScript

// Dados simulados em tempo real
const analyticsData = {
    downloads: {
        total: 2847392,
        platforms: {
            steam: 1200000,
            playstation: 847000,
            xbox: 625000,
            mobile: 175392
        }
    },
    revenue: 8200000,
    countries: 190,
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
    ]
};

// Variáveis globais dos gráficos
let platformChart, timelineChart;

// Função de inicialização
function initializeDashboard() {
    console.log('📊 Inicializando Shadow Games Analytics Dashboard...');
    
    // Verificar se Chart.js foi carregado
    if (typeof Chart === 'undefined') {
        console.error('Chart.js não foi carregado!');
        showToast('Erro: Chart.js não carregado. Verifique a conexão com internet.', 'error');
        return;
    }
    
    // Inicializar gráficos
    initializePlatformChart();
    initializeTimelineChart();
    
    // Inicializar contadores animados
    initializeCounters();
    
    // Inicializar atualizações em tempo real
    initializeRealTimeUpdates();
    
    // Event listeners
    initializeEventListeners();
    
    console.log('✅ Dashboard inicializado com sucesso!');
    showToast('Dashboard carregado! Dados atualizados em tempo real.', 'success');
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
            labels: ['Steam', 'PlayStation', 'Xbox', 'Mobile'],
            datasets: [{
                data: [data.steam, data.playstation, data.xbox, data.mobile],
                backgroundColor: [
                    '#1e88e5',
                    '#0070d1', 
                    '#107c10',
                    '#ff6f00'
                ],
                borderColor: '#0a0a0a',
                borderWidth: 3,
                hoverBorderWidth: 5
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
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#b71c1c',
                    bodyColor: '#e0e0e0',
                    borderColor: '#b71c1c',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return context.label + ': ' + context.parsed.toLocaleString('pt-BR') + ' (' + percentage + '%)';
                        }
                    }
                }
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
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#4caf50',
                    pointBorderColor: '#0a0a0a',
                    pointBorderWidth: 2,
                    pointRadius: 6
                },
                {
                    label: 'Receita (R$)',
                    data: data.map(item => item.revenue),
                    borderColor: '#b71c1c',
                    backgroundColor: 'rgba(183, 28, 28, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#b71c1c',
                    pointBorderColor: '#0a0a0a',
                    pointBorderWidth: 2,
                    pointRadius: 6,
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
                            family: 'Roboto',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    titleColor: '#b71c1c',
                    bodyColor: '#e0e0e0',
                    borderColor: '#b71c1c',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ccc'
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
                        callback: function(value) {
                            return 'R$ ' + (value / 1000000).toFixed(1) + 'M';
                        }
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(183, 28, 28, 0.1)'
                    }
                }
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
}

function animateCounter(elementId, target, format) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Elemento ${elementId} não encontrado para animação de contador`);
        return;
    }
    
    const startValue = 0;
    const duration = 2000;
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

// Atualizações em tempo real (simuladas)
function initializeRealTimeUpdates() {
    // Simular novos downloads a cada 30 segundos
    setInterval(() => {
        const newDownloads = Math.floor(Math.random() * 500) + 100;
        analyticsData.downloads.total += newDownloads;
        
        // Distribuir entre plataformas
        const steamInc = Math.floor(newDownloads * 0.42);
        const psInc = Math.floor(newDownloads * 0.30);
        const xboxInc = Math.floor(newDownloads * 0.22);
        const mobileInc = newDownloads - steamInc - psInc - xboxInc;
        
        analyticsData.downloads.platforms.steam += steamInc;
        analyticsData.downloads.platforms.playstation += psInc;
        analyticsData.downloads.platforms.xbox += xboxInc;
        analyticsData.downloads.platforms.mobile += mobileInc;
        
        // Atualizar receita (R$ 2.88 por download em média)
        const newRevenue = newDownloads * 2.88;
        analyticsData.revenue += newRevenue;
        
        // Atualizar contadores na tela
        updateCounters();
        
        // Atualizar gráficos
        updateCharts();
        
        // Mostrar notificação ocasional
        if (Math.random() > 0.7) {
            const notifications = [
                `📈 +${newDownloads} novos downloads nas últimas 30 segundos!`,
                `🌍 Expansão para novo mercado! Agora em ${analyticsData.countries} países.`,
                `🏆 Mantendo posição #1 na categoria Horror!`,
                `💰 ROI atual: ${analyticsData.roi}% - superando projeções!`
            ];
            const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
            showToast(randomNotification, 'success', 5000);
        }
    }, 30000);
    
    // Simular flutuação do ROI
    setInterval(() => {
        const change = Math.floor(Math.random() * 6) - 3; // -3 a +3
        analyticsData.roi = Math.max(150, Math.min(200, analyticsData.roi + change));
        
        const roiElement = document.querySelector('.hero-stats .stat:last-child .stat-value');
        if (roiElement) {
            roiElement.textContent = analyticsData.roi + '%';
        }
    }, 45000);
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
        platformChart.data.datasets[0].data = [data.steam, data.playstation, data.xbox, data.mobile];
        platformChart.update('none'); // Atualização sem animação para ser mais suave
    }
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
    });
}

// Efeitos de scroll
function handleScroll() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (header) {
        header.classList.toggle('scrolled', scrolled > 100);
    }
    
    // Animação dos cards ao aparecer na tela
    const cards = document.querySelectorAll('.defense-card, .analysis-card, .chart-card');
    cards.forEach(card => {
        const cardTop = card.offsetTop;
        const cardHeight = card.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrolled + windowHeight > cardTop + cardHeight / 4) {
            card.classList.add('animate-in');
        }
    });
}

// Exportar relatório
function exportReport() {
    try {
        const reportData = {
            timestamp: new Date().toISOString(),
            summary: {
                totalDownloads: analyticsData.downloads.total,
                totalRevenue: analyticsData.revenue,
                roi: analyticsData.roi + '%',
                platforms: analyticsData.downloads.platforms
            },
            analysis: {
                marketPosition: 'Líder em Horror Indie',
                competitiveAdvantage: 'Multiplataforma + Timing estratégico',
                criticalErrors: 'Concorrente: Identificação incorreta de mercado',
                professionalGap: 'Concorrente: Despreparo em apresentação'
            }
        };
        
        // Criar blob e download
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { 
            type: 'application/json' 
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `shadow-games-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast('Relatório exportado com sucesso!', 'success');
    } catch (error) {
        console.error('Erro ao exportar relatório:', error);
        showToast('Erro ao exportar relatório. Tente novamente.', 'error');
    }
}

// Sistema de notificações
function showToast(message, type = 'info', duration = 3000) {
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
        max-width: 350px;
        animation: slideInRight 0.3s ease;
        border: 1px solid rgba(255,255,255,0.2);
        font-family: 'Roboto', sans-serif;
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

// Dados para críticas estratégicas
const competitorAnalysis = {
    criticalErrors: [
        {
            type: 'Market Research Failure',
            description: 'Identificação incorreta de concorrentes (jogos vs alimentício)',
            impact: 'Alto',
            businessConsequence: 'Perda de credibilidade com investidores'
        },
        {
            type: 'Presentation Unprofessionalism', 
            description: 'Dependência de dispositivos móveis durante pitch',
            impact: 'Médio',
            businessConsequence: 'Questionamento da competência da equipe'
        }
    ],
    ourAdvantages: [
        'Apresentação fluida sem consultas',
        'Demonstração técnica ao vivo',
        'Análise competitiva precisa',
        'Domínio completo do produto'
    ]
};

// Adicionar estilos de animação programaticamente
function addAnimationStyles() {
    if (document.getElementById('analytics-animations')) return;
    
    const style = document.createElement('style');
    style.id = 'analytics-animations';
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
    console.log('🚀 DOM carregado, iniciando dashboard...');
    
    addAnimationStyles();
    
    // Aguardar um pouco para garantir que Chart.js carregou
    setTimeout(() => {
        initializeDashboard();
        
        // Simular alguns eventos iniciais
        setTimeout(() => {
            showToast('🎯 Dados carregados com sucesso! Monitoramento em tempo real ativo.', 'success');
        }, 1000);
        
        setTimeout(() => {
            showToast('📊 Destaque: Superando concorrentes em profissionalismo e execução!', 'info');
        }, 3000);
    }, 500);
});

// Adicionar funcionalidades extras para demonstração
function simulateViralMoment() {
    const viralBoost = Math.floor(Math.random() * 50000) + 20000;
    analyticsData.downloads.total += viralBoost;
    analyticsData.revenue += viralBoost * 2.88;
    
    updateCounters();
    updateCharts();
    
    showToast(`🚀 VIRAL! +${viralBoost.toLocaleString('pt-BR')} downloads em uma hora! Trending mundial!`, 'success', 8000);
}

// Simular momento viral ocasionalmente
setInterval(() => {
    if (Math.random() > 0.95) { // 5% de chance a cada minuto
        simulateViralMoment();
    }
}, 60000);

// Funções globais para debugging
window.analyticsDebug = {
    data: analyticsData,
    charts: () => ({ platformChart, timelineChart }),
    simulateViral: simulateViralMoment,
    showToast: showToast
};

console.log('📈 Shadow Games Analytics Dashboard carregado!');
console.log('🎯 Sistema de monitoramento em tempo real ativo.');
console.log('🔥 Pronto para dominar a competição!');
console.log('🛠️ Use window.analyticsDebug para debugging');

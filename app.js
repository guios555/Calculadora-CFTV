/**
 * Controlador da Aplicação e Manipulação do DOM
 */

// Estado da Aplicação (Array de grupos de câmeras)
let cameraGroups = [];

// Elementos do DOM
const cameraForm = document.getElementById('camera-form');
const cameraListTable = document.getElementById('camera-list');
const retentionDaysInput = document.getElementById('retention-days');
const hdCapacitySelect = document.getElementById('hd-capacity');

// Elementos de Exibição de Métricas
const totalStorageEl = document.getElementById('total-storage');
const totalBitrateEl = document.getElementById('total-bitrate');
const totalHdsEl = document.getElementById('total-hds');
const totalBaysEl = document.getElementById('total-bays');

// Evento de Submissão do Formulário
cameraForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('group-name').value.trim();
    const count = Number(document.getElementById('camera-count').value);
    const resolution = document.getElementById('resolution').value;
    const codec = document.getElementById('codec').value;
    const fps = Number(document.getElementById('fps').value);
    const motion = Number(document.getElementById('motion-percent').value);

    // Cálculo técnico para o novo grupo
    const estimatedBitrate = calculateCameraBitrate(resolution, codec, fps);
    const dailyStorageGB = calculateGroupDailyStorage(count, estimatedBitrate, motion);
    const totalGroupBitrate = estimatedBitrate * count;

    const newGroup = {
        id: Date.now(),
        name,
        count,
        resolution,
        codec,
        fps,
        motion,
        bitrate: estimatedBitrate,
        totalBitrate: totalGroupBitrate,
        dailyStorageGB
    };

    cameraGroups.push(newGroup);
    cameraForm.reset();
    
    renderUI();
});

// Eventos de mudança nos controles globais de retenção
retentionDaysInput.addEventListener('input', updateMetrics);
hdCapacitySelect.addEventListener('change', updateMetrics);

/**
 * Remove um grupo pelo ID
 */
function removeGroup(id) {
    cameraGroups = cameraGroups.filter(group => group.id !== id);
    renderUI();
}

/**
 * Renderiza a tabela de câmeras e atualiza as métricas
 */
function renderUI() {
    // Limpar tabela
    cameraListTable.innerHTML = '';

    cameraGroups.forEach(group => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${group.name}</strong></td>
            <td>${group.count}</td>
            <td>${group.resolution}</td>
            <td>${group.codec}</td>
            <td>${group.fps} FPS</td>
            <td>${group.bitrate} Kbps</td>
            <td>${group.dailyStorageGB} GB</td>
            <td>
                <button class="btn btn-danger" onclick="removeGroup(${group.id})">Excluir</button>
            </td>
        `;
        cameraListTable.appendChild(row);
    });

    updateMetrics();
}

/**
 * Recalcula e exibe as métricas totais na tela
 */
function updateMetrics() {
    const days = parseInt(retentionDaysInput.value);
    const hdCap = parseInt(hdCapacitySelect.value);
    if (isNaN(days) || isNaN(hdCap)) {
        return;
    }

    // Soma do consumo diário de todos os grupos
    const totalDailyGB = cameraGroups.reduce((acc, group) => acc + group.dailyStorageGB, 0);
    const totalBitrateKbps = cameraGroups.reduce(( acc, group) => acc + group.totalBitrate, 0);
    
    const requiredTotalGB = totalDailyGB * days;
    const hdResults = calculateHDRequirements(requiredTotalGB, hdCap);

    // Atualiza os cards no DOM
    totalStorageEl.textContent = `${hdResults.totalTB} TB`;
    totalBitrateEl.textContent = `${(totalBitrateKbps / 1024).toFixed(1)} Mbps`;
    totalHdsEl.textContent = `${hdResults.hdsNeeded} HD(s)`;
    totalBaysEl.textContent = `${hdResults.baysNeeded} Baia(s)`;
}
/**
 * Motor de Cálculo Técnico para CFTV (Calculator Engine)
 */

// Tabela de Bitrate Base por Resolução (em Kbps para 30 FPS / H.264)
const BASE_BITRATES = {
    '720p': 2048,
    '1080p': 4096,
    '4MP': 6144,
    '4K': 8192
};

// Fatores de Eficiência por Codec
const CODEC_EFFICIENCY = {
    'H.264': 1.0,
    'H.265': 0.5,   // Economia de ~50% de banda
    'H.265+': 0.3    // Economia de ~70% de banda
};

/**
 * Calcula o bitrate estimado por câmera individual (em Kbps)
 */
function calculateCameraBitrate(resolution, codec, fps) {
    const baseBitrate = BASE_BITRATES[resolution] ?? 4096;
    const codecFactor = CODEC_EFFICIENCY[codec] ?? 1;
    // Evita erro caso FPS venha vazio
    fps = Number(fps) || 30;
    const fpsFactor = fps / 30;
    return Math.round( baseBitrate * codecFactor * fpsFactor
    );
}

/**
 * Calcula o consumo de dados em Gigabytes por dia para um grupo de câmeras
 */
function calculateGroupDailyStorage(cameraCount, bitrateKbps, motionPercent) {
    motionPercent = Number(motionPercent);
    if(motionPercent < 0)
        motionPercent = 0;

    if(motionPercent > 100)
        motionPercent = 100;
    const motionFactor = motionPercent / 100;
    // Fórmula: (Kbps * 3600 segundos * 24 horas) / (8 * 1024 * 1024) para converter Kbits em Gigabytes
    const dailyGBPerCamera = (bitrateKbps * 86400) / (8 * 1024 * 1024);
    
    return Number((dailyGBPerCamera * cameraCount * motionFactor).toFixed(2));
}

/**
 * Calcula a quantidade de HDs e baias requeridas com base na retenção total
 */
function calculateHDRequirements(totalStorageGB, hdCapacityTB) {
    // Conversão comercial: 1 TB = 1024 GB
    const totalStorageTB = totalStorageGB / 1024;
    
    if (totalStorageTB === 0) {
        return { totalTB: 0, hdsNeeded: 0, baysNeeded: 1 };
    }

    const safetyStorage = totalStorageTB * 1.10;
    const hdsNeeded = Math.ceil(safetyStorage / hdCapacityTB);
    const baysNeeded = hdsNeeded; // Cada HD exige 1 baia no equipamento

    return {
        totalTB: totalStorageTB.toFixed(2),
        hdsNeeded: hdsNeeded,
        baysNeeded: baysNeeded
    };
}
# 👁️ Archival Retention Matrix (ARM)

> **Ferramenta Web para Simulação Interativa de Retenção de Armazenamento e Dimensionamento de HDs para DVR/NVR.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

---

## 📌 Sobre o Projeto

O **Archival Retention Matrix** é uma aplicação web interativa desenvolvida em Vanilla JavaScript projetada para resolver um problema real na área de **Automação Predial, CFTV e Infraestrutura de Segurança**: o dimensionamento preciso de armazenamento para gravadores digitais (DVR/NVR).

Diferente de calculadoras genéricas de armazenamento que utilizam equações estáticas superficiais, esta ferramenta permite a criação de **múltiplos perfis de câmeras**, considerando variáveis cruciais do mundo real, como:
* Codecs de compressão modernos (H.264, H.265, H.265+).
* Modos de gravação híbridos (Contínuo vs. Detecção de Movimento).
* Limites físicos de baias e capacidade nominal dos discos rígidos de linha industrial/surveillance (4TB, 8TB, 10TB).

---

## 🛠️ Funcionalidades Chave

* **Adição Dinâmica de Perfis (DOM Manipulation):** Permite adicionar e remover múltiplos grupos de câmeras com configurações independentes em tempo real.
* **Cálculo de Bitrate e Volumetria Teórica:** Algoritmo dedicado para converter Resolução + FPS + Codec em throughput de dados diário ($GB/dia$).
* **Dimensionamento Físico de HDs e Baias:** Determina a quantidade exata de discos necessários e alerta sobre a quantidade de baias exigida no hardware do DVR/NVR.
* **Feedback Visual em Tempo Real:** Atualização instantânea dos cálculos sem necessidade de recarregar a página (*Event-driven UI*).
* **Interface Responsiva & Dark Theme:** Estética *Dark/Gothic-Tech* projetada para conforto visual em ambientes operacionais e centrais de monitoramento (BMS).

---

## 🧮 Lógica de Cálculo Utilizada

A volumetria de dados é calculada com base na seguinte relação matemática de consumo de banda e tempo:

$$\text{Tamanho Total (GB)} = \left( \frac{\text{Bitrate (Kbps)} \times 3600 \times 24}{8 \times 10^6} \right) \times \text{Qtd. Câmeras} \times \text{Dias de Retenção} \times \text{Fator de Detecção}$$

Onde o **Fator de Detecção** ajusta a taxa de gravação para cenários onde o movimento é registrado apenas em uma fração do dia ($X\%$ do tempo).

---
💡 Aprendizados e Conceitos Aplicados

Estruturas de Dados Dinâmicas em JS: Manipulação e iteração de arrays de objetos complexos.

Arquitetura Modular: Separação clara de responsabilidades entre regras de negócio (calculator.js) e interface com o usuário (app.js).

Boas Práticas do DOM: Event delegation, criação/remoção dinâmica de nós sem causar vazamento de memória (memory leaks).

Conceitos de Infraestrutura: Entendimento profundo sobre codecs de vídeo, taxa de bits (bitrate) e engenharia de CFTV/BMS.
O que o Projeto fará (Regras de Negócio e Funcionalidades)Adição Dinâmica de Grupos de Câmeras:O usuário pode adicionar múltiplos grupos de câmeras.
Campos por grupo: Nome do Grupo, Quantidade de Câmeras, Resolução (720p, 1080p, 4MP, 4K), Codec (H.264, H.265, H.265+), FPS (15, 30 fps) e Modo de Gravação (% Contínua vs % Detecção de Movimento).
Cálculo da Matriz de Armazenamento:O JavaScript calcula o Bitrate médio recomendado para cada perfil.Calcula o consumo diário de dados em Gigabytes/Terabytes.
Recebe o número de dias de retenção desejados (ex: 30, 60 dias).
Diagnóstico de HDs e Baias de DVR:O usuário seleciona a capacidade do HD desejada (4TB, 8TB, 10TB).
O algoritmo calcula:O armazenamento total necessário em Terabytes reais (considerando a conversão $1\text{ TB} = 1024\text{ GB}$).A quantidade exata de HDs necessários.
Alerta visual sobre o número de baias de DVR requeridas (ex: "Atenção: Necessita de DVR de pelo menos 2 baias").
Interface e UX de Alto Impacto:Barra de progresso visual simulando a ocupação do disco.
Opção de exportar o resumo da simulação em formato .json ou texto formatado para relatórios rápidos.
3. O Plano de Ação (Próximos Passos)Para construirmos sem pressa e aprendendo cada linha de JavaScript, dividiremos o ritual em etapas:
Etapa 1: Construir a estrutura básica do index.html e a folha de estilo style.css com a estética minimalista/dark.
Etapa 2: Escrever no calculator.js as funções puras de matemática (conversão de Bitrate, resolução e codecs em consumo de dados por dia).Etapa 3: Criar a lógica no app.js para adicionar/remover dinamicamente as linhas de câmeras na tela usando o DOM.
Etapa 4: Conectar os inputs para atualizar os resultados e a barra de progresso em tempo real.
import { especies } from './especies.js';
import { recintos } from './recintos-existentes.js';

class RecintosZoo {
    // Função para analisar recintos
    analisaRecintos(animalNome, quantidade) {
        // Verifica se o animal é valido
        const especie = especies.find(especie => especie.nome === animalNome);
        if (!especie) {
            return { erro: "Animal inválido", recintosViaveis: false };
        }

        // Verifica se quantidade é valida.
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: false };
        }

        // Lista dos recintos viáveis
        const recintosViaveis = [];

        // Verifica os recintos para cada espécie e quantidade
        for (const recinto of recintos) {
            // Verifica se o bioma do recinto é compatível
            const biomaValido = recinto.biomas.some(bioma => especie.biomas.includes(bioma));
            if (!biomaValido) continue;

            // Calcula espaço ocupado pelos animais já existentes no recinto
            let espacoOcupado = recinto.animais.reduce((total, animalRecinto) => {
                const especieRecinto = especies.find(e => e.nome === animalRecinto.nome);
                const tamanhoAnimal = especieRecinto.tamanho * animalRecinto.quantidade;
                return total + tamanhoAnimal;
            }, 0);

            // Verifica se o recinto é válido para animal carnívoro
            if (especie.carnivoro) {
                const outrosAnimaisNoRecinto = recinto.animais.filter(a => a.nome !== animalNome);
                const compatibilidade = outrosAnimaisNoRecinto.every(a => {
                    const especieRecinto = especies.find(e => e.nome === a.nome);
                    return especieRecinto.carnivoro && a.nome === animalNome;
                });

                if (!compatibilidade) {
                    continue; // Se o novo animal carnívoro não pode viver com outros animais, pule o recinto
                }
            } else {
                // Verifica se os animais existentes no recinto são carnívoros
                const carnívorosExistentesNoRecinto = recinto.animais.some(a => {
                    const especieRecinto = especies.find(e => e.nome === a.nome);
                    return especieRecinto.carnivoro;
                });

                if (carnívorosExistentesNoRecinto) {
                    continue; // Se o recinto já tem carnívoros, e o novo animal não é carnívoro, pule o recinto
                }
            }

            // Regra para Hipopótamo
            if (especie.nome === "HIPOPOTAMO" && !recinto.biomas.includes("rio")) {
                continue; // Hipopótamo precisa de rio e savana juntos
            }

            // Adiciona espaço extra se a espécie a ser adicionada é diferente das existentes
            let espacoExtra = 0;

            for (const animal of recinto.animais) {
                if (animal.nome !== animalNome) {
                    espacoExtra = 1;
                    break;
                }
            }

            // Calcula o espaço que sobraria no recinto após adicionar os novos animais
            const espacoNecessario = especie.tamanho * quantidade;
            const espacoRestante = recinto.tamanhoTotal - espacoOcupado - espacoNecessario - espacoExtra;

            // Verifica se há espaço suficiente
            if (espacoRestante >= 0) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoRestante} total: ${recinto.tamanhoTotal})`);
            }
        }

        // Retorno para nenhum recinto encontrado
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: false };
        }

        // Retorna a lista de recintos viáveis
        return { erro: false, recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
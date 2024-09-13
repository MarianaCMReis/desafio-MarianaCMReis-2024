//Animais - o espaço que cada indivíduo ocupa e em quais biomas se adapta.
const especies = [
    { nome: "LEAO", tamanho: 3, biomas: ["savana"], carnivoro: true },
    { nome: "LEOPARDO", tamanho: 2, biomas: ["savana"], carnivoro: true },
    { nome: "CROCODILO", tamanho: 3, biomas: ["rio"], carnivoro: true },
    { nome: "MACACO", tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
    { nome: "GAZELA", tamanho: 2, biomas: ["savana"], carnivoro: false },
    { nome: "HIPOPOTAMO", tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
];

export { especies };
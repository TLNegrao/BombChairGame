const BombChairGame = artifacts.require("BombChairGame");

contract("BombChairGame", (accounts) => {
  let instance;

  beforeEach(async () => {
    instance = await BombChairGame.new();
  });

  it("deve criar uma nova instância de jogo IV", async () => {
    const instance = await BombChairGame.deployed();

    // Endereço do jogador
    const jogador = accounts[0];

    // Número escolhido pelo jogador
    const numeroEscolhido = 3;

    // Saldo do contrato antes da criação do jogo
    const saldoAntes = await instance.getBalance();

    // Chama a função criarNovaInstanciaJogo
    const tx = await instance.criarNovaInstanciaJogo(numeroEscolhido, { from: jogador, value: web3.utils.toWei("1", "ether") });

    // Verifica se o evento NovaInstanciaJogo foi emitido corretamente
    assert.equal(tx.logs.length, 1, "Deve emitir exatamente um evento");
    assert.equal(tx.logs[0].event, "NovaInstanciaJogo", "Evento incorreto emitido");

    // Verifica se os valores do estado do contrato são atualizados corretamente
    const numeroContrato = await instance.numeroContrato();
    const contador = await instance.contador();
    const jogadorIniciouJogo = await instance.jogadorIniciouJogo(jogador);
    const jogadorPorNumero = await instance.jogadorPorNumero(numeroEscolhido);

    assert.equal(numeroContrato, 1, "Número do contrato incorreto");
    assert.equal(contador, 1, "Contador incorreto");
    assert.equal(jogadorIniciouJogo, true, "O jogador não iniciou o jogo corretamente");
    assert.equal(jogadorPorNumero, jogador, "Endereço do jogador por número incorreto");

    // Saldo do contrato após a criação do jogo
    const saldoDepois = await instance.getBalance();

    // Verifica se o valor enviado pelo jogador foi transferido corretamente para o contrato
    assert.equal(saldoDepois - saldoAntes, web3.utils.toWei("1", "ether"), "Valor do contrato incorreto");
  });


  it("deve permitir a participação em um jogoXX", async () => {
    const instance = await BombChairGame.deployed();
    const jogador = accounts[1];
    const numeroEscolhido = 4;

    // Chama a função jogar
    const tx = await instance.jogar(numeroEscolhido, { from: jogador, value: web3.utils.toWei("1", "ether") });

    // Verifica se o evento numeroEscolhidoRegistrado foi emitido corretamente
    assert.equal(tx.logs.length, 1, "Deve emitir exatamente um evento");
    assert.equal(tx.logs[0].event, "numeroEscolhidoRegistrado", "Evento incorreto emitido");
  });

});







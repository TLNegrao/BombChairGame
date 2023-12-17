// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BombChairGame {
    address public owner;
    uint256 public preco_jogo = 1 ether;
    uint8 public contador = 0;
    uint256 public numeroContrato = 0;

    uint256 public ultimoNumeroSorteado;
    address public ultimoVencedor;


    address payable[] public s_jogador;
    uint[] fora;
    uint[] numeroEscolhido;

    struct Sorteio {
        address s_jogador;
        uint numeroEscolhido;
        bool valid;
    }

    struct Game {
        address s_jogador;
        uint numeroEscolhido;
        uint256 valorSala;
        uint256 balance;
        bool active;
    }

    // Mapeamento para armazenar os endereços dos contratos BombChairGame criados
    mapping(uint => Sorteio) public sorteios;
    mapping(uint => Game) public jogos;
    mapping(uint => address) public jogoContracts;
    mapping(uint => address) public jogadorPorNumero;
    mapping(address => Sorteio) public numeroEscolhido1;
    mapping(uint => Sorteio) public jaEscolhido;
    mapping(address => bool) ja_participa;
    mapping(address => bool) public jogadorIniciouJogo;

    constructor() {
        owner = payable(0x80D639E9A17e2863fdAd9D2DcB58E886B3564bcF);
    }

    event NovaInstanciaJogo(
        uint numeroEscolhido,
        address jogador
    );

    function criarNovaInstanciaJogo(uint chosenNumber) public payable {
        require(msg.sender != owner, "Dono do contrato nao joga");
        require(msg.value == preco_jogo, "Valor deve ser 1 ether");
        uint _numeroEscolhido = chosenNumber;

        require(_numeroEscolhido >= 1 && _numeroEscolhido <= 6, "Escolha entre 1 e 6!!!");

        // Verificar se o contador está zerado
        require(contador == 0, "A criacao de instancias de jogo so e permitida quando o contador estiver zerado.");

        jogadorIniciouJogo[msg.sender] = true;
        
		jaEscolhido[_numeroEscolhido].valid = true;

        fora.push(_numeroEscolhido);
    
        s_jogador.push(payable(msg.sender));

        jogadorPorNumero[_numeroEscolhido] = msg.sender; 

        contador++;
        
        if (contador == 1) {
            emit NovaInstanciaJogo(_numeroEscolhido, msg.sender);            
        }

        numeroContrato++;

    }
  
   
    event numeroEscolhidoRegistrado(address jogador, uint numeroEscolhido);

    function jogar(uint _numeroEscolhido) public payable {
        require(msg.sender != owner, "Dono do contrato nao joga");
        require(ja_participa[msg.sender] == false, "Vc ja participa");
        require(msg.value == preco_jogo, "valor de 1 ether");
        require(
            _numeroEscolhido >= 1 && _numeroEscolhido <= 6,
            "Escolha entre 1 e 6!!!"
        );
        require(contador != 6, "Sala cheia!!!");

   
        

        require(jogadorIniciouJogo[msg.sender] == false, "Voce ja iniciou um jogo.");
        numeroEscolhido1[msg.sender].numeroEscolhido = _numeroEscolhido;
        require(!jaEscolhido[_numeroEscolhido].valid, "Numero ja escolhido!!!");
        ja_participa[msg.sender] = true;
        jaEscolhido[_numeroEscolhido].valid = true;

        fora.push(_numeroEscolhido);

        s_jogador.push(payable(msg.sender));

        jogadorPorNumero[_numeroEscolhido] = msg.sender;

        contador++;

        emit numeroEscolhidoRegistrado(msg.sender, _numeroEscolhido);

        if (contador == 6) {
            anunciarVencedor();
        }
    }

    event VencedorAnunciado(
        uint256 indexed numeroContrato,
        uint256 indexed numeroEscolhido,
        address indexed ganhador
    );

    function anunciarVencedor() private {
        require(contador == 6, "O sorteio ainda nao foi realizado");
        uint256 numeroSorteado = numeroAleatorio();

        ultimoNumeroSorteado = numeroSorteado;

        address vencedor = jogadorPorNumero[numeroSorteado];
        if (vencedor == address(0)) {
            vencedor = owner;
        }

        ultimoVencedor = vencedor;
        
        pagarVencedor(vencedor);

        // Emitir o evento para anunciar o vencedor
        emit VencedorAnunciado(numeroContrato, numeroSorteado, vencedor);

        jogos[contador].active = false;
        jogos[contador].numeroEscolhido = numeroSorteado;


        for (uint i = 0; i < fora.length; i++) {
            jaEscolhido[fora[i]].valid = false;
        }

        for (uint i = 0; i < s_jogador.length; i++) {
            ja_participa[s_jogador[i]] = false;
        }

        contador = 0;

        fora = new uint[](0); // Zera a lista de números escolhidos

    }

    function numeroAleatorio() private view returns (uint256) {
        uint256 randomValue = uint256(
            keccak256(abi.encodePacked(block.timestamp))
        );
        return (randomValue % 6) + 1;
    }

    function pagarVencedor(address vencedor) private {
        uint256 premio = (address(this).balance * 9) / 10;
        uint256 taxaDono = address(this).balance - premio;

        payable(vencedor).transfer(premio);
        payable(owner).transfer(taxaDono);
    }

    function Fora() public view returns (uint[] memory) {
        return fora;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function ultimoSorteio() public view returns (uint256, address, uint256, uint8) {
        return (ultimoNumeroSorteado, ultimoVencedor, numeroContrato, contador);
    }
  
}
export const feedDataMock = {
  data: [
    {
      nomeProduto: 'Nome de Produto Físico',
      isOnline: false,
      valorProduto: 40,
      tipoProduto: 'pf',
      dataCadastro: new Date(),
      categoria: 'Vestuário',
      imagePath: 'https://via.placeholder.com/150',
      totalLikes: 0,
      totalDeslikes: 0,
      loc: {
        geo: {
          type: 'Point',
          coordinates: [
            -22.6427968,
            -43.285645099999996
          ]
        },
        endereco: {
          rua: 'Rua sem número',
          numero: '10',
          estado: 'Rio de Janeiro',
          pais: 'Brasil',
          cidade: 'Duque de Caxias'
        }
      }
    },
    {
      nomeProduto: 'Nome de Produto Online',
      isOnline: true,
      valorProduto: 40,
      tipoProduto: 'po',
      dataCadastro: new Date(),
      categoria: 'Vestuário',
      url: 'https://www.nuuvem.com/item/need-for-speed-most-wanted'
    },
    {
      nomeProduto: 'Nome de Serviço',
      isOnline: false,
      valorProduto: 40,
      tipoProduto: 'se',
      // @TODO: provavelmente a label Descrição está errada
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur asperiores eum quasi iusto vitae ratione, consequuntur dolor ad quas eaque magnam nulla fugiat. Adipisci illum esse modi? Nisi, voluptatum sint.',
      dataCadastro: new Date(),
      categoria: 'Vestuário',
      loc: {
        geo: {
          type: 'Point',
          coordinates: [
            -22.6427968,
            -43.285645099999996
          ]
        },
        endereco: {
          rua: 'Rua sem número',
          numero: '10',
          estado: 'Rio de Janeiro',
          pais: 'Brasil',
          cidade: 'Duque de Caxias'
        }
      }
    }
  ]
}

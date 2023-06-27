// Define as unidades de medida para cada categoria
const unidadesMedida = {
  comprimento: ['metros', 'centímetros', 'polegadas'],
  peso: ['quilogramas', 'gramas', 'libras'],
  temperatura: ['Celsius', 'Fahrenheit', 'Kelvin']
}

const selectCategoria = document.getElementById('categoria') // Seleciona o elemento com o id "categoria"
const selectUnidadeOrigem = document.getElementById('unidadeOrigem') // Seleciona o elemento com o id "unidadeOrigem"
const selectUnidadeDestino = document.getElementById('unidadeDestino') // Seleciona o elemento com o id "unidadeDestino"
const resultado = document.getElementById('resultado') // Seleciona o elemento com o id "resultado"

function atualizarOpcoes() {
  const categoria = selectCategoria.value // Obtém o valor selecionado no campo de seleção de categoria
  const unidades = unidadesMedida[categoria] // Obtém as unidades de medida correspondentes à categoria selecionada


  // Limpar as opções existentes
  selectUnidadeOrigem.innerHTML = ''
  selectUnidadeDestino.innerHTML = ''

  // Adicionar as novas opções
  unidades.forEach(function (unidade) {
    const optionOrigem = document.createElement('option') // Cria um elemento de opção
    optionOrigem.text = unidade // Define o texto da opção como a unidade de medida
    const optionDestino = document.createElement('option') // Cria um elemento de opção
    optionDestino.text = unidade // Define o texto da opção como a unidade de medida

    selectUnidadeOrigem.add(optionOrigem) // Adiciona a opção de origem ao campo de seleção de unidade de origem
    selectUnidadeDestino.add(optionDestino) // Adiciona a opção de destino ao campo de seleção de unidade de destino
  })
}

// Converte o valor de uma unidade de comprimento para outra
function converterComprimento(valor, unidadeOrigem, unidadeDestino) {
  if (unidadeOrigem === 'metros' && unidadeDestino === 'centímetros') {
    return valor * 100
  } else if (unidadeOrigem === 'metros' && unidadeDestino === 'polegadas') {
    return valor * 39.37
  } else if (unidadeOrigem === 'centímetros' && unidadeDestino === 'metros') {
    return valor / 100
  } else if (unidadeOrigem === 'centímetros' && unidadeDestino === 'polegadas') {
    return valor * 0.3937
  } else if (unidadeOrigem === 'polegadas' && unidadeDestino === 'metros') {
    return valor / 39.37
  } else if (unidadeOrigem === 'polegadas' && unidadeDestino === 'centímetros') {
    return valor / 0.3937
  } else {
    return valor
  }
}
//Converte o valor de uma unidade de peso para outra
function converterPeso(valor, unidadeOrigem, unidadeDestino) {
  if (unidadeOrigem === 'quilogramas' && unidadeDestino === 'gramas') {
    return valor * 1000
  } else if (unidadeOrigem === 'quilogramas' && unidadeDestino === 'libras') {
    return valor * 2.20462
  } else if (unidadeOrigem === 'gramas' && unidadeDestino === 'quilogramas') {
    return valor / 1000
  } else if (unidadeOrigem === 'gramas' && unidadeDestino === 'libras') {
    return valor * 0.00220462
  } else if (unidadeOrigem === 'libras' && unidadeDestino === 'quilogramas') {
    return valor / 2.20462
  } else if (unidadeOrigem === 'libras' && unidadeDestino === 'gramas') {
    return valor / 0.00220462
  } else {
    return valor
  }
}
//Converte o valor de uma unidade de temperatura para outra
function converterTemperatura(valor, unidadeOrigem, unidadeDestino) {
  if (unidadeOrigem === 'Celsius' && unidadeDestino === 'Fahrenheit') {
    return (valor * 9 / 5) + 32
  } else if (unidadeOrigem === 'Celsius' && unidadeDestino === 'Kelvin') {
    return valor + 273.15
  } else if (unidadeOrigem === 'Fahrenheit' && unidadeDestino === 'Celsius') {
    return (valor - 32) * 5 / 9
  } else if (unidadeOrigem === 'Fahrenheit' && unidadeDestino === 'Kelvin') {
    return (valor + 459.67) * 5 / 9
  } else if (unidadeOrigem === 'Kelvin' && unidadeDestino === 'Celsius') {
    return valor - 273.15
  } else if (unidadeOrigem === 'Kelvin' && unidadeDestino === 'Fahrenheit') {
    return (valor * 9 / 5) - 459.67
  } else {
    return valor
  }
}

function limparResultado() {
  resultado.innerText = ''
}

function converter() {
  limparResultado()

  const valor = parseFloat(document.getElementById('valor').value) // Obtém o valor digitado pelo usuário
  const categoria = selectCategoria.value // Obtém a categoria selecionada
  const unidadeOrigem = selectUnidadeOrigem.value // Obtém a unidade de origem selecionada
  const unidadeDestino = selectUnidadeDestino.value // Obtém a unidade de destino selecionada

  if (!valor || !categoria || !unidadeOrigem || !unidadeDestino) {
    resultado.innerText = 'Preencha todos os campos!' // Exibe uma mensagem de erro se algum campo estiver vazio
    return
  }

  if (categoria === 'temperatura') { //Converte o valor para a unidade de temperatura de destino
    valorConvertido = converterTemperatura(valor, unidadeOrigem, unidadeDestino)
    resultado.textContent = `${valor.toFixed(2)}°${unidadeOrigem.toUpperCase()} é igual a ${valorConvertido.toFixed(2)}°${unidadeDestino.toUpperCase()}.`
  } else if (categoria === 'comprimento') { //Converte o valor para a unidade de comprimento de destino
    valorConvertido = converterComprimento(valor, unidadeOrigem, unidadeDestino)
    resultado.textContent = `${valor.toFixed(2)} ${unidadeOrigem} é igual a ${valorConvertido.toFixed(2)} ${unidadeDestino}.`
  } else if (categoria === 'peso') { //Converte o valor para a unidade de peso de destino
    valorConvertido = converterPeso(valor, unidadeOrigem, unidadeDestino)
    resultado.textContent = `${valor.toFixed(2)} ${unidadeOrigem} é igual a ${valorConvertido.toFixed(2)} ${unidadeDestino}.`
  }
}

selectCategoria.addEventListener('change', atualizarOpcoes) // Adiciona um ouvinte de evento para detectar a mudança na seleção da categoria

const botaoConverter = document.getElementById('converter') // Seleciona o botão com o id "converter"
botaoConverter.addEventListener('click', converter) // Adiciona um ouvinte de evento para detectar o clique no botão de converter

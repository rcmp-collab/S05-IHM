// Definição de uma nova classe que estende HTMLElement, criando um componente personalizado
class AulasComponent extends HTMLElement {
  constructor() {
    super(); // Chama o construtor da classe pai (HTMLElement)

    // Cria um Shadow DOM para encapsular o estilo e o conteúdo do componente
    this.attachShadow({ mode: 'open' }); // 'open' permite acesso externo via this.shadowRoot

    // Define o dia atual como "ter" (terça-feira, provavelmente). Pode ser modificado para dinamismo
    this.hoje = "ter";

    //Tornar o valor de this.hoje dinâmico, pegando o dia da semana automaticamente:
    //const dias = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
    //this.hoje = dias[new Date().getDay()];
  }

  // Método de ciclo de vida do Web Component chamado automaticamente quando o elemento é adicionado ao DOM
  connectedCallback() {
    this.loadData(); // Ao ser inserido na página, o componente carrega os dados das aulas
  }

  // Método assíncrono para carregar o arquivo JSON contendo os dados das aulas
  async loadData() {
    try {
      // Busca o arquivo aulas.json na mesma pasta
      const response = await fetch('aulas.json');

      // Converte o conteúdo da resposta para objeto JSON
      const aulas = await response.json();

      // Chama o método render para desenhar os dados no componente
      this.render(aulas);
    } catch (error) {
      // Caso ocorra algum erro na leitura ou conversão do arquivo, exibe no console
      console.error('Erro ao carregar os dados das aulas:', error);
    }
  }

  // Método responsável por renderizar o conteúdo dentro do Shadow DOM
  render(aulas) {
    // Filtra as aulas para exibir apenas as que correspondem ao dia armazenado em 'this.hoje'
    const aulasDia = aulas.filter(a => a.data === this.hoje);

    // Cria e adiciona um link para o arquivo de estilos CSS externo
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'estilos.css'; // Aponta para o arquivo de estilos
    this.shadowRoot.appendChild(link); // Adiciona o CSS ao Shadow DOM


    // Constrói o conteúdo HTML dinamicamente baseado nas aulas do dia
    this.shadowRoot.innerHTML += `
      <div>
        ${aulasDia.map(a => {
          // Se não houver alerta de prova, oculta o bloco de prova
          let provaDisplay = a.prova_alert ? '' : 'display: none;';
          
          // Gera o bloco HTML para cada aula
          return `
            <div class="comp-aula">
              <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
              <div class="lables">
                <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                <div class="lable-nota p_lable">CR: <b>${a.nota}</b></div>
              </div>
            </div>
          `;
        }).join('')} <!-- Junta todos os blocos HTML em uma única string -->
      </div>
    `;
  }
}


// Registra o componente personalizado com o nome 'aulas-component'
// Com isso, a tag <aulas-component></aulas-component> já pode ser usada no HTML
customElements.define('aulas-component', AulasComponent);

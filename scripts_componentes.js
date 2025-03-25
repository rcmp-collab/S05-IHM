class AulasComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Cria o Shadow DOM
      this.hoje = "ter"; // Dia atual
    }
  
    connectedCallback() {
      this.loadData(); // Carregar dados externos quando o componente for adicionado ao DOM
    }
  
    // Método para carregar dados das aulas a partir do arquivo JSON
    async loadData() {
      try {
        const response = await fetch('aulas.json'); // Carregar os dados do arquivo JSON
        const aulas = await response.json(); // Converter para formato JSON
        this.render(aulas); // Passar os dados para o método render
      } catch (error) {
        console.error('Erro ao carregar os dados das aulas:', error);
      }
    }
  
    // Método para renderizar o conteúdo do componente
    render(aulas) {
      const aulasDia = aulas.filter(a => a.data === this.hoje); // Filtra as aulas para o dia de hoje
  
      // Carregar a folha de estilos externa
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'styles_componentes.css'; // Caminho para o arquivo CSS externo
      this.shadowRoot.appendChild(link); // Adiciona o link ao Shadow DOM
  
      // Criar o conteúdo do componente
      this.shadowRoot.innerHTML += `
        <div>
          ${aulasDia.map(a => {
            let provaDisplay = a.prova_alert ? '' : 'display: none;';
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
          }).join('')}
        </div>
      `;
    }
  }
  
  // Registrando o componente
  customElements.define('aulas-component', AulasComponent);
  
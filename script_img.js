const events = [
    {
        id: 1,
        title: 'Semana da Computação e Software 2024',
        date: '2024-12-05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'tech',
        description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 2,
        title: 'Workshop de IoT',
        date: '2024-12-01',
        time: '08:00',
        location: 'Laboratório CS&I',
        type: 'tech',
        description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 3,
        title: 'Festa dos Alunos',
        date: '2025-05-18',
        time: '19:00',
        location: 'Área Esportiva do Inatel',
        type: 'cultural',
        description: 'Venha comemorar os anos 2010, com a Festa dos Alunos 2025',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 4,
        title: 'Feira de Oportunidades',
        date: '2024-04-05',
        time: '10:00',
        location: 'Salão de Eventos - Prédio V',
        type: 'academic',
        description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
    }
];

const carousel = document.querySelector('.carousel');

// Função para criar os cards
function createCards() {
    events.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="info">
                <h3>${event.title}</h3>
                <p><span class="icon">📅</span> ${event.date} às ${event.time}</p>
                <p><span class="icon">📍</span> ${event.location}</p>
                <p>${event.description}</p>
            </div>
        `;
        carousel.appendChild(card);
    });
}

// Controle do carrossel
let index = 0;
function nextCard() {
    index = (index + 1) % events.length;
    updateCarousel();
}

function prevCard() {
    index = (index - 1 + events.length) % events.length;
    updateCarousel();
}

function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Adicionando interatividade
document.getElementById('nextBtn').addEventListener('click', nextCard);
document.getElementById('prevBtn').addEventListener('click', prevCard);

// Auto avanço a cada 5 segundos
setInterval(nextCard, 5000);

// Arrastar no celular
let startX;
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
});

// Inicializando
createCards();

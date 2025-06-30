const screen = {
  userProfile: document.querySelector('.profile-data'),

  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
        <div class="data">
            <h1>${user.name ?? 'não possui nome cadastrado 😒'}</h1>
            <p>${user.bio ?? 'Não possui bio cadastrada 😒'}</p>
            <p>👥 Seguidores: ${user.followers}</p>
            <p>➡️ Seguindo: ${user.following}</p>
        </div>
    </div>`

    let repositoriesItens = ''
    user.repositories.forEach(repo => {
      repositoriesItens += `<li>
    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
    <span>🍴 Forks: ${repo.forks}</span>
    <span>⭐ Estrelas: ${repo.stars}</span>
    <span>👀 Watchers: ${repo.watchers}</span>
    <span>💻 Linguagem: ${repo.language ?? 'Não especificada'}</span>
  </li>`
    })

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
            <h2>Repositórios</h2>
            <ul>${repositoriesItens}</ul>
        </div>`
    }
  },

  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
  },

  renderEvents(eventos) {
    const eventosSection = document.createElement('div');
    eventosSection.classList.add('eventos');

    const title = document.createElement('h2');
    title.textContent = 'Eventos Recentes';
    eventosSection.appendChild(title);

    eventos.forEach(evento => {
      const repo = evento.repo.name;

      if (evento.type === 'PushEvent') {
        evento.payload.commits.forEach(commit => {
          const item = document.createElement('p');
          item.textContent = `📦 ${repo} - ${commit.message}`;
          eventosSection.appendChild(item);
        });
      }

      if (evento.type === 'CreateEvent') {
        const item = document.createElement('p');
        item.textContent = `📁 ${repo} - Sem mensagem de commit`;
        eventosSection.appendChild(item);
      }
    });

    this.userProfile.appendChild(eventosSection);
  }

}


export { screen }

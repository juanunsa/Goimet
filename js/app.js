// GOIMET - Lógica Dinámica
document.addEventListener('DOMContentLoaded', () => {
  const navContainer = document.getElementById('nav-container');
  const contentFrame = document.getElementById('content-frame');
  const currentPathLabel = document.getElementById('current-path');

  // Cargar datos.json
  fetch('data/datos.json')
    .then(response => {
      if (!response.ok) throw new Error('No se pudo cargar datos.json');
      return response.json();
    })
    .then(data => {
      window.GOIMET_DATA = data;
      renderNavigation(data.navegacion);
      
      // Cargar primera página por defecto (Inicio)
      if (data.navegacion.length > 0) {
        loadPage(data.navegacion[0].url, data.navegacion[0].label, data.navegacion[0].id);
      }
    })
    .catch(error => {
      console.error('Error al iniciar GOIMET:', error);
    });

  function renderNavigation(items) {
    navContainer.innerHTML = '';
    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'nav-item';
      
      const a = document.createElement('a');
      a.className = 'nav-link' + (index === 0 ? ' active' : '');
      a.href = '#';
      a.textContent = item.label;
      a.dataset.url = item.url;
      a.dataset.id = item.id;

      a.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Actualizar clase activa
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        a.classList.add('active');

        // Cargar en el frame
        loadPage(item.url, item.label, item.id);
      });

      li.appendChild(a);
      navContainer.appendChild(li);
    });
  }

  function loadPage(url, label, id) {
    contentFrame.src = url;
    if (currentPathLabel) {
      currentPathLabel.textContent = `oran.unsa.edu.ar / goimet / ${id}.html`;
    }
  }
});

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search').focus();
  });
  
  document.getElementById('search').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    chrome.tabs.query({}, (tabs) => {
      const results = tabs.filter(tab => tab.title.toLowerCase().includes(query));
      displayResults(results);
    });
  });
  
  function displayResults(tabs) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  
    tabs.forEach(tab => {
      const li = document.createElement('li');
      li.tabIndex = 0; 
      li.className = 'result-item'; // Класс для стилизации
  
      // Добавляем иконку вкладки
      const icon = document.createElement('img');
      icon.src = tab.favIconUrl || 'default-icon.png'; // Используем иконку или запасное изображение
      icon.alt = '';
      icon.className = 'tab-icon'; // Класс для стилизации иконки
  
      // Добавляем название вкладки
      const title = document.createElement('span');
      title.textContent = tab.title;
  
      // Обработчик клика для активации вкладки
      li.onclick = () => chrome.tabs.update(tab.id, { active: true });
  
      // Обработка клавиши Enter для активации вкладки
      li.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          chrome.tabs.update(tab.id, { active: true });
        }
      });
  
      // Вставляем иконку и название в элемент списка
      li.appendChild(icon);
      li.appendChild(title);
      resultsContainer.appendChild(li);
    });
  }
  
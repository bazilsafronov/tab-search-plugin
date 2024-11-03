chrome.commands.onCommand.addListener((command) => {
    if (command === "_execute_action") {
      // Открытие интерфейса поиска или выполнение поиска
      chrome.action.openPopup();
    }
  });
  
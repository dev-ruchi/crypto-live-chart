export function saveToStorage(symbol, data) {
    localStorage.setItem(symbol, JSON.stringify(data));
  }
  
  export function loadFromStorage(symbol) {
    const savedData = localStorage.getItem(symbol);
    return savedData ? JSON.parse(savedData) : [];
  }
  
fetch('letters.json')
  .then(response => response.json())
  .then(data => {
    const today = new Date().toISOString().slice(0, 10);
    const letter = data.find(item => item.date === today);
    const box = document.getElementById('letter-box');
    if (letter) {
      box.textContent = letter.content;
    } else {
      box.textContent = '今天还没有信件噢…但你知道我一直都在写着吧，对吗？';
    }
  });
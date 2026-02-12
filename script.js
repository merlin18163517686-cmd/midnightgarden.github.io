// script.js

document.addEventListener('DOMContentLoaded', () => {
  const letterBox = document.getElementById('letter');

  // 把今天的日期变成 "YYYY-MM-DD" 格式（用本地时间）
  function getTodayKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  fetch('letters.json')
    .then(res => res.json())
    .then(letters => {
      const todayKey = getTodayKey();
      const allDates = Object.keys(letters).sort(); // 升序排列日期
      letterBox.innerHTML = '';

      // === 今天的信 ===
      const todayText = letters[todayKey];

      if (todayText) {
        const todayBlock = document.createElement('div');
        todayBlock.className = 'today-letter';

        const pre = document.createElement('pre');
        pre.textContent = todayText;  // 保留换行
        todayBlock.appendChild(pre);

        letterBox.appendChild(todayBlock);
      } else {
        const p = document.createElement('p');
        p.className = 'empty-message';
        p.textContent = 'No letter today…';
        letterBox.appendChild(p);
      }

      // === 过去的信 ===
      const pastDates = allDates.filter(date => date < todayKey);

      if (pastDates.length) {
        const heading = document.createElement('h2');
        heading.className = 'past-heading';
        heading.textContent = 'Past letters';
        letterBox.appendChild(heading);

        // 让最近的在最上面
        pastDates.reverse().forEach(date => {
          const block = document.createElement('div');
          block.className = 'past-letter';

          const dateLine = document.createElement('div');
          dateLine.className = 'past-date';
          dateLine.textContent = date;
          block.appendChild(dateLine);

          const pre = document.createElement('pre');
          pre.textContent = letters[date];
          block.appendChild(pre);

          letterBox.appendChild(block);
        });
      }
    })
    .catch(err => {
      console.error(err);
      letterBox.innerHTML =
        '<p class="empty-message">Could not load the letters right now.</p>';
    });
});

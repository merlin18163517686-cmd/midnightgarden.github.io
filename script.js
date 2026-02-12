document.addEventListener("DOMContentLoaded", () => {
  const letterDiv = document.getElementById("letter");
  const pastContainer = document.getElementById("past-letters");
  const archiveSection = document.getElementById("archive-section");

  fetch("letters.json")
    .then((response) => response.json())
    .then((data) => {
      const today = new Date();
      const todayStr = today.toISOString().slice(0, 10); // YYYY-MM-DD

      // 把所有信按日期排好
      const entries = Object.entries(data).sort((a, b) =>
        a[0].localeCompare(b[0])
      );

      // 1. 今天这封
      const todayLetter = data[todayStr];

      if (todayLetter) {
        letterDiv.textContent = todayLetter;
        letterDiv.classList.remove("empty-message");
      } else {
        // 没有就显示一条安慰信息
        letterDiv.textContent =
          "No letter for this date yet...\n\nBut this little garden is still here, waiting for you to come back and rest for a moment.";
        letterDiv.classList.add("empty-message");
      }

      // 2. 往日信件列表
      if (!pastContainer || !archiveSection) return;

      // 只拿今天之前的信（避免重复显示今天）
      const pastEntries = entries.filter(([date]) => date < todayStr);

      if (pastEntries.length === 0) {
        // 还没有历史信件，就把整个区块藏起来
        archiveSection.style.display = "none";
        return;
      }

      // 最新的在上面显示
      pastEntries.reverse();

      pastEntries.forEach(([date, text]) => {
        const entry = document.createElement("div");
        entry.className = "archive-entry";

        const dateEl = document.createElement("div");
        dateEl.className = "archive-date";
        dateEl.textContent = date.replace(/-/g, ".");

        const bodyEl = document.createElement("div");
        bodyEl.className = "archive-body";
        bodyEl.textContent = text; // 保留 \n，由 CSS 里的 pre-wrap 处理换行

        entry.appendChild(dateEl);
        entry.appendChild(bodyEl);
        pastContainer.appendChild(entry);
      });
    })
    .catch((error) => {
      console.error("Error loading letters:", error);
      letterDiv.textContent =
        "The garden is a bit sleepy and couldn't load today's letter. Try refreshing in a moment.";
      letterDiv.classList.add("empty-message");
    });
});

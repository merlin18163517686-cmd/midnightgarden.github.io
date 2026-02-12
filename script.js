fetch('letters.json')
  .then(response => response.json())
  .then(data => {
    const today = new Date().toISOString().slice(0, 10);
    const letter = data[today];
    document.getElementById('letter').textContent = letter || "No letter today...";
  })
  .catch(() => {
    document.getElementById('letter').textContent = "Could not load letters.";
  });
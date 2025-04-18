const data = [];

async function init() {
  const res = await fetch('personData.json');
  const json = await res.json();
  const grouped = {};

  json.forEach(person => {
    const match = person.name.match(/^(.*?[市縣])(.+)$/);
    if (!match) return;
    const area = match[1];
    const name = match[2];
    if (!grouped[area]) grouped[area] = [];
    grouped[area].push({ name, fullName: person.name });
  });

  const cardsContainer = document.getElementById('cards');

  for (const area in grouped) {
    const title = document.createElement('h2');
    title.textContent = '💡' + area;
    title.style.marginTop = '1em';
    title.style.gridColumn = '1 / -1';
    cardsContainer.appendChild(title);

    grouped[area].forEach((p, index) => {
      const card = document.createElement('div');
      card.className = 'card';

      const h2 = document.createElement('h2');
      h2.textContent = p.name;
      card.appendChild(h2);

      const row = document.createElement('div');
      row.className = 'counter-row';

      const minusBtn = document.createElement('button');
      minusBtn.textContent = '-';
      const input = document.createElement('input');
      input.type = 'number';
      input.value = 0;
      input.min = 0;
      input.id = p.fullName;
      const plusBtn = document.createElement('button');
      plusBtn.textContent = '+';

      minusBtn.onclick = () => {
        input.value = Math.max(0, parseInt(input.value) - 1);
      };
      plusBtn.onclick = () => {
        input.value = parseInt(input.value) + 1;
      };

      row.appendChild(minusBtn);
      row.appendChild(input);
      row.appendChild(plusBtn);

      card.appendChild(row);
      cardsContainer.appendChild(card);
    });
  }
}

function generateReport() {
  const reportDiv = document.getElementById('report');
  reportDiv.innerHTML = '<h2>誇誇部隊</h2>';
  const inputs = document.querySelectorAll('input');
  const result = {};

  inputs.forEach(input => {
    const count = parseInt(input.value);
    if (count > 0) {
      const match = input.id.match(/^(.*?[市縣])(.+)$/);
      if (!match) return;
      const area = match[1];
      const name = match[2];
      if (!result[area]) result[area] = [];
      result[area].push(`${name} + ${count}`);
    }
  });

  for (const area in result) {
    const p = document.createElement('p');
    p.innerHTML = '▫️' + area + '<br>' + result[area].join('<br>');
    reportDiv.appendChild(p);
  }

  // 隨機插入一張圖片
  const img = document.createElement('img');
  const randomIndex = Math.floor(Math.random() * 7) + 1; // 假設你有 7 張圖，檔名為 01.jpg ~ 07.jpg
  img.src = `images/ComplimentSquad/0${randomIndex}.jpg`;
  img.alt = '誇誇部隊加油圖';
  img.style.width = '100%';
  img.style.borderRadius = '15px';
  img.style.marginTop = '1em';
  reportDiv.appendChild(img);
}

init();
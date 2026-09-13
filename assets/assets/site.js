document.documentElement.classList.add('js');

const formations = {
  '2-1-2': [2, 1, 2], '2-2-1': [1, 2, 2], '1-2-2': [2, 2, 1],
  '3-1-1': [1, 1, 3], '1-3-1': [1, 3, 1], '1-1-3': [3, 1, 1]
};
const players = [
  { name: 'TATSU', number: 8 },
  { name: 'DJOCARLO', number: 6 },
  { name: 'MARIE', number: 21 },
  { name: 'COCO', number: 10 },
  { name: 'C', number: 15 }
];

function renderFormation(key) {
  const [attack, midfield, defense] = formations[key];
  let nameIndex = 0;
  [['attack', attack], ['midfield', midfield], ['defense', defense]].forEach(([line, count]) => {
    const row = document.querySelector(`[data-line="${line}"]`);
    row.innerHTML = '';
    for (let i = 0; i < count; i += 1) {
      const player = document.createElement('span');
      player.className = 'player-token';
      player.innerHTML = `<b>${players[nameIndex].name}</b><i>${players[nameIndex].number}</i>`;
      row.append(player);
      nameIndex += 1;
    }
  });
  document.getElementById('formation-note').innerHTML = window.MIH_I18N.formatFormation(key, defense, midfield, attack);
}

document.addEventListener('mih:languagechange', () => {
  const active = document.querySelector('[data-formation][aria-pressed="true"]');
  renderFormation(active ? active.dataset.formation : '2-1-2');
});

document.querySelectorAll('[data-formation]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-formation]').forEach((item) => item.setAttribute('aria-pressed', 'false'));
    button.setAttribute('aria-pressed', 'true');
    renderFormation(button.dataset.formation);
  });
});
renderFormation('2-1-2');

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((item) => item.setAttribute('aria-pressed', 'false'));
    button.setAttribute('aria-pressed', 'true');
    document.querySelectorAll('.reference-card').forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.type !== filter;
    });
  });
});

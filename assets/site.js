document.documentElement.classList.add('js');

const formations = {
  '2-1-2': [2, 1, 2], '2-2-1': [1, 2, 2], '1-2-2': [2, 2, 1],
  '3-1-1': [1, 1, 3], '1-3-1': [1, 3, 1], '1-1-3': [3, 1, 1]
};
const playerNames = ['TATSU', 'COCO', 'JO', 'THEO', 'ANDREA'];

function renderFormation(key) {
  const [attack, midfield, defense] = formations[key];
  let nameIndex = 0;
  [['attack', attack], ['midfield', midfield], ['defense', defense]].forEach(([line, count]) => {
    const row = document.querySelector(`[data-line="${line}"]`);
    row.innerHTML = '';
    for (let i = 0; i < count; i += 1) {
      const player = document.createElement('span');
      player.className = 'player-token';
      player.innerHTML = `<b>${playerNames[nameIndex].slice(0, 3)}</b><i>${[9, 8, 10, 19, 2][nameIndex]}</i>`;
      row.append(player);
      nameIndex += 1;
    }
  });
  document.getElementById('formation-note').innerHTML = `<strong>${key}:</strong> up to ${defense} Defense, ${midfield} Midfield and ${attack} Attack Action card${attack > 1 ? 's' : ''}.`;
}

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

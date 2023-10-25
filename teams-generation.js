async function getTeamsData() {
  return fetch('./teams.json')
    .then((response) => response.json())
}

function generateTeamDiv(name, colors, img_src, position) {
  var style = document.createElement('style');
  style.innerHTML = `
    .${name}-colors {
      position: relative;
      bottom: -20px;
      height: 20px;
      width: 100px;
      background: repeating-linear-gradient(
        90deg,
        ${colors[0]},
        ${colors[0]} 50px,
        ${colors[1]} 50px,
        ${colors[1]} 100px
      );
      border: solid 1px ${colors[0]}
    }
  `;
  document.getElementsByTagName('head')[0].appendChild(style);
  
  teams_div.innerHTML += `
    <div class="team">
      <div class="team-info">
        <img src=${img_src} alt=${name}>
        <div class="team-text">
          <h3>${name}</h3>
          <p>${position}º Posição</p>
        </div>
      </div>
      <div class="${name}-colors">&nbsp;</div>
    </div>
  `
}

const teams_div = document.getElementById('teams-container');

getTeamsData().then((data) => {
  console.log(data)

  for (const team of data) {
    generateTeamDiv(team.name, team.colors, team.img_src, team.position);
  }
})


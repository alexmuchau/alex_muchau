// -----------> BUSCA DADOS DOS TIMES -----------------
async function getTeamsData() {
  return fetch('./teams.json')
    .then((response) => response.json())
}

// -----------> CRIA ESTILIZAÇÃO E DIV DO TIME --------
function generateTeamDiv(name, colors, img_src, position) {
  let style = document.createElement('style');

  // ----> NORMALIZAÇÃO DOS NOMES, EX: Sao Paulo -> SaoPaulo
  const colorsClass = name.split(' ').filter(Boolean).join('') + '-colors'
  style.innerHTML = `
    .${colorsClass} {
      height: 20px;
      width: 100px;
      background: repeating-linear-gradient(
        90deg,
        ${colors.length > 2
          ? `${colors[0]},
          ${colors[0]} 33px,
          ${colors[1]} 33px,
          ${colors[1]} 66px,
          ${colors[2]} 66px,
          ${colors[2]} 100px`

          : `${colors[0]},
          ${colors[0]} 50px,
          ${colors[1]} 50px,
          ${colors[1]} 100px`
        }
        
      );
      border: solid 1px ${colors[0]}
    }
  `
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
      <div class="${colorsClass}">&nbsp;</div>
    </div>
  `
}

// ----> ENCONTRA O CONTAINER DO CATÁLOGO
const teams_div = document.getElementById('teams-container');

// -----------> INICIA BUSCA DOS DADOS ----------------
getTeamsData().then((data) => {
  // DEBUG
  // console.log(data)
  data.sort((t1, t2) => t1.position - t2.position)

  // ----> ITERA SOBRE TODOS OS TIMES
  for (const team of data) {
    generateTeamDiv(team.name, team.colors, team.img_src, team.position);
  }
})


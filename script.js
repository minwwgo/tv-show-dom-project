//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  showAllEpisodeInfo(allEpisodes);
  select(allEpisodes)
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}
function showEpisodeInfo(Episode) {
  const divElem = document.querySelector(".container");
  const episodeEleDiv = document.createElement("div");
  const episodeNameEleP = document.createElement("p");
  const episodeImg = document.createElement("img");
  const episodeSummaryEleP = document.createElement("p");
  episodeEleDiv.classList.add("episode");
  episodeNameEleP.classList.add("episode-title");
  episodeSummaryEleP.classList.add("episode-summary");
  divElem.append(episodeEleDiv);
  episodeEleDiv.append(episodeNameEleP, episodeImg, episodeSummaryEleP);
  const showName = Episode.name;
  const seasonNo = Episode.season.toString().padStart(2, "0");
  const EpisodeNo = Episode.number.toString().padStart(2, "0");
  episodeNameEleP.textContent = `${showName} - S${seasonNo} E${EpisodeNo}`;
  episodeImg.setAttribute("src", `${Episode.image.medium}`);
  episodeSummaryEleP.innerHTML = `${Episode.summary}`;
}
function showAllEpisodeInfo(episodeList) {
  return episodeList.forEach((episode) => showEpisodeInfo(episode));
}

function search(e) {
  e.preventDefault();
  const searchInfo = form.searchbox.value.toLowerCase();
  const allEpisodes = getAllEpisodes();
  showMatchEpisodeInfo(allEpisodes, searchInfo);
}

function showMatchEpisodeInfo(episodeList, searchInfo) {
  const matchingEpisode = episodeList.filter((episode) => {
    const matchEpisodeName = episode.name.toLowerCase().includes(searchInfo);
    const matchEpisodeSummary = episode.summary
      .toLowerCase()
      .includes(searchInfo);
    if (matchEpisodeName || matchEpisodeSummary) {
      return episode;
    }
  });
  document.querySelector(
    ".searchList"
  ).innerHTML = `Displaying ${matchingEpisode.length}/ ${episodeList.length}episodes`;
  return displaySearchEpisode(matchingEpisode);
}

const displaySearchEpisode = (episodeList) => {
  const htmlString = episodeList.map((episode) => {
    return `<div class="episode">
              <p class="episode-title">${
                episode.name
              }-S${episode.season
      .toString()
      .padStart(2, "0")}-E${episode.number.toString().padStart(2, "0")}</p>
              <img src='${episode.image.medium}'></img>
              <p class='episode-summary'>${episode.summary}</p>
            </div>`;
  });

  document.querySelector(".container").innerHTML = htmlString;
};

const form = document.querySelector(".searchform");
form.addEventListener("submit", (e) => search(e));

form.addEventListener("keyup", (e) => search(e));

const selectForm= document.getElementById('select')

function select(episodeList){
episodeList.forEach(episode=>{
  
  const option=document.createElement('option')
  selectForm.append(option)
  option.innerHTML=`${
  episode.name
}-S${episode.season
.toString()
.padStart(2, "0")}-E${episode.number.toString().padStart(2, "0")}
`
})}

selectForm.addEventListener('change', (e)=>{
  
  const episode = e.target.value
  if(episode){
    console.log(episode)
    
    
  }
  console.log(episode)
})


function selectDisplay(episode){
  return `<div class="episode">
              <p class="episode-title">${
                episode.name
              }-S${episode.season
      .toString()
      .padStart(2, "0")}-E${episode.number.toString().padStart(2, "0")}</p>
              <img src='${episode.image.medium}'></img>
              <p class='episode-summary'>${episode.summary}</p>
            </div>`;
}

window.onload = setup;

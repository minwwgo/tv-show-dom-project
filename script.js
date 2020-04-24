//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  showAllEpisodeInfo(allEpisodes);
  showMatchEpisodeInfo(allEpisodes);
  searchingEpisode(allEpisodes);
  select(allEpisodes);
  selectEpisodeInfo(allEpisodes);
  const allShowList = getAllShows();
  allShowInfo(allShowList);
  selectShow(allShowList);
  sortOption();
  // const showOne = getOneShow();
  // oneShowDisplay(showOne)
}

function showEpisodeInfo(Episode) {
  const divElem = document.querySelector('.show-start');
  
  const episodeEleDiv = document.createElement('div');
  const episodeNameEleP = document.createElement('p');
  const episodeImg = document.createElement('img');
  const episodeSummaryEleP = document.createElement('div');

  episodeEleDiv.classList.add('episode','lg-col-4');

  episodeNameEleP.classList.add('episode-title');

  episodeSummaryEleP.classList.add('episode-summary');

  divElem.append(episodeEleDiv);

  episodeEleDiv.append(episodeNameEleP, episodeImg, episodeSummaryEleP);

  const showName = Episode.name;
  const seasonNo = Episode.season.toString().padStart(2, '0');

  const EpisodeNo = Episode.number.toString().padStart(2, '0');

  episodeNameEleP.textContent = `${showName} - S${seasonNo} E${EpisodeNo}`;

  episodeImg.setAttribute('src', `${Episode.image.medium}`);

  episodeSummaryEleP.innerHTML = `${Episode.summary}`;
}
function showAllEpisodeInfo(episodeList) {
  return episodeList.forEach((episode) => showEpisodeInfo(episode));
}

function showMatchEpisodeInfo(episodeList) {
  const input = document.querySelector('.input-search');
  const matchingEpisode = episodeList.filter((episode) => {
    const searchInfo = input.value.toLowerCase();
    const matchEpisodeName = episode.name.toLowerCase().includes(searchInfo);
    const matchEpisodeSummary = episode.summary
      .toLowerCase()
      .includes(searchInfo);
    if (matchEpisodeName || matchEpisodeSummary) {
      return episode;
    }
  });

  document.querySelector(
    '.searchList'
  ).innerHTML = `Displaying ${matchingEpisode.length} / ${episodeList.length} episodes`;
  return displaySearchEpisode(matchingEpisode);
}

const displaySearchEpisode = (episodeList) => {
  const htmlString = episodeList.map((episode) => {
    return `<div class='col-12 sm-col-12 md-col-12 lg-col-3 episode'>
      <p class='episode-title'>${
        episode.name
      }-S${episode.season
      .toString()
      .padStart(2, '0')}-E${episode.number.toString().padStart(2, '0')}</p>
              
      <img src='${episode.image.medium}'></img>
      <div class='episode-summary'>${episode.summary}</div>
      </div>`;
  });

  document.querySelector('.show-start').innerHTML = htmlString;
};

function searchingEpisode(episodeList) {
  const input = document.querySelector('.input-search');
  input.addEventListener('keyup', () => {
    const matchingEpisode = episodeList.filter((episode) => {
      const searchInfo = input.value.toLowerCase();
      const matchEpisodeName = episode.name.toLowerCase().includes(searchInfo);
      const matchEpisodeSummary = episode.summary
        .toLowerCase()
        .includes(searchInfo);
      if (matchEpisodeName || matchEpisodeSummary) {
        return episode;
      }
    });
    document.querySelector(
      '.searchList'
    ).innerHTML = `Displaying ${matchingEpisode.length} / ${episodeList.length} episodes`;

    return displaySearchEpisode(matchingEpisode);
  });
}

function select(episodeList) {
  const selectForm = document.getElementById('select');
  episodeList.forEach((episode) => {
    const option = document.createElement('option');
    option.setAttribute('value', `${episode.name}`);
    selectForm.append(option);
    option.innerHTML = `S${episode.season
      .toString()
      .padStart(2, '0')}-E${episode.number.toString().padStart(2, '0')}-
      ${episode.name}`;
  });
}

function selectEpisodeInfo(episodeList) {
  const selectForm = document.getElementById('select');
  selectForm.addEventListener('change', (e) => {
    const selectMatchEpisode = episodeList.filter((episode) => {
      if (episode.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return episode;
      }
    });
    document.querySelector(
      '.searchList'
    ).innerHTML = `Displaying ${selectMatchEpisode.length} / ${episodeList.length} episodes`;

    return displaySearchEpisode(selectMatchEpisode);
  });
}
//lv004
function oneShowInfo(show) {
  const shows = document.getElementById('shows');
  const showOptionEle = document.createElement('option');
  shows.append(showOptionEle);
  showOptionEle.setAttribute('value', `${show.id}`);
  showOptionEle.innerHTML = show.name;
}

function allShowInfo(showList) {
  showList.forEach((show) => oneShowInfo(show));
}

function selectShow(showList) {
  shows.addEventListener('change', (e) => {
    let showEpisode = document.getElementById('select');
    while (showEpisode.firstChild) {
      showEpisode.removeChild(showEpisode.lastChild);
    }
    const episodeOption = document.createElement('option');
    showEpisode.append(episodeOption);
    episodeOption.textContent = 'All Episodes';
    episodeOption.setAttribute('value','');

    showList.filter((show) => {
      if (e.target.value == show.id) {
        return showEpisodeDisplay(show.id);
      }
    });
  });
}

function showEpisodeDisplay(showId) {
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((res) => res.json())
    .then((data) => {
      showAllEpisodeInfo(data);
      showMatchEpisodeInfo(data);
      select(data);
      selectEpisodeInfo(data);
      searchingEpisode(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
console.log();
function sortOption() {
  const shows = document.getElementById('shows');
  const sortedOption = Array.from(shows.options).sort((a, b) => {
    if (a.text < b.text) return -1;
    if (a.text > b.text) return 1;
    return 0;
  });
  sortedOption.forEach((option) => shows.add(option));
}
//lv005
function oneShowDisplay(show) {
  const showHolder = document.querySelector('.show-start');
  const showName = document.createElement('h1');
  const showNameTxt = document.createTextNode(`
  ${show.name}`);
  showName.appendChild(showNameTxt);
  const showContent = document.createElement('div');
  const showImage = document.createElement('img');
  showImage.setAttribute('src', `${show.image.medium}`);
  // const showSummary= document.createElement('p')
  // const showDescription= document.createElement('ul')
  // showHolder.append(showName,showImage,showSummary,showDescription)
  showHolder.append(showName,showImage);
  console.log(showNameTxt);
}

window.onload = setup;

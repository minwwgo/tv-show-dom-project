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
  }

function showEpisodeInfo(episode) {
  const divElem = document.querySelector('.show-start');
  const episodeEleDiv = document.createElement('div');
  const episodeNameEleP = document.createElement('p');
  const episodeImg = document.createElement('img');
  const episodeSummaryEleDiv = document.createElement('div');
  const episodeHolderDiv = document.createElement('div')
  let classToAdd = ['col-12','sm-col-12','md-col-12','lg-col-3','episode-holder']
  episodeEleDiv.classList.add(...classToAdd);
  episodeHolderDiv.classList.add('episode')
  episodeNameEleP.classList.add('episode-title');
  episodeSummaryEleDiv.classList.add('episode-summary');
  divElem.append(episodeEleDiv);
  episodeEleDiv.append(episodeHolderDiv,episodeNameEleP, episodeImg, episodeSummaryEleDiv);
  const showName = episode.name;
  const seasonNo = episode.season.toString().padStart(2, '0');
  const episodeNo = episode.number.toString().padStart(2, '0');
  episodeNameEleP.textContent = `${showName} - S${seasonNo} E${episodeNo}`;
  // episodeImg.setAttribute('src',`${episode.image.medium}`);
  episodeImg.src =`${episode.image ? episode.image.medium :"https://askleo.com/wp-content/uploads/2013/07/image_not_found.png}" }`;
  episodeSummaryEleDiv.textContent = `${episode.summary}`;
}

function showAllEpisodeInfo(episodeList) {
  return episodeList.forEach((episode) => showEpisodeInfo(episode));
}

function showMatchEpisodeInfo(episodeList) {
  const input = document.querySelector('.input-search');
    const matchingEpisode = episodeList.filter((episode) => {
    const searchInfo = input.value.toLowerCase();
    const matchEpisodeName = episode.name.toLowerCase().includes(searchInfo);
      episode.summary ? episode.summary.toLowerCase().includes(searchInfo) : null;
      if (matchEpisodeName || episode.summary) {
        return episode;
      }
  });
    document.querySelector(
    '.searchList'
  ).innerHTML = `${matchingEpisode.length} | ${episodeList.length}`;
   
  return displaySearchEpisode(matchingEpisode);
}

const displaySearchEpisode = (episodeList) => {
  const htmlString = episodeList.map((episode) => {
    return `<div class='col-12 sm-col-12 md-col-12 lg-col-3 episode-holder'>
    <div class='episode'>
      <p class='episode-title'>${
        episode.name
      }-S${episode.season.toString()
      .padStart(2,'0')}-E${episode.number.toString().padStart(2,'0')}</p>
      <img src ='${episode.image ? episode.image.medium : "https://askleo.com/wp-content/uploads/2013/07/image_not_found.png" }'/>
      <div class='episode-summary'>${episode.summary}</div>
      </div>
      </div>`;
    })
  let myString=htmlString.toString().replace (/,/g, "") 
  document.querySelector('.show-start').innerHTML = myString
};

function searchingEpisode(episodeList) {
  const input = document.querySelector('.input-search');

    input.addEventListener('keyup', () => {
    const matchingEpisode = episodeList.filter((episode) => {
      
      const searchInfo = input.value.toLowerCase();
      const matchEpisodeName = episode.name.toLowerCase().includes(searchInfo);
      const matchEpisodeSummary = episode.summary.toLowerCase().includes(searchInfo);
      
      if (matchEpisodeName || matchEpisodeSummary) {
        return episode;
      }
    });
    document.querySelector('.searchList').innerHTML = 
    `${matchingEpisode.length} / ${episodeList.length}`;

    return displaySearchEpisode(matchingEpisode);
  });
}

function select(episodeList) {
  const selectForm = document.getElementById('select');

  episodeList.forEach((episode) => {
    const option = document.createElement('option');
    
    option.setAttribute('value',`${episode.name}`);
    
    selectForm.append(option);

    option.innerHTML =`
      S${episode.season.toString().padStart(2, '0')}
      -E${episode.number.toString().padStart(2, '0')}
        -${episode.name}`;
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
    ).innerHTML = `${selectMatchEpisode.length} / ${episodeList.length}`;

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
    .then((res) =>{return res.json()})
    .then((data) => {
      showAllEpisodeInfo(data);
      showMatchEpisodeInfo(data);
      select(data);
      selectEpisodeInfo(data);
      searchingEpisode(data);
      
    })
    .catch((error) => {
      console.log(error)
    });
}


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

window.onload = setup;

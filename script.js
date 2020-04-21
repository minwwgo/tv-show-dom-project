//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  showAllEpisodeInfo(allEpisodes)

}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}
function showEpisodeInfo(Episode){
  const rootElem = document.getElementById("root");
  const episodeEleDiv=document.createElement('div')
  const episodeNameEleP= document.createElement('p')
  const episodeImg=document.createElement('img')
  const episodeSummaryEleP=document.createElement('p')
  rootElem.append(episodeEleDiv)
  episodeEleDiv.append(episodeNameEleP,episodeImg,episodeSummaryEleP)
  const showName=Episode.name
  const seasonNo=Episode.season.toString().padStart(2,'0')
  const EpisodeNo=Episode.number.toString().padStart(2,'0')
  episodeNameEleP.textContent= `${showName} - S${seasonNo} E${EpisodeNo}`
  episodeImg.setAttribute('src',`${Episode.image.medium}`)
  episodeSummaryEleP.textContent=`${Episode.summary}`
}
function showAllEpisodeInfo(episodeList){
  return episodeList.forEach(episode=>showEpisodeInfo(episode))

}
window.onload = setup;

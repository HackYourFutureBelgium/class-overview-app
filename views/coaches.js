import coachThumb from './coach-thumb.js'

export default (state, coaches) => {
  const coachContainer = document.createElement('div');
  // coachContainer.style = "padding-right: 5%; padding-left: 5%; margin-bottom: 3%;"
  coachContainer.className = 'coaches';

  const coachesHead = document.createElement('h2');
  coachesHead.innerHTML = "Coaches";
  coachContainer.appendChild(coachesHead);

  const coachThumbs = coaches
    .map(coach => coachThumb(state, coach))
    .reduce((div, thumb) => {
      div.appendChild(thumb);
      return div;
    }, document.createElement('div'));
  coachThumbs.className = 'coach-thumbs';

  coachContainer.appendChild(coachThumbs);

  return coachContainer;
}

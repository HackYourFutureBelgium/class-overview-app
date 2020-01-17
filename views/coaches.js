import coachThumb from './coach-thumb.js'

export default (state, coaches) => {
  const coachContainer = document.createElement('div');
  coachContainer.style = "padding-right: 5%; padding-left: 5%; margin-bottom: 3%;"

  const coachesHead = document.createElement('h2');
  coachesHead.innerHTML = "Coaches";
  coachContainer.appendChild(coachesHead);

  const coachesList = coaches
    .map(coach => coachThumb(state, coach))
    .reduce((ul, thumb) => {
      const li = document.createElement('li');
      li.appendChild(thumb);
      ul.appendChild(li);
      return ul;
    }, document.createElement('ul'));

  coachContainer.appendChild(coachesList);
  return coachContainer;
}

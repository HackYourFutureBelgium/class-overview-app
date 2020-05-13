export default (renderer, args, text) => {
  const navButton = document.createElement('button');
  navButton.innerHTML = text || 'details';
  navButton.onclick = () => {
    const moduleEl = renderer(...args);
    state.body.innerHTML = '';
    state.body.appendChild(moduleEl);
  };

  return navButton;
}

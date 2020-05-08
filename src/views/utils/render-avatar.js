// https://stackoverflow.com/a/5695112

export default (user) => {
  if (user.img) {
    return user.img.cloneNode(true);
  }

  const userImg = document.createElement('img');
  userImg.alt = `avatar: ${user.userName}`;
  userImg.className = 'student-thumb-img';
  userImg.src = `https://github.com/${user.userName}.png?size=150`

  user.img = userImg;

  return userImg;
};


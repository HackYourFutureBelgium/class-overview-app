// https://stackoverflow.com/a/5695112

export default (user) => {
  if (user.activity) {
    return user.activity.cloneNode(true);
  }

  const userImg = document.createElement('img');
  userImg.alt = `activity: ${user.userName}`;
  userImg.src = `https://ghchart.rshah.org/${user.userName}`;

  user.activity = userImg;

  return userImg;
};


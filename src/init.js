import classOverview from './app.js'

export default async () => {

  const load = async path => {
    console.log('... loading ', path)
    try {
      const res = await fetch(path);
      return res.json();
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  const preState = await load('./class-data/index.json');
  if (preState instanceof Error) return;

  preState.students = await load('./class-data/students.json');
  if (preState.students instanceof Error) return;

  preState.coaches = await load('./class-data/coaches.json');
  if (preState.coaches instanceof Error) return;

  preState.modules = await load('./class-data/modules.json');
  if (preState.modules instanceof Error) return;

  preState.modules.forEach(module => {
    module.coaches = [];
    preState.coaches.forEach(coach => {
      if (coach.modules.find(module => module.repoName)) {
        module.coaches.push(coach);
      }
    });
  })

  console.log('... loading student pictures');
  window.state = classOverview(preState, document.getElementById('root'));

  console.log('initial state:', state);

};

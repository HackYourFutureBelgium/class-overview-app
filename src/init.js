import classOverview from './app.js'

export default () => {

  const load = path => fetch(path)
    .then(res => res.json())
    .catch(err => console.log(err));

  console.log('loading data ...');

  Promise.all([
    load('./class-data/index.json'),
    load('./class-data/students.json'),
    load('./class-data/coaches.json'),
    load('./class-data/modules.json')
  ])
    .then(datas => {
      console.log('building state ...');
      const preState = datas[0];
      preState.students = datas[1];
      preState.coaches = datas[2];
      preState.modules = datas[3];
      preState.modules.forEach(module => {
        module.coaches = [];
        preState.coaches.forEach(coach => {
          if (coach.modules.find(module => module.repoName)) {
            module.coaches.push(coach);
          }
        });
      })

      console.log('rendering ...');
      window.state = classOverview(preState, document.getElementById('root'));

      console.log('initial state:', state);

    })
    .catch(err => console.error(err));




};

import home from './home.js';
import randomizer from './randomizer.js';

export default state => {
  const container = document.createElement('div');
  container.className = 'header-footer';
  container.id = 'class-app';

  container.appendChild(document.createElement('hr'));

  const header = document.createElement('div');
  header.className = 'header-footer-header';
  const overviewButton = document.createElement('button');
  overviewButton.innerHTML = 'Class Home Page';
  const toHome = () => {
    history.pushState({}, null, window.location.pathname);
    state.currentModule = null;
    state.currentStudent = null;
    state.body.innerHTML = '';
    state.body.appendChild(home(state));
  };
  overviewButton.onclick = toHome;
  header.appendChild(overviewButton);

  // const boardsA = document.createElement('a');
  // boardsA.href =
  //   'https://github.com/' + state.userName + '/' + state.repoName + '/projects';
  // boardsA.target = '_blank';
  // const boardsButton = document.createElement('button');
  // boardsButton.innerHTML = 'Class HW Boards';
  // boardsA.appendChild(boardsButton);
  // header.appendChild(boardsA);

  const sundayReviewsA = document.createElement('a');
  sundayReviewsA.href =
    'https://github.com/' + state.userName + '/' + state.repoName + '/issues?q=label%3Asunday-review';
  sundayReviewsA.target = '_blank';
  const sundayReviewsButton = document.createElement('button');
  sundayReviewsButton.innerHTML = 'Sunday Reviews';
  sundayReviewsA.appendChild(sundayReviewsButton);
  header.appendChild(sundayReviewsA);

  const issuesA = document.createElement('a');
  issuesA.href =
    'https://github.com/' + state.userName + '/' + state.repoName + '/issues';
  issuesA.target = '_blank';
  const issuesButton = document.createElement('button');
  issuesButton.innerHTML = 'Class Issues';
  issuesA.appendChild(issuesButton);
  header.appendChild(issuesA);

  const repoA = document.createElement('a');
  repoA.href = 'https://github.com/' + state.userName + '/' + state.repoName;
  repoA.target = '_blank';
  const repoButton = document.createElement('button');
  repoButton.innerHTML = 'Class Repo';
  repoA.appendChild(repoButton);
  header.appendChild(repoA);

  const randomizerButton = document.createElement('button');
  randomizerButton.innerHTML = 'Randomizer';
  randomizerButton.onclick = () => {
    state.currentModule = null;
    state.currentStudent = null;
    state.body.innerHTML = '';
    state.body.appendChild(randomizer(state));
  };
  header.appendChild(randomizerButton);

  header.appendChild(document.createElement('br'));
  header.appendChild(document.createElement('br'));


  const hyfHomeA = document.createElement('a');
  hyfHomeA.href =
    `https://home.${state.domain}/`;
  hyfHomeA.target = '_blank';
  const hyfHomeButton = document.createElement('button');
  hyfHomeButton.innerHTML = 'HYF Home';
  hyfHomeA.appendChild(hyfHomeButton);
  header.appendChild(hyfHomeA);

  const homeworkSubmissionA = document.createElement('a');
  homeworkSubmissionA.href =
    `https://home.${state.domain}/students/homework-submission`;
  homeworkSubmissionA.target = '_blank';
  const homeworkSubmissionButton = document.createElement('button');
  homeworkSubmissionButton.innerHTML = 'Homework Submission';
  homeworkSubmissionA.appendChild(homeworkSubmissionButton);
  header.appendChild(homeworkSubmissionA);

  const studyResourcesA = document.createElement('a');
  studyResourcesA.href = `https://study.${state.domain}`;
  studyResourcesA.target = '_blank';
  const studyResourcesButton = document.createElement('button');
  studyResourcesButton.innerHTML = 'Study Links';
  studyResourcesA.appendChild(studyResourcesButton);
  header.appendChild(studyResourcesA);

  const curriculumA = document.createElement('a');
  curriculumA.href = `https://home.${state.domain}/curriculum`;
  curriculumA.target = '_blank';
  const curriculumButton = document.createElement('button');
  curriculumButton.innerHTML = 'Curriculum';
  curriculumA.appendChild(curriculumButton);
  header.appendChild(curriculumA);

  const studentGuidebookA = document.createElement('a');
  studentGuidebookA.href = `https://home.${state.domain}/students`;
  studentGuidebookA.target = '_blank';
  const studentGuidebookButton = document.createElement('button');
  studentGuidebookButton.innerHTML = 'Student Guidebook';
  studentGuidebookA.appendChild(studentGuidebookButton);
  header.appendChild(studentGuidebookA);

  container.appendChild(header);


  container.appendChild(document.createElement('hr'));


  return container;
};

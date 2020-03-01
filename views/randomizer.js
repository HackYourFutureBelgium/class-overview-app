import renderStudentThumb from './student-thumb.js'

// could permalink this by simply pushing student indices in group order as param
export default (state) => {

  const container = document.createElement('div');

  const initializer = document.createElement('div');

  const initializerText = document.createTextNode('group size: ');
  initializer.appendChild(initializerText);

  const groupSizeInput = document.createElement('input');
  groupSizeInput.value = '2';
  groupSizeInput.type = 'number';
  initializer.appendChild(groupSizeInput);

  const createGroups = document.createElement('button');
  createGroups.innerHTML = 'create groups';
  createGroups.onclick = displayGroups;
  initializer.appendChild(createGroups);

  container.appendChild(initializer);

  const groupsContainer = document.createElement('div');
  container.appendChild(groupsContainer);

  async function displayGroups() {
    groupsContainer.innerHTML = '';
    const rand = Math.random();
    // debugger;
    if (rand < (1 / 3)) {
      const coachChoice = document.createElement('h1');
      coachChoice.innerHTML = "Coaches' Choice";
      groupsContainer.appendChild(coachChoice);
    } else if (rand < 2 / 3) {
      const studentChoice = document.createElement('h1');
      studentChoice.innerHTML = "Students' Choice";
      groupsContainer.appendChild(studentChoice);
    } else {
      const groups = randomizeStudents([...state.students], groupSizeInput.value);
      console.log(groups);
      for (let group of groups) {
        const groupContainer = document.createElement('div');
        groupContainer.style = 'display: flex; flex-direction: row; flex-wrap: wrap;';
        for (let currentStudent of group) {
          const studentThumb = await renderStudentThumb(state, currentStudent);
          groupContainer.appendChild(studentThumb)
        }
        groupsContainer.appendChild(groupContainer);
        groupsContainer.appendChild(document.createElement('hr'));
      }
    }

  }

  return container;

}




function randomizeStudents(students, groupSize) {
  // only works well for small group sizes
  students = students.map(stud => stud);

  // randomize copy of students
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  var currentIndex = students.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = students[currentIndex];
    students[currentIndex] = students[randomIndex];
    students[randomIndex] = temporaryValue;
  }

  const groups = [];
  while (students.length >= groupSize) {
    groups.push(students.splice(0, groupSize))
  }
  if (students.length < ((groupSize / 2) + 1)) {
    groups[groups.length - 1].push(...students);
  } else {
    groups.push(students);
  }

  return groups;
}

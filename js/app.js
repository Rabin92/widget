/* *****************************************************
  Variables
***************************************************** */
// Alert Notification Banner
const alertMessage = document.getElementById('notification');
const closeIcon = document.querySelector('.close-icon');
// Projects list UL
const projectList = document.getElementById('projectList');

// Project form elements
const projectNameInput = document.getElementById('projectName');
const projectHTMLCheckbox = document.getElementById('html');
const projectCSSCheckbox = document.getElementById('css');
const projectJSCheckbox = document.getElementById('js');
const projectDetailsInput = document.getElementById('projectDetails');
const addProjectButton = document.getElementById('addProjectButton');

// Student Invite form elements
const studentNameInput = document.getElementById('studentName');
const studentProjectSelect = document.getElementById('projectSelect');
const inviteStudentButton = document.getElementById('inviteStudentButton');

// Reusable Function
const addClass = (el, classNameOne, classNameTwo) => {
  el.classList.add(classNameOne, classNameTwo);
};
const removeClass = (el, classNameOne, classNameTwo) => {
  el.classList.remove(classNameOne, classNameTwo);
};

// Add this to page dynamically
const createProject = () => {
  const projectName = projectNameInput.value;
  const projectDetails = projectDetailsInput.value;
  const projectHTML = projectHTMLCheckbox.checked;
  const projectCSS = projectCSSCheckbox.checked;
  const projectJS = projectJSCheckbox.checked;

  const liEl = document.createElement('li');
  const divEl = document.createElement('div');
  const h3 = document.createElement('h3');
  const img = document.createElement('img');
  const innerUl = document.createElement('ul');
  const innerLiOne = document.createElement('li');
  const innerLiTwo = document.createElement('li');
  const innerLiThree = document.createElement('li');
  const imgHTML = document.createElement('img');
  const imgCSS = document.createElement('img');
  const imgJS = document.createElement('img');

  const pEl = document.createElement('p');

  addClass(liEl, 'project');
  addClass(divEl, 'project-header', 'flex');
  addClass(h3, 'project-name');
  addClass(img, 'plus-icon', 'pointer');
  addClass(innerUl, 'project-langs', 'flex');
  addClass(innerLiOne, 'project-lang');
  addClass(innerLiTwo, 'project-lang');
  addClass(innerLiThree, 'project-lang');
  addClass(imgHTML, 'html');
  addClass(imgCSS, 'css');
  addClass(imgJS, 'js');
  addClass(pEl, 'project-info', 'hidden');

  h3.textContent = projectName;
  img.src = 'icons/plus-icon.svg';
  img.alt = 'Plus Icon Expand Details';
  imgHTML.src = 'icons/html5.svg';
  imgHTML.alt = 'HTML5 Logo';
  imgCSS.src = 'icons/css3.svg';
  imgCSS.alt = 'CSS3 Logo';
  imgJS.src = 'icons/javascript.svg';
  imgJS.alt = 'JavaScript Logo';
  pEl.textContent = projectDetails;

  projectList.insertBefore(liEl, projectList.firstElementChild);
  liEl.appendChild(divEl);
  liEl.appendChild(pEl);
  divEl.appendChild(h3);
  divEl.appendChild(img);
  divEl.appendChild(innerUl);

  if (projectHTML) {
    innerUl.appendChild(innerLiOne);
    innerLiOne.appendChild(imgHTML);
  }
  if (projectCSS) {
    innerUl.appendChild(innerLiTwo);
    innerLiTwo.appendChild(imgCSS);
  }
  if (projectJS) {
    innerUl.appendChild(innerLiThree);
    innerLiThree.appendChild(imgJS);
  }

  addProjects(projectName);
};

// Scroll Top of the page to display alert message
const goToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// Add project to the select menu
const addProjects = projectTitle => {
  const optionEl = document.createElement('option');
  studentProjectSelect.appendChild(optionEl);
  optionEl.textContent = projectTitle;
};

// Validate form
const validateForm = form => {
  if (form === 'Add project') {
    if (projectNameInput.value !== '' && projectDetailsInput.value !== '') {
      removeClass(alertMessage, 'hidden', 'warning');
      addClass(alertMessage, 'success');
      alertMessage.firstElementChild.firstElementChild.textContent =
        'Your project has been successfully added';
      createProject();
      resetForm('Reset Project');
      goToTop();
    } else {
      removeClass(alertMessage, 'hidden');
      addClass(alertMessage, 'warning');
      alertMessage.firstElementChild.firstElementChild.textContent =
        'Please add a project name and project details';
      goToTop();
    }
  }

  if (form === 'Invite student') {
    const studentName = studentNameInput.value;
    const projectName = studentProjectSelect.value;
    if (studentName !== '') {
      removeClass(alertMessage, 'hidden', 'warning');
      addClass(alertMessage, 'success');
      alertMessage.firstElementChild.firstElementChild.textContent = `${studentName} was added to the project: ${projectName}.`;
      resetForm('Reset Invitees');
      goToTop();
    } else {
      removeClass(alertMessage, 'hidden');
      addClass(alertMessage, 'warning');
      alertMessage.firstElementChild.firstElementChild.textContent =
        'Please enter a student name to invite to a project.';
      goToTop();
    }
  }
};

// Reset form after the submission
const resetForm = form => {
  if (form === 'Reset Project') {
    projectNameInput.value = '';
    projectDetailsInput.value = '';
    projectJSCheckbox.checked = false;
    projectCSSCheckbox.checked = false;
  }

  if (form === 'Reset Invitees') {
    studentNameInput.value = '';
  }
};

// Event Listeners
addProjectButton.addEventListener('click', e => {
  e.preventDefault();
  validateForm('Add project');
});

projectList.addEventListener('click', e => {
  const theTarget = e.target;
  if (theTarget.tagName === 'IMG') {
    theTarget.parentNode.nextElementSibling.classList.toggle('hidden');
  }
});

inviteStudentButton.addEventListener('click', e => {
  e.preventDefault();
  validateForm('Invite student');
});

closeIcon.addEventListener('click', () => {
  addClass(alertMessage, 'hidden');
});

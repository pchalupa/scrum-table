import './components/ScrumApp';
import './components/ToastApp';
import './components/UserApp';
import Firebase from './services/Firebase';
import './index.css';

/** Firebase */
Firebase.initialize();

/** @type {HTMLElement} */
const fragment = document.createDocumentFragment();

/** @type {AppToast} */
const toastApp = document.createElement('toast-app');

/** @type {ScrumApp} */
const scrumApp = document.createElement('scrum-app');
scrumApp.toast = toastApp;

const userApp = document.createElement('user-app');
userApp.toast = toastApp;

fragment.appendChild(userApp);
fragment.appendChild(scrumApp);
fragment.appendChild(toastApp);

document.body.appendChild(fragment);

/** @module ScrumCollection */

import '../ScrumTask';
import Firebase from '../../services/Firebase';
import { container, focus, name, counter, tasks } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class ScrumCollection extends window.HTMLElement {
	static get observedAttributes() {
		return ['title'];
	}

	/** @type {String} */
	set name(value) {
		this._name = value;
	}

	get name() {
		return this._name;
	}

	/** @type {String} */
	set title(value) {
		this.setAttribute('title', value);
	}

	get title() {
		return this.getAttribute('title');
	}

	set focus(status) {
		this.classList.toggle(focus, status);
	}

	get focus() {
		return this.classList.contains(focus);
	}

	constructor() {
		super();
		/** @type {Firebase} */
		this.db = Firebase.db;

		/** @type {HTMLDivElement} */
		this.titleElement = document.createElement('div');
		this.titleElement.classList.add(name);

		/** @type {HTMLSpanElement} */
		this.countElement = document.createElement('span');
		this.countElement.classList.add(counter);
		this.countElement.textContent = 0;

		/** @type {HTMLDivElement} */
		this.tasks = document.createElement('div');
		this.tasks.classList.add(tasks);

		this.addEventListener('dragover', (e) => {
			e.preventDefault();
			this.focus = true;
		});

		this.addEventListener('dragleave', () => {
			this.focus = false;
		});

		this.addEventListener('drop', (e) => {
			e.preventDefault();
			const task = document.getElementById(e.dataTransfer.getData('text'));
			this.focus = false;
			Firebase.updateTaskCollection(task.id, this.name).then(() => {
				this.toast.message = `Úkol byl přesunut do "${this.title}"!`;
			});
		});
	}

	/** Element appends in DOM. */
	connectedCallback() {
		this.classList.add(container);
		this.render();
		this.db
			.collection('tasks')
			.where('collection', '==', this.name)
			.onSnapshot((querySnapshot) => this.handleUpdate(querySnapshot));
	}

	/** Element attributes has change. */
	attributeChangedCallback(attribute, oldValue, newValue) {
		if (attribute === 'title') {
			this.titleElement.innerText = newValue;
		}
	}

	handleUpdate(querySnapshot) {
		this.tasks.innerHTML = '';
		this.countElement.innerText = querySnapshot.size;
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			const task = document.createElement('scrum-task');
			task.id = doc.id;
			task.name = doc.id;
			task.label = data.label;
			task.description = data.name;
			this.tasks.appendChild(task);
		});
	}

	/**
	 * Render component content.
	 */
	render() {
		const fragment = document.createDocumentFragment();

		this.titleElement.appendChild(this.countElement);
		fragment.appendChild(this.titleElement);
		fragment.appendChild(this.tasks);

		this.appendChild(fragment);
	}
}

/** Define custom element. */
window.customElements.define('scrum-collection', ScrumCollection);
export default ScrumCollection;

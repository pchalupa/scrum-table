/** @module ScrumTask */

import Firebase from '../../services/Firebase';
import { container, name, description, label, dragged } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class ScrumTask extends window.HTMLElement {
	static get observedAttributes() {
		return ['name', 'description', 'label'];
	}

	/** @type {String} */
	set name(value) {
		this.setAttribute('name', value);
		this.nameElement.innerText = value;
	}

	get name() {
		return this.getAttribute('name');
	}

	/** @type {String} */
	set description(value) {
		this.setAttribute('description', value);
		this.descriptionElement.innerText = value;
	}

	get description() {
		return this.getAttribute('description');
	}

	set label(value) {
		this.setAttribute('label', value);
	}

	get label() {
		return this.getAttribute('label');
	}

	/** @type {Boolean} */
	set dragged(state) {
		this.classList.toggle(dragged, state);
	}

	constructor() {
		super();

		/** @type {Firebase} */
		this.db = Firebase.db;

		/** @type {Boolean} */
		this.isDraged = false;

		this.addEventListener('dragstart', (e) => {
			e.dataTransfer.setData('text', this.id);
			this.dragged = true;
		});

		/** @type {HTMLDivElement} */
		this.nameElement = document.createElement('h2');
		this.nameElement.classList.add(name);
		this.nameElement.addEventListener('change', () => {
			this.name = this.nameElement.value;
		});

		/** @type {HTMLTextAreaElement} */
		this.descriptionElement = document.createElement('span');
		this.descriptionElement.classList.add(description);
		this.descriptionElement.addEventListener('change', () => {
			this.description = this.descriptionElement.value;
		});

		this.labelElement = document.createElement('span');
		this.labelElement.classList.add(label);

		this.dropdown = document.createElement('dropdown-app');
	}

	/** Element appends in DOM. */
	connectedCallback() {
		this.draggable = true;
		this.classList.add(container);
		this.render();

		this.db
			.collection('tasks')
			.doc(this.id)
			.onSnapshot((doc) => {
				const data = doc.data();
				this.description = data.name;
			});
	}

	/** Element attributes has change. */
	attributeChangedCallback(attribute, oldValue, newValue) {
		if (attribute === 'name' && oldValue !== newValue) {
			this.nameElement.value = newValue;
		}

		if (attribute === 'description' && oldValue !== newValue) {
			this.descriptionElement.value = newValue;
		}

		if (attribute === 'label' && oldValue !== newValue) {
			this.labelElement.innerText = newValue;
		}
	}

	/**
	 * Render component content.
	 */
	render() {
		const fragment = document.createDocumentFragment();

		fragment.appendChild(this.nameElement);
		fragment.appendChild(this.dropdown);
		fragment.appendChild(this.descriptionElement);
		fragment.appendChild(this.labelElement);

		this.appendChild(fragment);
	}
}

/** Define custom element. */
window.customElements.define('scrum-task', ScrumTask);
export default ScrumTask;

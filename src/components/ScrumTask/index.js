/** @module ScrumTask */

import { container, name, description, dragged } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class ScrumTask extends window.HTMLElement {
	static get observedAttributes() {
		return ['name', 'description'];
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
		this.descriptionElement.value = value;
	}

	get description() {
		return this.getAttribute('description');
	}

	/** @type {Boolean} */
	set dragged(state) {
		this.classList.toggle(dragged, state);
	}

	constructor() {
		super();

		/** @type {Boolean} */
		this.isDraged = false;

		this.addEventListener('dragstart', (e) => this.handleDrag(e));
		this.addEventListener('dragend', () => {
			this.dragged = false;
		});

		/** @type {HTMLDivElement} */
		this.nameElement = document.createElement('input');
		this.nameElement.placeholder = 'Název';
		this.nameElement.classList.add(name);
		this.nameElement.addEventListener('change', () => {
			this.name = this.nameElement.value;
		});

		/** @type {HTMLTextAreaElement} */
		this.descriptionElement = document.createElement('textarea');
		this.descriptionElement.placeholder = 'Popis';
		this.descriptionElement.classList.add(description);
		this.descriptionElement.addEventListener('change', () => {
			this.description = this.descriptionElement.value;
		});
	}

	/** Element appends in DOM. */
	connectedCallback() {
		this.draggable = true;
		this.classList.add(container);
		this.id = Math.floor(Math.random() * 1000);
		this.render();
	}

	/** Element attributes has change. */
	attributeChangedCallback(attribute, oldValue, newValue) {
		if (attribute === 'name' && oldValue !== newValue) {
			this.nameElement.value = newValue;
		}

		if (attribute === 'description' && oldValue !== newValue) {
			this.descriptionElement.value = newValue;
		}
	}

	handleDrag(e) {
		e.dataTransfer.setData('text', e.target.id);
		this.dragged = true;
	}

	/**
	 * Render component content.
	 */
	render() {
		const fragment = document.createDocumentFragment();

		fragment.appendChild(this.nameElement);
		fragment.appendChild(this.descriptionElement);

		this.appendChild(fragment);
	}
}

/** Define custom element. */
window.customElements.define('scrum-task', ScrumTask);
export default ScrumTask;

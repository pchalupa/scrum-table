/** @module ScrumTask */

import { container, name, dragged } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class ScrumTask extends window.HTMLElement {
	static get observedAttributes() {
		return ['name'];
	}

	/** @type {String} */
	set name(value) {
		this.setAttribute('name', value);
		this.nameElement.innerText = value;
	}

	get name() {
		return this.getAttribute('name');
	}

	/** @type {Boolean} */
	set dragged(state) {
		this.classList.toggle(dragged, state);
	}

	constructor() {
		super();

		/** @type {Boolean} */
		this.isEdited = false;

		/** @type {Boolean} */
		this.isDraged = false;

		this.addEventListener('dragstart', (e) => this.handleDrag(e));
		this.addEventListener('dragend', () => {
			this.dragged = false;
		});

		/** @type {HTMLDivElement} */
		this.nameElement = document.createElement('div');
		this.nameElement.classList.add(name);

		this.nameElement.addEventListener('click', (e) => {
			e.target.contentEditable = true;
			this.isEdited = true;
		});

		window.addEventListener('keypress', (e) => {
			if (e.key === 'Enter' && this.isEdited) {
				e.preventDefault();
				this.nameElement.contentEditable = false;
				this.handleNameUpdate();
			}
		});
	}

	/** Element appends in DOM. */
	connectedCallback() {
		this.classList.add(container);
		this.id = Math.floor(Math.random() * 1000);
		this.render();
		this.draggable = true;
		this.name = 'Název';
	}

	handleNameUpdate() {
		this.name = this.nameElement.innerText;
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

		this.appendChild(fragment);
	}
}

/** Define custom element. */
window.customElements.define('scrum-task', ScrumTask);
export default ScrumTask;

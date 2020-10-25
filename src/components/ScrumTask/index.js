/** @module ScrumTask */

import Firebase from '../../services/Firebase';
import { container, name, handle, description, label, estimate, dragged } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class ScrumTask extends window.HTMLElement {
	static get observedAttributes() {
		return ['name', 'link', 'description', 'label', 'estimate'];
	}

	/** @type {String} */
	set name(value) {
		this.setAttribute('name', value);
	}

	get name() {
		return this.getAttribute('name');
	}

	/** @type {String} */
	set link(value) {
		this.setAttribute('link', value);
	}

	get link() {
		return this.getAttribute('link');
	}

	/** @type {String} */
	set description(value) {
		this.setAttribute('description', value);
	}

	get description() {
		return this.getAttribute('description');
	}

	/** @type {String} */
	set label(value) {
		this.setAttribute('label', value);
	}

	get label() {
		return this.getAttribute('label');
	}

	/** @type {number} */
	set estimate(value) {
		this.setAttribute('estimate', value);
	}

	get estimate() {
		return parseInt(this.getAttribute('estimate'), 10);
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
		this.nameElement = document.createElement('a');
		this.nameElement.classList.add(name);
		this.nameElement.target = '_blank';
		this.nameElement.rel = 'noopener';

		/** @type {HTMLSpanElement} */
		this.handleElement = document.createElement('span');
		this.handleElement.classList.add(handle);
		this.handleElement.innerText = '✊';

		/** @type {HTMLSpanElement} */
		this.descriptionElement = document.createElement('span');
		this.descriptionElement.classList.add(description);

		/** @type {HTMLSpanElement} */
		this.labelElement = document.createElement('span');
		this.labelElement.classList.add(label);

		/** @type {HTMLSpanElement} */
		this.estimateElement = document.createElement('span');
		this.estimateElement.classList.add(estimate);
	}

	/** Element appends in DOM. */
	connectedCallback() {
		this.draggable = true;
		this.classList.add(container);
		this.render();

		this.id &&
			this.db
				.collection('tasks')
				.doc(this.id)
				.onSnapshot((doc) => {
					const data = doc.data();
					this.name = doc.id;
					this.description = `${data.project}—${data.name}`;
					this.link = data.link;
					this.label = data.label;
					this.estimate = data.estimate;
				});
	}

	/** Element attributes has change. */
	attributeChangedCallback(attribute, oldValue, newValue) {
		if (attribute === 'name' && oldValue !== newValue) {
			this.nameElement.innerText = newValue;
		}

		if (attribute === 'link' && oldValue !== newValue && newValue !== 'undefined') {
			this.nameElement.href = newValue;
		}

		if (attribute === 'description' && oldValue !== newValue) {
			this.descriptionElement.innerText = newValue;
		}

		if (attribute === 'label' && oldValue !== newValue) {
			this.labelElement.innerText = newValue;
		}

		if (attribute === 'estimate' && oldValue !== newValue) {
			this.estimateElement.innerText = newValue;
		}
	}

	/**
	 * Render component content.
	 */
	render() {
		const fragment = document.createDocumentFragment();

		fragment.appendChild(this.nameElement);
		fragment.appendChild(this.handleElement);
		fragment.appendChild(this.descriptionElement);
		fragment.appendChild(this.labelElement);
		fragment.appendChild(this.estimateElement);

		this.appendChild(fragment);
	}
}

/** Define custom element. */
window.customElements.define('scrum-task', ScrumTask);
export default ScrumTask;

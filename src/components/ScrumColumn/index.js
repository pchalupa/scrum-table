/** @module ScrumColumn */

import '../ScrumTask';
import { container, list, button } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class ScrumColumn extends window.HTMLElement {
	/** @type {String} */
	set title(value) {
		this.setAttribute('title', value);
		this.titleNode.innerText = value;
	}

	get title() {
		return this.getAttribute('title');
	}

	constructor() {
		super();

		/** @type {HTMLDivElement} */
		this.titleNode = document.createElement('div');

		/** @type {HTMLDivElement} */
		this.list = document.createElement('div');
		this.list.classList.add(list);

		this.addEventListener('dragover', (e) => e.preventDefault());

		this.addEventListener('drop', (e) => {
			e.preventDefault();
			const task = document.getElementById(e.dataTransfer.getData('text'));
			task.dragged = false;
			this.list.appendChild(task);
			if (this.toast) {
				this.toast.message = 'Úkol byl přesunut!';
			}
		});

		/** @type {HTMLButtonElement} */
		this.add = document.createElement('button');
		this.add.classList.add(button);
		this.add.textContent = '+ Úkol';

		this.add.addEventListener('click', () => {
			this.handleAddTask();
		});
	}

	/** Element appends in DOM. */
	connectedCallback() {
		this.classList.add(container);
		this.render();
	}

	handleAddTask() {
		this.list.appendChild(document.createElement('scrum-task'));
		if (this.toast) {
			this.toast.message = 'Úkol byl přidán';
		}
	}

	/**
	 * Render component content.
	 */
	render() {
		const fragment = document.createDocumentFragment();

		fragment.appendChild(this.titleNode);
		fragment.appendChild(this.list);
		fragment.appendChild(this.add);

		this.appendChild(fragment);
	}
}

/** Define custom element. */
window.customElements.define('scrum-column', ScrumColumn);
export default ScrumColumn;

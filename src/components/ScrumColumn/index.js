/** @module ScrumColumn */

import '../ScrumTask';
import { container, focus, title, counter, list, button } from './style.module.css';

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

	set focus(status) {
		this.classList.toggle(focus, status);
	}

	get focus() {
		return this.classList.contains(focus);
	}

	constructor() {
		super();

		/** @type {HTMLDivElement} */
		this.titleNode = document.createElement('div');
		this.titleNode.classList.add(title);

		/** @type {HTMLSpanElement} */
		this.countNode = document.createElement('span');
		this.countNode.classList.add(counter);
		this.countNode.textContent = 0;

		/** @type {HTMLDivElement} */
		this.list = document.createElement('div');
		this.list.classList.add(list);

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
			task.dragged = false;
			this.focus = false;
			this.list.appendChild(task);
			if (this.toast) {
				this.toast.message = 'Úkol byl přesunut!';
			}
		});

		/** @type {HTMLButtonElement} */
		this.add = document.createElement('button');
		this.add.classList.add(button);
		this.add.textContent = 'Úkol';

		this.add.addEventListener('click', () => {
			this.handleAddTask();
		});
	}

	/** Element appends in DOM. */
	connectedCallback() {
		this.classList.add(container);
		this.render();

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				this.handleListChange(mutation);
			});
		});

		observer.observe(this.list, { childList: true });
	}

	handleAddTask() {
		this.list.appendChild(document.createElement('scrum-task'));
		if (this.toast) {
			this.toast.message = 'Úkol byl přidán!';
		}
	}

	handleListChange() {
		this.countNode.innerText = this.list.childElementCount;
	}

	/**
	 * Render component content.
	 */
	render() {
		const fragment = document.createDocumentFragment();

		this.titleNode.appendChild(this.countNode);
		fragment.appendChild(this.titleNode);
		fragment.appendChild(this.list);
		fragment.appendChild(this.add);

		this.appendChild(fragment);
	}
}

/** Define custom element. */
window.customElements.define('scrum-column', ScrumColumn);
export default ScrumColumn;

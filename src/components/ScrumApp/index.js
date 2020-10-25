/** @module ScrumApp */

import '../ScrumCollection';
import { collections } from '../../constants';
import { container } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class ScrumApp extends window.HTMLElement {
	/** Element appends in DOM. */
	connectedCallback() {
		this.classList.add(container);
		this.render();
	}

	/**
	 * Render component content.
	 */
	render() {
		/** @type {HTMLElement} */
		const fragment = document.createDocumentFragment();

		collections.forEach((value, key) => {
			const collection = document.createElement('scrum-collection');

			collection.name = key;
			collection.toast = this.toast;
			collection.title = value.title;
			collection.direction = value.direction;

			fragment.appendChild(collection);
		});

		const backlog = document.createElement('scrum-backlog');
		fragment.appendChild(backlog);

		this.appendChild(fragment);
	}
}

/** Define custom element. */
window.customElements.define('scrum-app', ScrumApp);
export default ScrumApp;

/** @module ScrumApp */

import '../ScrumColumn';
import { config } from '../../constants';
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

		/** @type {SearchResult} */
		config.columns.map((columnTitle) => {
			const column = document.createElement('scrum-column');
			column.title = columnTitle;
			column.toast = this.toast;
			fragment.appendChild(column);
			return column;
		});

		this.appendChild(fragment);
	}
}

/** Define custom element. */
window.customElements.define('scrum-app', ScrumApp);
export default ScrumApp;

/** @module ScrumApp */

import '../ScrumColumn';
import '../ToastApp';
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

	/** Element removes from DOM. */
	disconnectedCallback() {}

	/**
	 * Render component content.
	 */
	render() {
		/** @type {HTMLElement} */
		const fragment = document.createDocumentFragment();

		/** @type {AppToast} */
		const toast = document.createElement('toast-app');

		/** @type {SearchResult} */
		this.columns = config.columns.map((columnTitle) => {
			const column = document.createElement('scrum-column');
			column.title = columnTitle;
			column.toast = toast;
			fragment.appendChild(column);
			return column;
		});

		fragment.appendChild(toast);

		this.appendChild(fragment);
	}
}

/** Define custom element. */
window.customElements.define('scrum-app', ScrumApp);
export default ScrumApp;

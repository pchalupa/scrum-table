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

	/** Element removes from DOM. */
	disconnectedCallback() {}

	/**
	 * Render component content.
	 */
	render() {
		/** @type {SearchResult} */
		this.columns = config.columns.map((columnTitle) => {
			const column = document.createElement('scrum-column');
			column.title = columnTitle;
			this.appendChild(column);
			return column;
		});
	}
}

/** Define custom element. */
window.customElements.define('scrum-app', ScrumApp);
export default ScrumApp;

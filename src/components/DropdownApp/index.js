/** @module DropdownApp */

import { container } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class DropdownApp extends window.HTMLElement {
	/** Element appends in DOM. */
	connectedCallback() {
		this.classList.add(container);
		this.render();
	}

	/**
	 * Render component content.
	 */
	render() {
		/** @type {HTMLUListElement} */
		const list = document.createElement('ul');

		this.appendChild(list);
	}
}

/** Define custom element. */
window.customElements.define('dropdown-app', DropdownApp);
export default DropdownApp;

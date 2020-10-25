/** @module UserApp */

import '../DropdownApp';
import { container, avatar } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class UserApp extends window.HTMLElement {
	constructor() {
		super();

		/** @type {HTMLImageElement} */
		this.avatarNode = document.createElement('img');
		this.avatarNode.classList.add(avatar);

		/** @type {DropdownApp} */
		this.dropdown = document.createElement('dropdown-app');
	}

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

		fragment.appendChild(this.avatarNode);
		fragment.appendChild(this.dropdown);

		this.appendChild(fragment);
	}
}

/** Define custom element. */
window.customElements.define('user-app', UserApp);
export default UserApp;

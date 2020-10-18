/** @module UserApp */

import { container, avatar } from './style.module.css';

/**
 * Define custom-app web component.
 * @extends HTMLElement
 */
class UserApp extends window.HTMLElement {
	constructor() {
		super();
		this.avatarNode = document.createElement('img');
		this.avatarNode.classList.add(avatar);
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

		this.avatarNode.src = 'https://via.placeholder.com/50C/O';
		fragment.appendChild(this.avatarNode);

		this.appendChild(fragment);
	}
}

/** Define custom element. */
window.customElements.define('user-app', UserApp);
export default UserApp;

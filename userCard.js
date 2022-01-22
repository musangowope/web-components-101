/*
Class
* - constructor(): Called when an instance of the element is create or upgrade
* - connectedCallback(): Called everytime when the element is inserted into the DOM
* - disconnectedCallback(): Called everytime the element is removed from the the DOM
* - attributedChangedCallback(attributeName, oldValue, newValue): Called when an attribute is added,
* removed, updated, or replaced
*
* Shadow DOM
* - Used for self-contained components
* - Encapsulated styles and markup
* - Create element.attachShadow({ mode: open })
* - Creates a "shadowRoot" that we can reference and interact with
*
* HTML Template templates
* - Defines the encapsulatesd markup of our web component
* - Template tag stores markup on page
* - Include both HTML and CSS in templates
* - Use slots to add custom content
*
* */


const template  = document.createElement('template');
template.innerHTML = `
  <style>
    .user-card {
      font-family: 'Arial', sans-serif;
      background: #f4f4f4;
      width: 500px;
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-gap: 10px;
      margin-bottom: 15px;
      border-bottom: darkorchid 5px solid;
    }
  
    .user-card img {
      width: 100%;
    }
  
    .user-card button {
      cursor: pointer;
      background: darkorchid;
      color: #fff;
      border: 0;
      border-radius: 5px;
      padding: 5px 10px;
    }  
  </style>
  <div class="user-card">
    <img />
    <div>
      <h3></h3>
      <div class="info">
        <p><slot name="email"></slot></p>
        <p><slot name="phone"></slot></p>
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;
    this.attachShadow({ mode: 'open' })
    //Setup template and manipulate it
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    //Set attribute h3 to name attribute
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
    const info = this.shadowRoot.querySelector('.info');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');
    if(this.showInfo) {
      info.style.display = 'block';
      toggleBtn.innerText = 'Hide Info'
    } else {
      info.style.display = 'none';
      toggleBtn.innerText = 'Show Info'
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => {
      this.toggleInfo();
    })
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#toggle-info").removeEventListener()
  }
}

window.customElements.define('user-card', UserCard);

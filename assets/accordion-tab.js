class AccordionTab extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.toHeader = this.querySelector('[data-header]')
        this.toContent = this.querySelector('[data-content]')

        this.toHeader.addEventListener('click', this.handleToggle.bind(this))
        
    }
    disconnectedCallback(){
        console.log('Disconnected');
        
    }

    handleToggle(){
        this.toggleAttribute('open')
        
    }
}

customElements.define("accordion-tab", AccordionTab )
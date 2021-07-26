class Term extends Shape {
    constructor (elements = 3, scaling = 8) {
      super();
      this.elements = elements;
      this.scaling = scaling;
    }
  
    aspect() {
      noStroke();
      text(this.elements, 0, 0);
    }
  
    get elements () {
      return this._term;
    }
  
    set elements (term) {
      // see: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
      this._term = typeof term === 'string' ? term : typeof term === 'number' ? Math.random().toString(36).slice(-term) : '👽';
    }
  }
// Implementar:
// 1YA. El estilo del shape (e.g., stroke, stroke weight).
// 2YA. La funcion contains(x, y) que diga si un punto de coordenadas
// (x,y) se encuentra o no al interior del shape. Observe que esta
// función puede servir para la selección de la pieza con un puntero.
// 3YA. El resto de shapes que se requieran para el Tangram, como se
// hace con la clase Rect (ver rect.js).

class Shape {
  constructor (position = createVector(random(0, width), random(0, height)), 
               rotation = 0,//random(0, TWO_PI),
               scaling = 1.25,//random(0.5, 1.5),
               hue = color(random(0, 255), random(0, 255), random(0, 255)),
               base=100,
               level=0,
               invertion=false) {
    this.position = position;
    this.rotation = rotation;
    this.scaling = scaling;
    this.hue = hue;
    this.stroke=220;
    this.base=base;
    this.level=level;
    this.invertion=invertion;
    this.vertices;
    this.segments;
    this.bool_segments;//=[false,false,false,false];
    this.bool_vertices;//=[false,false,false,false];
    

    
  }

  draw () {
    stroke(this.stroke)
    strokeWeight(1.5/this.scaling);

    push();
    fill(this.hue);
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    if (this.invertion){scale(this.scaling, -this.scaling)}
    else{scale(this.scaling, this.scaling)}

    this.aspect();

    //definimos vertices y segmentos basados en las propiedades de la figura
    this.runVertices();
    this.runSegments();
    pop();
  }

  // JS doesn't have abstract methods, see:
  // https://medium.com/@yuribett/javascript-abstract-method-with-es6-5dbea4b00027
  aspect() {
    throw new Error('You have to implement the method aspect!');
  }

  // should return a boolean value
  contains(x, y) {
    throw new Error('You have to implement the method contains!');
  }

  runVertices(){
    throw new Error('You have to implement the method runVertices!');
  }

  runSegments(){
    this.segments=[]
    let lenght=0;
    for (var k in this.vertices){lenght++}
    for (var i in this.vertices){
      i=int(i);
      this.segments[i]=new Segment(this.vertices[i],this.vertices[(i+1)%lenght]);  
    }
  }


  //convierte las coordenadas input (del mouse) a coordenadas respecto al centro de la figura transformada
  transMouse(x,y){
    let P;
    P=this.translateMouse(x,y);
    P=this.rotateMouse(P.A,P.B);
    P=this.scaleMouse(P.A,P.B);
    P=this.invertMouse(P.A,P.B);
    let V=createVector(P.A,P.B)
    return V
  }
    translateMouse(x,y){
      let A=x-this.position.x;
      let B=y-this.position.y;
      return{A,B}
    }
    rotateMouse(x,y){
      let A=x*Math.cos(this.rotation)+y*Math.sin(this.rotation);
      let B=y*Math.cos(this.rotation)-x*Math.sin(this.rotation);
      return{A,B}
    }
    scaleMouse(x,y){
      let A=x/this.scaling;
      let B=y/this.scaling;
      return{A,B}
    }
    invertMouse(x,y){
      let A=x;
      let B=y;
      if (this.invertion){B*=-1}
      return{A,B}
    }

  //convierte coordenadas input(punto de un segmento) a coordenadas transformadas resepecto a eje del canvas
  transCoord(x,y){
    let S;
    S=this.translateMouse(x,y);
    S=this.invertMouse(S.A,S.B);
    S=this.rotateCoord(S.A,S.B);
    S=this.scaleCoord(S.A,S.B);
    S=this.translateCoord(S.A,S.B)
    let V=createVector(S.A,S.B)
    return V
  }

    rotateCoord(x,y){
      let A=x*Math.cos(this.rotation)-y*Math.sin(this.rotation);
      let B=y*Math.cos(this.rotation)+x*Math.sin(this.rotation);
      return{A,B}
    }

    scaleCoord(x,y){
      let A=x*this.scaling;
      let B=y*this.scaling;
      return{A,B}
    }

    translateCoord(x,y){
      let A=x+this.position.x;
      let B=y+this.position.y;
      return{A,B}
    }

    



    //copia parcialmente la figura, entrega una nueva figura, con posicion, vertices y segmentos
    semicopy(){
      
      let copy=new Shape();
      if(this.constructor.name=="Triangle"){
        copy=new Triangle();
      }
      else if(this.constructor.name=="Rect"){
        copy=new Rect();
      }
      else if(this.constructor.name=="Paralel"){
        copy=new Paralel();
      }

      copy.position=createVector(this.position.x,this.position.y);
      copy.vertices=[]
      copy.segments=[]
      for (var i in this.vertices){
        copy.vertices[i]=createVector(this.vertices[i].x,this.vertices[i].x);
        copy.segments[i]=new Segment(createVector(this.segments[i].a.x,this.segments[i].a.y),
                                    createVector(this.segments[i].b.x,this.segments[i].b.y));
      }
    
      copy.rotation=this.rotation;
      copy.scaling=this.scaling;
      copy.base=this.base;
      copy.level=this.level;
      copy.invertion=this.invertion;
      
      return copy
    }

  // getters and setters
  // see: https://www.w3schools.com/js/js_object_accessors.asp

  get scaling () {
    return this._scaling;
  }

  set scaling (scaling) {
    this._scaling = scaling;
  }

  get rotation () {
    return this._rotation;
  }

  set rotation (rotation) {
    this._rotation = rotation;
  }

  get position () {
    return this._position;
  }

  set position (position) {
    this._position = position;
  }

  get hue () {
    return this._hue;
  }

  set hue (hue) {
    this._hue = hue;
  }

  get base () {
    return this._base;
  }

  set base (value) {
    this._base = value;
  }

  get level () {
    return this._level;
  }

  set level (value) {
    this._level = value;
  }

  get invertion () {
    return this._invertion;
  }

  set invertion (value) {
    this._invertion = value;
  }

  get segments () {
    return this._segments;
  }

  set segments (lista) {
    this._segments = lista;
  }

  get vertices () {
    return this._vertices;
  }

  set vertices (lista) {
    this._vertices = lista;
  }

  get bool_segments () {
    return this._bool_segments;
  }

  set bool_segments (lista) {
    this._bool_segments = lista;
  }

  get bool_vertices () {
    return this._bool_vertices;
  }

  set bool_vertices (lista) {
    this._bool_vertices = lista;
  }
}
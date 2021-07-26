class Triangle extends Shape {

  runVertices(){
    this.vertices=[
      this.transCoord(this.position.x,this.position.y+this.base/4),
      this.transCoord(this.position.x+this.base/2,this.position.y-this.base/4),
      this.transCoord(this.position.x-this.base/2,this.position.y-this.base/4)
    ]  
  }

  aspect() {
    triangle(0, this.base/4,
              this.base/2,- this.base/4,
              - this.base/2, - this.base/4);
    
  }

  contains(x,y) {
    let M=this.transMouse(x,y);
    
    
    let a= M.y<(M.x+this.base/4);
    let b=M.y<(-M.x+this.base/4);
    let c=M.y>(-this.base/4);
    return (a&&b&&c);
  }
}


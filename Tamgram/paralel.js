class Paralel extends Shape {
 
  runVertices(){
    this.vertices=[
      this.transCoord(this.position.x-this.base/4,this.position.y+this.base/4),
      this.transCoord(this.position.x+3*this.base/4,this.position.y+this.base/4),
      this.transCoord(this.position.x+this.base/4,this.position.y-this.base/4),
      this.transCoord(this.position.x-3*this.base/4,this.position.y-this.base/4)
    ]
  }

  aspect() {

    beginShape();
    vertex(-this.base/4,this.base/4);
    vertex(3*this.base/4,this.base/4);
    vertex(this.base/4,-this.base/4);
    vertex(-3*this.base/4,-this.base/4);
    endShape(CLOSE);
    
  }

  contains(x,y) {
    let M=this.transMouse(x,y);
    
    
    let a= Math.abs(M.y)<this.base/4;
    let b=M.y<(M.x+this.base/2);
    let c=M.y>(M.x-this.base/2);
    return (a&&b&&c);
  }
}

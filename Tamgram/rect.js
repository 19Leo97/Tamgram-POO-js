class Rect extends Shape {

  runVertices(){
    this.vertices=[
      this.transCoord(this.position.x-this.base/2,this.position.y+this.base/2),
      this.transCoord(this.position.x+this.base/2,this.position.y+this.base/2),
      this.transCoord(this.position.x+this.base/2,this.position.y-this.base/2),
      this.transCoord(this.position.x-this.base/2,this.position.y-this.base/2)
    ]
  }

  aspect() {
    rectMode(CENTER);
    rect(0, 0, this.base, this.base);
    
  }

  contains(x,y){
    let M=this.transMouse(x,y);
   
    //return Math.abs(x-this.position.x)<this.base/2 && Math.abs(y-this.position.y)<this.base/2 ;
    return Math.abs(M.x)<this.base/2 && Math.abs(M.y)<this.base/2 ;
  }
  
  
}

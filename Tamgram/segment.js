class Segment{
    constructor(a,b){
        this.a=a;
        this.b=b;
    }

    move(dx,dy){
        return (new Segment(createVector(this.a.x+dx,this.a.y+dy),createVector(this.b.x+dx,this.b.y+dy)))
            
    }
}
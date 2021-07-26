// Implementar:
// 1YA. La creación de las siete distintas piezas (por ahora son todas Rect) 
// 2YA. La interacción: selección y manipulación de las piezas (ratón, teclas, touch...)
// 3YA. La evaluacion de la solucion
// 4YA. El modo de creacion de nuevos problemas

var shapes0 = [];
var arrastrable0;
var shapes1= [];
var arrastrable1;
var grid = false;
var mouseIsDragged;
var dark=false;



function setup () {
  const canvas = createCanvas(windowWidth, windowHeight);
  arrastrable0={sel:false,seleccion:0,A:0,B:0}
  arrastrable1={sel:false,seleccion:0,A:0,B:0}
  
  create(shapes0);
  create(shapes1);
  define_shapes_properties(shapes0);
  define_shapes_properties_DARK(shapes1);
}

function draw () {
  background(51);
  if (grid) {
    gridHint(10);
  }
  //ajustamos color de fichas del fondo en funcion de "dark"
  define_color_DARK(shapes1);

  //dibujamos las fichas y limitamos movimientos en funcion de "dark"
  if (dark){
    mover(shapes1,arrastrable1);
    draw_level(shapes1);
  }
  else{
    draw_level(shapes1);
    mover(shapes0,arrastrable0);
    draw_level(shapes0);
  }
  //cambiamos el color de las fichas del frente si hay solucion
  solucion_color(shapes0,shapes1);

  //necesaria para descartar y limitar posiciones sobre figuras del fondo
  comp_background(shapes1);
}



//se crean las figuras
function create(shapes){
  for (let i = 0; i < 7; i++) {
    shapes[i] = i < 5 ? new  Triangle() : i<6 ? new Rect() : new Paralel;  
  }
}

//define propiedades iniciales de las 7 figuras del tamgram
function define_shapes_properties(shapes){
  
  //asignamos escalas
  shapes[0].scaling=shapes[1].scaling=2*shapes[0].scaling;
  shapes[2].scaling=Math.sqrt(2)*shapes[2].scaling;
  shapes[5].scaling=Math.sqrt(2)*shapes[5].scaling/2;
  
  //asigna niveles, mayor el numero, mayor nivel
  for (var i = 0; i < shapes.length; i++){
    shapes[i].level=i;
  }

  //asignamos colores
  define_color_front(shapes);  
}

//ajustes de color fichas del frente y si "dark", del fondo
function define_color_front(shapes){
  shapes[0].hue=color(170,77,124);
  shapes[1].hue=color(32,58,75);
  shapes[2].hue=color(74,110,64);
  shapes[3].hue=color(157,39,29);
  shapes[4].hue=color(234,202,93);
  shapes[5].hue=color(229,116,102);
  shapes[6].hue=color(204,198,0);
}

//ajuste de color de fichas del fondo
function define_shapes_properties_DARK(shapes){
  define_shapes_properties(shapes);
  for (var i = 0; i < shapes.length; i++){
    shapes[i].hue=130;
    shapes[i].stroke=130;
  } 
}

//cuando dark es true le da color a shapes1
function define_color_DARK(shapes){
  if (dark){
    background(110,104,101);
    //asignamos colores
    define_color_front(shapes);
    for (var i = 0; i < shapes.length; i++){
      shapes[i].stroke=220;
    }
  }
  else{
    for (var i = 0; i < shapes.length; i++){
      shapes[i].hue=130;
      shapes[i].stroke=130;
    }
  }
}

//cambia el color de shapes0 cuando se ha llegado a una solución
function solucion_color(shapes0,shapes1){
  if (compSolucion(shapes0,shapes1)&&(!mouseIsDragged)){
    for (var i = 0; i < shapes0.length; i++){
      shapes0[i].hue=color(168,204,200);
    }
  }
  else{
    define_color_front(shapes0);
  }
}

//Cambia la posicion de las figuras antes de dibujarlas (segun el mouse, segun las demas figuras)
function mover(shapes,arrastrable){
  if (mouseIsDragged){
    if (arrastrable.sel){
      
      compFigs(shapes,arrastrable);
          
    }
  }
}

//dibuja en orden las figuras, dependiendo de su nivel
function draw_level(shapes){   
  for (var i = 0; i < shapes.length; i++){
    for (var j = 0; j < shapes.length; j++){
      if (shapes[j].level==i){
        shapes[j].draw();
        break;
      }
    }
  }
}

//mouse y teclas
function mousePressed(){
  //guarda todos los datos de la figura seleccionada, dependiendo de "dark"
  if(dark){
    arrastrable1=seleccionar(shapes1);
  }
  else{
    arrastrable0=seleccionar(shapes0);
  }
}

function mouseDragged(){
  mouseIsDragged=true;
}
function mouseReleased(){
  mouseIsDragged=false;
}

function keyTyped(){
  //rotamos e invirtimos dependiendo de "dark"
  if(dark){
    rotar(shapes1,arrastrable1);
    invertir(shapes1,arrastrable1); 
  }
  else{
    rotar(shapes0,arrastrable0);
    invertir(shapes0,arrastrable0); 
  }
  
  //negamos dark
  if (key=="g"){  
    dark=!dark   
  }

  //se imprimen los strings asociados a shapes0 y shapes1 respectivamente
  if(key=="k"){
    shapes_to_str(shapes0);
    shapes_to_str(shapes1);
  }

  if (key=="0"){
    
  }
  //cuadrado
  if (key=="1"){
    s0=[{"positionX":894.9491586252905,"positionY":215.45475285557802,"rotation":0.7853981633974483,"scaling":2.5,"base":100,"level":0,"invertion":false},{"positionX":411.5608109769721,"positionY":392.454752855578,"rotation":0,"scaling":2.5,"base":100,"level":2,"invertion":true},{"positionX":424.4224697201553,"positionY":151.46010125746358,"rotation":0,"scaling":1.7677669529663689,"base":100,"level":1,"invertion":false},{"positionX":304.5284349741627,"positionY":278.878040960655,"rotation":0,"scaling":1.25,"base":100,"level":3,"invertion":false},{"positionX":908.0403728957878,"positionY":351.3083077089452,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":5,"invertion":true},{"positionX":781.2406233222493,"positionY":410.09574278137916,"rotation":0,"scaling":0.8838834764831844,"base":100,"level":4,"invertion":false},{"positionX":742.6204522180686,"positionY":118.8533623749496,"rotation":0.7853981633974483,"scaling":1.25,"base":100,"level":6,"invertion":false}]
    s1=[{"positionX":564.5608109769721,"positionY":219.45475285557802,"rotation":-0.7853981633974483,"scaling":2.5,"base":100,"level":0,"invertion":false},{"positionX":652.9491586252905,"positionY":219.45475285557802,"rotation":0.7853981633974483,"scaling":2.5,"base":100,"level":1,"invertion":false},{"positionX":608.7549848011314,"positionY":396.23144815221497,"rotation":0,"scaling":1.7677669529663689,"base":100,"level":3,"invertion":false},{"positionX":498.2695502407333,"positionY":285.7460135918168,"rotation":0.7853981633974483,"scaling":1.25,"base":100,"level":4,"invertion":true},{"positionX":630.8520717132109,"positionY":285.7460135918169,"rotation":2.356194490192345,"scaling":1.25,"base":100,"level":5,"invertion":false},{"positionX":564.5608109769721,"positionY":307.8431005038965,"rotation":0,"scaling":0.8838834764831844,"base":100,"level":2,"invertion":false},{"positionX":697.1433324494499,"positionY":307.8431005038965,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":6,"invertion":false}]
    str_to_shapes(s0,shapes0);
    str_to_shapes(s1,shapes1);
  }
  //manzana
  if (key=="2"){
    s0=[{"positionX":395.26516671786817,"positionY":287.1977254627948,"rotation":-0.7853981633974483,"scaling":2.5,"base":100,"level":1,"invertion":false},{"positionX":819.1080077418246,"positionY":442.05766436553625,"rotation":-0.7853981633974483,"scaling":2.5,"base":100,"level":3,"invertion":false},{"positionX":798.2909176418186,"positionY":67.77923349946896,"rotation":0,"scaling":1.7677669529663689,"base":100,"level":2,"invertion":true},{"positionX":468.57878505602866,"positionY":440.7938990989804,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":5,"invertion":true},{"positionX":367.42937405017597,"positionY":439.3166489779427,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":4,"invertion":false},{"positionX":859.9465657362912,"positionY":210.16243860936459,"rotation":0,"scaling":0.8838834764831844,"base":100,"level":6,"invertion":false},{"positionX":454.6554797833776,"positionY":88.50774256503577,"rotation":0,"scaling":1.25,"base":100,"level":0,"invertion":false}]
    s1=[{"positionX":565.2550545320986,"positionY":348.01572401454865,"rotation":1.5707963267948966,"scaling":2.5,"base":100,"level":1,"invertion":false},{"positionX":690.2550545320986,"positionY":348.01572401454865,"rotation":-1.5707963267948966,"scaling":2.5,"base":100,"level":0,"invertion":false},{"positionX":721.5050545320986,"positionY":254.26572401454865,"rotation":-2.356194490192345,"scaling":1.7677669529663689,"base":100,"level":2,"invertion":false},{"positionX":534.0050545320986,"positionY":285.51572401454865,"rotation":-1.5707963267948966,"scaling":1.25,"base":100,"level":3,"invertion":false},{"positionX":690.2550545320986,"positionY":191.76572401454865,"rotation":-3.141592653589793,"scaling":1.25,"base":100,"level":5,"invertion":false},{"positionX":565.2550545320986,"positionY":223.01572401454865,"rotation":-0.7853981633974483,"scaling":0.8838834764831844,"base":100,"level":4,"invertion":false},{"positionX":634.760390925348,"positionY":124.44316058020647,"rotation":-1.1780972450961724,"scaling":1.25,"base":100,"level":6,"invertion":true}]
    str_to_shapes(s0,shapes0);
    str_to_shapes(s1,shapes1);

  }
  //barco
  if (key=="3"){
    s0=[{"positionX":397.18576073265376,"positionY":439.22638209150995,"rotation":0.7853981633974483,"scaling":2.5,"base":100,"level":2,"invertion":false},{"positionX":861.5107354335008,"positionY":202.71380618010068,"rotation":-2.356194490192345,"scaling":2.5,"base":100,"level":0,"invertion":false},{"positionX":411.1654219414507,"positionY":244.19999715093456,"rotation":0.7853981633974483,"scaling":1.7677669529663689,"base":100,"level":3,"invertion":false},{"positionX":517.5379793026484,"positionY":184.33434625768336,"rotation":0,"scaling":1.25,"base":100,"level":4,"invertion":false},{"positionX":835.5294091271475,"positionY":427.891657645355,"rotation":0,"scaling":1.25,"base":100,"level":6,"invertion":false},{"positionX":820.1857607326538,"positionY":80.22638209150995,"rotation":0,"scaling":0.8838834764831844,"base":100,"level":1,"invertion":false},{"positionX":497.87701253785735,"positionY":80.91726651009077,"rotation":0,"scaling":1.25,"base":100,"level":5,"invertion":false}]
    s1=[{"positionX":590.6930920980368,"positionY":329.5859929546063,"rotation":-0.7853981633974483,"scaling":2.5,"base":100,"level":4,"invertion":false},{"positionX":697.387265922196,"positionY":248.78016677876553,"rotation":-1.5707963267948966,"scaling":2.5,"base":100,"level":1,"invertion":false},{"positionX":671.4989182738775,"positionY":417.97434060292477,"rotation":0,"scaling":1.7677669529663689,"base":100,"level":5,"invertion":false},{"positionX":697.387265922196,"positionY":342.53016677876553,"rotation":0,"scaling":1.25,"base":100,"level":2,"invertion":true},{"positionX":656.9843528342756,"positionY":101.68307986668592,"rotation":0.7853981633974483,"scaling":1.25,"base":100,"level":0,"invertion":false},{"positionX":759.887265922196,"positionY":311.28016677876553,"rotation":0.7853981633974483,"scaling":0.8838834764831844,"base":100,"level":3,"invertion":false},{"positionX":583.110570625559,"positionY":417.97434060292477,"rotation":-2.356194490192345,"scaling":1.25,"base":100,"level":6,"invertion":true}]
    str_to_shapes(s0,shapes0);
    str_to_shapes(s1,shapes1);

  }
  //cisne
  if (key=="4"){
    s0=[{"positionX":866.6983484615721,"positionY":232.0304307015644,"rotation":-0.7853981633974483,"scaling":2.5,"base":100,"level":2,"invertion":false},{"positionX":442.25345379996537,"positionY":176.51616488547452,"rotation":0.7853981633974483,"scaling":2.5,"base":100,"level":0,"invertion":false},{"positionX":490.47861869355995,"positionY":298.2804307015644,"rotation":0.7853981633974483,"scaling":1.7677669529663689,"base":100,"level":5,"invertion":true},{"positionX":911.4924304735965,"positionY":424.3979304645999,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":3,"invertion":false},{"positionX":543.8714209615432,"positionY":77.96419538229395,"rotation":0,"scaling":1.25,"base":100,"level":6,"invertion":false},{"positionX":789.338289584601,"positionY":79.5289204913305,"rotation":0,"scaling":0.8838834764831844,"base":100,"level":1,"invertion":false},{"positionX":507.32767770704334,"positionY":466.0132175094247,"rotation":0,"scaling":1.25,"base":100,"level":4,"invertion":false}]
    s1=[{"positionX":695.2968565109161,"positionY":446.0974893431399,"rotation":0.7853981633974483,"scaling":2.5,"base":100,"level":5,"invertion":false},{"positionX":776.1026826867569,"positionY":376.0149678706622,"rotation":0,"scaling":2.5,"base":100,"level":6,"invertion":false},{"positionX":606.9085088625977,"positionY":401.90331551898066,"rotation":1.5707963267948966,"scaling":1.7677669529663689,"base":100,"level":4,"invertion":false},{"positionX":619.8526826867569,"positionY":313.51496787066225,"rotation":-1.5707963267948966,"scaling":1.25,"base":100,"level":3,"invertion":false},{"positionX":629.0055957746773,"positionY":129.80622860690107,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":1,"invertion":false},{"positionX":651.1026826867569,"positionY":251.01496787066225,"rotation":0.7853981633974483,"scaling":0.8838834764831844,"base":100,"level":2,"invertion":false},{"positionX":682.3526826867569,"positionY":157.26496787066225,"rotation":1.5707963267948966,"scaling":1.25,"base":100,"level":0,"invertion":true}]
    str_to_shapes(s0,shapes0);
    str_to_shapes(s1,shapes1);

  }
  //caballo
  if (key=="5"){
    s0=[{"positionX":850.2319524150362,"positionY":324.04049847131176,"rotation":0,"scaling":2.5,"base":100,"level":1,"invertion":false},{"positionX":714.963522095269,"positionY":172.57270491414823,"rotation":0.7853981633974483,"scaling":2.5,"base":100,"level":0,"invertion":false},{"positionX":512.4324103155242,"positionY":382.19541340725374,"rotation":-2.356194490192345,"scaling":1.7677669529663689,"base":100,"level":3,"invertion":false},{"positionX":878.1048524759767,"positionY":155.0232508576797,"rotation":0,"scaling":1.25,"base":100,"level":5,"invertion":false},{"positionX":719.5516647840893,"positionY":494.55897537961454,"rotation":0,"scaling":1.25,"base":100,"level":2,"invertion":true},{"positionX":409.5812816471845,"positionY":71.04469700290551,"rotation":0,"scaling":0.8838834764831844,"base":100,"level":4,"invertion":false},{"positionX":392.5067610780645,"positionY":189.3994884488531,"rotation":0,"scaling":1.25,"base":100,"level":6,"invertion":false}]
    s1=[{"positionX":696.0471684325015,"positionY":356.79319006239535,"rotation":-1.5707963267948966,"scaling":2.5,"base":100,"level":4,"invertion":false},{"positionX":589.3529946083423,"positionY":275.98736388655453,"rotation":-2.356194490192345,"scaling":2.5,"base":100,"level":0,"invertion":false},{"positionX":545.158820784183,"positionY":99.21066858991765,"rotation":-3.141592653589793,"scaling":1.7677669529663689,"base":100,"level":3,"invertion":false},{"positionX":456.7704731358647,"positionY":263.0431900623953,"rotation":3.141592653589793,"scaling":1.25,"base":100,"level":1,"invertion":false},{"positionX":611.4500815204219,"positionY":474.861146095271,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":5,"invertion":false},{"positionX":589.3529946083423,"positionY":187.59901623823612,"rotation":0,"scaling":0.8838834764831844,"base":100,"level":2,"invertion":false},{"positionX":802.7413422566605,"positionY":445.1815377107139,"rotation":7.068583470577037,"scaling":1.25,"base":100,"level":6,"invertion":false}]
    str_to_shapes(s0,shapes0);
    str_to_shapes(s1,shapes1);

  }
  //camello
  if (key=="6"){
    s0=[{"positionX":536.5979332222961,"positionY":82.55741180133019,"rotation":-0.7853981633974483,"scaling":2.5,"base":100,"level":0,"invertion":true},{"positionX":844.567235308816,"positionY":308.3644615478987,"rotation":1.5707963267948966,"scaling":2.5,"base":100,"level":2,"invertion":false},{"positionX":644.4553972864298,"positionY":388.69379897902286,"rotation":0,"scaling":1.7677669529663689,"base":100,"level":3,"invertion":true},{"positionX":811.6540564585291,"positionY":407.31273951988703,"rotation":-2.356194490192345,"scaling":1.25,"base":100,"level":5,"invertion":true},{"positionX":875.314981837336,"positionY":131.7966581817655,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":6,"invertion":true},{"positionX":445.90613172384667,"positionY":282.67002277536915,"rotation":0,"scaling":0.8838834764831844,"base":100,"level":1,"invertion":false},{"positionX":427.4040564585291,"positionY":398.81273951988703,"rotation":0,"scaling":1.25,"base":100,"level":4,"invertion":false}]
    s1=[{"positionX":704.0068267993777,"positionY":297.1406775001611,"rotation":-1.5707963267948966,"scaling":2.5,"base":100,"level":3,"invertion":true},{"positionX":571.4243053269,"positionY":278.8348513243203,"rotation":2.356194490192345,"scaling":2.5,"base":100,"level":6,"invertion":false},{"positionX":615.6184791510592,"positionY":190.44650367600184,"rotation":0,"scaling":1.7677669529663689,"base":100,"level":5,"invertion":true},{"positionX":797.7568267993777,"positionY":109.64067750016108,"rotation":-1.5707963267948966,"scaling":1.25,"base":100,"level":1,"invertion":false},{"positionX":829.0068267993777,"positionY":78.39067750016108,"rotation":0,"scaling":1.25,"base":100,"level":2,"invertion":false},{"positionX":704.0068267993777,"positionY":172.14067750016108,"rotation":0.7853981633974483,"scaling":0.8838834764831844,"base":100,"level":4,"invertion":false},{"positionX":797.7568267993777,"positionY":203.39067750016108,"rotation":-1.5707963267948966,"scaling":1.25,"base":100,"level":0,"invertion":false}]
    str_to_shapes(s0,shapes0);
    str_to_shapes(s1,shapes1);

  }

  if (key=="7"){
    s0=[{"positionX":395.26516671786817,"positionY":287.1977254627948,"rotation":-0.7853981633974483,"scaling":2.5,"base":100,"level":1,"invertion":false},{"positionX":819.1080077418246,"positionY":442.05766436553625,"rotation":-0.7853981633974483,"scaling":2.5,"base":100,"level":3,"invertion":false},{"positionX":798.2909176418186,"positionY":67.77923349946896,"rotation":0,"scaling":1.7677669529663689,"base":100,"level":2,"invertion":true},{"positionX":468.57878505602866,"positionY":440.7938990989804,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":5,"invertion":true},{"positionX":367.42937405017597,"positionY":439.3166489779427,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":4,"invertion":false},{"positionX":859.9465657362912,"positionY":210.16243860936459,"rotation":0,"scaling":0.8838834764831844,"base":100,"level":6,"invertion":false},{"positionX":454.6554797833776,"positionY":88.50774256503577,"rotation":0,"scaling":1.25,"base":100,"level":0,"invertion":false}]
    s1=[{"positionX":565.2550545320986,"positionY":348.01572401454865,"rotation":1.5707963267948966,"scaling":2.5,"base":100,"level":1,"invertion":false},{"positionX":690.2550545320986,"positionY":348.01572401454865,"rotation":-1.5707963267948966,"scaling":2.5,"base":100,"level":0,"invertion":false},{"positionX":721.5050545320986,"positionY":254.26572401454865,"rotation":-2.356194490192345,"scaling":1.7677669529663689,"base":100,"level":2,"invertion":false},{"positionX":534.0050545320986,"positionY":285.51572401454865,"rotation":-1.5707963267948966,"scaling":1.25,"base":100,"level":3,"invertion":false},{"positionX":690.2550545320986,"positionY":191.76572401454865,"rotation":-3.141592653589793,"scaling":1.25,"base":100,"level":5,"invertion":false},{"positionX":565.2550545320986,"positionY":223.01572401454865,"rotation":-0.7853981633974483,"scaling":0.8838834764831844,"base":100,"level":4,"invertion":false},{"positionX":634.760390925348,"positionY":124.44316058020647,"rotation":-1.1780972450961724,"scaling":1.25,"base":100,"level":6,"invertion":true}]
    str_to_shapes(s0,shapes0);
    str_to_shapes(s1,shapes1);

  }

  if (key=="8"){
    s0=[{"positionX":395.26516671786817,"positionY":287.1977254627948,"rotation":-0.7853981633974483,"scaling":2.5,"base":100,"level":1,"invertion":false},{"positionX":819.1080077418246,"positionY":442.05766436553625,"rotation":-0.7853981633974483,"scaling":2.5,"base":100,"level":3,"invertion":false},{"positionX":798.2909176418186,"positionY":67.77923349946896,"rotation":0,"scaling":1.7677669529663689,"base":100,"level":2,"invertion":true},{"positionX":468.57878505602866,"positionY":440.7938990989804,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":5,"invertion":true},{"positionX":367.42937405017597,"positionY":439.3166489779427,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":4,"invertion":false},{"positionX":859.9465657362912,"positionY":210.16243860936459,"rotation":0,"scaling":0.8838834764831844,"base":100,"level":6,"invertion":false},{"positionX":454.6554797833776,"positionY":88.50774256503577,"rotation":0,"scaling":1.25,"base":100,"level":0,"invertion":false}]
    s1=[{"positionX":565.2550545320986,"positionY":348.01572401454865,"rotation":1.5707963267948966,"scaling":2.5,"base":100,"level":1,"invertion":false},{"positionX":690.2550545320986,"positionY":348.01572401454865,"rotation":-1.5707963267948966,"scaling":2.5,"base":100,"level":0,"invertion":false},{"positionX":721.5050545320986,"positionY":254.26572401454865,"rotation":-2.356194490192345,"scaling":1.7677669529663689,"base":100,"level":2,"invertion":false},{"positionX":534.0050545320986,"positionY":285.51572401454865,"rotation":-1.5707963267948966,"scaling":1.25,"base":100,"level":3,"invertion":false},{"positionX":690.2550545320986,"positionY":191.76572401454865,"rotation":-3.141592653589793,"scaling":1.25,"base":100,"level":5,"invertion":false},{"positionX":565.2550545320986,"positionY":223.01572401454865,"rotation":-0.7853981633974483,"scaling":0.8838834764831844,"base":100,"level":4,"invertion":false},{"positionX":634.760390925348,"positionY":124.44316058020647,"rotation":-1.1780972450961724,"scaling":1.25,"base":100,"level":6,"invertion":true}]
    str_to_shapes(s0,shapes0);
    str_to_shapes(s1,shapes1);

  }

  if (key=="9"){
    s0=[{"positionX":395.26516671786817,"positionY":287.1977254627948,"rotation":-0.7853981633974483,"scaling":2.5,"base":100,"level":1,"invertion":false},{"positionX":819.1080077418246,"positionY":442.05766436553625,"rotation":-0.7853981633974483,"scaling":2.5,"base":100,"level":3,"invertion":false},{"positionX":798.2909176418186,"positionY":67.77923349946896,"rotation":0,"scaling":1.7677669529663689,"base":100,"level":2,"invertion":true},{"positionX":468.57878505602866,"positionY":440.7938990989804,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":5,"invertion":true},{"positionX":367.42937405017597,"positionY":439.3166489779427,"rotation":-0.7853981633974483,"scaling":1.25,"base":100,"level":4,"invertion":false},{"positionX":859.9465657362912,"positionY":210.16243860936459,"rotation":0,"scaling":0.8838834764831844,"base":100,"level":6,"invertion":false},{"positionX":454.6554797833776,"positionY":88.50774256503577,"rotation":0,"scaling":1.25,"base":100,"level":0,"invertion":false}]
    s1=[{"positionX":565.2550545320986,"positionY":348.01572401454865,"rotation":1.5707963267948966,"scaling":2.5,"base":100,"level":1,"invertion":false},{"positionX":690.2550545320986,"positionY":348.01572401454865,"rotation":-1.5707963267948966,"scaling":2.5,"base":100,"level":0,"invertion":false},{"positionX":721.5050545320986,"positionY":254.26572401454865,"rotation":-2.356194490192345,"scaling":1.7677669529663689,"base":100,"level":2,"invertion":false},{"positionX":534.0050545320986,"positionY":285.51572401454865,"rotation":-1.5707963267948966,"scaling":1.25,"base":100,"level":3,"invertion":false},{"positionX":690.2550545320986,"positionY":191.76572401454865,"rotation":-3.141592653589793,"scaling":1.25,"base":100,"level":5,"invertion":false},{"positionX":565.2550545320986,"positionY":223.01572401454865,"rotation":-0.7853981633974483,"scaling":0.8838834764831844,"base":100,"level":4,"invertion":false},{"positionX":634.760390925348,"positionY":124.44316058020647,"rotation":-1.1780972450961724,"scaling":1.25,"base":100,"level":6,"invertion":true}]
    str_to_shapes(s0,shapes0);
    str_to_shapes(s1,shapes1);

  }


}



function rotar(shapes,arrastrable){//input ok
  if(key=="d"){
    shapes[arrastrable.seleccion].rotation+=(PI/8)
  }
  else if(key=="a"){
    shapes[arrastrable.seleccion].rotation-=(PI/8)
  } 
}

function invertir(shapes,arrastrable){
  if(key=="w"){
    shapes[arrastrable.seleccion].invertion=!shapes[arrastrable.seleccion].invertion;
  }
}

function gridHint (scale) {
  push();                      
  stroke(0, 255, 255);
  strokeWeight(1);
  let i;
  for (i = 0; i <= width / scale; i++) {
    line(i * scale, 0, i * scale, height);
  }
  for (i = 0; i <= height / scale; i++) {
    line(0, i * scale, width, i * scale);
  }
  pop();
}


//0. Actualiza los niveles de las figuras, dependiendo de la figura seleccionada
//1. entrega un valor booleano dependiendo de si hay figura bajo el mouse
//2. entrega la ficha que ha sido seleccionada
//3. entrega las coordenadas donde esta parado el mouse con respecto al centro de la figura cuando se selecciona
//4. entrega las coordenadas del mouse con respecto al canvas, en el momento que se selecciono la figura
//5. entrega el objeto, la figura seleccionada con sus propiedades en el momento de seleccion
                //LLAMAR FUNCION CON MOUSE PRESSED
function seleccionar(shapes){

    //Variable para verificar que haya una figura debajo del mouse
    let sel=false;
    //Variable para almacenar la figura seleccionada con mayor nivel
    let seleccion=0;

    let n=0;

    //2.
    for (var i = 0; i < shapes.length; i++){
        if (shapes[i].contains(mouseX,mouseY)){
            //Averigua cual es el nivel mayor si hay o no figuras sobrelapadas bajo el mouse
            n=Math.max(shapes[i].level,n);
            //Actualiza la figura con el maximo nivel
            if (shapes[i].level==n){
                seleccion=i;
            }
            //1. cambia a true "Sel" si hay almenos una figura seleccionada
            sel=true;
        }
    }

    //0. Si hay figura seleccionada, le resta 1 al nivel de cada figura que tenga un nivel mayor a n
    if (sel){    
        for (var i = 0; i < shapes.length; i++){
            if (shapes[i].level>n){
                shapes[i].level-=1;
            }
        }
        //le ponemos el nivel maximo a la ficha seleccionada
        shapes[seleccion].level=shapes.length-1;
    }

    //3.
    let A=mouseX-shapes[seleccion].position.x;
    let B=mouseY-shapes[seleccion].position.y;

    //4.
    let selMouse=createVector(mouseX,mouseY);

    //5.
    let objetosel=shapes[seleccion].semicopy();

    return{sel,seleccion,A,B,selMouse,objetosel}

}


//compara todas las figuras (segmentos, vertices) para al final decidir la posicion de la figura seleccionada
function compFigs(shapes,arrastrable){
  
  let fig1=figPotencial(shapes,arrastrable)

  //variables para almacenar propiedades del segmento y vertice mas cercano
  let minSeg={d:-1,dx:-1,dy:-1};
  let minVer={d:-1,dx:-1,dy:-1};
  //variables para identificar si la figura tiene alguna union
  let joinedSeg=false;
  let joinedVer=false;

  for (k=0;k<7;k++){
    if (k!==arrastrable.seleccion){

      fig2=shapes[k];
      //iteramos sobre los segmentos de las dos figuras
      for(var i=0; i<fig1.segments.length; i++){ 
        for(var j=0; j<fig2.segments.length; j++){
    
          //variables para guardar resultados de funcion compareSegments y compareVertices
          let compSeg=compareSegments(fig1.segments[i],fig2.segments[j]);
          let compVer=compareVertices(fig1.vertices[i],fig2.vertices[j]);      
          
          //segmento mas cercano
          if (compSeg.compareSegments_&&((minSeg.d<0)||(compSeg.d<minSeg.d))){
              minSeg.d=compSeg.d;
              minSeg.dx=compSeg.dx;
              minSeg.dy=compSeg.dy;
              joinedSeg=true
            }        
          
          //vertice mas cercano
          if (compVer.distancia&&((minVer.d<0)||(compVer.d<minVer.d))){
            
            minVer.d=compVer.d;
            minVer.dx=compVer.dx;
            minVer.dy=compVer.dy;
            joinedVer=true
          }
        }
      }
    }

  }

  //vamos a iterar sobre las figuras de shape1 (##pendiente resumir#)

  //si esta dark true significa que se correra esta funcion con shapes1 como input, no queremos eso, entonces:
  if (!dark){
    for (k=0;k<7;k++){
      fig2=shapes1[k];
      //iteramos sobre los segmentos de las dos figuras
      for(var i=0; i<fig1.segments.length; i++){ 
        for(var j=0; j<fig2.segments.length; j++){

          if (!fig2.bool_segments[j]){
            //variables para guardar resultados de funcion compareSegments
            compSeg=compareSegments(fig1.segments[i],fig2.segments[j]);

            //segmento mas cercano
            if (compSeg.compareSegments_&&((minSeg.d<0)||(compSeg.d<minSeg.d))){
              minSeg.d=compSeg.d;
              minSeg.dx=compSeg.dx;
              minSeg.dy=compSeg.dy;
              joinedSeg=true
            }  
          }
          
          if (!fig2.bool_vertices[j]){
            //variables para guardar resultados de funcion compareVertices
            compVer=compareVertices(fig1.vertices[i],fig2.vertices[j]);  
            //vertice mas cercano
            if (compVer.distancia&&((minVer.d<0)||(compVer.d<minVer.d))){
              
              minVer.d=compVer.d;
              minVer.dx=compVer.dx;
              minVer.dy=compVer.dy;
              joinedVer=true
            }
          }    
          
          
        }
      }
    }
  } 
  
  //si hubo algun vertice cercano, tiene la prioridad sobre segmentos cercanos
  if (joinedVer){
    shapes[arrastrable.seleccion].position.x=fig1.position.x+minVer.dx;
    shapes[arrastrable.seleccion].position.y=fig1.position.y+minVer.dy;
  }//si no, ajustamos segun el segmentos paralelos mas cercano
  else if (joinedSeg){
    shapes[arrastrable.seleccion].position.x=fig1.position.x+minSeg.dx;
    shapes[arrastrable.seleccion].position.y=fig1.position.y+minSeg.dy;
    }
  //si ninguna de las anteriores se ajusta la posicion de la figura segun las coordenadas del mouse
  else{
    shapes[arrastrable.seleccion].position.x=mouseX-arrastrable.A;
    shapes[arrastrable.seleccion].position.y=mouseY-arrastrable.B;
  }
  
}

function figPotencial(shapes,arrastrable){
  //creamos una copia de la figura seleccionada, y le cambiamos la posicion dependiendo de coordenadas del mouse
  let fig1=arrastrable.objetosel.semicopy();
  fig1.position.x+=(mouseX-arrastrable.selMouse.x);
  fig1.position.y+=(mouseY-arrastrable.selMouse.y);
  //dejamos que la rotacion e inversion si este en funcion de la figura seleccionada
  fig1.rotation=shapes[arrastrable.seleccion].rotation;
  fig1.invertion=shapes[arrastrable.seleccion].invertion;

  //redefinimos los vertices y segmentos
  fig1.runVertices();
  fig1.runSegments();
  return fig1
  //nos entrega un objeto figura potencial
}



//Compara dos segmentos
//Si son paralelos, su distancia corta y estan coordinados, entrega True, ademas m, d, dx y dy
function compareSegments (seg1,seg2){
  let paralelidad=false;
  let distancia=false;
  let dx=null;
  let dy=null;
  let m=null;
  let d=null;
  let coordinacion_=false;
  let igualdad=false;
  
  paralelidad=Math.abs((seg2.a.x-seg2.b.x)*(seg1.a.y-seg1.b.y)-(seg2.a.y-seg2.b.y)*(seg1.a.x-seg1.b.x))<0.01
  if (paralelidad){
    //si la pendiente es vertical
    if(Math.abs(seg1.a.x-seg1.b.x)<0.1){
      
      d=Math.abs(seg1.a.x-seg2.a.x);
      dy=0;
      dx=seg2.a.x-seg1.a.x
      
    }
    else{
    
      m=(seg1.a.y-seg1.b.y)/(seg1.a.x-seg1.b.x);
      dy=seg2.a.y-seg1.a.y+m*(seg1.a.x-seg2.a.x);
      dx=0
      d=Math.abs(dy/Math.sqrt(m**2+1));

    }
    distancia=d<10;

    //vemos si los segmentos tienen la misma posicion
    igualdad=equalSeg(seg1,seg2);

    //calculamos si los segmentos estan coordinados
    coordinacion_=coordinacion(seg1,seg2,m);
    
  }
  return{compareSegments_:(coordinacion_ && distancia),m,dx,dy,d,igualdad}
}


//compara dos vertices
//si estan lo suficientemente cerca, "distancia" entrega true, ademas entrega dx y dy
function compareVertices(ver1,ver2){
  let dx=ver2.x-ver1.x;
  let dy=ver2.y-ver1.y;
  let d=Math.sqrt((dx)**2+(dy)**2);
  let distancia=d<10;
  
  return{distancia,dx,dy,d}

}

//determina si dos segmentos tienen la misma posicion
function equalSeg(seg1,seg2){
  if (  ((compareVertices(seg1.a,seg2.a).d<5)&&(compareVertices(seg1.b,seg2.b).d<5))  ||
  ((compareVertices(seg1.a,seg2.b).d<5)&&(compareVertices(seg1.b,seg2.a).d<5))  ){
    return true;
  }
  return false; 
}

//determina si dos segmentos paralelos estan coordinados
function coordinacion(seg1,seg2,m){
  
  let verSeg;
  //itera sobre cada vertice del segmento 1

  verSeg=ver_to_seg(seg1.a,seg2,m).bool_d

  if (!verSeg){
    verSeg=ver_to_seg(seg1.b,seg2,m).bool_d;
  }
  if (!verSeg){
    verSeg=ver_to_seg(seg2.a,seg1,m).bool_d;
  } 
  if (!verSeg){
    verSeg=ver_to_seg(seg2.b,seg1,m).bool_d;
  }


  
  
  // for (i in seg1){
  //   verSeg=ver_to_seg(seg1[i],seg2,m)
  //   if (verSeg.bool_d){
  //     coordination_=true;
  //     break;
  //   } 
  // }

  // if (!coordination_){
  //   for (i in seg2){
  //     verSeg=ver_to_seg(seg2[i],seg1,m)
  //     if (verSeg.bool_d){
  //       coordination_=true;
  //       break;
  //     } 
  //   }
  // }
  
  return verSeg; 
}

//determina si la perpendicular al segmento 1 que pasa por el vertice toca el segmento 2
function ver_to_seg(ver1,seg2,m){
  //hayamos el punto en el que la recta del segmento perpedicular a seg1 se corta con la recta de seg2
  //pedimos un vertice del seg1 y ademas el seg2 y la pendiente

  //variables para almacenar el punto de corte de la recta perpendicular a seg1 (que pasa por ver1) y seg2
  let x=null;
  let y=null;

  //si la pendiente de los segmentos es esta definida y es 0
  if (!(m===null)&&(Math.abs(m)<0.1)){
    x=ver1.x;
    y=seg2.a.y;
    
  }
  else if (m===null){
    //si la pendiente de los segmentos no esta definida
    x=seg2.a.x;
    y=ver1.y;
    
  }
  else{
    //si la pendiente si esta definida y es distinta de 0
    x=(m*(ver1.y+m*seg2.a.x-seg2.a.y)+ver1.x)/(m**2+1)
    y=m*(x-seg2.a.x)+seg2.a.y    
  }
  
  //verificamos que el punto de corte se encuentre dentro del segmento
  let d=Math.sqrt((seg2.a.x-seg2.b.x)**2+(seg2.a.y-seg2.b.y)**2);
  let d1=Math.sqrt((x-seg2.a.x)**2+(y-seg2.a.y)**2);
  let d2=Math.sqrt((x-seg2.b.x)**2+(y-seg2.b.y)**2);

  let bool_d1=d1<d;
  let bool_d2=d2<d;
  let bool_d=bool_d1&&bool_d2;

  return{bool_d,bool_d1,bool_d2,d,d1,d2,x,y};

}

//define lista de false de bool_shapes
function def_bool_shapes(shapes){
    
  for(var i=0;i<7;i++){
    shapes[i].bool_segments=[];
    shapes[i].bool_vertices=[];
    for (j in shapes[i].vertices){
      shapes[i].bool_segments[j]=false;
      shapes[i].bool_vertices[j]=false;
    }
    //console.log(shapes[i].bool_segments)
    //console.log(shapes[i].bool_vertices)
  } 
}

//compara los segmentos y vertices de las figuras que hacen parte de una lista de shapes
//COMPARAR: actualizar los valores booleanos de segmentos y vertices, dependiendo de su sobrelapamiento 
  //entrega un valor booleano dependiendo de si el centro de una figura esta sobre otra figura
function comp_shapes(shapes){
  let fig_in=false;
  for (n=0;n<7;n++){
    for (m=n+1;m<7;m++){
      
      //filtramos las figuras que no estan sobrelapadas (que el centro de una figura no este encima de otra)
      let n_in_m=shapes[m].contains(shapes[n].position.x,shapes[n].position.y);
      let m_in_n=shapes[n].contains(shapes[m].position.x,shapes[m].position.y);
      
      //actualizamos fig_in si alguna de las dos figuras esta encima de la otra
      if(n_in_m || m_in_n){fig_in=true}

      if(!(n_in_m || m_in_n)){

        //iteramos sobre los segmentos de las dos figuras
        for(var i=0; i<shapes[n].segments.length; i++){ 
          for(var j=0; j<shapes[m].segments.length; j++){
      
            
            //variables para guardar resultados de funcion compareSegments y compareVertices
            let compSeg=compareSegments(shapes[n].segments[i],shapes[m].segments[j]);
            let compVer=compareVertices(shapes[n].vertices[i],shapes[m].vertices[j]);

            //actualizamos los valores de bool_segments
            if ((compSeg.compareSegments_&&(compSeg.d<5))||compSeg.igualdad){
              shapes[n].bool_segments[i]=true;
              shapes[m].bool_segments[j]=true;
            }

            //actualizamos los valores de bool_vertices
            if (compVer.distancia&&(compVer.d<5)){
              shapes[n].bool_vertices[i]=true;
              shapes[m].bool_vertices[j]=true;
            }
          }
        }
        //console.log(i,j)    
        
      }
        
    }
  }
  return fig_in
}

//compara segmentos y vertices, ajusta los valores booleanos de estos, para descartar los vertices...
  //... y segmentos de shapes1 que limitaran la posicion de la figura seleccionada
  //se usa con shapes1 y es util para la funcion compFigs
function comp_background(shapes){
  //ajustamos a false los valores booleanos de bool_segs and verts
  def_bool_shapes(shapes);

  for (n=0;n<7;n++){
    for (m=n+1;m<7;m++){
      //iteramos sobre los segmentos de las dos figuras
      for(var i=0; i<shapes[n].segments.length; i++){ 
        for(var j=0; j<shapes[m].segments.length; j++){
    
          //variables para guardar resultados de funcion compareSegments y compareVertices
          let compSeg=compareSegments(shapes[n].segments[i],shapes[m].segments[j]);
          
          //actualizamos los valores de bool_segments
          if ((compSeg.compareSegments_&&(compSeg.d<5))||compSeg.igualdad){
            shapes[n].bool_segments[i]=true;
            shapes[m].bool_segments[j]=true;
          }          
        }
      }
      //iteramos sobre los vertices de las dos figuras
      for(var i=0; i<shapes[n].segments.length; i++){ 
        for(var j=0; j<shapes[m].segments.length; j++){
          let compVer=compareVertices(shapes[n].vertices[i],shapes[m].vertices[j]);
          //actualizamos los valores de bool_vertices
          if (compVer.distancia&&(compVer.d<5)){
            let lenght_n=shapes[n].segments.length;
            let lenght_m=shapes[m].segments.length;
            //comprobamos que los segmentos adyacentes al vertice esten cubiertos, para descartar al vertice
            if ( ( shapes[n].bool_segments[(((i-1)%(lenght_n))+lenght_n)%lenght_n] ) &&
                  ( shapes[n].bool_segments[((i)%(lenght_n))] ) && 
                  ( shapes[m].bool_segments[(((j-1)%(lenght_m))+lenght_m)%lenght_m] ) &&
                  ( shapes[m].bool_segments[((j)%(lenght_m))] )  ){

              shapes[n].bool_vertices[i]=true;
              shapes[m].bool_vertices[j]=true;
              }
            }
            
        }
      }
    
    }
  }
}

//compara los vertices y segmentos de las dos listas de shapes, para determinar si se ha llegado a una solucion...
  //... para lo cual entrega un valor booleano 
function compSolucion(shapes0,shapes1){
  //ponemos a false los valores booleanos de las shapes
  def_bool_shapes(shapes0);
  def_bool_shapes(shapes1);
  //variable para la solucion
  let solucion=true;
  //variable para saber si hay figuras sobrelapadas, ademas comparamos cada lista de shape por separado
  let in_0=comp_shapes(shapes0)
  comp_shapes(shapes1)

  //comparamos ahora shape0 con shape1
  for (n=0;n<7;n++){
    for (m=0;m<7;m++){
      //iteramos sobre los segmentos de las dos figuras
      for(var i=0; i<shapes0[n].segments.length; i++){ 
        for(var j=0; j<shapes1[m].segments.length; j++){
    
          //variables para guardar resultados de funcion compareSegments y compareVertices
          let compSeg=compareSegments(shapes0[n].segments[i],shapes1[m].segments[j]);
          let compVer=compareVertices(shapes0[n].vertices[i],shapes1[m].vertices[j]);
          
          
          //actualizamos los valores de bool_segments
          if ((compSeg.compareSegments_&&(compSeg.d<5))||compSeg.igualdad){
            shapes0[n].bool_segments[i]=true;
            shapes1[m].bool_segments[j]=true;
          }
          //actualizamos los valores de bool_vertices
          if (compVer.distancia&&(compVer.d<5)){
            shapes0[n].bool_vertices[i]=true;
            shapes1[m].bool_vertices[j]=true;
          }
        }
      }
    }
  }

  //evaluamos si hay solucion
  if (in_0){solucion=false}
  else{
    for(var n=0;n<7;n++){
      if(!solucion){break}
      for(var i=0; i<shapes0[n].segments.length; i++){
        //verificamos que todos los valoreas booleanos de los segmentos sean verdaderos, si no, solucion=false.
        if (  (!shapes0[n].bool_segments[i])||(!shapes1[n].bool_segments[i])  ){
          solucion=false;
          break
        }
      }    
    }
  }
  return (solucion)
}

//imprime la conversion de un shapes a string con propiedades relevantes del mismo
function shapes_to_str(shapes){
  let shapes_list=[];
  for (i=0;i<7;i++){
    shapes_list[i]={};
    shapes_list[i].positionX = shapes[i].position.x;
    shapes_list[i].positionY = shapes[i].position.y;
    shapes_list[i].rotation = shapes[i].rotation;
    shapes_list[i].scaling = shapes[i].scaling;
    shapes_list[i].base=shapes[i].base;
    shapes_list[i].level=shapes[i].level;
    shapes_list[i].invertion=shapes[i].invertion;
  }

  shapes_list=JSON.stringify(shapes_list)
  console.log("")
  console.log("new string")
  console.log(shapes_list)
  
}

//actualiza un shapes a partir de un string de propiedades
function str_to_shapes(str,shapes){
  str=JSON.stringify(str)
  new_shapes=JSON.parse(str)
  for (i=0;i<7;i++){

    shapes[i].position.x = new_shapes[i].positionX;
    shapes[i].position.y = new_shapes[i].positionY;
    shapes[i].rotation = new_shapes[i].rotation;
    shapes[i].scaling = new_shapes[i].scaling;
    shapes[i].base=new_shapes[i].base;
    shapes[i].level=new_shapes[i].level;
    shapes[i].invertion=new_shapes[i].invertion;
  }

}
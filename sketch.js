
let P_C = 0.7, P_M = 0.001;
let puntos = [];
let _dist = [];
let CANVAS_SIZE_X = 1000;
let CANVAS_SIZE_Y = 800;
let sF = [];
let iter = 0;
let a=0.0;
let scal=0.0;
let iteracc = 0;
let M;
let N;
let generacionesV = 100;

let terminadoT = false;



function setup() {
  createCanvas(CANVAS_SIZE_X, CANVAS_SIZE_Y);

    mdp = createElement('h3','MDP - Problema de laMáxima Diversidad');
    mdp.position(1100, 50);

    mElementos = createElement('h4','Elementos totales (n)');
    mElementos.position(1200, 90);
    inputM = createInput();
    inputM.position(1200, 140);

    nElementos = createElement('h4','Elementos a escoger (m)');
    nElementos.position(1200, 170);
    inputN = createInput();
    inputN.position(1200, 220);

		generacionesT = createElement('h4','Generaciones a evaluar');
    generacionesT.position(1200, 250);
    generacionesB = createInput();
    generacionesB.position(1200, 300);

    button = createButton('Iniciar');
    button.position(1200, 350);

    iteraccGen = createElement('h3','Generación: ' + iteracc);
    iteraccGen.position(1200, 390);
    button.mousePressed(iniciar);

}

/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/

function Randlet(i, j) {
 return Math.floor(Math.random() * j);
}
function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function eraseM(arr, value) {
  removeItemOnce(arr, value);
}
/**
 * Pair
 * @todo Implement algebraic structures: Setoid, Functor
 */
let Pair = function(fst, snd) {
  if (this instanceof Pair) {
    if (Array.isArray(fst) && fst.length === 2 && typeof snd == 'undefined') {
      this[0] = fst[0];
      this[1] = fst[1];
    } else {
      this[0] = fst;
      this[1] = snd;
    }
    this.length = 2;
  } else {
    return new Pair(fst, snd);
  }
};
Pair.prototype.fst = function() {
  return this[0];
};
Pair.prototype.snd = function() {
  return this[1];
};
Pair.of = Pair.prototype.of = function(a1, a2) {
  return new Pair(a1, a2);
};

/**
 * Create fst() and snd() functions
 */
let fst = function(pair) {
  if (pair instanceof Pair) {
    return pair.fst();
  } else if (Array.isArray(pair) && pair.length === 2) {
    return pair[0];
  }
  throw 'Not a pair: ' + pair;
};
let snd = function(pair) {
  if (pair instanceof Pair) {
    return pair.snd();
  } else if (Array.isArray(pair) && pair.length === 2) {
    return pair[1];
  }
  throw 'Not a pair: ' + pair;
};


// User defined class
// to store element and its priority
class QElement {
	constructor(element, priority)
	{
		this.element = element;
		this.priority = priority;
	}
}

// PriorityQueue class
class PriorityQueue {

	// An array is used to implement priority
	constructor()
	{
		this.items = [];
	}

	// functions to be implemented
	// enqueue(item, priority)
	// dequeue()
	// front()
	// isEmpty()
	// printPQueue()
  // enqueue function to add element
// to the queue as per priority
enqueue(element, priority)
{
	// creating object from queue element
	let qElement = new QElement(element, priority);
	let contain = false;

	// iterating through the entire
	// item array to add element at the
	// correct location of the Queue
	for (let i = 0; i < this.items.length; i++) {
		if (this.items[i].priority < qElement.priority) {
			// Once the correct location is found it is
			// enqueued
			this.items.splice(i, 0, qElement);
			contain = true;
			break;
		}
	}

	// if the element have the highest priority
	// it is added at the end of the queue
	if (!contain) {
		this.items.push(qElement);
	}
}

// dequeue method to remove
// element from the queue
dequeue()
{
	// return the dequeued element
	// and remove it.
	// if the queue is empty
	// returns Underflow
	if (this.isEmpty())
		return "Underflow";
	return this.items.shift();
}

// front function
front()
{
	// returns the highest priority element
	// in the Priority queue without removing it.
	if (this.isEmpty())
		return "No elements in Queue";
	return this.items[0];
}

// rear function
rear()
{
	// returns the lowest priorty
	// element of the queue
	if (this.isEmpty())
		return "No elements in Queue";
	return this.items[this.items.length - 1];
}

// isEmpty function
isEmpty()
{
	// return true if the queue is empty.
	return this.items.length == 0;
}

// printQueue function
// prints all the element of the queue
printPQueue()
{
	let str = "";
	for (let i = 0; i < this.items.length; i++)
		str += "\n " + Object.values(this.items[i].element)   + "  |  " + "  Dist: " + this.items[i].priority;
	return str;
}
}





		function seleccionados(x) {
			let i = 0;

			for (let it=0;it < x.length; it++) {
				if(x[it] ==1)
					i++;
			}

			return i;
		}

		function listaSeleccionados(x) {
			let i = [];
			let  j = 0;

			for (let it=0; it < x.length; it++) {
				if(x[it] == 1)
					i.push(j);
				j++;
			}

			return i;
		}

		function listaSeleccionadosABinario(x) {
			//list<let >::iterator it, itL;
			let i = [];
			let  j = 0;

			for (let  j=0; j < getN(); j++)
				i.push_back(0);


            let itL = 0;

			for (let it = 0; it < x.size(); it++) {
                itL = it;
				x[itL] = 1;
				itL = 0;
			}

			return i;
		}

		function listaNoSeleccionados(x) {
			let i = [];
			let  j = 0;

			for (let it = 0; it < x.size(); it++) {
				if(x[it] == 0)
					i.push_back(j);
				j++;
			}

			return i;
		}


		function  mayorDistancia(x) {
			let aux = new PriorityQueue();
			let d = 0.0;

			for (let it = 0; it < x.length; it++) {
				d = distanciaBL(x[it], x);
				let p = new Pair([x[it], d]);
				aux.push(p);
				d = 0.0;
			}

			return aux.front().element;
		}

		function reparador(x) {
			let s0 = [];
            let s1 = [];

			for (let it = 0; it < x.length; it++) {
				if(x[it] == 0)
					s0.push(x[it]);
				else
					s1.push(x[it]);
			}

			let  b = N - s1.length;

			if(b == 0)
				return x;

			else if(b < 0) {
				while(seleccionados(x) != getM()) {
					let  n = mayorDistancia(s1);
					it = n;
					x[it] = 1 - x[it];
					eraseM(s1, s1[it]);
				}
				return x;
			}

			else {
				while(seleccionados(x) != N) {
					let  n = mayorDistancia(s0);
					it = 0;
					it+= n;
					x[it] = 1 - x[it];
					eraseM(s0, s0[it]);
				}
				return x;
			}

		}

    function distanciaElementos(l) {
        let d = 0.0;
        let s = [];
        let  n = 0;

        for(let its = 0; its < l.length; its++) {
          if(l[its] == 1)
            s.push(n);
          n++;
        }

        for(let its = 0; its < s.length; its++) {
            for(let its2 = its+1; its2 < s.length; its2++) {
                if(s[its] < s[its2])
	                  d += _dist[s[its]][s[its2]];
                else
	                  d += _dist[s[its2]][s[its]];
            }
        }

        return d;
    }

    function mejorIndividuo(n1,  n2) {
			let res = [];

      if(distanciaElementos(n1) > distanciaElementos(n2))
				res = n1;

			else res = n2;

			return res;
    }

    //Mediante torneo binario: se eligen aleatoriamente 2 individuos y se
    //selecciona el mejor de ellos
    // En el GG se aplica el torneo tantas veces como individuos hayan
    function seleccionar( p_,  AGG,  AM) {
        let n1 = [];
        let n2 = [];
        let it = 0;
        let individuos = [];
        let  rndm1, rndm2, seleccionados = p_.length;

				if(!AGG)
					seleccionados = 2;

				if(AM)
					seleccionados = M;

					if (AGG) {
						for(let it = 0; it < p_.length; it++)
							individuos.push(p_[it]);
					}

        // 2 porque es el elitista
				let l=0;
        for(let  i=0; i < seleccionados; i++) {
	          it = Randlet (l, p_.length);
	          n1 = p_[it];

	          it = Randlet (0, p_.length);
	          n2 = p_[it];
						l++;

					let min = mejorIndividuo(n1, n2);
          individuos.push(min);
        }

        return individuos;
    }

    //Los hijos sustituyen a la poblacion total
    // En el elitista, los hijos generados en el cruce y mutacion  sustituyen
    // a los 2 peores de la poblacion actual
    function reemplazar(mejorMutado,  AGG,
		poblacion, poblacionLista,
		individuos) {

			let p = distanciaElementos(mejorMutado[0]);

	    if(!AGG) {
				poblacion.enqueue(mejorMutado[0], p);
	      poblacionLista.push(mejorMutado[0]);
			}

			else {
				m = poblacion.front();
				while(!poblacion.isEmpty())
					poblacion.dequeue();

				poblacion.enqueue(mejorMutado[0], p);
	      poblacionLista.push(mejorMutado[0]);
				poblacion.enqueue(m.element, m.priority);

				for(itM = 1; itM < mejorMutado.length; ++itM) {
					m = mejorMutado[itM];
					individuos.push(m);
				}

				poblacionLista = individuos.splice(0);

				let ps;
				for(let itM = 0; itM < individuos.length; itM++) {
					ps = distanciaElementos(individuos[itM]);
					poblacion.enqueue(individuos[itM], ps);
				}

			}
    }

    // Cruce = Recombinar
    // Los hijos heredan caracteristicas de cada padre, si no es asi entonces
    // esto sera un operador de mutacion
    // Los valores que tengan la misma posicion en los padres se mantienen en los hijos
    // 2 tipos de cruces:
    // Cruce uniforme: Genera un hijo a partir de 2 padres, el resto de posiciones
    // se autocompletan con los valores de un padre u otro, necesita reparador
    // Cruce basado en posicion: El resto de posiciones se cogen de un padre, da igual
    // de cual, se crean ordenes aleatorios y se completa el hijo, mas dificil que converja
    function recombinar(individuos,
		 AGG,  crucePosicion,  AM) {
      	let  cruces = P_C*N / 2; // Para el generacional
        let res = [];
        let n1 = [], n2= [], r= [];
        let restos= [];
       	let it = 0, iter= 0, iter2= 0;

				if(!AGG)
					cruces = 2;

				if(AM)
					cruces = P_C*individuos.length / 2;

        for(let  i=0; i < cruces; i++) {
          r = [];
          restos= [];
          n1 = individuos[0];

          n2 = individuos[1];
          iter2 = 0;

          for(let iter = 0; iter < n1.length; iter++) {
            if(n1[iter] == n2[iter])
              r.push(n1[iter]);
            else {
              restos.push(n1[iter]);
              r.push(2);
            }
          }

          restosN = shuffle(restos);
					restos = restosN.splice(0);
          let itRestos = 0;

          for(let iter = 0; iter < r.length; iter++) {
            if(r[iter] == 2) {
              r[iter]  = restos[itRestos] ;
              ++itRestos;
            }
          }
          res.push(r);


					if(AGG) {
						it = 0;
						eraseM(individuos[it], it);
						it = 0;
						eraseM(individuos[it], it);
					}

					if(crucePosicion)
						reparador(r);
        }

        return res;
    }

    // Probabilidad de mutar muy baja
    function mutar(p_,  AGG) {
      let elementosAMutar = P_M * N * p_.length;
      let paux1 = p_, pauxMejorMutado = [];
			let paux = paux1.splice(0);
      let it = 0;
      let itL= 0, itL2= 0;
      let r;
      let  rndm, rndm1, rndm2, ax;

			if(!AGG)
				elementosAMutar = 2;

			for(let  i= 0; i < paux.length; i++)

      for(let  i= 0; i < elementosAMutar; i++) {
        it = 0;
        rndm = Randlet (0,paux.length);

        it+= rndm;
        r1 = paux[it];
				r = r1.splice(0);
        eraseM(paux, paux[it]);
        let terminado = false;

       while(!terminado) {
          itL = 0;
          itL2 = 0;
          rndm1 = Randlet (0,r.length);
          rndm2 = Randlet (0,r.length);
          itL+= rndm1;
          itL2+= rndm2;

          if(r[itL] != r[itL2]) {
            ax = r[itL] ;
            r[itL]  = r[itL2];
            r[itL2]  = ax;
            terminado = true;
          }
        }
        pauxMejorMutado.push(r);
      }

      return pauxMejorMutado;//auxN.front().element;
    }


    function inicializar() {
      let sel = [];
      let elemento= [];
      let barajar = [];
			      let ceros =[];

      for(let  i=0; i < M; i++) {
        barajar.push(i);
        elemento.push(0);
        ceros.push(0);
      }

      let it = 0;
     let itBarajar = 0;

      for(let  i=0; i < N; i++) {
        let barajarN = shuffle (barajar, true);

				barajar = barajarN.slice(0);
      	elemento = ceros.slice(0)

	      for(let  i=0; i < N; i++) {
	       it+= barajar[itBarajar];
	        elemento[it] = 1;
	        it =0 ;
	        ++itBarajar;
	      }

        itBarajar =0;
				barajarN = [];
        sel.push(elemento);
      }

      return sel;
    }

    //Generacional: En cada iteracion se crea una nueva poblacion que reemplazar
    //completamente a la anterior
    //Estacionaria: En cada iteracion se eligen 2 padres y se le aplica los
    //operadores geneticos, reemplazando a 2 individuos de la poblacion anterior
    // produciendo presion selectiva alta (convergencia rapida) porque
    //reemplaza a los peores cromosomas de la poblacion



    function AlgoritmoGenetico (AGG, crucePosicion, AM, poblacionLista,
		individuos, cruzados, mejorMutado, generaciones, poblacion) {
			let i = 0;

      while(i < 100) {
        individuos = seleccionar(poblacionLista, AGG, AM);
        cruzados = recombinar(individuos, AGG, crucePosicion, AM);
        mejorMutado = mutar(cruzados, AGG);
				reemplazar(mejorMutado, AGG, poblacion, poblacionLista, individuos);
        i++;
				generaciones++;

				if(AM && generaciones == M) {
					AlgoritmoMemetico(poblacion, poblacionLista, individuos);
					generaciones = 0;
				}
      }

      par = poblacion.front().element;
      return par;
    }

/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
function sMasLejano() {
  let d = 0.0,
    max = 0.0;
  let iMax;
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < M; j++) {
      if (i > j)
        d += _dist[j][i];
      if (i < j)
        d += _dist[i][j];
    }

    if (d > max) {
      max = d;
      iMax = i;
    }
    d = 0.0;
  }

  return iMax;
}


function distancia(i, s, k) {
  let d = 0.0;

      if(k<i)
        d += _dist[k][i];
      else
        d += _dist[i][k];

  return d;
}

function criterioSeleccion(s, sel) {
  let iMax;
  let max = 0.0, d = 0.0;

  for (let i=0; i < s.length; i++) {
    for (let j=0; j < sel.length; j++)
        d += distancia(sel[j], sel, s[i]);

      if (d > max) {
        max = d;
        iMax = s[i];
      }

      d = 0.0;
  }

  return iMax;
}

function Greedy() {
  let sel = [], s = [];
  let k;
  for (let i = 0; i < M; i++)
    s.push(i);

  k = sMasLejano();
  stroke(0, 255, 0);
  strokeWeight(25);
  sel.push(k);
  s.splice(s.indexOf(k), 1);

  while (sel.length != N) {
    k = criterioSeleccion(s, sel);
    sel.push(k);
    s.splice(s.indexOf(k), 1);
  }

  return sel;
}

function primerElemento(s) {
    if( 0 < s.length )
        return s[0];
    else return 0;
}
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/
/***********************************************************************/

let emp = true;

function iniciar() {
  if(inputM.value() > 500 || inputN.value() > 50 || generacionesB.value() > 500) {
    terminadoT = false;
    alert("N es demasiado grande (<500) o M es demasiado grande (<50) o generaciones demasiado grande (<500)");
  }

  else terminadoT = true;
//console.log(inputN.value());

  if(terminadoT) {
    puntos = [];
    sF = [];
    sFF = [];
    _dist = [];
    iter = 7;
    scal = 0.0;

    M = inputM.value();
    N = inputN.value();
		generacionesV = generacionesB.value();

    for (let i = 0; i < M; i++)
      puntos.push(createVector(random(40, CANVAS_SIZE_X-40),
  		random(40, CANVAS_SIZE_Y-40)));

    for (let i = 0; i < puntos.length; i++)
      _dist[i] = [];

    for (let i = 0; i < puntos.length; i++) {
      for (let j = i + 1; j < puntos.length; j++) {
        let dist_eu = sqrt(pow(puntos[i].x - puntos[j].x, 2)
  			+ Math.pow(puntos[i].y - puntos[j].y, 2));
        _dist[i][j] = dist_eu;
      }
    }

    background(80);
    stroke(255, 0, 0);
    strokeWeight(7);
    for (let p of puntos)
      point (p.x, p.y);

  		if(emp) {
  			p = inicializar().splice(0);
  			let itM = 0, iters = 0;

  			for(let itM = 0; itM < p.length; ++itM)  {
  				let res =  distanciaElementos(p[itM]);
  				poblacion.enqueue(p[itM], res);
  				auxP.enqueue(p[itM], res);
  				res = [];
  			}

  			while(!auxP.isEmpty()) {
  				par = auxP.front().element;
  				poblacionLista.push(par);
  				auxP.dequeue().element;
  			}

  			emp = false;
  			let anterior = [];

  		}
    }
}
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
let  t = 0, i = 0, generaciones = 0, individuos = [], cruzados = [],
mejorMutado;

let poblacion = new PriorityQueue(), auxP = new PriorityQueue();
let p = [], poblacionLista = [], vistos = [];
let sig = false;
let empezando = true;
let hecho = true;
let siguiente = 0;

function Genetic() {
	anterior = sF;

	sFF = AlgoritmoGenetico(false, false, false, poblacionLista,
	individuos, cruzados, mejorMutado, generaciones, poblacion);

	//console.log("Genetic temrinado");
	sF = listaSeleccionados(sFF);
	sig = true;
	return sF;
}
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
function draw() {
  if(terminadoT){
    frameRate(5);
		anterior = sF;
		sF = Genetic();
		iteracc++;

    iteraccGen.html('Generación: ' + iteracc + "/" + generacionesV);

		strokeWeight(10);
		stroke(0, iteracc*2, iteracc*20);
		for (let p of anterior)
			point (puntos[p].x, puntos[p].y);

			strokeWeight(10);
			stroke(0, 255, 0);
			for (let p of sF)
				point (puntos[p].x, puntos[p].y);


		if(iteracc >= generacionesV) {
			strokeWeight(14);
			stroke(0, 255, 0);
			for (let p of sF)
				point (puntos[p].x, puntos[p].y);

			noLoop();
		}
  }

}

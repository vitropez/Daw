window.onload = (event) => {
  const xhr = new XMLHttpRequest();
  const xhrSub = new XMLHttpRequest();
  let datos = document.getElementById("datos");
  let datosSub = document.getElementById("datos-sub");

  let datosArray = [];
  let datosArrayKeys = [];
  let datosArrayValues = [];
  let paginas = [];
  let numPaginas;
  let datosJson;

  listaDatos = document.createElement("li");
  var miPagina;
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      datosJson = JSON.parse(xhr.responseText);
      Object.keys(datosJson).forEach((element) => {
        datosArray.push(element);
      });

      datosArray.forEach((element, index) => {
        listaDatos = document.createElement("li");
        listaDatos.innerHTML = datosArray[index];
        datos.appendChild(listaDatos);
      });
    }
    let misEnlaces = document.getElementsByTagName("li");

    for (let index = 0; index < misEnlaces.length; index++) {
      misEnlaces[index].addEventListener(
        "click",
        () => {
          numPaginas = 1;
          Object.values(datosJson).forEach((element) => {
            paginas.push(element);
            window.miPagina = paginas[index];

            xhrSub.open("GET", paginas[index] + numPaginas + "/");
            xhrSub.send();
            console.log(window.miPagina);
          });
        },
        false
      );
    }
    let botonAvanzar = document.getElementById("avanzar");
    botonAvanzar.addEventListener("click", () => {
     
        numPaginas++;
    
      xhrSub.open("GET", window.miPagina + numPaginas + "/");
      xhrSub.send();
    });
    let botonRetroceso = document.getElementById("retroceso");
    botonRetroceso.addEventListener("click", () => {
    
        numPaginas--;
      
      xhrSub.open("GET", window.miPagina + numPaginas + "/");
      xhrSub.send();
    });
  });
  xhr.open("GET", "https://swapi.dev/api/");
  xhr.send();

  xhrSub.addEventListener("readystatechange", () => {
    if (xhrSub.readyState !== 4) return;

    if (xhrSub.status >= 200 && xhr.status < 300) {
      while (datosSub.firstChild) {
        datosSub.removeChild(datosSub.firstChild);
      }
      let datosJsonSub = JSON.parse(xhrSub.responseText);

      Object.keys(datosJsonSub).forEach((element) => {
        datosArrayKeys.push(element);
      });

      Object.values(datosJsonSub).forEach((element, i) => {
        datosArrayValues.push(element);

        let listaDatos = document.createElement("li");
        listaDatos.innerHTML = datosArrayKeys[i] + ":" + datosArrayValues[i];
        datosSub.appendChild(listaDatos);
      });
      datosArrayKeys = [];
      datosArrayValues = [];
    }
  });
};

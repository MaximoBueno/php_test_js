//METODO AJAX NATIVO
var ajax = {};
ajax.x = function () {
       if (typeof XMLHttpRequest !== 'undefined') {
           return new XMLHttpRequest();
       }
       var versions = [
           "MSXML2.XmlHttp.6.0",
           "MSXML2.XmlHttp.5.0",
           "MSXML2.XmlHttp.4.0",
           "MSXML2.XmlHttp.3.0",
           "MSXML2.XmlHttp.2.0",
           "Microsoft.XmlHttp"
       ];

       var xhr;
       for (var i = 0; i < versions.length; i++) {
           try {
               xhr = new ActiveXObject(versions[i]);
               break;
           } catch (e) {
           }
       }
       return xhr;
};

ajax.send = function (url, callback, method, data, async) {
       if (async === undefined) {
           async = true;
       }
       var x = ajax.x();
       x.open(method, url, async);
       x.onreadystatechange = function () {
           if (x.readyState == 4) {
               callback(x.responseText);
           }
       };
       if (method == 'POST') {
           x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
       }
       x.send(data);
};

ajax.get = function (url, data, callback, async) {
       var query = [];
       for (var key in data) {
           query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
       }
       ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async);
};

ajax.post = function (url, data, callback, async) {
       var query = [];
       for (var key in data) {
           query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
       }
       ajax.send(url, callback, 'POST', query.join('&'), async);
};

//METODO PARA LLAMAR LA LISTAS DE CATEGORIAS
ajax.post('./controller/listaCategoria.php', {valor: 'protected'}, function(res) {
    renderListaCategorias(res);
});

//METODO QUE PARSE EL JSON DEL CONTROLLER
function renderListaCategorias(res){
    var parseo = JSON.parse(res);
    var ul = document.getElementById("renderListaCategoria");
    if(parseo[0]['estado'] == 1){
        parseo.forEach(categoria => {
            console.log(categoria['data'].id_categoria + ' - ' + categoria['data'].categoria);
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(categoria['data'].categoria));
            li.setAttribute("id", 'CA'+categoria['data'].id_categoria); 
            ul.appendChild(li);
        });
    }else{
        console.log('Error: ' + parseo[0]['mensaje']);
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(parseo[0]['mensaje']));
        li.setAttribute("id", 'ER1'); 
        ul.appendChild(li);
    }
}
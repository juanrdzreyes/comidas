angular.module('app.controllers', [])
  
.controller('menuSemanalCtrl', ['$scope', '$stateParams', '$state', '$rootScope', '$log', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, $state, $rootScope, $log) {
    plats=$rootScope.platillos;
    menus=$rootScope.menus;
    $scope.DisableClicks = 0;
    $scope.limitinf = 0;
    var platillosactivos = 5;
    var platillos = [1,1,1,1,1];
    var incrementos = [0,0,0,0,0];
    var swap = [1,0]
    $rootScope.datoscambio = {
        nuevoplatillo: "",
        diacambio: ""
    }
    $scope.platatstake={};
    pricetier=$rootScope.PriceTier;

$scope.$on('$ionicView.beforeEnter', function() {
     // Code you want executed every time view is opened
    cambio = $rootScope.datoscambio.nuevoplatillo;
    $scope.admin=$rootScope.admin;
    if ( cambio !== "" ) {
        //                alert($rootScope.datoscambio.diacambio+" "+cambio);

        switch($rootScope.datoscambio.diacambio) {
            case 0: menuactual.Dia1=cambio; j=0; break;
            case 1: menuactual.Dia2=cambio; j=1; break;
            case 2: menuactual.Dia3=cambio; j=2; break;
            case 3: menuactual.Dia4=cambio; j=3; break;
            case 4: menuactual.Dia5=cambio; j=4;
        }
        platillos[j]=1;
        incrementos[j]=plats[cambio].price2;
        $rootScope.datoscambio.nuevoplatillo="";
        $rootScope.datoscambio.diacambio="";
        loadmenus();
    }
  })


  //  function gplatrow(param){
  //      for ( var i = 0; i < platillos.length; i++){
    //        if ( platillos[i].id == param ){ break; }
      //  }
        //return i;
    //    return param;
//    }
    
    //$log.debug(menus);
    //define cual es el men´ú que aplica AHORITA
    var semanaInicial = new Date();
    var semanaTest = new Date();
    var desfasesemana = [8,7,6,5,4,3,9];
      // para que seimpre caiga en el lunes "siguiente", siendo el límite el viernes
    poragregar = desfasesemana[semanaInicial.getDay()];
    semanaInicial.setDate(semanaInicial.getDate()+poragregar);
    function datestring(param){
        dia = (param.getDate()<10 ? "0" : "") + param.getDate();
        mes = (param.getMonth()<9 ? "0" : "") + (param.getMonth()+1);
        anio = param.getFullYear();
        stringcompleto = anio+"-"+mes+"-"+dia;
        return stringcompleto;
    }
    
//    stringSemanaInicial = datestring (semanaInicial);
//    alert(stringSemanaInicial);
    var ordenmenus = [];
    var stringmenus = [];
    var meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    match=1;
    for (i = 0; i < 4; i++) {
        if ( match == 1 ) { match = 0; } else { break; }
        resta = 7*i;
        semanaTest.setDate(semanaInicial.getDate()-resta);
        stringcomp=datestring(semanaTest);
        //alert(resta+"-"+semanaInicial+"-"+i+"-"+semanaTest+"-"+stringcomp);
        for (j = 0; j < menus.length; j++){
            if ( menus[j].Semana == stringcomp ) {
                match = 1;
        //        alert(i+"."+j);
                ordenmenus[i]=j;
                stringmenus[i]=semanaTest.getDate()+'/'+meses[semanaTest.getMonth()];
            }
        }
    }
    $scope.pos = 0;
    $scope.menusdisp = ordenmenus.length-1;
      //en realidad es +1, pues considera el 0
    
    //$log.debug(ordenmenus);
    custom=[];
    extratxt=[];
    function loadmenus(){
        $scope.InSem=stringmenus[$scope.pos];
        if ($scope.pos>0) {
            //cuando estás revisando anterior, jala directo de menus.
            A=menus[$scope.pos].Dia1;
            B=menus[$scope.pos].Dia2;
            C=menus[$scope.pos].Dia3;
            D=menus[$scope.pos].Dia4;
            E=menus[$scope.pos].Dia5;
            //similarmente, siempre estan activos
            Dia1Activo=1;
            Dia2Activo=1;
            Dia3Activo=1;
            Dia4Activo=1;
            Dia5Activo=1;
            custom=[0,0,0,0,0];
            extratxt=['','','','',''];
            //y el precio simpre es el original
            $scope.precio=menus[$scope.pos].Precio
            $scope.preprecio="";
            $scope.botongris=1;
        }else{
            A=menuactual.Dia1;
            B=menuactual.Dia2;
            C=menuactual.Dia3;
            D=menuactual.Dia4;
            E=menuactual.Dia5;
            Dia1Activo=platillos[0];
            Dia2Activo=platillos[1];
            Dia3Activo=platillos[2];
            Dia4Activo=platillos[3];
            Dia5Activo=platillos[4];
            for (var i=0; i<5; i++){
                if (incrementos[i]>0) { 
                    custom[i]=1;
                    extratxt[i]="     ( +"+incrementos[j]+" )";
                }else{
                    extratxt[i]="";
                    custom[i]=0;
                }
            }
            inctotal = parseInt(incrementos[0]) + parseInt(incrementos[1]) + parseInt(incrementos[2]) + parseInt(incrementos[3]) + parseInt(incrementos[4]);
            precioconincs = parseInt(precioactual) + parseInt(inctotal);
            $scope.precio = precioconincs;
            $scope.preprecio="Comprar:  ";
            $scope.botongris=0;
        }
        //alert(custom[0]);
        $scope.lunes = {
            id : A,
            name: plats[A].name,
            desc: plats[A].desc,
            img: plats[A].img,
            activo: Dia1Activo,
            cust: custom[0],
            extrat: extratxt[0]
        };
        $scope.martes = {
            id : B,
            name: plats[B].name,
            desc: plats[B].desc,
            img: plats[B].img,
            activo: Dia2Activo,
            cust: custom[1],
            extrat: extratxt[1]
        };
        $scope.miercoles = {
            id : C,
            name: plats[C].name,
            desc: plats[C].desc,
            img: plats[C].img,
            activo: Dia3Activo,
            cust: custom[2],
            extrat: extratxt[2]
        };
        $scope.jueves = {
            id : D,
            name: plats[D].name,
            desc: plats[D].desc,
            img: plats[D].img,
            activo: Dia4Activo,
            cust: custom[3],
            extrat: extratxt[3]
        };
        $scope.viernes = {
            id : E,
            name: plats[E].name,
            desc: plats[E].desc,
            img: plats[E].img,
            activo: Dia5Activo,
            cust: custom[4],
            extrat: extratxt[4]
        };
    }
    
    function reestablecerMenuActual() {
        menuactual= { 
            Dia1: menus[0].Dia1,
            Dia2: menus[0].Dia2,
            Dia3: menus[0].Dia3,
            Dia4: menus[0].Dia4,
            Dia5: menus[0].Dia5
        };
        platillos=[1,1,1,1,1];
        incrementos=[0,0,0,0,0];
        //alert('hola');
        precioactual=menus[0].Precio;
        loadmenus();
    }
    
    reestablecerMenuActual();
    

//    $log.debug($scope.lunes);
    $scope.menuanterior = function(){
        $scope.pos = $scope.pos + 1;
        //alert($scope.pos);
        if ( $scope.pos == $scope.menusdisp ) { $scope.limitinf=1; }
        loadmenus();
    };
    
    $scope.menusiguiente = function(){
        $scope.pos = $scope.pos - 1;
        if ( $scope.limitinf === 1 ) { $scope.limitinf = 0 }
        //alert($scope.pos);
        loadmenus();
    };
    
    $scope.modifymenu = function(param) {
        $scope.DisableClicks = 1;
        switch(param) {
            case 0: $scope.platatstake.name=$scope.lunes.name;$scope.platatstake.desc=$scope.lunes.desc; break;
            case 1: $scope.platatstake.name=$scope.martes.name;$scope.platatstake.desc=$scope.martes.desc; break;
            case 2: $scope.platatstake.name=$scope.miercoles.name;$scope.platatstake.desc=$scope.miercoles.desc; break;
            case 3: $scope.platatstake.name=$scope.jueves.name;$scope.platatstake.desc=$scope.jueves.desc; break;
            case 4: $scope.platatstake.name=$scope.viernes.name;$scope.platatstake.desc=$scope.viernes.desc;
        }
        $scope.atstake = param;
        if (platillos[param] == 1) {
            $scope.eliminarreactivar = "Indica si deseas cambiar o eliminar el platillo seleccionado:";
            $scope.dishactive = 1;  //para los botones
        }else{
            $scope.eliminarreactivar = "Indica si deseas cambiar o reactivar el platillo seleccionado:";
            $scope.dishactive = 0;
        }
        if (platillosactivos == 3 && platillos[param] == 1 ){
            $scope.dishactive=2;
            $scope.eliminarreactivar = "Este platillo no se puede eliminar al ser 2 el mínimo de platillos por semana";
        }
        $scope.showpopup = 1;
    };
    
    $scope.cancelpopup = function() {
        $scope.showpopup = 0;
        $scope.DisableClicks = 0;
    };
    
//    function changeopac(param1,param2){
//        var elements = document.querySelectorAll('menuviernes');
//        for(var i=0; i<elements.length; i++){
  //          elements[i].opacity = param2;
//        }
  //  }
    
    $scope.deletedish = function(param) {
        //var elements = document.querySelectorAll('menuviernes');
        //for(var i=0; i<elements.length; i++){
        //    elements[i].opacity = "0.2";
        //}
        
        //el siguiente switch reestablece el platillo al original, en caso que haya habido customizacion
        switch(param) {
            case 0: menuactual.Dia1=menus[0].Dia1; break;
            case 1: menuactual.Dia2=menus[0].Dia2; break;
            case 2: menuactual.Dia3=menus[0].Dia3; break;
            case 3: menuactual.Dia4=menus[0].Dia4; break;
            case 4: menuactual.Dia5=menus[0].Dia5;
        }
        incrementos[param] = 0;
        platillos[param] = 0;
        if ( platillosactivos == 5 ){ precioactual = precioactual - 35 - 9*parseInt(pricetier); }
        if ( platillosactivos == 4 ){ precioactual = precioactual - 30 - 9*parseInt(pricetier); }
//        if ($scope.precio == "260"){$scope.precio="230"}
//        if ($scope.precio == "295"){$scope.precio="260"}
        platillosactivos = platillosactivos - 1;
        loadmenus();
        $scope.showpopup = 0;
        $scope.DisableClicks = 0;
    };
    
    $scope.reactivatedish = function(param) {
   //     switch(param) {
//            case 0: $scope.platillo1=1; break;
  //          case 1: $scope.platillo2=1; break;
    //        case 2: $scope.platillo3=1; break;
      //      case 3: $scope.platillo4=1; break;
        //    case 4: $scope.platillo5=1;
    //    }
        platillos[param] = 1;
        if ( platillosactivos == 4 ){ precioactual = precioactual + 35 + 9*parseInt(pricetier); }
        if ( platillosactivos == 3 ){ precioactual = precioactual + 30 + 9*parseInt(pricetier); }
//        if ($scope.precio == "260"){$scope.precio="295"}
//        if ($scope.precio == "230"){$scope.precio="260"}
        platillosactivos = platillosactivos + 1;
        loadmenus();
        $scope.showpopup = 0;
        $scope.DisableClicks = 0;
    };

    $scope.changedish = function(param){
        $scope.showpopup = 0;
        $scope.DisableClicks = 0;
        $rootScope.datoscambio.diacambio = param;
        switch(param) {
            case 0: platillooriginal=menus[0].Dia1; break;
            case 1: platillooriginal=menus[0].Dia2; break;
            case 2: platillooriginal=menus[0].Dia3; break;
            case 3: platillooriginal=menus[0].Dia4; break;
            case 4: platillooriginal=menus[0].Dia5;
        }
        $rootScope.datoscambio.platilloorig = platillooriginal;
        //$state.go('historialDePedidos');
    };
    
    function parapedido(dia){
        if ( dia.activo === 0 ) {
            salida = -2;
        }else if (dia.cust === 0) {
            salida = -1;
        }else{
            salida = dia.id;
        }
        //alert(salida);
        return salida;
    }
    
    $scope.comprar = function(){
        $rootScope.datacomprar = {
            precio: $scope.precio,
            fuente: 0,
            fecha: $scope.InSem,
            lunombre: $scope.lunes.name,
            luactivo: $scope.lunes.activo,
            luplat: parapedido($scope.lunes),
            manombre: $scope.martes.name,
            maactivo: $scope.martes.activo,
            maplat: parapedido($scope.martes),
            minombre: $scope.miercoles.name,
            miactivo: $scope.miercoles.activo,
            miplat: parapedido($scope.miercoles),
            junombre: $scope.jueves.name,
            juactivo: $scope.jueves.activo,
            juplat: parapedido($scope.jueves),
            vinombre: $scope.viernes.name,
            viactivo: $scope.viernes.activo,
            viplat: parapedido($scope.viernes),
        };
        $state.go('finalizaTuPedido');
    };
    
    $scope.popupreest = function(param){
        $scope.showpopupreest=param;
        $scope.DisableClicks=param;
    }
    $scope.popupinfo = function(param){
        $scope.showpopupinfo=param;
        $scope.DisableClicks=param;
    }
    $scope.reestMenu = function(){
        reestablecerMenuActual();
        $scope.showpopupreest=0;
        $scope.DisableClicks=0;

    }

}])
   
.controller('comidaPorDiaCtrl', ['$scope', '$stateParams', '$log', '$rootScope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $log, $rootScope, $state) {
    $scope.platillos=$rootScope.platillos;

    $scope.pedido = function(param){
        $rootScope.datacomprar = {
            precio: param.price,
            fuente: 1,
            id : param.id,
            nombre: param.name,
            desc: param.desc
        };
        $state.go('finalizaTuPedido');
    };
}])
   
.controller('cambioDePlatilloCtrl', ['$scope', '$stateParams', '$log', '$rootScope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $log, $rootScope, $state) {
    $scope.platillos=$rootScope.platillos;
    $log.debug($scope.platillos);
    $scope.platillooriginal=parseInt($rootScope.datoscambio.platilloorig) + 1;
//    alert($scope.platillooriginal);
//    alert($scope.platillos[0].id)
//    preciobase=$rootScope.datoscambio.preciobase;
//    diacambio=$rootScope.datoscambio.diacambio;
    
//    for (i = 0; i < $scope.platillos.length; i++){
  //      $scope.platillos2[i].price=$scope.platillos[i].price-preciobase;
    //}

    $scope.cambio = function(param){
        //alert(param);
        //$log.debug(param);
        $rootScope.datoscambio.nuevoplatillo=param;
        //$state.go('menSemanal');
    };
}])
   
.controller('historialDePedidosCtrl', ['$scope', '$stateParams', '$http', '$log', '$ionicUser', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http, $log, $ionicUser) {
    $scope.descargando = 1;
    //var deferred = $q.defer();
    var promisepedidos = $http.get("https://pertendo.com/comidaschona/showpedidos.php");
    promisepedidos.then ( function(data,status,header,config) {
                //$log.debug(data.data);
        //if ( logupdates == 1 ) { alert('exito bajando listado de platillos'); }
        $pedidos=data.data;
        $log.debug(data.data);
        $scope.descargando = 0;
        $scope.pedidos=[];
        j=0;
        sino=["Sí","No"];
        for ( var i = 0; i< data.data.length ; i ++ ){
            if ( data.data[i].user == $ionicUser.details.email ){
                if ( parseInt(data.data[i].tipo) === 0 ){
                    titulo = "Pedido para la semana del "+data.data[i].fechaped+".";
                }else{
                    titulo = "Comida por día para el "+data.data[i].fechaped+".";
                }
                $scope.pedidos[j]={
                    titulo: titulo,
                    txtpedido: data.data[i].txtpedido,
                    precio: data.data[i].preciopedido,
                    datenvio: data.data[i].datenvio,
                    descs: "Cubiertos: "+sino[data.data[i].desccubs]+"; Envío en hora comida: "+sino[data.data[i].descenvio]+"; Bebida: "+sino[data.data[i].descagua]+"."
                };
                j=j+1;
            }
        }
        $scope.descargando = 0;
        //filtra los del usuario en un nuevo array y ese nuevo array jalalo a la lista..
        //dale formato..
        
    });
    promisepedidos.error( function(data, status, header, config) { 
        if ( logupdates == 1 ) { alert("error bajando pedidos"); } 
        //popup con error e intentar ms tarde
    });
}])
   
.controller('finalizaTuPedidoCtrl', ['$scope', '$stateParams', '$log', '$rootScope', '$state', '$ionicUser', '$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $log, $rootScope, $state, $ionicUser, $http) {
    $scope.existedireccion=$rootScope.existedireccion;
    //alert($scope.existedireccion);
    $scope.enviando = 0;
    $scope.descs = [
        [
        {
          id:'desc0',
          desc: 'Incluir cubiertos',
          monto: 10,
          activo: 0,
        },
        {
          id:'desc1',
          desc: 'Envío dentro de la hora de comida',
          monto: 30,
          activo: 0,
        },
        {
          id:'desc2',
          desc: 'Incluir agua fresca',
          monto: 40,
          activo: 0,
        }
        ],
        [
        {
          id:0,
          desc: 'Incluir cubiertos',
          monto: 2,
          activo: 0,
        },
        {
          id:1,
          desc: 'Envío dentro de la hora de comida',
          monto: 10,
          activo: 0,
        },
        {
          id:2,
          desc: 'Incluir agua fresca',
          monto: 8,
          activo: 0,
        }
        ]
    ];
    
    diasS=['Domingo','Lunes','Martes','Miércoes','Jueves','Viernes','Sábado'];
    mesesS=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

    function datefechaent(param){
        dia = param.getDate();
        diaS = diasS[param.getDay()]; 
        mesS = mesesS[param.getMonth()];
        stringcompleto = diaS+" "+dia+"/"+mesS;
        return stringcompleto;
    }
    
    $scope.data={};
    $scope.data.opciones=[];
    
//    var diaInicial = new Date();
    var diaTest = new Date();
    diaTest.setDate(diaTest.getDate()-1);
        //este -1 es porque abajo en el for se puso +1 en lugar de +i, para que se incremente él mismo
        //se incrementa ´él mismo para poder brincarse sabados y domingos, de otra forma se hace un pancho
        //Entonces, antes arrancaba de i=0.. Ahora no..
    if ( diaTest.getHours() > 7 ){
        diaTest.setDate(diaTest.getDate()+1);
    }
        //Este >7 establece que a las 8 de la mañana se dejan de recibir pedidos para el mismo día..
    
    for ( var i=0; i<5; i++ ){
        diaTest.setDate(diaTest.getDate()+1);
        if ( diaTest.getDay() == 6 ){ diaTest.setDate(diaTest.getDate()+2); }
        if ( diaTest.getDay() === 0 ){ diaTest.setDate(diaTest.getDate()+1); }
        $scope.data.opciones[i]={};
        $scope.data.opciones[i].label=datefechaent(diaTest);
        $scope.data.opciones[i].id=i;
    }
    
    $scope.data.opcionselec={};
    
    $scope.lunes={};
    $scope.martes={};
    $scope.miercoles={};
    $scope.jueves={};
    $scope.viernes={};
    $scope.platillo={};
    
    $scope.lunes.name=$rootScope.datacomprar.lunombre;
    $scope.lunes.activo=$rootScope.datacomprar.luactivo;
    $scope.martes.name=$rootScope.datacomprar.manombre;
    $scope.martes.activo=$rootScope.datacomprar.maactivo;
    $scope.miercoles.name=$rootScope.datacomprar.minombre;
    $scope.miercoles.activo=$rootScope.datacomprar.miactivo;
    $scope.jueves.name=$rootScope.datacomprar.junombre;
    $scope.jueves.activo=$rootScope.datacomprar.juactivo;
    $scope.viernes.name=$rootScope.datacomprar.vinombre;
    $scope.viernes.activo=$rootScope.datacomprar.viactivo;
    
    $scope.platillo.nombre=$rootScope.datacomprar.nombre;
    $scope.platillo.desc=$rootScope.datacomprar.desc;
    
    $scope.TOTALPED = $rootScope.datacomprar.precio;
    precioOriginal = $rootScope.datacomprar.precio;
    var fuente = $rootScope.datacomprar.fuente;
    $scope.testinghtml = $rootScope.datacomprar.texto;
    
    $scope.fuente = fuente;
    //alert($scope.fuente);
    
    $scope.actprecio = function(param){
        //$log.debug(param);
        if (param.checked === true ) { param.activo = 0; } else { param.activo = 1; }
        totaldescuentos=$scope.descs[fuente][0].monto*$scope.descs[fuente][0].activo+$scope.descs[fuente][1].monto*$scope.descs[fuente][1].activo+$scope.descs[fuente][2].monto*$scope.descs[fuente][2].activo;
        $scope.TOTALPED=precioOriginal-totaldescuentos;   
    };
    
    $scope.cierrapedido = function(){
        if ( fuente === 1 ) { $state.go('tabsController.comidaPorDia_tab2') } else { $state.go($rootScope.nombremenu) }
    };
    
    $scope.registrapedido = function(){
        
        $scope.enviando = 1;
        
        url='https://pertendo.com/comidaschona/registraorden.php';
        
        datos = {};
        datos.user = $ionicUser.details.email;
        datos.tipo = $scope.fuente;
        datos.txtpedido = "";
        if ( datos.tipo === 0 ){
            if ( $scope.lunes.activo == 1 ) { datos.txtpedido = datos.txtpedido + "Lunes: "+$scope.lunes.name+"; "; }
            if ( $scope.martes.activo == 1 ) { datos.txtpedido = datos.txtpedido + "Martes: "+$scope.martes.name+"; "; }
            if ( $scope.miercoles.activo == 1 ) { datos.txtpedido = datos.txtpedido + "Miércoles: "+$scope.miercoles.name+"; "; }
            if ( $scope.jueves.activo == 1 ) { datos.txtpedido = datos.txtpedido + "Jueves: "+$scope.jueves.name+"; "; }
            if ( $scope.viernes.activo == 1 ) { datos.txtpedido = datos.txtpedido + "Viernes: "+$scope.viernes.name+"; "; }
            datos.fechaped = $rootScope.datacomprar.fecha;
               /// FALTA ARREGLAR - HACK
            datos.lun = $rootScope.datacomprar.luplat;
            datos.mar = $rootScope.datacomprar.maplat;
            datos.mie = $rootScope.datacomprar.miplat;
            datos.jue = $rootScope.datacomprar.juplat;
            datos.vie = $rootScope.datacomprar.viplat;
        } else {
            datos.txtpedido = $scope.platillo.nombre + " " + $scope.platillo.desc + ". Fecha de Entrega: " + $scope.data.opcionselec.label;
            if ( $scope.data.opcionselec.label ){
                datos.fechaped = $scope.data.opcionselec.label;
            }else{
                datos.fechaped = "noexiste";
            }
               /// FALTA ARREGLAR
               //$log.debug($scope.data.opcionselec);
            datos.lun = $rootScope.datacomprar.id;
        }
        datos.preciopedido = $scope.TOTALPED;
        datos.datenvio = $ionicUser.get('address') + ". " + $ionicUser.get('addref') + ". " + $ionicUser.get('col') + ". " + $ionicUser.get('city') + ". CP " + $ionicUser.get('postalcode');
        if ( $scope.descs[fuente][1].activo == 1 ) { datos.datenvio = datos.datenvio + ". Horario de comida: " + $ionicUser.get('horacomida'); }
        datos.datperson = $ionicUser.details.name + $ionicUser.get('lastname') + ". Teléfono: " + $ionicUser.get('phone');
        datos.desccub = $scope.descs[fuente][0].activo;
        datos.descenvio = $scope.descs[fuente][1].activo;
        datos.descagua = $scope.descs[fuente][2].activo;
        
        var p = [];
        
        Object.toparams = function ObjecttoParams(obj) {
            for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            $log.debug(p);
            return p.join('&');
        };
        if ( datos.tipo == 1 && datos.fechaped == "noexiste" ){
            $scope.showpopup("Debes seleccionar un día de entrega",0);
            $scope.enviando=0;
        }else{
            $http({
                method: 'POST',
                url: url,
                data: Object.toparams(datos),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(){
                $scope.enviando=0;
                $scope.showpopup("Envío registrado con éxito. Puedes verificar el pedido en la sección de historial de pedidos",1);
            },function(){
                $scope.enviando=0;
                $scope.showpopup("Error realizando el envío, favor de intentarlo nuevamente",0);
            });
        }
    };

    $scope.showpopup = function(texto,funcioncerrar){
        $scope.popuptext=texto;
        $scope.popupinfo=1;
        $scope.accionpopup=funcioncerrar;
    };
    
    $scope.closepopup = function(accion){
        if ( accion==1 ){
            if ( fuente === 1 ) { 
                $state.go('tabsController.comidaPorDia_tab2');
            } else { 
                $state.go($rootScope.nombremenu);
            }
        }
        $scope.popupinfo=0;
    };
}])
      
.controller('menuCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', '$ionicSideMenuDelegate', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $ionicAuth, $state, $ionicSideMenuDelegate, $rootScope) {

$scope.$on('$stateChangeSuccess', function() {
    if ($ionicAuth.isAuthenticated()){
        if ( $ionicUser.get('address') === null ){
            $scope.existedireccion = 0;
            $rootScope.existedireccion = 0;
        }else{
            $scope.existedireccion = 1;
            $rootScope.existedireccion = 1;
        }
        mail=$ionicUser.details.email;
        if ( mail == 'diana.vazquez@pertendo.com' || mail == 'jose.medellin@pertendo.com' || mail == 'kevin.rodriguez@pertendo.com' || mail == 'mauricio.juarez@pertendo.com' ){
            $rootScope.admin = 1; $scope.admin = 1;
        }else{ 
            $rootScope.admin = 0; $scope.admin = 0;
        }
    }else{
        $scope.admin = 0;
        $scope.existedireccion = 2;
        $rootScope.existedireccion = 0;
        
        
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      //$ionicUser.load().then(function() {
        //$state.go('tabsController.menuSemanal_tab1');  
      //});
    
        
        
        
        
        
        
    }
});  

$scope.adireccion = function(){
    $state.go('domicilio');
        $ionicSideMenuDelegate.toggleLeft(false);
};
    // Updated on 1/9/2017 to fix issues with logging
    // out and back in, as well as history issues with side menu + tabs.
    function checkLoggedIn(){
        if ($ionicAuth.isAuthenticated()) {
            // Make sure the user data is going to be loaded
            $ionicUser.load().then(function() {
                $scope.userData = $ionicUser.details;
                $scope.username = $scope.userData.name;
            });
            $scope.loggedin = 1;
            //alert($ionicUser.get('lastname'));
        }else{
            $scope.username = "Invitado";
            $scope.loggedin = 0;
            $scope.existedireccion = 2;
            $rootScope.admin=0;
        }
    }
    
    checkLoggedIn();
    $scope.$on('login_change', checkLoggedIn);

    $scope.logout = function(){
        $ionicAuth.logout();
        // Updated on 1/9/2017 to make sure the menu closes when
        // you log out so that it's closed if you log back in.
        $ionicSideMenuDelegate.toggleLeft(false);
        checkLoggedIn();
        $state.go('login');
    }

}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', '$ionicHistory', '$rootScope', '$log', '$http', '$window', '$q', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $ionicAuth, $state, $ionicHistory, $rootScope, $log, $http, $window, $q) {

$rootScope.nombremenu='tabsController.menuSemanal';
logupdates = 0;
logupdates2 = 0; //el 'logupdates2' es para indicar descarga de cada una de las imagenes (más detalle)

if ($window.localStorage.getItem("PriceTier") === null){
    $rootScope.PriceTier=0;
    $window.localStorage.setItem("PriceTier","0");
}else{
    $rootScope.PriceTier=$window.localStorage.getItem("PriceTier");
}
pricetier=$rootScope.PriceTier;
//$window.localStorage.clear();

//Guardar en Localstorage el PriceTier y sacarlo de ahí mismo..
// hacer lo mismo en Nivel de Precio - guardar cada cambio en localstorage



    //angular.module('app').controller('TestController', function($scope, $http){
 //   var GetJSON = function() {
      //  $log.debug('hola');
        //var deferred = $q.defer();
        //var matches = [];
function syncdownloadmenus() {
    var deferred = $q.defer();
    var promisemd5menus = $http.get("https://pertendo.com/comidaschona/md5menus.php");
    //        .success(function(data, status, header, config) {
      //          //alert(data);
        //        alert('success');
    //            $log.debug('success?');
      //          $log.debug(data);
        //    })
    //        .error(function(data, status, header, config) {
      //          $log.debug('error');
        //        alert('error');
          //                      $log.debug(data);
            //});
    
    
    promisemd5menus.then( function(data, status, header, config) {
//            alert(data.data[0].Checksum);
        var md5web = data.data[0].Checksum;
        //alert($window.localStorage.getItem("md5menus") + md5web);
        if ($window.localStorage.getItem("md5menus") === null || $window.localStorage.getItem("md5menus") != md5web){
            if ( logupdates == 1 ) { alert('cambio en md5menus'); }
            var promisemenus = $http.get("https://pertendo.com/comidaschona/showmenus.php");
            promisemenus.then ( function(data,status,header,config) {
                //$log.debug(data.data);
                if ( logupdates == 1 ) { alert('exito bajando menus'); }
                $window.localStorage.setItem('menus',JSON.stringify(data.data));
                $window.localStorage.setItem('md5menus',md5web);
                deferred.resolve();
            });
            promisemenus.error( function(data, status, header, config) { if ( logupdates == 1 ) { alert("error bajando menus"); } deferred.resolve();});
        }else{
            if ( logupdates == 1 ) { alert('menus yabajado'); }
            deferred.resolve();}
    });
    promisemd5menus.error( function(data, status, header, config) { if ( logupdates == 1 ) { alert("error bajando md5menus"); } deferred.resolve();});
        //responsePromise.then(function() {
          //  deferred.resolve(matches);
        //    alert(matches);
        //});
//        return deferred.promise;
  //  };
    //});
    return deferred.promise;
}
function syncdownloadplatillos() {
    var deferred2 = $q.defer();
    var promisemd5platillos = $http.get("https://pertendo.com/comidaschona/md5platillos.php");
    promisemd5platillos.then( function(data, status, header, config) {
        var md5web = data.data[0].Checksum;
        //alert($window.localStorage.getItem("md5platillos") + md5web);
        if ($window.localStorage.getItem("md5platillos") === null || $window.localStorage.getItem("md5platillos") != md5web){
            if ( logupdates == 1 ) { alert('cambio en md5platillos'); }
            var promiseplatillos = $http.get("https://pertendo.com/comidaschona/showplatillos.php");
            promiseplatillos.then ( function(data,status,header,config) {
                //$log.debug(data.data);
                if ( logupdates == 1 ) { alert('exito bajando listado de platillos'); }
                $window.localStorage.setItem('platillos',JSON.stringify(data.data));
                porbajar = 0;
                bajados = 0;
                for (i = 0; i < data.data.length; i++) { 
                    j = i + 1;
                    URI = data.data[i].Fotografia;
                    if ( $window.localStorage.getItem(URI) === null ) {
 //****                       alert('Downloading '+i);
                    //    $http.get("https://pertendo.com/comidaschona/platillos/"+URI+".jpg").then( function(data,status,header,config) {
                    //        alert(i+" "+URI+" Exito");
                    //        $window.localStorage.setItem(URI,data.data);
                        if ( logupdates2 == 1 ) { alert ('imagen '+i+' no encontrada; descargando'); } 
                        porbajar = porbajar + 1;
//                        alert(porbajar+' URI: '+URI);
                        var img = new Image();
                        img.crossOrigin = 'Anonymous';
                        img.src = "https://pertendo.com/comidaschona/platillos/"+URI+".jpg";
                        img.nombre = URI;
                        img.numero = j;
                        img.total = data.data.length;
                        img.onload = function() {
                            var canvas = document.createElement('CANVAS');
                            var ctx = canvas.getContext('2d');
                            var dataURL;
                            canvas.height = this.height;
                            canvas.width = this.width;
                            ctx.drawImage(this, 0, 0);
                            base64image=canvas.toDataURL("image/jpeg");
                            //$log.debug(base64image);
                            $window.localStorage.setItem(this.nombre,base64image);
                            //alert(this.nombre);
                            if ( logupdates2 == 1 ) { alert ('imagen '+this.numero+' descargada'); } 
                            bajados = bajados + 1;
                            if ( bajados == porbajar ){
                                if ( logupdates == 1 ) { alert('Bajado de imágenes finalizado '+this.numero+" "+this.nombre+" Exito"); }
                                $window.localStorage.setItem('md5platillos',md5web);
                                deferred2.resolve();
                            }
                        };
                        img.onerror = function () {
                            bajados = bajados + 1;
                            if ( logupdates == 1 ) { alert("Error bajando: "+this.numero+" "+this.nombre); }

                        };
                    //    });
                    }
                    if ( i == data.data.length - 1 && porbajar === 0 ) {
                        if ( logupdates == 1 ) { alert('Ya se descargaron antes todas las imagenes'); }
                        deferred2.resolve();
                    }
                }
            });
            promiseplatillos.error( function(data, status, header, config) { if ( logupdates == 1 ) { alert("error bajando platillos"); } deferred2.resolve(); });
        }
        else{ if ( logupdates == 1 ) { alert("platillos ya bajados"); } deferred2.resolve();}
    });
    promisemd5platillos.error( function(data, status, header, config) { if ( logupdates == 1 ) { alert("error bajando md5platillos"); } deferred2.resolve(); });
    return deferred2.promise;
}

procesoslistos=0;
$q.all([
    syncdownloadmenus(),
    syncdownloadplatillos()
]).then (function (){
    //alert
    var platillospre = JSON.parse($window.localStorage.getItem('platillos'));
    j=0;
    $rootScope.platillos = [];
    for (i = 0; i < platillospre.length; i++) {
        if (platillospre[i].Activo == 1){
            //j=platillospre[i].ID;
            $rootScope.platillos[j] = {};
            $rootScope.platillos[j].index = j;
            $rootScope.platillos[j].id=platillospre[i].ID;
            $rootScope.platillos[j].name=platillospre[i].Nombre;
            $rootScope.platillos[j].desc=platillospre[i].Descripcion;
            $rootScope.platillos[j].img=$window.localStorage.getItem(platillospre[i].Fotografia);
            $rootScope.platillos[j].price=parseInt(platillospre[i].Precio)+parseInt(pricetier)*9;
            $rootScope.platillos[j].price2=parseInt(platillospre[i].Precio)-58+parseInt(pricetier)*9;
               //$rootScope.menus[0].PrecioBase
            j = j + 1;
        }
    }
    //$log.debug($scope.platillos);
    //{"ID":"1","Nombre":"Nombre 1","Descripcion":"Descripcion 1","Activo":"1","Precio":"85","Fotograf\u00eda":"56a8099285a490119373fc6e49d9bf0a","FechaCreacion":"2017-02-02 10:51:34"},
    $rootScope.menus = JSON.parse($window.localStorage.getItem('menus'));
    
    //** Poner calculos para modificar precios de menús por 45*Tier
    for (var i= 0; i<$rootScope.menus.length; i++){
        $rootScope.menus[i].Precio=parseInt($rootScope.menus[i].Precio)+parseInt(pricetier)*45;
        for ( var j = 0; j<$rootScope.platillos.length; j++ ){
            if ( $rootScope.platillos[j].id == $rootScope.menus[i].Dia1 ) {
                $rootScope.menus[i].OrigDia1 = $rootScope.menus[i].Dia1;
                $rootScope.menus[i].Dia1 = j;
            }
            if ( $rootScope.platillos[j].id == $rootScope.menus[i].Dia2 ) {
                $rootScope.menus[i].OrigDia2 = $rootScope.menus[i].Dia2;
                $rootScope.menus[i].Dia2 = j;
            }
            if ( $rootScope.platillos[j].id == $rootScope.menus[i].Dia3 ) {
                $rootScope.menus[i].OrigDia3 = $rootScope.menus[i].Dia3;
                $rootScope.menus[i].Dia3 = j;
            }
            if ( $rootScope.platillos[j].id == $rootScope.menus[i].Dia4 ) {
                $rootScope.menus[i].OrigDia4 = $rootScope.menus[i].Dia4;
                $rootScope.menus[i].Dia4 = j;
            }
            if ( $rootScope.platillos[j].id == $rootScope.menus[i].Dia5 ) {
                $rootScope.menus[i].OrigDia5 = $rootScope.menus[i].Dia5;
                $rootScope.menus[i].Dia5 = j;
            }
        }
    }
    
    //alert(platillospre[0].Descripcion);
    //$log.debug(platillospre);
    //$log.debug($rootScope.menus);
    procesoslistos=1;

});
//promisefunction.error (function(){
   //crea el array como quiera 
//});
salidas=[];
contadortimers=0;
$scope.cargando=0;
$scope.abrirApp=function() {
    if (procesoslistos == 1){
        $scope.cargando=0;
        $state.go($rootScope.nombremenu);
    }else{
        $scope.cargando=1;
        for (var i=0; i<20; i++){
            salidas[i]=setTimeout(function(){
                $log.debug('vez: '+i+' procesoslistos: '+procesoslistos);
                contadortimers=contadortimers+1;
                if (procesoslistos == 1){
                    if ($scope.cargando == 1){  //quiza alguien ya cerró el proceso pero no "mató" este timer
                        for ( var j=contadortimers; j<20; j++ ){
                            clearTimeout(salidas[j])
                        }
                        $scope.cargando=0;
                        $state.go($rootScope.nombremenu);
                    }
                }
            },500*i);
        }
    }
}


    $scope.data = {
        'email': '',
        'password': ''
    }
    
    $scope.error = '';
    
    if ($ionicAuth.isAuthenticated()) {
      // Updated on 1/9/2017 to fix issues with logging
      // out and back in, as well as history issues with side menu + tabs.
      $ionicUser.load().then(function() {
        $rootScope.$broadcast('login_change');
        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $scope.abrirApp();
        //$state.go('tabsController.menuSemanal_tab1');  
      });
    }
    
    $scope.login = function(){
        $scope.error = '';
        $ionicAuth.login('basic', $scope.data).then(function(){
            $rootScope.$broadcast('login_change');
            $scope.abrirApp();
            //$state.go('tabsController.menuSemanal_tab1');
            //$ionicSideMenuDelegate.toggleLeft(true);
        }, function(){
            $scope.error = 'Datos de ingreso incorrectos.';
        });
    };


    $scope.clearerror = function(){
        $scope.error = "";
    };

    
}])
   
.controller('registroCtrl', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', '$state', '$ionicHistory', '$rootScope', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicAuth, $ionicUser, $state, $ionicHistory, $rootScope) {
    
    $scope.data = {
        'name': '',
        'lastname': '',
        'phone': '',
        'email': '',
        'password': ''
    }
    
    $scope.error='';

    $scope.signup = function(){
        
        $scope.error = '';
        
        if ( $scope.data.name === "" || $scope.data.lastname === "" || $scope.data.phone === "" || $scope.data.email === "" || $scope.data.password === "" || $scope.data.passwordconfirm === "" ) {
            $scope.error = "Todos los campos son obligatorios";
        }
        else if ( $scope.data.password != $scope.data.passwordconfirm ) {
            $scope.error = "Las contraseñas proporcionadas no coinciden";
        }
        else {
            $ionicAuth.signup($scope.data).then(function() {
                // `$ionicUser` is now registered
                $ionicAuth.login('basic', $scope.data).then(function(){
                    // Updated on 1/9/2017 to fix issues with logging
                    // out and back in, as well as history issues with
                    // side menu + tabs.
                    $rootScope.$broadcast('login_change');
                    $ionicHistory.nextViewOptions({
                        historyRoot: true
                    });
                    //primero entra, luego ya puedes guardar info
                        $ionicUser.set("lastname", $scope.data.lastname);
                        $ionicUser.set("phone", $scope.data.phone);
                        $ionicUser.save();
                        
                    //pero luego recárgala para que esté disponible para el mundo
                    $ionicUser.load().then(function() {
                        $rootScope.$broadcast('login_change');
                        $ionicHistory.nextViewOptions({
                            historyRoot: true
                        });
                    });
                    
                  $state.go($rootScope.nombremenu);
                });
            }, function(err) {
                
                var error_lookup = {
                    //'required_email': 'Email faltante',
                    //'required_password': 'Missing password field',
                    'conflict_email': 'El Email ingresado ya tiene una cuenta asignada',
                    //'conflict_username': 'A user has already signed up with that username',
                    'invalid_email': 'El Email ingresado no es válido'
                }    
                //$scope.error = $scope.error + error_lookup[err.details[0]];
                $scope.error = error_lookup[err.details[0]];
            });
        }
    }
    $scope.clearerror = function(){
        $scope.error = "";
    }

}])
   
.controller('domicilioCtrl', ['$scope', '$stateParams', '$ionicUser', '$rootScope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $rootScope, $state) {
    
    //alert($ionicUser.get('addref'));
    
    $scope.data = {};
//        direccion: '',
  //      referencia: '',
    //    colonia: '',
      //  ciudad: '',
        //cp: '',
//        horacomida: ''
  //  };
    $scope.error = '';
    
    if ($ionicUser.get('address') !== null){
        $scope.data.direccion=$ionicUser.get('address');
        $scope.data.referencia=$ionicUser.get('addref');
        $scope.data.colonia=$ionicUser.get('col');
        $scope.data.ciudad=$ionicUser.get('city');
        $scope.data.cp=$ionicUser.get('postalcode');
        $scope.data.horacomida=$ionicUser.get('horacomida')
    }
    
    $scope.guardadireccion = function(){


        //if ( $scope.data.direccion === "" || $scope.data.referencia === "" || $scope.data.colonia === "" || $scope.data.ciudad === "" || $scope.data.cp === "" || $scope.data.horacomida === "" ) {
        if ( $scope.data.direccion && $scope.data.referencia && $scope.data.colonia && $scope.data.ciudad && $scope.data.cp && $scope.data.horacomida ){
            $ionicUser.set('lastname', $ionicUser.get('lastname'));
            $ionicUser.set('phone', $ionicUser.get('phone'));
            $ionicUser.set('address', $scope.data.direccion);
            $ionicUser.set('addref', $scope.data.referencia);
            $ionicUser.set('col', $scope.data.colonia);
            $ionicUser.set('city', $scope.data.ciudad);
            $ionicUser.set('postalcode', $scope.data.cp);
            $ionicUser.set('horacomida', $scope.data.horacomida)
            $ionicUser.save();
            $state.go($rootScope.nombremenu);
        }else{
            $scope.error = "Todos los campos son obligatorios";
        }
    }
    
    $scope.clearerror = function(){
        $scope.error = "";
    }
 
}])
   
.controller('nivelDePrecioCtrl', ['$scope', '$stateParams', '$rootScope', '$log', '$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $rootScope, $log, $window) {

    
    function actleyenda(){
        pricetier=parseInt($rootScope.PriceTier);
        switch(pricetier){
            case 0: $scope.opcionactiva="Nivel Bajo"; break;
            case 1: $scope.opcionactiva="Nivel Medio"; break;
            case 2: $scope.opcionactiva="Nivel Alto";
        }
    }
    
    actleyenda();
    
    $scope.guardar = function(){
        $window.localStorage.setItem("PriceTier",opcseleccionada);
        $rootScope.PriceTier=opcseleccionada;
        actleyenda();
    };
    
    $scope.tier = function(param){
        opcseleccionada=param;
    };
}])
 
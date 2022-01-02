var preferencias = {
  enableFog: true,
  enableBloom: true,
  enableShadows: true,
  enableObjectsGlow: true,
  shadowQualitySelected: 3,
  ultraGraphics: true,
  showStats: true,
};
if (localStorage.getItem("preferencias") == undefined) {
  localStorage.setItem("preferencias", JSON.stringify(preferencias));
  var datos = JSON.parse(localStorage.getItem("preferencias"));
  var enableFog = datos.enableFog;
  var enableBloom = datos.enableBloom;
  var enableShadows = datos.enableShadows;
  var enableObjectsGlow = datos.enableObjectsGlow;
  var shadowQualitySelected = datos.shadowQualitySelected;
  var ultraGraphics = datos.ultraGraphics;
  var showStats = datos.showStats;

} else {
  var datos = JSON.parse(localStorage.getItem("preferencias"));
  var enableFog = datos.enableFog;
  var enableBloom = datos.enableBloom;
  var enableShadows = datos.enableShadows;
  var enableObjectsGlow = datos.enableObjectsGlow;
  var shadowQualitySelected = datos.shadowQualitySelected;
  var ultraGraphics = datos.ultraGraphics;
  var showStats = datos.showStats;

}

//Valores Graficos cambiables por el usuario
export var enableFog = datos.enableFog;
export var enableBloom = datos.enableBloom;
export var enableShadows = datos.enableShadows;
export var enableObjectsGlow = datos.enableObjectsGlow;
export var shadowQualitySelected = datos.shadowQualitySelected;
export var ultraGraphics = datos.ultraGraphics;
export var showStats = datos.showStats;

//   export var moduleClass = (function () {
//     var a =5;
//   return {
//       setA: function (inA) {
//       a=inA;
//     } ,
//     getA: function () {
//       alert(a);
//     }
//   };
// })();
//en el HTML
{
  /* <script>
 import { moduleClass} from "/js/userPreferences.js";
var instance = moduleClass;
instance.setA(8);
instance.getA();

</script> */
}

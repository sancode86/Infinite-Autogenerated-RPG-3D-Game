
  function updateOptions() {
    var preferencias = {
      enableFog: document.getElementById("enableFog").checked,
      enableBloom: document.getElementById("enableBloom").checked,
      enableShadows: document.getElementById("enableShadows").checked,
      enableObjectsGlow: document.getElementById("enableObjectsGlow").checked,
      shadowQualitySelected: 3,
      ultraGraphics: document.getElementById("ultraGraphics").checked,
      showStats: document.getElementById("showStats").checked,
    };
    localStorage.setItem("preferencias", JSON.stringify(preferencias));

    location.reload();
  }

  function preferencesOpen() {
    var menuId = document.getElementById("optionsMenu");
    if(optionsMenu.style.display == "block"){
      preferencesClose();
    }

    if (localStorage.getItem("preferencias") == undefined) {
      document.getElementById("enableFog").checked = "true";
      document.getElementById("enableBloom").checked = "true";
      document.getElementById("enableShadows").checked = "true";
      document.getElementById("enableObjectsGlow").checked = "true";
      document.getElementById("ultraGraphics").checked = "true";
      document.getElementById("showStats").checked = "true";
    } else {
      var datos = JSON.parse(localStorage.getItem("preferencias"));
      document.getElementById("enableFog").checked = datos.enableFog;
      document.getElementById("enableBloom").checked = datos.enableBloom;
      document.getElementById("enableShadows").checked = datos.enableShadows;
      document.getElementById("enableObjectsGlow").checked = datos.enableObjectsGlow;
      document.getElementById("ultraGraphics").checked = datos.ultraGraphics;
      document.getElementById("showStats").checked = datos.showStats;
    }


    optionsMenu.style.display = "block";

 

  }
  function preferencesClose() {
    var menuId = document.getElementById("optionsMenu");
    menuId.setAttribute("class", "optionsMenu animate__animated animate__fadeOut");
    
    setTimeout(function() {     
      optionsMenu.style.display = "none";
    }, 550);
    setTimeout(function() {     
      menuId.setAttribute("class", "optionsMenu animate__animated animate__fadeIn");
    }, 850);

 
  }
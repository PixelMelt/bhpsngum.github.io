(function(){
  let sendInfo = function () {
    window.parent.postMessage(JSON.stringify({
      name: "info",
      data: {
        path: ((window.location.pathname.match(/starblast-modding\/(.+)$/) || [])[1] || "").replace(/\/$/, "/index").replace(/\.html$/,""),
        hash: window.location.hash.replace(/^#/, ""),
        title: document.head.querySelector("title").innerHTML
      }
    }), "*")
  }

  sendInfo();

  window.addEventListener("hashchange", sendInfo);

  let elem = document.querySelector(".type-signature"), type = String((String((elem || {}).innerText).match(/\w+/)||[""])[0]), docgeneral = document.querySelector(".container-overview");
  if ("abstract" == type) {
    docgeneral.remove();
    elem.remove()
  }
  else try {
    let e = docgeneral.querySelector(".name"), constructorCaller = Array.prototype.find.call(e.childNodes, e => e.nodeName.toLowerCase() == "#text");
    if (constructorCaller.textContent == "new ModdingClient") constructorCaller.textContent = "new StarblastModding.Client";

    var d = document.createElement('pre');
    d.setAttribute("class", "prettyprint");
    d.innerHTML = "<code>"+e.innerText+"</code>";

    e.parentNode.replaceChild(d, e)
  } catch (e) {}

  for (let el of document.querySelectorAll(".name:not(td, .container-overview > h4)")) try { el.childNodes[1].nodeValue = "." + el.childNodes[1].nodeValue } catch (e) {}

  let displayText = {
    "readonly": "read-only"
  }

  for (let i of document.querySelectorAll(".type-signature")) {
      if (i.innerText.match(/^\s*:[^]+/) || i.innerText.match(/^\s*→\s*{[^]+}/)) i.remove();
      else {
        let text = (i.innerText.match(/\w+/) || [""])[0];
        i.setAttribute("class", i.getAttribute("class") + " " + text);
        i.innerText = (displayText[text] || text).toUpperCase()
      }
  }

  document.querySelectorAll(".readme a").forEach(function (e) {
    e.setAttribute("target", "_blank")
  });

  document.querySelectorAll(".__sourceLinks a").forEach(function (e) {
    let href = e.getAttribute("href");
    if (href.includes(".js")) e.href = "https://github.com/bhpsngum/starblast-modding/blob/" + window.location.pathname.match(/\/(v[^\/]+)(\/|$)/)[1] + "/src/" + href;
  });

  prettyPrint()
})()

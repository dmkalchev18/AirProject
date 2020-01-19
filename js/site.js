var isScrollSnapSupported = 'scrollSnapType' in document.documentElement.style ||
        'webkitScrollSnapType' in document.documentElement.style;

if (!isScrollSnapSupported) {
  var elem = document.createElement('p'),
      txt  = document.createTextNode('Your browser does not support CSS Scroll Snap Points :( '),
      local = document.body;
  
  elem.appendChild(txt);
  elem.classList.add('warning');
  local.insertBefore(elem, local.firstChild);
}
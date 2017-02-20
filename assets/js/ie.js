(function () {
  var ie = typeof navigator !== 'undefined' && navigator.appVersion && navigator.appVersion.match(/MSIE/) || null;

  if (ie) {
    location.href = 'ie.htm';
  }
})();

var testHtml = _.template(
  '<tr id="<%=test.id%>" class="<%=test.state%>">' +
    '<td>' +
      '<svg width="24" height="24">' +
        '<circle cx="50%" cy="50%" r="50%"/>' +
      '</svg>' +
    '</td>' +
    '<td>' +
      '<p><%=test.title%></p>' +
    '</td>' +
  '</tr>', {variable: 'test'});

var addDetail = function($tr, messages) {
  $('td:last-of-type', $tr).append('<pre>'+messages.join("\n")+'</pre>');
};

var tests = [];
tests.push({
  id: 'websockets',
  title: 'Browser support for WebSocket API',
  state: 'pending',
  predicate: function($tr) {
    return Q(!!Modernizr.websockets);
  }
});
tests.push({
  id: 'websocket-connected',
  title: 'WebSocket connection to host',
  state: 'pending',
  predicate: function($tr) {
    var deferred = Q.defer(), ws;
    var payload = "HELLO";
    try {
      ws = new WebSocket("ws://echo.websocket.org/");
      ws.onopen = function() { ws.send(payload); }
      ws.onmessage = function(e) {
        if(e.data === payload) {
          deferred.resolve();
        } else {
          addDetail($tr, ["unexpected behavior: sent "+payload+", received "+e.data]);
          deferred.reject();
        }
      }
      ws.onerror = function(e) {
        addDetail($tr, ["WebSocket error"]);
        deferred.reject();
      }
      ws.onclose = function(e) {
        if(!e.wasClean || e.code === 1006) {
          addDetail($tr, ["WebSocket connection failed: "+e.code])
          deferred.reject();
        }
      }
    } catch(e) {
      addDetail($tr, ["Exception thrown", e.message]);
      deferred.reject();
    }
    return deferred.promise;
  }
});

var performTest = function(test) {
  var $row = testHtml(test),
      deferred = Q.defer();
  $('#tests').append(testHtml(test));
  var $tr = $('#' + test.id);
  test.predicate($tr).then(function() {
    $tr.removeClass('pending').removeClass('red').addClass('green');
    deferred.resolve();
  }, function() {
    $tr.removeClass('pending').removeClass('green').addClass('red');
    deferred.reject();
  });
  return deferred.promise;
}

$('#tests').append(testHtml({
  id: 'javascript',
  state: 'green',
  title: 'JavaScript is enabled'
}));

tests.reduce(function(result, test) {
  return result.then(performTest(test));
}, Q(true));

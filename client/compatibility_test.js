var testHtml = _.template(
  '<tr id="<%=test.id%>" class="<%=test.state%>">' +
    '<td>' +
      '<svg class="status" width="24" height="24" viewBox="0 0 1792 1792">' +
        '<circle cx="50%" cy="50%" r="50%"/>' +
        '<g transform="translate(160 160) scale(0.8)">' +
          '<path class="check" d="M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"/>' +
          '<path class="times" d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/>' +
        '</g>' +
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
  id: 'ws-support',
  to: '#ws-tests',
  title: 'Browser support for WebSocket API',
  state: 'pending',
  predicate: function($tr) {
    return Q(!!Modernizr.websockets);
  }
});
tests.push({
  id: 'ws-connected',
  to: '#ws-tests',
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
    } catch (e) {
      addDetail($tr, ["Exception thrown", e.message]);
      deferred.reject();
    }
    return deferred.promise;
  }
});
tests.push({
  id: 'sio-loaded',
  to: '#sio-tests',
  title: 'Socket.IO loaded',
  state: 'pending',
  predicate: function($tr) {
    return Q(!!io);
  }
});
tests.push({
  id: 'sio-connected',
  to: '#sio-tests',
  title: 'Socket.IO connection to host',
  state: 'pending',
  predicate: function($tr) {
    var deferred = Q.defer(), ws;
    var payload = "HELLO";
    try {
      ws = io("ws://localhost:8080/", {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
      });
      ws.on('connect', function() {
        ws.send(payload);
      });
      ws.on('connect_error', function(e) {
        console.log('connect_timeout', e.message);
      });
      ws.on('connect_timeout', function(e) {
        console.log('connect_timeout', e.message);
      });
      ws.on('reconnect', function(e) {
        console.log('reconnect', e);
      });
      ws.on('reconnect_attempt', function(n) {
        console.log('reconnect_attempt number ' + n);
      });
      ws.on('reconnecting', function(n) {
        console.log('reconnecting, attempt number ' + n);
      });
      ws.on('reconnect_error', function(e) {
        console.log('reconnect_error', e.message);
      });
      ws.on('reconnect_failed', function() {
        addDetail($tr, ["unable to connect", "reconnection failed"]);
        deferred.reject();
      });
      ws.on('message', function(data) {
        if(data === payload) {
          deferred.resolve();
        } else {
          addDetail($tr, ["unexpected behavior: sent "+payload+", received "+data]);
          deferred.reject();
        }
      });
      ws.on('error', function(e) {
        addDetail($tr, ["WebSocket error", e]);
        deferred.reject();
      });
    } catch (e) {
      addDetail($tr, ["Exception thrown", e.message]);
      deferred.reject();
    }
    return deferred.promise;
  }
})

var performTest = function(test) {
  var $row = testHtml(test),
      deferred = Q.defer();
  $(test.to).append(testHtml(test));
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

$('#ws-tests, #sio-tests').append(testHtml({
  id: 'javascript',
  state: 'green',
  title: 'JavaScript is enabled'
}));

tests.reduce(function(result, test) {
  return result.then(performTest(test));
}, Q(true));

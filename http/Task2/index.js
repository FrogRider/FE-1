#!/usr/bin/env node
require('http').createServer(function(req, res) {
  console.log('New request');
  if(req.url === '/') {
    res.end(`
      <!DOCTYPE html>
      <html>
      <body>
        <div id="demo">
          <h2>The XMLHttpRequest Object</h2>
          <button type="button" onclick="load()">Change Content</button>
        </div>

        <script type="text/javascript">
          function load() {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if(this.readyState === 4 && this.status === 200) {
                document.getElementById("demo").innerHTML = this.responseText;
              }
            };
            xhttp.open("GET", "hello-world", true);
            xhttp.send();
          }
        </script>
      </body>
      </html>
      `);
  } else if(req.url === '/hello-world') {
    res.end('Hello World!');
  } else{
    res.end('Done');
  }
}).listen(8080);
console.log('Server started');

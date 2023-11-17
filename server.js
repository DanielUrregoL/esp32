const express = require('express');
const cors = require("cors");
const app = express();
const port = 86;

let latestMessage = 'All clear';

app.use(cors());

app.get('/send_alert', (req, res) => {
        latestMessage = 'Alert! Sensor triggered!';
        console.log(`Received alert: ${latestMessage}`);
        res.send('Alert received');
});

app.get('/clear_alert', (req, res) => {
        latestMessage = 'All clear';
        console.log(`Received all clear: ${latestMessage}`);
        res.send('All clear received');
});

app.get('/latest_message', (req, res) => {
        res.send(`
            <html>
                <body style="background-color: lightblue; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
                    <div id="message" style="color: white; background-color: blue; padding: 20px; border-radius: 10px; font-size: 20px; font-weight: bold; font-family: Arial;">
                         '${latestMessage}'
                    </div>
                    <script>
                        setInterval(() => {
                            fetch('/latest_message')
                                .then(response => response.text())
                                .then(message => {
                                    document.getElementById('message').innerHTML = message;
                                });
                        }, 1000);
                    </script>
                </body>
            </html>
        `);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
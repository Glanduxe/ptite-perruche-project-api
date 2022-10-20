"use-strict"

// Main variables
const express = require("express");
const app = express();
const helmet = require("helmet");
const PORT = 5000;

// Use json format for clients requests
app.use(express.json());

// Librairy for Express app security
app.use(helmet());

// Start function
function start() {
    
    // Security
    require("./security")(app);

    // Routes
    require("./db/liaisons");
    require("./db/config");
    require("./db/init");
    require("./routes/post/post-auth")(app);
    require("./routes/post/post-operations")(app);
    require("./routes/put/put-accounts")(app);

    // Main crons
    require("./crons/crons");
    
    // Default route
    app.get('/', (req, res) => {
        return res.status(200).json({ data: "Coucou ptite perruche." });
    });

    // 404 error
    app.use((req, res) => {
        return res.status(404).json({ data: "Not found." });
    });

    app.listen(PORT, () => {
        console.log(`Server listen on port ${PORT}`);
    });

}

start();
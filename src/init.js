import "./db.js";
import "./models/Post.js";
import app from "./server.js";

const PORT = 4000;

const handleListening = () => console.log(`💡 Server listening on port http://localhost:${PORT} 🚀`);

app.listen(4000, handleListening);

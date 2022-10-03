import "dotenv/config";
import "./db.js";
import "./models/Post.js";
import "./models/User.js";
import app from "./server.js";

const PORT = 3001;

const handleListening = () => console.log(`💡 Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);

import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 3000;
const MONGODB_URI = "your_mongodb_uri";

mongoose
  .connect(MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

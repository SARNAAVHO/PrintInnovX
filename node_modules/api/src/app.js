const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", require("./routes/health.routes"));
app.use("/api/printers", require("./routes/printer.routes"));
app.use("/api/jobs", require("./routes/job.routes"));
app.use("/api/payments", require("./routes/payment.routes"));

module.exports = app;

import { GlobalWorkerOptions } from "pdfjs-dist";

// Use worker served from /public
GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";
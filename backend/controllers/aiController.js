// const Job = require("../models/job");

// exports.askAI = async (req, res) => {
//   try {
//     const { message } = req.body;

//     const jobs = await Job.find({ isOpen: true }).select("title company location salary type");
//     const jobContext = jobs.length > 0
//       ? jobs.map(j => j.title + " at " + j.company + " | " + j.location + " | " + (j.salary || "N/A") + " | " + j.type).join("\n")
//       : "No jobs currently available.";

//     const systemPrompt = "You are JobHive AI, an expert career assistant. Help users with resume building, job matching, interview prep and career guidance. Available jobs:\n" + jobContext + "\nBe friendly and concise.";

//     const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY;

//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [
//           { role: "user", parts: [{ text: systemPrompt }] },
//           { role: "model", parts: [{ text: "Got it! I am JobHive AI, ready to help." }] },
//           { role: "user", parts: [{ text: message }] }
//         ],
//         generationConfig: {
//           temperature: 0.7,
//           maxOutputTokens: 512,
//         }
//       })
//     });

//     const data = await response.json();
//     console.log("Gemini status:", response.status);

//     if (data.error) {
//       console.error("Gemini error:", data.error.message);
//       return res.status(500).json({ error: data.error.message });
//     }

//     const reply = data.candidates[0].content.parts[0].text;
//     res.json({ reply });
//   } catch (err) {
//     console.error("AI error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// };



// const Job = require("../models/job");

// exports.askAI = async (req, res) => {
//   try {
//     const { message } = req.body;

//     const jobs = await Job.find({ isOpen: true }).select("title company location salary type");
//     const jobContext = jobs.length > 0
//       ? jobs.map(j => j.title + " at " + j.company + " | " + j.location + " | " + (j.salary || "N/A") + " | " + j.type).join("\n")
//       : "No jobs currently available.";

//     const fullMessage = "You are JobHive AI, an expert career assistant. Help with resume building, job matching, interview prep and career guidance. Available jobs:\n" + jobContext + "\n\nUser question: " + message;

//     const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY;

//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [
//           { role: "user", parts: [{ text: fullMessage }] }
//         ],
//         generationConfig: {
//           temperature: 0.7,
//           maxOutputTokens: 512,
//         }
//       })
//     });

//     const data = await response.json();
//     console.log("Gemini status:", response.status);

//     if (data.error) {
//       console.error("Gemini error:", data.error.message);
//       return res.status(500).json({ error: data.error.message });
//     }

//     const reply = data.candidates[0].content.parts[0].text;
//     res.json({ reply });
//   } catch (err) {
//     console.error("AI error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// };

const Job = require("../models/job");
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({});
exports.askAI = async (req, res) => {
  try {
    const { message } = req.body;

    const jobs = await Job.find({ isOpen: true }).select("title company location salary type");
    const jobContext = jobs.length > 0
      ? jobs.map(j => `${j.title} at ${j.company} | ${j.location} | ${j.salary || "N/A"} | ${j.type}`).join("\n")
      : "No jobs currently available.";
    const fullMessage = "You are JobHive AI, an expert career assistant. Help with resume building, job matching, interview prep and career guidance. Available jobs:\n" + jobContext + "\n\nUser question: " + message;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullMessage,
      config: {
        temperature: 0.7,
        maxOutputTokens: 512,
      }
    });

    const reply = response.text;
    res.json({ reply });

  } catch (err) {
    console.error("AI error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
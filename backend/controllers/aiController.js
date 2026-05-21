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
// // };




const Job = require("../models/job");

exports.askAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      console.error("Error: GEMINI_API_KEY missing");
      return res.status(500).json({ error: "Server API key missing" });
    }

    // FIX: Limit to 3 jobs so prompt stays small and free tier doesn't break
    const jobs = await Job.find({ isOpen: true })
                          .select("title company location salary type")
                          .limit(3);

    const jobContext = jobs.length > 0
      ? jobs.map(j => `${j.title} at ${j.company} | ${j.location}`).join("\n")
      : "No jobs currently available.";

    const fullMessage = `You are JobHive AI, a career assistant. Keep answers brief (under 2-3 lines). Available jobs:\n${jobContext}\n\nUser: ${message}`;

    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    const response = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY 
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: fullMessage }] }],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 150, // token size chota rakha taaki crash na ho
        }
      })
    });

    const data = await response.json();
    console.log("Gemini status check:", response.status);

    if (data.error) {
      console.error("Gemini Error Block:", data.error.message);
      return res.status(response.status).json({ error: data.error.message });
    }

    const reply = data.candidates[0].content.parts[0].text;
    res.json({ reply });

  } catch (err) {
    console.error("AI System Crash:", err.message);
    res.status(500).json({ error: err.message });
  }
};




// const Job = require("../models/job");

// exports.askAI = async (req, res) => {
//   try {
//     const { message } = req.body;

//     // 1. Check karo ki key backend ko mil bhi rahi hai ya nahi
//     if (!process.env.GEMINI_API_KEY) {
//       console.error("Error: GEMINI_API_KEY is missing in environment variables!");
//       return res.status(500).json({ error: "API Key setup missing on server." });
//     }

//     const jobs = await Job.find({ isOpen: true }).select("title company location salary type");
//     const jobContext = jobs.length > 0
//       ? jobs.map(j => j.title + " at " + j.company + " | " + j.location + " | " + (j.salary || "N/A") + " | " + j.type).join("\n")
//       : "No jobs currently available.";

//     const fullMessage = "You are JobHive AI, an expert career assistant. Help with resume building, job matching, interview prep and career guidance. Available jobs:\n" + jobContext + "\n\nUser question: " + message;

//     // SECURE WAY: URL ke andar se '?key=' hata diya hai! URL ekdam saaf hai.
//     const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

//     const response = await fetch(url, {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json",
//         // API Key ko hum yahan Header ke andar securely bhej rahe hain, ab ye kabhi leak nahi hogi!
//         "x-goog-api-key": process.env.GEMINI_API_KEY 
//       },
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
//       console.error("Gemini API error:", data.error.message);
//       return res.status(500).json({ error: data.error.message });
//     }

//     if (!data.candidates || data.candidates.length === 0) {
//       return res.status(500).json({ error: "No response from Gemini structure." });
//     }

//     const reply = data.candidates[0].content.parts[0].text;
//     res.json({ reply });

//   } catch (err) {
//     console.error("AI Route Crash Error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// };
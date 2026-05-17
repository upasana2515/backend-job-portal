import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import API from "../api/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();


  // STATES
  const [jobs, setJobs] = useState([]);
  const [appliedCount, setAppliedCount] = useState(0);
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  // AI STATES
  const [aiOpen, setAiOpen] = useState(false);

  const [aiMessages, setAiMessages] = useState([
    {
      role: "assistant",
      text:
        "Hi! I'm JobHive AI 🤖\n\n" +
        "I can help you with:\n" +
        "• Resume guidance\n" +
        "• Career advice\n" +
        "• Interview preparation\n" +
        "• Job suggestions\n\n" +
        "How can I help you today?",
    },
  ]);

  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // FETCH DATA
  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {

    API.get("/auth/me")
      .then((res) => {

        setUsername(res.data.username);

        localStorage.setItem(
          "username",
          res.data.username
        );

      })
      .catch(() => {});

  }, []);

  const fetchAll = async () => {

    setLoading(true);

    try {

      const [jobsRes, myAppsRes] =
        await Promise.all([
          API.get("/jobs"),
          API.get("/apply/my"),
        ]);

      setJobs(jobsRes.data);

      const ids = new Set(
        myAppsRes.data.map((a) => a.job?._id)
      );

      setAppliedJobIds(ids);

      setAppliedCount(
        myAppsRes.data.length
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  // FILTER JOBS
  const filtered = jobs.filter((job) => {

    const q = search.toLowerCase();

    const matchSearch =
      !search ||
      job.title?.toLowerCase().includes(q) ||
      job.company?.toLowerCase().includes(q) ||
      job.description?.toLowerCase().includes(q);

    const matchLoc =
      !locationFilter ||
      job.location
        ?.toLowerCase()
        .includes(locationFilter.toLowerCase());

    const matchType =
      !typeFilter ||
      job.type === typeFilter;

    return (
      matchSearch &&
      matchLoc &&
      matchType
    );
  });

  // AI CHAT
  const sendAiMessage = async () => {
  if (!aiInput.trim() || aiLoading) return;

  const userMsg = aiInput.trim();
  setAiInput("");

  const newMessages = [...aiMessages, { role: "user", text: userMsg }];
  setAiMessages(newMessages);
  setAiLoading(true);

  try {
    const history = newMessages.slice(1).map(m => ({
      role: m.role === "user" ? "user" : "assistant",
      text: m.text
    }));

    const res = await API.post("/ai/ask", { message: userMsg, history });
    setAiMessages(prev => [...prev, { role: "assistant", text: res.data.reply }]);
  } catch (err) {
    setAiMessages(prev => [...prev, { role: "assistant", text: "AI temporarily unavailable ❌" }]);
  } finally {
    setAiLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#f5f1e8]">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-5">

          <div>

            <h1 className="text-5xl font-extrabold text-gray-800">

              Hello,{" "}

              <span className="text-green-700">
                {username || "there"}
              </span>{" "}

              👋

            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Find your dream opportunity today 🚀
            </p>

          </div>

          <div className="flex gap-4 flex-wrap">

            <div className="bg-white shadow-lg rounded-3xl px-8 py-5 text-center">

              <p className="text-gray-400 text-sm">
                Available Jobs
              </p>

              <p className="text-4xl font-extrabold text-green-700">
                {jobs.length}
              </p>

            </div>

            <div
              onClick={() =>
                navigate("/my-applications")
              }
              className="bg-white shadow-lg rounded-3xl px-8 py-5 text-center cursor-pointer hover:shadow-2xl transition-all"
            >

              <p className="text-gray-400 text-sm">
                Applied Jobs
              </p>

              <p className="text-4xl font-extrabold text-blue-600">
                {appliedCount}
              </p>

            </div>

          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-3xl shadow-lg p-5 mb-10 flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="🔍 Search jobs..."
            className="flex-1 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-600"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="📍 Location"
            className="md:w-52 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-600"
            value={locationFilter}
            onChange={(e) =>
              setLocationFilter(
                e.target.value
              )
            }
          />

          <select
            className="md:w-52 border border-gray-200 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-600 bg-white"
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(
                e.target.value
              )
            }
          >

            <option value="">
              All Types
            </option>

            <option value="Full-time">
              Full-time
            </option>

            <option value="Part-time">
              Part-time
            </option>

            <option value="Internship">
              Internship
            </option>

            <option value="Remote">
              Remote
            </option>

          </select>

        </div>

        {/* JOBS */}
        {loading ? (

          <div className="text-center py-20 text-2xl text-gray-400">
            Loading jobs...
          </div>

        ) : filtered.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

            <div className="text-7xl mb-5">
              😢
            </div>

            <h2 className="text-3xl font-bold text-gray-700">
              No Jobs Found
            </h2>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-7">

            {filtered.map((job) => {

              const alreadyApplied =
                appliedJobIds.has(
                  job._id
                );

              return (

                <div
                  key={job._id}
                  className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >

                  <div className="flex items-start justify-between mb-4">

                    <div>

                      <h3 className="text-2xl font-bold text-gray-800">
                        {job.title}
                      </h3>

                      <p className="text-green-700 font-semibold mt-1">
                        {job.company}
                      </p>

                    </div>

                    <span
                      className={`px-4 py-1 rounded-full text-xs font-bold ${
                        job.isOpen
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >

                      {job.isOpen
                        ? "Hiring"
                        : "Closed"}

                    </span>

                  </div>

                  <p className="text-gray-500 mb-5 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-6">

                    <span>
                      📍 {job.location}
                    </span>

                    {job.salary && (
                      <span>
                        💰 {job.salary}
                      </span>
                    )}

                    {job.type && (
                      <span>
                        🧑‍💻 {job.type}
                      </span>
                    )}

                  </div>

                  {alreadyApplied ? (

                    <div className="w-full bg-gray-100 text-gray-500 py-4 rounded-2xl text-center font-bold">

                      ✅ Already Applied

                    </div>

                  ) : (

                    <button
                      disabled={!job.isOpen}
                      onClick={() =>
                        navigate(
                          `/apply/${job._id}`
                        )
                      }
                      className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all disabled:opacity-50"
                    >

                      {job.isOpen
                        ? "Apply Now 🚀"
                        : "Applications Closed"}

                    </button>

                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AI BUTTON */}
      <button
        onClick={() =>
          setAiOpen(!aiOpen)
        }
        className="fixed bottom-6 right-6 w-16 h-16 bg-green-700 text-white rounded-full shadow-2xl text-2xl hover:scale-110 transition-all z-50"
      >

        {aiOpen ? "✕" : "🤖"}

      </button>

      {/* AI CHAT */}
      {aiOpen && (

        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100 h-[520px]">

          {/* HEADER */}
          <div className="bg-green-700 text-white px-5 py-4">

            <h3 className="font-bold text-xl">
              JobHive AI 🤖
            </h3>

            <p className="text-sm opacity-80">
              Career Assistant
            </p>

          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">

            {aiMessages.map(
              (msg, i) => (

                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-wrap text-sm ${
                      msg.role === "user"
                        ? "bg-green-700 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >

                    {msg.text}

                  </div>

                </div>
              )
            )}

            {aiLoading && (

              <div className="bg-gray-100 text-gray-500 px-4 py-3 rounded-2xl text-sm w-fit">
                Thinking...
              </div>

            )}

          </div>

          {/* INPUT */}
          <div className="border-t border-gray-100 p-3 flex gap-2">

            <input
              type="text"
              value={aiInput}
              onChange={(e) =>
                setAiInput(
                  e.target.value
                )
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                sendAiMessage()
              }
              placeholder="Ask anything..."
              className="flex-1 border border-gray-200 rounded-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-600"
            />

            <button
              onClick={sendAiMessage}
              disabled={aiLoading}
              className="bg-green-700 text-white px-5 rounded-2xl font-bold"
            >

              ➤

            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;
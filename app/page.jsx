"use client";
import { useState } from "react";
import jsPDF from "jspdf";

export default function Home() {
    const [answers, setAnswers] = useState({
        q1: "", q2: "", q3: "", q4: "", q5: "",
        q6: "", q7: "", q8: "", q9: "", q10: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setAnswers({ ...answers, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Survey Poll Summary", 20, 20);
        doc.setFontSize(12);
        const lines = Object.entries(answers).map(
            ([key, value], idx) => `Q${idx + 1}: ${value}`
        );
        lines.forEach((line, i) => {
            doc.text(line, 20, 40 + i * 10);
        });
        doc.save("survey-summary.pdf");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-500 animate-gradient-x">
            <div className="w-full max-w-3xl p-6 m-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 transition-all duration-500 hover:scale-[1.01]">
                <h1 className="text-3xl text-center font-bold text-gray-900 mb-6 drop-shadow">🚀 Dev Survey</h1>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-2 custom-scrollbar">
                        {[
                            ["What's your favorite programming language?", ["JavaScript", "Python", "C++", "Java", "Other"]],
                            ["Which frontend framework do you prefer?", ["React.js", "Vue", "Angular", "Next.js", "Other"]],
                            ["Which backend technology do you like most?", ["Node.js", "Django", "Spring Boot", "Laravel", "Other"]],
                            ["What’s your experience level in web development?", ["Beginner", "Intermediate", "Advanced", "Expert"]],
                            ["Which code editor do you use most?", ["VS Code", "Sublime Text", "Atom", "Vim", "Cursor", "Other"]],
                            ["Which operating system do you primarily use?", ["Windows", "macOS", "Linux", "Other"]],
                            ["Do you prefer dark mode or light mode?", ["Dark Mode", "Light Mode"]],
                            ["How often do you contribute to open source?", ["Regularly", "Sometimes", "Rarely", "Never"]],
                            ["Do you prefer working remotely or on-site?", ["Remotely", "On-site", "Hybrid"]],
                            ["Would you recommend this survey app to others?", ["Yes", "No"]],
                        ].map(([question, options], idx) => (
                            <div key={idx}>
                                <label className="block text-lg font-semibold text-gray-800 mb-2">{idx + 1}. {question}</label>
                                {options.map((opt) => (
                                    <label key={opt} className="flex items-center mb-1 text-gray-700 hover:text-indigo-700 transition-all">
                                        <input
                                            type="radio"
                                            name={`q${idx + 1}`}
                                            value={opt}
                                            onChange={handleChange}
                                            className="mr-2 accent-indigo-600"
                                        />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        ))}

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                            >
                                Submit Survey
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4 px-4">
                        <h2 className="text-2xl font-bold text-indigo-800 mb-4 text-center">🎉 Survey Summary</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-base">
                            {Object.entries(answers).map(([key, value], index) => (
                                <div key={key} className="bg-white rounded-xl p-3 shadow border border-gray-200">
                                    <p><span className="font-semibold">Q{index + 1}:</span> {value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <button
                                onClick={downloadPDF}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 mt-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                            >
                                📥 Download PDF
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

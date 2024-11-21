import React, { useContext, useEffect } from 'react'
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { MainContext } from './Context';

export default function AddQuiz() {
    const { user } = useContext(MainContext)
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            question: e.target.question.value,
            option1: e.target.option1.value,
            option2: e.target.option2.value,
            option3: e.target.option3.value,
            option4: e.target.option4.value,
            correctOption: e.target.correctOption.value

        }

        const quizId = uuidv4();
        const db = getDatabase();
        set(ref(db, 'quiz/' + quizId), data);

        e.target.reset()
    }

    useEffect(
        () => {
            const lsUserData = localStorage.getItem("user");
            if (lsUserData == undefined) {
                navigate("/login")
            }
        },
        [user]
    )


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
            >
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Create Quiz</h2>

                {/* Question Input */}
                <div className="mb-4">
                    <label htmlFor="question" className="block text-gray-600 mb-2">
                        Question
                    </label>
                    <textarea
                        id="question"
                        name="question"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your question"
                        rows="3"
                        required
                    />
                </div>

                {/* Options Inputs */}
                {[1, 2, 3, 4].map((option, index) => (
                    <div key={index} className="mb-4">
                        <label htmlFor={`option-${index}`} className="block text-gray-600 mb-2">
                            Option {index + 1}
                        </label>
                        <input
                            type="text"
                            id={`option-${index}`}
                            name={`option${option}`}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter option ${index + 1}`}
                            required
                        />
                    </div>
                ))}

                {/* Correct Option Selector */}
                <div className="mb-4">
                    <label htmlFor="correctOption" className="block text-gray-600 mb-2">
                        Correct Option
                    </label>
                    <select
                        id="correctOption"
                        name="correctOption"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option disabled value="">Select the correct option</option>
                        {[1, 2, 3, 4].map((option, index) => (
                            <option key={index} value={index + 1}>
                                Option {index + 1}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Submit Quiz
                </button>
            </form>
        </div>
    );

}

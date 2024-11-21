import React, { useEffect, useState,useContext } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { MainContext } from './Context';


export default function ViewQuiz() {
    const [quizs, Setquizs] = useState([]);
    const { user } = useContext(MainContext)
    const navigate = useNavigate()

    const fetchdata = () => {
        const db = getDatabase();
        const starCountRef = ref(db, 'quiz/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const arr = Object.keys(data).map((d, i) => {
                return { id: d, ...data[d] }
            })
            Setquizs(arr)

        });
    }

    useEffect(
        () => {
            fetchdata()
        },
        []
    )

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
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            S.No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Question
                        </th>
                        <th scope="col" className="px-6 py-3">
                            OPTION1
                        </th>
                        <th scope="col" className="px-6 py-3">
                            OPTION2
                        </th>
                        <th scope="col" className="px-6 py-3">
                            OPTION3
                        </th>
                        <th scope="col" className="px-6 py-3">
                            OPTION4
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        quizs.map((d, i) => {
                            return (
                                <tr className="bg-white border-b">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                    >
                                        {i+1}
                                    </th>
                                    <td className="px-6 py-4">{d.question}</td>
                                    <td className={`px-6 py-4 ${d.correctOption=="1" && "text-[green] font-bold"}`}>{d.option1}</td>
                                    <td  className={`px-6 py-4 ${d.correctOption=="2" && "text-[green] font-bold"}`}>{d.option2}</td>
                                    <td  className={`px-6 py-4 ${d.correctOption=="3" && "text-[green] font-bold"}`}>{d.option3}</td>
                                    <td  className={`px-6 py-4 ${d.correctOption=="4" && "text-[green] font-bold"}`}>{d.option4}</td>
                                </tr>

                            )
                        })
                    }


                </tbody>
            </table>
        </div>

    )
}

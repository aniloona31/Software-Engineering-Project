import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AnswerItem from './AnswerItem';

function Answer() {

    const initialAnswers = [];
    const navigate = useNavigate();
    const { id } = useParams();
    const [answers, setAnswers] = useState(initialAnswers);

    useEffect(async () => {
        if (localStorage.getItem('token') !== null) {
            const url = `http://localhost:8080/answers/${id}`;
            const token = localStorage.getItem('token');
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                const json = await response.json();
                setAnswers(json);
            }
            else {
                //allert
            }
        }
        else {
            navigate("/login");
        }
    }, [])

    return (
        <div className='mt-20'>
            {answers.map((item) => {
                return (
                    <div className="px-10 py-2 mx-28 my-2" key={item.answerId}>
                        <AnswerItem answer={item} />
                    </div>
                )
            })}
        </div>
    )
}

export default Answer

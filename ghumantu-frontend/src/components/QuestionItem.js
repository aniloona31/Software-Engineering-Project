import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginContext from '../Context/login/LoginContext';

function QuestionItem(props) {

    //get the logged in user
    const context = useContext(LoginContext);
    const { user } = context;

    let navigate = useNavigate();
    const initialState = false;
    const [answerState, setAnswerState] = useState(initialState);
    const [ans, setAns] = useState("");

    const giveAnswer = () => {
        setAnswerState(!answerState);
    }

    const { questionId, question, userId, askedDate, resolved, username } = props.question;
    //will get from current user context api;
    const getAnswersOfQuestions = (id) => {
        navigate(`/answers/${id}`);
    }

    const handleChange = (e) => {
        setAns(e.target.value);
    }

    const submitAnswer = async (id) => {
        //make post request
        let answerBody = {
            "answer": `${ans}`,
            "questionId": id,
            "username": `${user.username}`
        }
        console.log(answerBody);
        const token = localStorage.getItem('token');
        if (token !== null) {
            const url = "http://localhost:8080/answers/post-answer";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(answerBody)
            })
            if (response.status === 200) {
                //show allert answer posted;
                //console.log(response);
            }
            else {
                //show error allert;
            }
        }
        //add notification of answer submitted
    }
    return (
        <div>
            <div className="max-w-sm w-full lg:max-w-full lg:flex">
                <div className=" w-screen shadow-lg border rounded bg-white p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                        <p className="text-sm text-gray-600 flex items-center">
                            <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                            </svg>
                        </p>
                        <div className="text-gray-900 font-bold text-xl mb-2">{question}</div>
                        {user.userId !== userId ? <button onClick={() => { giveAnswer() }} className=" shadow-lg bg-gray-600 hover:opacity-75 text-white font-bold py-1 px-3 mt-3 border rounded">
                            Answer
                        </button> : <></>}
                        <button onClick={() => getAnswersOfQuestions(questionId)} className="shadow-lg bg-gray-600 hover:opacity-75 text-white font-bold py-1 px-3 mt-3 border rounded">
                            View Answers
                        </button>
                    </div>
                    {answerState === true ?
                        <div className='transition-transform delay-300'>
                            <div className="w-full">
                                <textarea rows="1" type="text" onChange={handleChange} value={ans} className="border border-gray-500 p-2 rounded w-full " placeholder="Write something..."></textarea>
                            </div>
                            <div><button onClick={() => { submitAnswer(questionId) }} className="shadow-lg bg-gray-600 hover:opacity-75 text-white font-bold py-1 px-3 mt-3 border rounded">Submit</button></div>
                        </div> : <></>}
                    <div className="flex items-center">
                        {/* <img className="w-10 h-10 rounded-full mr-4" src="/img/jonathan.jpg" alt="Avatar of Jonathan Reinink"/> */}
                        <div className="text-sm">
                            <p className="mt-4 text-gray-900 leading-none">{username}</p>
                            <p className="text-gray-600"></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default QuestionItem

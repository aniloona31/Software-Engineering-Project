import React, { useState } from 'react'
import QuestionContext from './QuestionContext'

const QuestionState = (props) => {
    const initialState = [];
    const [state,setState] = useState(initialState);

    //get all questions
    const getAllQuestions = async() => {
        const url = "http://localhost:8080/questions";
        const token = localStorage.getItem('token');
        const response = await fetch(url,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        if(response.status === 200){
            const json = await response.json();
            setState(json);
        }
        else{
            //show alert
        }
    }

    //get questions of current user
    const getCurrentUserQuestions = async() => {
        const url = "http://localhost:8080/questions/user";
        const token = localStorage.getItem('token');
        const response = await fetch(url,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        if(response.status === 200){
            const json = await response.json();
            setState(json);
        }
        else{
            //alert;
        }
    }

    //post question
    const postQuestions = async(question) =>{
        const token = localStorage.getItem('token');
        const url = "http://localhost:8080/questions";

        const response = await fetch(url,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body : JSON.stringify({
                "question" : question
            })
        })

        if(response.status === 200){
            //show added.
            const res = await response.json();
            setState(state.concat(res));
        }
        else{
            //error
        }
    }

    return (
        <div>
            <QuestionContext.Provider value={{state,getAllQuestions,getCurrentUserQuestions,postQuestions}}>
                {props.children}
            </QuestionContext.Provider>
        </div>
    )
}

export default QuestionState

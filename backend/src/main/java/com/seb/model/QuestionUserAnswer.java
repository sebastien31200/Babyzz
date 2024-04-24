package com.seb.model;

public class QuestionUserAnswer {
    
    public int questionId;

    public String answer;

    public boolean isGoodAnswer;

    public QuestionUserAnswer(){}

    public QuestionUserAnswer(int questionId, String answer){
        this.questionId = questionId;
        this.answer = answer;
    }
    
}

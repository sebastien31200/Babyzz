package com.seb.model;

import io.quarkus.mongodb.panache.PanacheMongoEntity;

public class QuestionChoice extends PanacheMongoEntity{

    public String choice;
    public boolean isAnswser;

    public QuestionChoice(){}

    public QuestionChoice(String choice, boolean isAnswer){
        this.choice = choice;
        this.isAnswser = isAnswer;
    }

    public QuestionChoice(String choice){
        this(choice,false);
    }
}
package com.seb.model;

import java.util.List;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection="question")
public class Question extends PanacheMongoEntity {
    public int questionId;
    public String title;
    public QuestionTypeEnum questionType;
    public List<QuestionChoice> choices;

    public Question(){}

    public Question(int questionId, String title, QuestionTypeEnum questionType, List<QuestionChoice> choices) {
        this.questionId = questionId;
        this.title = title;
        this.questionType = questionType;
        this.choices = choices;
    }

    public String getTitle() {
        return this.title;
    }

    public QuestionTypeEnum getQuestionType() {
        return this.questionType;
    }


}

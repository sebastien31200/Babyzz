package com.seb;

import java.util.List;
import com.seb.model.Question;
import com.seb.model.QuestionUserAnswer;
import com.seb.services.QuestionService;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;

@Path("/questions")
public class QuestionResource {

    @Inject QuestionService questionService;

    @GET
    public List<Question> questions() {
        System.out.println("Hello questions");
        List<Question> questions = questionService.getQuestionsWithoutAnswer();
        return questions;
    }

    @POST
    @Path("answer")
    public QuestionUserAnswer checkAnswer(QuestionUserAnswer userAnswer){
        userAnswer.isGoodAnswer = questionService.checkAnswer(userAnswer.questionId, userAnswer.answer);
        return userAnswer;
    }

}

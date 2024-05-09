package com.seb;

import java.util.List;

import org.jboss.logging.Logger;

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

    private static final Logger log = Logger.getLogger(QuestionResource.class); 

    @GET
    public List<Question> questions() {
        System.out.println("GET questions");
        List<Question> questions = questionService.getQuestionsWithoutAnswer();
        return questions;
    }

    @GET
    @Path("/hello")
    public String hello() {
        System.out.println("GET hello");
        return "<h1>hello</h1>";
    }

    @POST
    @Path("answer")
    public QuestionUserAnswer checkAnswer(QuestionUserAnswer userAnswer){
        userAnswer.isGoodAnswer = questionService.checkAnswer(userAnswer.questionId, userAnswer.answer);
        return userAnswer;
    }

}

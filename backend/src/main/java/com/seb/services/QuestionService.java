package com.seb.services;

import java.util.List;

import com.seb.model.Question;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class QuestionService {

    public void add(Question question){
        question.persist();
    }

    public List<Question> getQuestionsWithoutAnswer(){
        System.out.println("In all questions");
        List<Question> allQuestions = Question.listAll();
        System.out.println("after listAll");
        System.out.println(allQuestions.size());

        allQuestions.forEach(question -> {if(question.choices != null){
            question.choices.forEach(choice -> choice.isAnswser=false);
        }});
        return allQuestions;
    }

    public Question getQuestion(int questionId){
        return Question.find("questionId", questionId).firstResult();
    }

    public boolean checkAnswer(int questionId, String userAnswer){
        boolean result = true;
        Question question = getQuestion(questionId);
        if(question.choices != null){
            result = false;
            String answer = question.choices.stream().filter(q -> q.isAnswser==true).findFirst().get().choice;
            if(answer.equals(userAnswer)){
                result = true;
            }
        }
        return result;
    }
}
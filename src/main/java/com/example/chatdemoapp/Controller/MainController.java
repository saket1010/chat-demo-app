package com.example.chatdemoapp.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

@Controller
public class MainController {

    @GetMapping("/app")
    public ModelAndView index()
    {
        ModelAndView mv=new ModelAndView();
        mv.setViewName("index.html");
        return mv;
    }

}

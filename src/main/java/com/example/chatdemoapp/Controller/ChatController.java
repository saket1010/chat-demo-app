package com.example.chatdemoapp.Controller;

import com.example.chatdemoapp.Model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class ChatController {

    @MessageMapping("/reciveroommessage")
    @SendTo("/topic/sendroommessage")
    public Message sendMessage(@RequestBody Message message)
    {
        System.out.println(message.getName());
        System.out.println(message.getContent());
        message.setDate(new Date());
        return message;
    }

}

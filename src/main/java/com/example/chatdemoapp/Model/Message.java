package com.example.chatdemoapp.Model;


import java.util.Date;

public class Message {

    private String name;
    private String content;

    private Date  date;


    public Message(String name, String content, Date  date) {
        this.name = name;
        this.content = content;
        this.date = new Date();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}

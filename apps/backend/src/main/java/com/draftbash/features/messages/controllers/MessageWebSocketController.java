package com.draftbash.features.messages.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import com.draftbash.features.messages.dtos.MessageDTO;

@Controller
public class MessageWebSocketController {

    @MessageMapping("/messages.sendMessage")
    @SendTo("/topic/messages")
    public MessageDTO sendMessage(@Payload MessageDTO message) {
        return message;
    }

    @MessageMapping("/messages.addUser")
    @SendTo("/topic/messages")
    public MessageDTO addUser(
            @Payload MessageDTO message, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("userId", message.senderId());
        return message;
    }
}

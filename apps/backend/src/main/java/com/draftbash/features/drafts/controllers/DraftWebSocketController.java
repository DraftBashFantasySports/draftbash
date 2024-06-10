package com.draftbash.features.drafts.controllers;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.draftbash.features.drafts.dtos.DraftRoom;

import java.util.HashMap;
import java.util.Map;

@Controller
public class DraftWebSocketController {

    private final Map<Long, DraftRoom> draftRooms = new HashMap<>();
    private final SimpMessagingTemplate messagingTemplate;

    public DraftWebSocketController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/draft/{roomId}/start")
    public void startDraft(@DestinationVariable long roomId) {
        DraftRoom draftRoom = draftRooms.computeIfAbsent(roomId, key -> new DraftRoom());
        draftRoom.startDraft();
        messagingTemplate.convertAndSend("/topic/draft/" + roomId + "/status", "Draft started");
    }

    @MessageMapping("/draft/{roomId}/stop")
    public void stopDraft(@DestinationVariable long roomId) {
        DraftRoom draftRoom = draftRooms.get(roomId);
        if (draftRoom != null) {
            draftRoom.stopDraft();
            messagingTemplate.convertAndSend("/topic/draft/" + roomId + "/status", "Draft stopped");
        }
    }
}
package backend.overlook_hotel.service;

import backend.overlook_hotel.model.Message;
import backend.overlook_hotel.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Optional<Message> getMessageById(UUID id) {
        return messageRepository.findById(id);
    }

    public Message createMessage(Message message) {
        return messageRepository.save(message);
    }

    public Message updateMessage(UUID id, Message updated) {
        return messageRepository.findById(id).map(message -> {
            message.setClient(updated.getClient());
            message.setProfile(updated.getProfile());
            message.setEvaluation(updated.getEvaluation());
            message.setMessage(updated.getMessage());
            message.setAnswer(updated.getAnswer());
            return messageRepository.save(message);
        }).orElse(null);
    }

    public void deleteMessage(UUID id) {
        messageRepository.deleteById(id);
    }
}

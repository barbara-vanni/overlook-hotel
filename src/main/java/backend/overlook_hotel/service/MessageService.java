package backend.overlook_hotel.service;

import backend.overlook_hotel.model.Client;
import backend.overlook_hotel.model.Message;
import backend.overlook_hotel.model.Profile;
import backend.overlook_hotel.repository.ClientRepository;
import backend.overlook_hotel.repository.MessageRepository;
import backend.overlook_hotel.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ClientRepository clientRepo;

    @Autowired
    private ProfileRepository profileRepo;

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    public Optional<Message> getMessageById(UUID id) {
        return messageRepository.findById(id);
    }

    public Message createMessage(Message message) {
        UUID clientId = message.getClient().getId();
        UUID profileId = message.getProfile() != null ? message.getProfile().getId() : null;

        Client client = clientRepo.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Profile profile = null;
        if (profileId != null) {
            profile = profileRepo.findById(profileId)
                    .orElseThrow(() -> new RuntimeException("Profile not found"));
        }

        message.setClient(client);
        message.setProfile(profile);

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

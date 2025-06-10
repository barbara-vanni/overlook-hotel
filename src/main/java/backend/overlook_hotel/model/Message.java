package backend.overlook_hotel.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.util.UUID;

@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id_client", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "id_profil", nullable = false)
    private Profile profile;

    @Column(nullable = false)
    @Min(1)
    @Max(5)
    private Integer evaluation;

    @Column
    private String message;

    @Column
    private String answer;

    // Constructeurs
    public Message() {}

    public Message(UUID id, Client client, Profile profile, Integer evaluation, String message, String answer) {
        this.id = id;
        this.client = client;
        this.profile = profile;
        this.evaluation = evaluation;
        this.message = message;
        this.answer = answer;
    }

    // Getters et Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public Integer getEvaluation() {
        return evaluation;
    }

    public void setEvaluation(Integer evaluation) {
        this.evaluation = evaluation;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}

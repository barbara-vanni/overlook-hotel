package backend.overlook_hotel.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "team")
public class Team {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private Integer capacity;

    // Constructeurs
    public Team() {}

    public Team(UUID id, String type, Integer capacity) {
        this.id = id;
        this.type = type;
        this.capacity = capacity;
    }

    // Getters et Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }
}

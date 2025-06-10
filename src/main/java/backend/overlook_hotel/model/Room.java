package backend.overlook_hotel.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import java.util.UUID;

@Entity
@Table(name = "room")
public class Room {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    @Min(value = 1, message = "La capacité doit être supérieure à 0")
    private Integer capacity;

    @Column(nullable = false)
    private String status;

    // Constructeurs

    public Room() {}

    public Room(UUID id, String type, Integer capacity, String status) {
        this.id = id;
        this.type = type;
        this.capacity = capacity;
        this.status = status;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

package backend.overlook_hotel.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id_reservation", nullable = false)
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name = "id_client", nullable = false)
    private Client client;

    @Column(nullable = false)
    @DecimalMin(value = "0.01", message = "Le prix doit être supérieur à 0")
    private BigDecimal price;

    @Column(nullable = false)
    @Pattern(regexp = "^[0-9]{16}$", message = "Le numéro de carte doit contenir 16 chiffres")
    private String number;

    @Column(nullable = false)
    @Pattern(regexp = "^[0-9]{3}$", message = "Le CVV doit contenir 3 chiffres")
    private String cvv;

    @Column(nullable = false)
    @Future(message = "La date de paiement doit être dans le futur")
    private LocalDate date;

    // Constructeurs
    public Payment() {}

    public Payment(UUID id, Reservation reservation, Client client, BigDecimal price,
                   String number, String cvv, LocalDate date) {
        this.id = id;
        this.reservation = reservation;
        this.client = client;
        this.price = price;
        this.number = number;
        this.cvv = cvv;
        this.date = date;
    }

    // Getters et Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}

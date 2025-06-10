package backend.overlook_hotel.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "client")
public class Client {

    @Id
    private UUID id;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private Integer age;

    @Column
    private String address;

    @Column
    private String phone;

    @Column(nullable = false)
    private BigDecimal fidelity = BigDecimal.ZERO;

    // Constructeurs
    public Client() {}

    public Client(UUID id, String lastName, String firstName, String email, Integer age,
                  String address, String phone, BigDecimal fidelity) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.age = age;
        this.address = address;
        this.phone = phone;
        this.fidelity = fidelity != null ? fidelity : BigDecimal.ZERO;
    }

    // Getters et Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public BigDecimal getFidelity() {
        return fidelity;
    }

    public void setFidelity(BigDecimal fidelity) {
        this.fidelity = fidelity;
    }
}

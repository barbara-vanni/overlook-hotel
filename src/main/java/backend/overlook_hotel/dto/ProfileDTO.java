//package backend.overlook_hotel.dto;
//
//import java.util.UUID;
//
//public class ProfileDTO {
//    private UUID id;
//    private String firstName;
//    private String lastName;
//    private String role;
//
//    public ProfileDTO(UUID id, String firstName, String lastName, String role) {
//        this.id = id;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.role = role;
//    }
//
//    public UUID getId() {
//        return id;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public String getRole() {
//        return role;
//    }
//}

package backend.overlook_hotel.dto;

public class ProfileDTO {
    private String firstName;
    private String lastName;
    private String role;

    public ProfileDTO(String firstName, String lastName, String role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getRole() {
        return role;
    }
}

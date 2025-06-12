package backend.overlook_hotel;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest authRequest) {
        if ("user".equals(authRequest.getUsername()) && "password".equals(authRequest.getPassword())) {
            return "Authentifié avec succès";
        }
        return "Échec de l'authentification";
    }
}

class AuthRequest {
    private String username;
    private String password;

    // Getters et setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

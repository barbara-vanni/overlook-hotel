package backend.overlook_hotel.controller;

import backend.overlook_hotel.service.ProfileService;
import backend.overlook_hotel.service.ClientService;
import backend.overlook_hotel.model.Profile;
import backend.overlook_hotel.model.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private ClientService clientService;

    @GetMapping("/user-role/{id}")
    public ResponseEntity<Map<String, String>> getUserRole(@PathVariable UUID id) {
        Map<String, String> response = new HashMap<>();

        Optional<Profile> profile = profileService.getProfileById(id);
        if (profile.isPresent()) {
            response.put("role", profile.get().getRole());
            return ResponseEntity.ok(response);
        }

        Optional<Client> client = clientService.getClientById(id);
        if (client.isPresent()) {
            response.put("role", "client");
            return ResponseEntity.ok(response);
        }

        response.put("role", "unknown");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
}


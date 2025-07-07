package backend.overlook_hotel.service;

import backend.overlook_hotel.model.Client;
import backend.overlook_hotel.repository.ClientRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureMockMvc
public class ClientServiceTest {

    @Autowired
    private ClientService clientService;

    @Autowired
    private ClientRepository clientRepository;

    @Test
    public void testCreateClient() {
        UUID uuid = UUID.randomUUID();
        Client client = new Client();
        client.setId(uuid);
        client.setFirstName("Walid");
        client.setLastName("Sek");
        client.setEmail("profil1.overlook@yopmail.com");
        client.setAge(28);
        client.setPhone("0601020304");

        clientService.createClient(client);

        Optional<Client> saved = clientRepository.findById(uuid);
        assertTrue(saved.isPresent());
        assertEquals("Alice", saved.get().getFirstName());
    }

    @Test
    public void testGetClientById() {
        // 1. Préparation : création et sauvegarde d’un client
        UUID uuid = UUID.fromString("713e130d-27c9-4322-bfba-54651e335658");
        Client client = new Client();
        client.setId(uuid);
        client.setFirstName("ClientUn");
        client.setLastName("UnClient");
        client.setEmail("client1.overlook@yopmail.com");
        client.setAge(25);
        client.setPhone("0601020304");

        clientRepository.save(client);

        // 2. Action : appel de la méthode à tester
        Optional<Client> foundClient = clientService.getClientById(uuid); // ou clientRepository.findById(uuid)

        // 3. Vérification
        assertTrue(foundClient.isPresent());
        assertEquals("ClientUn", foundClient.get().getFirstName());
        assertEquals("UnClient", foundClient.get().getLastName());
    }
}

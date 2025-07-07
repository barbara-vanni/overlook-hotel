package backend.overlook_hotel.service;

import backend.overlook_hotel.model.Client;
import backend.overlook_hotel.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    public Optional<Client> getClientById(UUID id) {
        return clientRepository.findById(id);
    }

    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    public Client updateClient(UUID id, Client updatedClient) {
        return clientRepository.findById(id).map(client -> {
            client.setFirstName(updatedClient.getFirstName());
            client.setLastName(updatedClient.getLastName());
            client.setEmail(updatedClient.getEmail());
            client.setAge(updatedClient.getAge());
            client.setAddress(updatedClient.getAddress());
            client.setPhone(updatedClient.getPhone());
            client.setFidelity(updatedClient.getFidelity());
            return clientRepository.save(client);
        }).orElse(null);
    }

    public void deleteClient(UUID id) {
        clientRepository.deleteById(id);
    }
}
package backend.overlook_hotel.service;

import backend.overlook_hotel.dto.ReservationRequest;
import backend.overlook_hotel.model.Room;
import backend.overlook_hotel.model.Reservation;
import backend.overlook_hotel.model.Client;
import backend.overlook_hotel.repository.RoomRepository;
import backend.overlook_hotel.repository.ReservationRepository;
import backend.overlook_hotel.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ClientRepository clientRepository;

    // Helper methods to handle both English and French status values
    private boolean isAvailableStatus(String status) {
        return "available".equalsIgnoreCase(status) || "libre".equalsIgnoreCase(status);
    }

    private boolean isReservedStatus(String status) {
        return "reserved".equalsIgnoreCase(status) || "reserve".equalsIgnoreCase(status) || "réservé".equalsIgnoreCase(status);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findAll().stream()
                .filter(room -> isAvailableStatus(room.getStatus()))
                .collect(Collectors.toList());
    }

    public Optional<Room> getRoomById(UUID id) {
        return roomRepository.findById(id);
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    public Room updateRoom(UUID id, Room updatedRoom) {
        return roomRepository.findById(id).map(room -> {
            room.setType(updatedRoom.getType());
            room.setCapacity(updatedRoom.getCapacity());
            room.setStatus(updatedRoom.getStatus());
            return roomRepository.save(room);
        }).orElse(null);
    }

    public void deleteRoom(UUID id) {
        roomRepository.deleteById(id);
    }

    public List<Room> getRoomsWithMinCapacity(Integer minCapacity) {
        return roomRepository.findByCapacityGreaterThanEqual(minCapacity).stream()
                .filter(room -> isAvailableStatus(room.getStatus()))
                .collect(Collectors.toList());
    }

    public boolean reserveRoom(UUID roomId) {
        Optional<Room> roomOpt = roomRepository.findById(roomId);
        if (roomOpt.isPresent()) {
            Room room = roomOpt.get();
            if (isAvailableStatus(room.getStatus())) {
                room.setStatus("reserved");
                roomRepository.save(room);
                return true;
            }
        }
        return false;
    }

    public Reservation createReservation(ReservationRequest request) {
        // First check if room is available
        Optional<Room> roomOpt = roomRepository.findById(request.getRoomId());
        if (!roomOpt.isPresent() || !isAvailableStatus(roomOpt.get().getStatus())) {
            return null; // Room not available
        }

        // Get or create client
        Optional<Client> clientOpt = clientRepository.findById(request.getClientId());
        if (!clientOpt.isPresent()) {
            // Create a basic client if not exists (this might happen with Supabase auth)
            Client newClient = new Client();
            newClient.setId(request.getClientId());
            newClient.setFirstName(request.getFirstName());
            newClient.setLastName(request.getLastName());
            newClient.setEmail(request.getEmail());
            newClient.setPhone(request.getPhone());
            newClient.setAge(25); // default age, this should ideally come from user profile
            newClient.setAddress(""); // default empty address
            clientOpt = Optional.of(clientRepository.save(newClient));
        }

        // Reserve the room
        Room room = roomOpt.get();
        room.setStatus("reserved");
        roomRepository.save(room);

        // Create reservation
        Reservation reservation = new Reservation();
        reservation.setClient(clientOpt.get());
        reservation.setRoom(room);
        reservation.setEnterDate(request.getCheckInDate());
        reservation.setEndDate(request.getCheckOutDate());
        reservation.setCancel(false);
        reservation.setStat("confirmed");

        return reservationRepository.save(reservation);
    }

    public boolean isRoomAvailable(UUID roomId) {
        Optional<Room> roomOpt = roomRepository.findById(roomId);
        if (!roomOpt.isPresent()) {
            return false;
        }
        String status = roomOpt.get().getStatus();
        // Handle both English and French status values
        return isAvailableStatus(status);
    }
}

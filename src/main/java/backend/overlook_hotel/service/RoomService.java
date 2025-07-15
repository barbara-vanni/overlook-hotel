package backend.overlook_hotel.service;

import backend.overlook_hotel.model.Room;
import backend.overlook_hotel.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
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
}
package backend.overlook_hotel.repository;

import backend.overlook_hotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RoomRepository extends JpaRepository<Room, UUID> {
    // List<Room> findByStatus(String status);
    // List<Room> findByType(String type);
}

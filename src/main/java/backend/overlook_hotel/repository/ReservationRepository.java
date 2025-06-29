package backend.overlook_hotel.repository;

import backend.overlook_hotel.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
//    List<Reservation> findByClientId(UUID clientId);
//    List<Reservation> findByRoomId(UUID roomId);
//    List<Reservation> findByCancel(boolean cancel);
}

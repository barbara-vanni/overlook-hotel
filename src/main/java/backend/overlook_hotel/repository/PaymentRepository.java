package backend.overlook_hotel.repository;

import backend.overlook_hotel.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {
//    List<Payment> findByClientId(UUID clientId);
//    List<Payment> findByReservationId(UUID reservationId);
}

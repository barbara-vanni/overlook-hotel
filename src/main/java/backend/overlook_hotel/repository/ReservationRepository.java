package backend.overlook_hotel.repository;

import backend.overlook_hotel.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, UUID> {
    List<Reservation> findByClientId(UUID clientId);
    List<Reservation> findByRoomId(UUID roomId);
    List<Reservation> findByCancel(boolean cancel);
    
    // Nouvelles méthodes pour la gestion automatique des statuts
    
    /**
     * Trouve toutes les réservations expirées (date de fin < aujourd'hui)
     */
    @Query("SELECT r FROM Reservation r WHERE r.endDate < :today AND r.cancel = false")
    List<Reservation> findExpiredReservations(@Param("today") LocalDate today);
    
    /**
     * Trouve toutes les réservations annulées
     */
    @Query("SELECT r FROM Reservation r WHERE r.cancel = true")
    List<Reservation> findCancelledReservations();
    
    /**
     * Trouve les réservations actives pour une chambre donnée
     * (réservations non annulées où la date de fin >= aujourd'hui)
     */
    @Query("SELECT r FROM Reservation r WHERE r.room.id = :roomId AND r.cancel = false AND r.endDate >= :today")
    List<Reservation> findActiveReservationsForRoom(@Param("roomId") UUID roomId, @Param("today") LocalDate today);
    
    /**
     * Trouve les réservations futures pour une chambre donnée
     * (réservations non annulées où la date de début > aujourd'hui)
     */
    @Query("SELECT r FROM Reservation r WHERE r.room.id = :roomId AND r.cancel = false AND r.enterDate > :today")
    List<Reservation> findFutureReservationsForRoom(@Param("roomId") UUID roomId, @Param("today") LocalDate today);
}

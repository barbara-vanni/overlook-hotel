package backend.overlook_hotel.service;

import backend.overlook_hotel.model.Reservation;
import backend.overlook_hotel.model.Room;
import backend.overlook_hotel.repository.ReservationRepository;
import backend.overlook_hotel.repository.RoomRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class RoomStatusService {

    private static final Logger logger = LoggerFactory.getLogger(RoomStatusService.class);

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private RoomRepository roomRepository;

    /**
     * Tâche planifiée qui s'exécute tous les jours à 2h du matin
     * pour mettre à jour le statut des chambres
     */
    @Scheduled(cron = "0 0 2 * * ?") // Tous les jours à 2h00
    @Transactional
    public void updateRoomStatuses() {
        logger.info("🔄 Début de la mise à jour automatique des statuts de chambres");
        
        try {
            // Libérer les chambres dont les réservations sont terminées
            liberateExpiredRooms();
            
            // Libérer les chambres des réservations annulées
            liberateCancelledRooms();
            
            logger.info("✅ Mise à jour automatique des statuts terminée avec succès");
        } catch (Exception e) {
            logger.error("❌ Erreur lors de la mise à jour des statuts de chambres", e);
        }
    }

    /**
     * Libère les chambres dont les réservations sont expirées
     */
    @Transactional
    public void liberateExpiredRooms() {
        LocalDate today = LocalDate.now();
        
        // Trouver toutes les réservations expirées (date de fin < aujourd'hui)
        List<Reservation> expiredReservations = reservationRepository.findExpiredReservations(today);
        
        logger.info("📅 Trouvé {} réservations expirées", expiredReservations.size());
        
        for (Reservation reservation : expiredReservations) {
            Room room = reservation.getRoom();
            if ("reserved".equals(room.getStatus()) || "réservé".equals(room.getStatus())) {
                room.setStatus("libre");
                roomRepository.save(room);
                logger.info("🏨 Chambre {} ({}) libérée - réservation expirée", 
                           room.getId(), room.getType());
            }
        }
    }

    /**
     * Libère les chambres des réservations annulées
     */
    @Transactional
    public void liberateCancelledRooms() {
        // Trouver toutes les réservations annulées
        List<Reservation> cancelledReservations = reservationRepository.findCancelledReservations();
        
        logger.info("❌ Trouvé {} réservations annulées", cancelledReservations.size());
        
        for (Reservation reservation : cancelledReservations) {
            Room room = reservation.getRoom();
            if ("reserved".equals(room.getStatus()) || "réservé".equals(room.getStatus())) {
                room.setStatus("libre");
                roomRepository.save(room);
                logger.info("🏨 Chambre {} ({}) libérée - réservation annulée", 
                           room.getId(), room.getType());
            }
        }
    }

    /**
     * Méthode manuelle pour forcer la mise à jour (utile pour les tests ou admin)
     */
    public void manualRoomStatusUpdate() {
        logger.info("🔧 Mise à jour manuelle des statuts de chambres déclenchée");
        updateRoomStatuses();
    }

    /**
     * Vérifie et met à jour le statut d'une chambre spécifique
     */
    @Transactional
    public boolean checkAndUpdateRoomStatus(UUID roomId) {
        Room room = roomRepository.findById(roomId).orElse(null);
        if (room == null) {
            logger.warn("⚠️ Chambre avec ID {} non trouvée", roomId);
            return false;
        }

        LocalDate today = LocalDate.now();
        
        // Vérifier s'il y a des réservations actives pour cette chambre
        List<Reservation> activeReservations = reservationRepository
            .findActiveReservationsForRoom(roomId, today);
        
        if (activeReservations.isEmpty()) {
            // Aucune réservation active, la chambre doit être libre
            if (!"libre".equals(room.getStatus())) {
                room.setStatus("libre");
                roomRepository.save(room);
                logger.info("🏨 Chambre {} ({}) mise à jour vers 'libre'", 
                           room.getId(), room.getType());
                return true;
            }
        } else {
            // Il y a des réservations actives, la chambre doit être réservée
            if (!"reserved".equals(room.getStatus()) && !"réservé".equals(room.getStatus())) {
                room.setStatus("reserved");
                roomRepository.save(room);
                logger.info("🏨 Chambre {} ({}) mise à jour vers 'reserved'", 
                           room.getId(), room.getType());
                return true;
            }
        }
        
        return false; // Aucun changement nécessaire
    }
}

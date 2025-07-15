package backend.overlook_hotel.service;

import backend.overlook_hotel.model.Reservation;
import backend.overlook_hotel.model.Room;
import backend.overlook_hotel.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;
    
    @Autowired
    private RoomService roomService;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(UUID id) {
        return reservationRepository.findById(id);
    }

    public Reservation createReservation(Reservation reservation) {
        // Save the reservation first
        Reservation savedReservation = reservationRepository.save(reservation);
        
        // Update the room status to "reserved"
        Optional<Room> roomOpt = roomService.getRoomById(reservation.getRoom().getId());
        if (roomOpt.isPresent()) {
            Room room = roomOpt.get();
            room.setStatus("reserve");
            roomService.updateRoom(room.getId(), room);
        }
        
        return savedReservation;
    }

    public Reservation updateReservation(UUID id, Reservation updated) {
        return reservationRepository.findById(id).map(reservation -> {
            reservation.setClient(updated.getClient());
            reservation.setRoom(updated.getRoom());
            reservation.setEnterDate(updated.getEnterDate());
            reservation.setEndDate(updated.getEndDate());
            reservation.setCancel(updated.isCancel());
            reservation.setStat(updated.getStat());
            return reservationRepository.save(reservation);
        }).orElse(null);
    }

    public void deleteReservation(UUID id) {
        // Get the reservation before deleting to access the room
        Optional<Reservation> reservationOpt = reservationRepository.findById(id);
        if (reservationOpt.isPresent()) {
            Reservation reservation = reservationOpt.get();
            
            // Delete the reservation
            reservationRepository.deleteById(id);
            
            // Update the room status back to "available"
            Optional<Room> roomOpt = roomService.getRoomById(reservation.getRoom().getId());
            if (roomOpt.isPresent()) {
                Room room = roomOpt.get();
                room.setStatus("available");
                roomService.updateRoom(room.getId(), room);
            }
        }
    }

    public List<Reservation> getReservationsByClientId(UUID clientId) {
        return reservationRepository.findByClientId(clientId);
    }
}

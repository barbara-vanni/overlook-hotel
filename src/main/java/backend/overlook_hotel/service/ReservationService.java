package backend.overlook_hotel.service;

import backend.overlook_hotel.model.Reservation;
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

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(UUID id) {
        return reservationRepository.findById(id);
    }

    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
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
        reservationRepository.deleteById(id);
    }
}

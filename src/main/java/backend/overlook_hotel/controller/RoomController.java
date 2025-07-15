package backend.overlook_hotel.controller;

import backend.overlook_hotel.dto.ReservationRequest;
import backend.overlook_hotel.model.Room;
import backend.overlook_hotel.model.Reservation;
import backend.overlook_hotel.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/available")
    public List<Room> getAvailableRooms(@RequestParam(required = false) Integer minCapacity) {
        if (minCapacity != null) {
            return roomService.getRoomsWithMinCapacity(minCapacity);
        }
        return roomService.getAvailableRooms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable UUID id) {
        Optional<Room> room = roomService.getRoomById(id);
        return room.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/availability")
    public ResponseEntity<Map<String, Boolean>> checkRoomAvailability(@PathVariable UUID id) {
        Map<String, Boolean> response = new HashMap<>();
        response.put("available", roomService.isRoomAvailable(id));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/reserve")
    public ResponseEntity<Map<String, Object>> reserveRoom(@PathVariable UUID id) {
        Map<String, Object> response = new HashMap<>();
        
        if (roomService.reserveRoom(id)) {
            response.put("success", true);
            response.put("message", "Chambre réservée avec succès");
            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Cette chambre n'est plus disponible");
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/reserve")
    public ResponseEntity<Map<String, Object>> createReservation(@RequestBody ReservationRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Reservation reservation = roomService.createReservation(request);
            if (reservation != null) {
                response.put("success", true);
                response.put("message", "Réservation créée avec succès");
                response.put("reservationId", reservation.getId());
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Cette chambre n'est plus disponible");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Erreur lors de la création de la réservation: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @PostMapping
    public Room createRoom(@RequestBody Room room) {
        return roomService.createRoom(room);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable UUID id, @RequestBody Room room) {
        Room updated = roomService.updateRoom(id, room);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable UUID id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}

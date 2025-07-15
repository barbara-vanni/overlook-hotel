package backend.overlook_hotel.controller;

import backend.overlook_hotel.model.Room;
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
        // For now, return all rooms - you can add filtering logic later
        return roomService.getAllRooms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable UUID id) {
        Optional<Room> room = roomService.getRoomById(id);
        return room.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/availability")
    public ResponseEntity<Map<String, Boolean>> checkRoomAvailability(@PathVariable UUID id) {
        Map<String, Boolean> response = new HashMap<>();
        Optional<Room> room = roomService.getRoomById(id);
        if (room.isPresent()) {
            // For now, just return true - you can add real availability logic later
            response.put("available", true);
            return ResponseEntity.ok(response);
        } else {
            response.put("available", false);
            return ResponseEntity.notFound().build();
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
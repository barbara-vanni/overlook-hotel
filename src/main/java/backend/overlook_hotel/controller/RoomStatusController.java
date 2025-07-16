package backend.overlook_hotel.controller;

import backend.overlook_hotel.service.RoomStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/overlook_hotel/api/room-status")
public class RoomStatusController {

    @Autowired
    private RoomStatusService roomStatusService;

    /**
     * Déclencher manuellement la mise à jour de tous les statuts de chambres
     * Utile pour les administrateurs
     */
    @PostMapping("/update-all")
    public ResponseEntity<Map<String, String>> updateAllRoomStatuses() {
        try {
            roomStatusService.manualRoomStatusUpdate();
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Mise à jour des statuts de chambres déclenchée avec succès");
            response.put("status", "success");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Erreur lors de la mise à jour: " + e.getMessage());
            response.put("status", "error");
            
            return ResponseEntity.status(500).body(response);
        }
    }

    /**
     * Vérifier et mettre à jour le statut d'une chambre spécifique
     */
    @PostMapping("/check-room/{roomId}")
    public ResponseEntity<Map<String, Object>> checkSpecificRoom(@PathVariable UUID roomId) {
        try {
            boolean updated = roomStatusService.checkAndUpdateRoomStatus(roomId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("roomId", roomId);
            response.put("updated", updated);
            response.put("message", updated ? 
                "Statut de la chambre mis à jour" : 
                "Aucune mise à jour nécessaire");
            response.put("status", "success");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("roomId", roomId);
            response.put("message", "Erreur lors de la vérification: " + e.getMessage());
            response.put("status", "error");
            
            return ResponseEntity.status(500).body(response);
        }
    }

    /**
     * Obtenir des informations sur le système de mise à jour automatique
     */
    @GetMapping("/info")
    public ResponseEntity<Map<String, String>> getSystemInfo() {
        Map<String, String> response = new HashMap<>();
        response.put("scheduledTask", "Exécution quotidienne à 2h00 du matin");
        response.put("description", "Libération automatique des chambres expirées et annulées");
        response.put("manualTrigger", "POST /api/room-status/update-all");
        response.put("checkSpecific", "POST /api/room-status/check-room/{roomId}");
        
        return ResponseEntity.ok(response);
    }
}

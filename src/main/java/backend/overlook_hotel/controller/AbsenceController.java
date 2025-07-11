package backend.overlook_hotel.controller;

import backend.overlook_hotel.model.Absence;
import backend.overlook_hotel.service.AbsenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/absences")
public class AbsenceController {

    @Autowired
    private AbsenceService absenceService;

    @GetMapping
    public List<Absence> getAllAbsences() {
        return absenceService.getAllAbsences();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Absence> getAbsenceById(@PathVariable UUID id) {
        Optional<Absence> absence = absenceService.getAbsenceById(id);
        return absence.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Absence createAbsence(@RequestBody Absence absence) {
        return absenceService.createAbsence(absence);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Absence> updateAbsence(@PathVariable UUID id, @RequestBody Absence absence) {
        Absence updated = absenceService.updateAbsence(id, absence);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAbsence(@PathVariable UUID id) {
        absenceService.deleteAbsence(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-profile/{idProfil}")
    public ResponseEntity<List<Absence>> getAbsencesByIdProfil(@PathVariable UUID idProfil) {
        List<Absence> absences = absenceService.getAbsencesByIdProfil(idProfil);
        return ResponseEntity.ok(absences);
    }
}

package backend.overlook_hotel.service;

import backend.overlook_hotel.model.Team;
import backend.overlook_hotel.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }

    public Optional<Team> getTeamById(UUID id) {
        return teamRepository.findById(id);
    }

    public Team createTeam(Team team) {
        return teamRepository.save(team);
    }

    public Team updateTeam(UUID id, Team updatedTeam) {
        return teamRepository.findById(id).map(team -> {
            team.setType(updatedTeam.getType());
            team.setCapacity(updatedTeam.getCapacity());
            return teamRepository.save(team);
        }).orElse(null);
    }

    public void deleteTeam(UUID id) {
        teamRepository.deleteById(id);
    }
}

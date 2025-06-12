package backend.overlook_hotel.service;

import backend.overlook_hotel.model.Profile;
import backend.overlook_hotel.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Optional<Profile> getProfileById(UUID id) {
        return profileRepository.findById(id);
    }

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Profile updateProfile(UUID id, Profile updatedProfile) {
        return profileRepository.findById(id).map(profile -> {
            profile.setFirstName(updatedProfile.getFirstName());
            profile.setLastName(updatedProfile.getLastName());
            profile.setEmail(updatedProfile.getEmail());
            profile.setPhone(updatedProfile.getPhone());
            profile.setAge(updatedProfile.getAge());
            profile.setAddress(updatedProfile.getAddress());
            profile.setRole(updatedProfile.getRole());
            profile.setContract(updatedProfile.getContract());
            profile.setStartContract(updatedProfile.getStartContract());
            profile.setEndContract(updatedProfile.getEndContract());
            profile.setIdTeam(updatedProfile.getIdTeam());
            return profileRepository.save(profile);
        }).orElse(null);
    }

    public void deleteProfile(UUID id) {
        profileRepository.deleteById(id);
    }
}

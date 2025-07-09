package backend.overlook_hotel;

import org.springframework.context.annotation.*;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> {
                auth.requestMatchers("/api/auth/**").permitAll();
                auth.requestMatchers("/api/profiles/**").permitAll();
                auth.requestMatchers("/api/user-role/**").permitAll();
                auth.requestMatchers("/overlook_hotel/api/rooms/**").permitAll();
                auth.requestMatchers("/api/reservation/**").authenticated();
                auth.anyRequest().permitAll(); 
            })
            .formLogin(Customizer.withDefaults());
        return http.build();
    }
}
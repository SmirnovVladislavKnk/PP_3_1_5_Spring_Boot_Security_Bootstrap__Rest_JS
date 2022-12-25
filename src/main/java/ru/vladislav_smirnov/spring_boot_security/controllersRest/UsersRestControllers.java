package ru.vladislav_smirnov.spring_boot_security.controllersRest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.vladislav_smirnov.spring_boot_security.model.User;
import ru.vladislav_smirnov.spring_boot_security.service.UserService;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class UsersRestControllers {

    private final UserService userService;

    public UsersRestControllers(UserService userService) {
        this.userService = userService;
    }
    @GetMapping
    public ResponseEntity<User> getUser(Principal principal) {
        return new ResponseEntity<>(userService.findByEmail(principal.getName()), HttpStatus.OK);
    }
}

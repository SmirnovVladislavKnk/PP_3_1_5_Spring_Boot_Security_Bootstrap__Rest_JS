package ru.vladislav_smirnov.spring_boot_security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.vladislav_smirnov.spring_boot_security.model.User;
import ru.vladislav_smirnov.spring_boot_security.repositories.UserRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    @Transactional
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public void saveUsers(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }


    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    @org.springframework.transaction.annotation.Transactional
    public User findById(Long id) {

        return userRepository.findById(id).orElse(null);
    }

    @Override
    @org.springframework.transaction.annotation.Transactional
    public void updateUser(User user) {
        //Берем старого юзера по id
        User userDB = findById(user.getId());
        /*
        Сравниваем пароли новый и старого юзера,
        если не равны и у нового не пустой, то устанавливаем новый, иначе сетим старый
         */
        if (!(passwordEncoder.matches(user.getPassword(), userDB.getPassword()))
                && (user.getPassword() != null)
                && !(user.getPassword().equals(""))) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            user.setPassword(userDB.getPassword());
        }
        userRepository.save(user);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = findByEmail(email);
        if (email != null) {
            return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                    user.getAuthorities());
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }
}

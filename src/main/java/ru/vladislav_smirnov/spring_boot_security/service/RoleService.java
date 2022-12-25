package ru.vladislav_smirnov.spring_boot_security.service;

import ru.vladislav_smirnov.spring_boot_security.model.Role;

import java.util.Collection;
import java.util.List;

public interface RoleService {

    List<Role> getAllRoles();
    void saveRole(Role role);
}

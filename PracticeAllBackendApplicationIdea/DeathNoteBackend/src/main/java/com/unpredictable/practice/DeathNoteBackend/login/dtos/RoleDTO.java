package com.unpredictable.practice.DeathNoteBackend.login.dtos;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleDTO
{
    private UUID id;
    private String name;
}

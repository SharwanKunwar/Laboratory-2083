package com.unpredictableXpractice.AuthBackendApplication.Login.dtos;

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
    private String Name;
}

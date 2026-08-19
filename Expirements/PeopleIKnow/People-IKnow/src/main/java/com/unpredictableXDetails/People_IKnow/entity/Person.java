package com.unpredictableXDetails.People_IKnow.entity;

import com.unpredictableXDetails.People_IKnow.enums.Gender;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Person
{
    // Basic Information
    // ----------------------------------------------------
    @Id
    @GeneratedValue
    private UUID id;

    private String imageUrl;
    private String fullName;
    private String aka;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private int age;
    private String nationality;
    private String skinColor;
    private LocalDate dateOfBirth;
    private String birthPlace;
    private String hometown;

    // Contact Information
    // ----------------------------------------------------
    private String email;
    private String phone;
    private String socialMedia;

    // Address Information
    // ----------------------------------------------------
    private String permanentAddress;
    private String currentAddress;

    // Education & Career
    // ----------------------------------------------------
    private String education;
    private String collegeOrSchool;
    private String occupation;
    private String workplace;
    private String passion;
    private String aim;

    // Personality
    // ----------------------------------------------------
    private String character;
    private String favoriteQuote;
    private String notes;

    // Family & Personal Life
    // ----------------------------------------------------
    private int familyMembers;
    private String relationship;
    private String maritalStatus;

    // Personal Information
    // ----------------------------------------------------
    private String religion;
    private String bloodGroup;

    // Favorites & Interests
    // ----------------------------------------------------
    @ElementCollection
    @Builder.Default
    private List<String> hobbies = new ArrayList<>();

    @ElementCollection
    @Builder.Default
    private List<String> favoriteMovies = new ArrayList<>();

    @ElementCollection
    @Builder.Default
    private List<String> favoriteSeries = new ArrayList<>();

    @ElementCollection
    @Builder.Default
    private List<String> favoriteColors = new ArrayList<>();

    @ElementCollection
    @Builder.Default
    private List<String> languages = new ArrayList<>();

    @ElementCollection
    @Builder.Default
    private List<String> books = new ArrayList<>();

}
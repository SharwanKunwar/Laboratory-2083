package com.unpredictable.superCarshop.controller;

import com.unpredictable.superCarshop.dto.CarRequest;
import com.unpredictable.superCarshop.dto.CarResponse;
import com.unpredictable.superCarshop.repository.CarRepository;
import com.unpredictable.superCarshop.service.CarServiceIMP;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Getter
@Setter
@RequestMapping("/api/cars")
public class CarController {

    private final CarServiceIMP carService;

    @GetMapping
    public List<CarResponse> getAllCars(){
        return carService.getAllCars();
    }

    @PostMapping
    public CarResponse createCar(@RequestBody CarRequest carRequest){
        return carService.addCar(carRequest);
    }
}

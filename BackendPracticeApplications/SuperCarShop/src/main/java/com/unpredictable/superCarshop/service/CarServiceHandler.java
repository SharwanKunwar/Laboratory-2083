package com.unpredictable.superCarshop.service;

import com.unpredictable.superCarshop.dto.CarRequest;
import com.unpredictable.superCarshop.dto.CarResponse;
import com.unpredictable.superCarshop.entity.CarEntity;

import java.util.List;

public interface CarServiceHandler {
    CarResponse addCar(CarRequest carRequest);
    List<CarResponse> getAllCars();
    CarResponse updateCar(CarRequest carRequest);
    void deleteCar(Long carId);
}

package com.unpredictable.superCarshop.service;

import com.unpredictable.superCarshop.dto.CarRequest;
import com.unpredictable.superCarshop.dto.CarResponse;
import com.unpredictable.superCarshop.entity.CarEntity;
import com.unpredictable.superCarshop.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarServiceIMP implements CarServiceHandler{

    private final CarRepository carRepository;



    //Request to Entity
    private CarEntity mapToEntity(CarRequest carRequest) {
        CarEntity car = new  CarEntity();
        car.setName(carRequest.getName());
        car.setModal(carRequest.getModal());
        car.setColor(carRequest.getColor());
        car.setPrice(carRequest.getPrice());
        car.setEngine(carRequest.getEngine());
        return car;
    }

    //Entity to Response
    private CarResponse mapToCarResponse(CarEntity carEntity) {
        return CarResponse.builder()
                .id(carEntity.getId())
                .name(carEntity.getName())
                .modal(carEntity.getModal())
                .color(carEntity.getColor())
                .price(carEntity.getPrice())
                .engine(carEntity.getEngine())
                .build();
    }

    @Override
    public CarResponse addCar(CarRequest carRequest) {
        CarEntity savedCarEntity = carRepository.save(mapToEntity(carRequest));
        return mapToCarResponse(savedCarEntity);
    }

    @Override
    public List<CarResponse> getAllCars() {
        return carRepository.findAll()
                .stream()
                .map(this::mapToCarResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CarResponse updateCar(CarRequest carRequest) {
        return null;
    }

    @Override
    public void deleteCar(Long carId) {
        if(!carRepository.existsById(carId)){
            throw new RuntimeException("Car with id " + carId + " does not exist");
        }
        carRepository.deleteById(carId);
    }
}

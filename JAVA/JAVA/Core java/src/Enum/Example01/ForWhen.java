package Enum.Example01;

import java.time.LocalDate;
import java.util.Date;
import java.util.Locale;

public enum ForWhen {
    Today,
    Tomorrow;
//    Today(LocalDate.now()),
//    Tomorrow(LocalDate.now().plusDays(1));
//
//    private final LocalDate date;
//
//    ForWhen(LocalDate date) {
//        this.date = date;
//    }
//    public LocalDate getDate() {
//        return date;
//    }
}

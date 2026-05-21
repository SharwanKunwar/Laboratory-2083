package Arrays;

public class StudentGradeReportSystem {
    public static void main(String[] args) {

        int[] marks = {75, 82, 45, 90, 38, 66, 55};
        generateReport(marks);


    }
    // method for generating report
    static void generateReport(int[] marks){
        int sum = 0;
        double avg = 0.0;
        int passCount = 0;
        int highestMark = marks[0];
        int lowestMark = marks[0];
        for(int mark : marks){
            sum += mark;
            if(mark >= 40){
                passCount++;
            }
            if(mark > highestMark){
                highestMark = mark;
            }
            if(mark <  lowestMark){
                lowestMark = mark;
            }
        }
        avg = (double)sum/marks.length;
        System.out.println("Total Subjects : "+marks.length);
        System.out.println("Average Marks : "+avg);
        System.out.println("Pass Count : "+passCount);
        System.out.println("Highest Mark : "+highestMark);
        System.out.println("Lowest Mark : "+lowestMark);
        String grade = generateReport(avg);
        System.out.println(grade);


    }
    static String generateReport(double avg){
        if(avg >= 80){
            return "Distinction";
        }else if(avg >= 60){
            return "First Devision";
        }else if(avg >= 45){
            return "Second Devision";
        }else  if(avg >= 32){
            return "Pass";
        }else{
            return "Fail";
        }
    }
}

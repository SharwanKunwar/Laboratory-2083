import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

public class Task extends TaskController{
    private int id;
    private String title;
    private String description;
    private int priority;
    private String note;
    private Date createAt;
    private Date updatedAt;
    Date startedAT;
    Date FinishedAt;

    Scanner in =new  Scanner(System.in);
    List<Task> tasksDB = new ArrayList<>();

    public Task(){

    }

    public Task(String title, String description, int priority){
        this.id = (int)Math.random()*100;
        this.title = title;
        this.description = description;
        this.priority = priority;
    }


    @Override
    void addTask() {
        int priority;
        String title;
        String description;


        System.out.print("Task Title : ");
        title = in.nextLine();
        System.out.print("Task Description : ");
        description = in.nextLine();
        System.out.print("Task Priority [(1=low | 2=medium | 3=high)] : ");
        priority = in.nextInt();
        Task task = new Task(title,description,priority);
        tasksDB.add(task);
    }

    @Override
    void startTask(Task task) {

    }

    @Override
    void displayTask() {
        for(Task task : tasksDB){
            System.out.println("Title : "+task.title);
            System.out.println("Description : "+task.description);
            if(task.priority == 1){
                System.out.println("Priority : Low");
            }else if(task.priority == 2){
                System.out.println("Priority : Medium");
            }else{
                System.out.println("Priority : High");
            }
        }
    }
}

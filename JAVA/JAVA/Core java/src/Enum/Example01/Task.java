package Enum.Example01;

import java.util.ArrayList;
import java.util.List;

public class Task {
    int id;
    String title;
    String description;
    String priority;
    String status;
    String forWhen;

    List<Task> tasks = new ArrayList<Task>();

    public void addTask(Task task) {
        tasks.add(task);
    }
    public void displayTasks() {
        System.out.println("-------- Displaying Tasks --------");
        for (Task task : tasks) {
            System.out.println("ID: " + task.id);
            System.out.println("Title: " + task.title);
            System.out.println("Description: " + task.description);
            System.out.println("Priority: " + task.priority);
            System.out.println("Status: " + task.status);
            System.out.println("For When: " + task.forWhen);
//            System.out.println("For When: " + task.forWhen+" Date: "+ForWhen.Today.getDate());
        }
    }
}

package Enum.Example01;

public class EnumCode {
    public static void main() {
        Task t1 = new Task();
        t1.id = 1;
        t1.title = "Task 1";
        t1.description = "This is task 1";
        t1.priority = String.valueOf(Priority.High);
        t1.status = String.valueOf(Status.Pending);
        t1.forWhen = String.valueOf(ForWhen.Tomorrow);

        t1.addTask(t1);
        t1.displayTasks();
    }
}

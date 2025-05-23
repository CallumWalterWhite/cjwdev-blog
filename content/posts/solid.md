---
title: SOLID Principles
date: 2023-08-20
tags:
  - SOLID
  - C#
social_image: /media/rocket.jpg
description: Understanding SOLID Principles in Software Engineering.
---

SOLID is a set of five principles that, when followed, can help software developers create more maintainable, flexible, and robust code. These principles were introduced by Robert C. Martin and have become a cornerstone of object-oriented design. In this blog post, we will delve into each of the SOLID principles and illustrate their application in C#.

## Single Responsibility Principle (SRP)

The Single Responsibility Principle states that a class should have only one reason to change. In other words, a class should have a single responsibility or job. Let's consider a simple example

```csharp
public class Order
{
    public void CalculateTotal() { /* Calculate order total */ }
    public void GenerateInvoice() { /* Generate invoice */ }
    public void PrintReceipt() { /* Print receipt */ }
}
```

This Order class violates SRP because it handles three distinct responsibilities - calculating the total, generating an invoice, and printing a receipt. To adhere to SRP, we can refactor it like this:

```csharp
public class Order
{
    public void CalculateTotal() { /* Calculate order total */ }
}

public class Invoice
{
    public void Generate() { /* Generate invoice */ }
}

public class Receipt
{
    public void Print() { /* Print receipt */ }
}

```
Now each class has a single responsibility, making the code more maintainable and easier to understand.

## Open/Closed Principle (OCP)

The Open/Closed Principle states that software entities (e.g., classes, modules) should be open for extension but closed for modification. In other words, you should be able to add new functionality without altering existing code. Let's explore another example:

Suppose we have a PaymentProcessor class that handles payment processing for different payment methods:

```csharp
public class PaymentProcessor
{
    public void ProcessPayment(string paymentMethod, double amount)
    {
        if (paymentMethod == "CreditCard")
        {
            // Process credit card payment
        }
        else if (paymentMethod == "PayPal")
        {
            // Process PayPal payment
        }
        // More payment methods...
    }
}

```
This class violates the OCP because whenever you want to add a new payment method, you need to modify the ProcessPayment method. To adhere to OCP, we can use a strategy pattern:

```csharp
public interface IPaymentMethod
{
    void ProcessPayment(double amount);
}

public class CreditCardPayment : IPaymentMethod
{
    public void ProcessPayment(double amount)
    {
        // Process credit card payment
    }
}

public class PayPalPayment : IPaymentMethod
{
    public void ProcessPayment(double amount)
    {
        // Process PayPal payment
    }
}

public class PaymentProcessor
{
    public void ProcessPayment(IPaymentMethod paymentMethod, double amount)
    {
        paymentMethod.ProcessPayment(amount);
    }
}

```
Now, we can add new payment methods by creating classes that implement the IPaymentMethod interface without modifying the existing code. The PaymentProcessor is open for extension but closed for modification, following the Open/Closed Principle.

## Liskov Substitution Principle (LSP)

The Liskov Substitution Principle states that objects of a derived class should be able to replace objects of the base class without affecting the correctness of the program. Consider this example:

```csharp
public class Bird
{
    public virtual void Fly()
    {
        Console.WriteLine("A bird can fly.");
    }
}

public class Ostrich : Bird
{
    public override void Fly()
    {
        Console.WriteLine("An ostrich cannot fly.");
    }
}

```

In this case, the Ostrich class violates LSP because it changes the behavior of the Fly method. To adhere to LSP, we can create a new method:

```csharp
public class Bird
{
    public virtual void Move()
    {
        Console.WriteLine("A bird can move.");
    }
}

public class Ostrich : Bird
{
    public override void Move()
    {
        Console.WriteLine("An ostrich cannot fly but can run.");
    }
}

```
Now, the Ostrich class extends the behavior without breaking the base class contract.

## Interface Segregation Principle (ISP)

The Interface Segregation Principle states that clients should not be forced to depend on interfaces they do not use. Consider an example where an interface contains too many methods:

```csharp
public interface IWorker
{
    void Work();
    void Eat();
    void Sleep();
}

```

If a class only needs the Work method, it's forced to implement the other two methods, which is wasteful. To follow ISP, we can split the interface:

```csharp
public interface IWorker
{
    void Work();
}

public interface IEater
{
    void Eat();
}

public interface ISleeper
{
    void Sleep();
}

```

Now, classes can implement the specific interfaces they need, preventing unnecessary dependencies.

## Dependency Inversion Principle (DIP)

The Dependency Inversion Principle states that high-level modules should not depend on low-level modules but both should depend on abstractions. Additionally, abstractions should not depend on details; details should depend on abstractions. Consider this example:

```csharp
public class LightBulb
{
    public void TurnOn() { /* Turn on the light bulb */ }
    public void TurnOff() { /* Turn off the light bulb */ }
}

public class Switch
{
    private LightBulb bulb = new LightBulb();

    public void Toggle()
    {
        if (/* check the state of the bulb */) 
        {
            bulb.TurnOff();
        }
        else
        {
            bulb.TurnOn();
        }
    }
}
```

This code violates DIP because the Switch class depends on the concrete LightBulb class. To adhere to DIP, we can introduce an abstraction:

```csharp
public interface ISwitchable
{
    void TurnOn();
    void TurnOff();
}

public class LightBulb : ISwitchable
{
    public void TurnOn() { /* Turn on the light bulb */ }
    public void TurnOff() { /* Turn off the light bulb */ }
}

public class Switch
{
    private ISwitchable device;

    public Switch(ISwitchable device)
    {
        this.device = device;
    }

    public void Toggle()
    {
        if (/* check the state of the device */) 
        {
            device.TurnOff();
        }
        else
        {
            device.TurnOn();
        }
    }
}
```
Now, the Switch class depends on an abstraction (ISwitchable), adhering to the Dependency Inversion Principle.

## Conclusion
In conclusion, the SOLID principles provide guidelines for writing clean, maintainable, and extensible code. By following these principles and using appropriate design patterns, you can create software that is easier to understand, test, and maintain.

Keep exploring, keep learning, and until next time, happy coding!
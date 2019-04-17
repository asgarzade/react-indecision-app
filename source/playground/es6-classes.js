class Person {
    constructor(name = "Anonymous", age = 0) {
        this.name = name;
        this.age = age;
    }
    getGreeting() {
        return `Hi. I am ${this.name}.`
    }
    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`
    }
}

class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }
    hasMajor() {
        return !!this.major;
    }
    getDescription() {
        let description = super.getDescription();
        if (this.major) {
            description += ` Their major is ${this.major}`
        }
        return description;
    } 
}

class Traveller extends Person {
    constructor(name, age, homeLocation) {
        super(name, age);
        this.homeLocation = homeLocation;
    }
    getGreeting() {
        let greeting = super.getGreeting();
        if (this.homeLocation) {
            greeting += ` I am visiting from ${this.homeLocation}.`
        }
        return greeting;
    }
}

const me = new Student("Khalid", 26, "Electronic Engineering");
const other = new Student();
const far = new Traveller("Farhad", 27, "Baku")

console.log(me.getDescription());
console.log(other.getDescription());
console.log(far.getGreeting())
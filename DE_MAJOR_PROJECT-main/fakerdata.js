//mongodb+srv://Sabareeshwaran:08082002Tinku@cluster0.pso5y.mongodb.net/DE_FINAL_PROJECT?retryWrites=true&w=majority&appName=Cluster0
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

// Import models
const User = require("./models/User");
const Score = require("./models/Score");
const Quiz = require("./models/Quiz");
const LearningMaterial = require("./models/LearningMaterial");
const Feedback = require("./models/Feedback");

// MongoDB Atlas connection string
const uri = "mongodb+srv://Sabareeshwaran:08082002Tinku@cluster0.pso5y.mongodb.net/DE_FINAL_PROJECT?retryWrites=true&w=majority&appName=Cluster0";

// Replace <username> and <password> with your MongoDB credentials
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected to Atlas!"))
.catch((err) => console.error("MongoDB connection error:", err));

// Seed function
async function seedData() {
    try {
        // Clear existing data
        await User.deleteMany({});
        await LearningMaterial.deleteMany({});
        await Quiz.deleteMany({});
        await Score.deleteMany({});
        await Feedback.deleteMany({});

        // Create 10 Admin Users
        const admins = [];
        for (let i = 0; i < 10; i++) {
            const admin = new User({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: "admin",
                team: faker.commerce.department(),
                department: faker.commerce.department(),
            });
            await admin.save();
            admins.push(admin);
        }
        console.log("10 Admin Users created!");

        // Create 240 Employee Users
        const employees = [];
        for (let i = 0; i < 240; i++) {
            const employee = new User({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: "employee",
                team: faker.commerce.department(),
                department: faker.commerce.department(),
            });
            await employee.save();
            employees.push(employee);
        }
        console.log("240 Employee Users created!");

        // Create Learning Materials
        const learningMaterials = [];
        for (let i = 0; i < 1000; i++) {
            const learningMaterial = new LearningMaterial({
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                createdBy: faker.helpers.arrayElement(employees)._id, // Random Employee ID (not admin)
            });
            await learningMaterial.save();
            learningMaterials.push(learningMaterial);
        }
        console.log("1000 Learning Materials created!");

        // Create Quizzes
        const quizzes = [];
        for (let i = 0; i < 1000; i++) {
            const quiz = new Quiz({
                title: faker.lorem.sentence(),
                questions: [
                    {
                        questionText: faker.lorem.sentence(),
                        options: [
                            { optionText: faker.lorem.words(3), isCorrect: false },
                            { optionText: faker.lorem.words(3), isCorrect: true },
                            { optionText: faker.lorem.words(3), isCorrect: false },
                        ],
                    },
                ],
                learningMaterial: faker.helpers.arrayElement(learningMaterials)._id, // Random Learning Material ID
                createdAt: Date.now(),
            });
            await quiz.save();
            quizzes.push(quiz);
        }
        console.log("1000 Quizzes created!");

        // Create Scores
        const scores = [];
        for (let i = 0; i < 1000; i++) {
            const score = new Score({
                employeeId: faker.helpers.arrayElement(employees).employeeId, // Random Employee ID (not admin)
                quizId: faker.helpers.arrayElement(quizzes)._id, // Random Quiz ID
                score: faker.number.int({ min: 0, max: 100 }), // Updated faker API
                timeSpent: faker.number.int({ min: 1, max: 120 }), // Updated faker API
                completed: faker.datatype.boolean(),
            });
            await score.save();
            scores.push(score);
        }
        console.log("1000 Scores created!");

        // Create Feedback
        const feedbacks = [];
        for (let i = 0; i < 1000; i++) {
            const feedback = new Feedback({
                employeeId: faker.helpers.arrayElement(employees).employeeId, // Random Employee ID (not admin)
                learningMaterialTitle: faker.helpers.arrayElement(learningMaterials).title, // Random Learning Material Title
                description: faker.lorem.paragraph(),
                rating: faker.number.int({ min: 1, max: 5 }), // Updated faker API
            });
            await feedback.save();
            feedbacks.push(feedback);
        }
        console.log("1000 Feedbacks created!");

        // Close the connection after seeding
        mongoose.connection.close();
        console.log("Database seeding complete and connection closed!");

    } catch (error) {
        console.error("Error seeding data:", error);
    }
}

// Execute the seed function
seedData();
